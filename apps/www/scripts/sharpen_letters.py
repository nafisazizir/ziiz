"""Sharpen short rounded cap and corner runs without changing larger curves."""

import math

from fontTools.pens.recordingPen import RecordingPen

SMALL = 56.0


def sub(a, b):
    return (a[0] - b[0], a[1] - b[1])


def add(a, b):
    return (a[0] + b[0], a[1] + b[1])


def mul(a, k):
    return (a[0] * k, a[1] * k)


def dot(a, b):
    return a[0] * b[0] + a[1] * b[1]


def cross(a, b):
    return a[0] * b[1] - a[1] * b[0]


def norm(a):
    l = math.hypot(*a)
    return (a[0] / l, a[1] / l) if l else (0, 0)


def dist(a, b):
    return math.hypot(*sub(a, b))


def contours(rec):
    out = []
    cur = None
    start = None
    for op, args in rec:
        if op == "moveTo":
            start = args[0]
            cur = []
            pos = start
        elif op in ("lineTo", "curveTo", "qCurveTo"):
            cur.append((pos, op, list(args)))
            pos = args[-1]
        elif op in ("closePath", "endPath"):
            if dist(pos, start) > 1e-6:
                cur.append((pos, "lineTo", [start]))
            out.append(cur)
    return out


def bez(p0, c1, c2, p1, t):
    s = 1 - t
    return (
        s**3 * p0[0] + 3 * s * s * t * c1[0] + 3 * s * t * t * c2[0] + t**3 * p1[0],
        s**3 * p0[1] + 3 * s * s * t * c1[1] + 3 * s * t * t * c2[1] + t**3 * p1[1],
    )


def samples(seg):
    p0, op, a = seg
    if op == "lineTo":
        return [p0, a[0]]
    return [bez(p0, a[0], a[1], a[2], i / 16) for i in range(17)]


def end_tan(seg):
    p0, op, a = seg
    pts = [p0] + a
    for q in reversed(pts[:-1]):
        if dist(q, pts[-1]) > 1e-3:
            return norm(sub(pts[-1], q))


def start_tan(seg):
    p0, op, a = seg
    pts = [p0] + a
    for q in pts[1:]:
        if dist(q, p0) > 1e-3:
            return norm(sub(q, p0))


def is_small(seg):
    p0, op, a = seg
    if op == "lineTo":
        return dist(p0, a[0]) < 2
    return dist(p0, a[-1]) <= SMALL and max(dist(p0, q) for q in a) <= SMALL


def intersect(p, d, q, e):
    den = cross(d, e)
    if abs(den) < 1e-9:
        return None
    t = cross(sub(q, p), e) / den
    return add(p, mul(d, t))


def clip_box(poly, box):
    x0, y0, x1, y1 = box

    def clip(pts, inside, inter):
        out = []
        for i in range(len(pts)):
            a = pts[i - 1]
            b = pts[i]
            if inside(b):
                if not inside(a):
                    out.append(inter(a, b))
                out.append(b)
            elif inside(a):
                out.append(inter(a, b))
        return out

    def ix(x):
        return lambda a, b: (x, a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]))

    def iy(y):
        return lambda a, b: (a[0] + (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]), y)

    pts = poly
    for inside, inter in [
        (lambda p: p[0] >= x0, ix(x0)),
        (lambda p: p[0] <= x1, ix(x1)),
        (lambda p: p[1] >= y0, iy(y0)),
        (lambda p: p[1] <= y1, iy(y1)),
    ]:
        pts = clip(pts, inside, inter)
        if not pts:
            break
    return pts


def sharpen_contour(segs, mode, ylim):
    n = len(segs)
    small = [is_small(s) for s in segs]
    if all(small) or not any(small):
        return segs
    k = next(i for i in range(n) if not small[i])
    segs = segs[k:] + segs[:k]
    small = small[k:] + small[:k]
    out = []
    i = 0
    while i < n:
        if not small[i]:
            out.append(segs[i])
            i += 1
            continue
        j = i
        while j < n and small[j]:
            j += 1
        run = segs[i:j]
        prev = segs[i - 1]
        nxt = segs[j % n]
        P0 = run[0][0]
        P1 = run[-1][2][-1]
        t0 = start_tan(run[0]) if run[0][1] != "lineTo" else end_tan(prev)
        t1 = end_tan(run[-1]) if run[-1][1] != "lineTo" else start_tan(nxt)
        pts = [p for s in run for p in samples(s)]
        turn = math.degrees(math.acos(max(-1, min(1, dot(t0, t1)))))
        ys_ = [p[1] for p in pts]
        cut = None
        if min(ys_) <= ylim[0] + 1:
            cut = ylim[0]
        elif max(ys_) >= ylim[1] - 1:
            cut = ylim[1]
        if turn > 165 and cut is not None and abs(t0[1]) > 0.3 and abs(t1[1]) > 0.3:
            a = intersect(P0, t0, (0, cut), (1, 0))
            b = intersect(P1, t1, (0, cut), (1, 0))
            new = [a, b, P1]
        elif turn > 165:
            h0 = max(dot(sub(p, P0), t0) for p in pts)
            h1 = max(dot(sub(p, P1), mul(t1, -1)) for p in pts)
            new = [add(P0, mul(t0, h0)), add(P1, mul(t1, -h1)), P1]
        else:
            X = intersect(P0, t0, P1, t1)
            xs = [p[0] for p in pts]
            ys = [p[1] for p in pts]
            box = (min(xs) - 0.01, min(ys) - 0.01, max(xs) + 0.01, max(ys) + 0.01)
            ratio = dist(X, P0) / max(1e-6, dist(P0, P1) / 2)
            if mode == "clip" and not (
                box[0] <= X[0] <= box[2] and box[1] <= X[1] <= box[3]
            ):
                poly = clip_box([P0, X, P1], box)
                # rotate so it starts after P0 and ends at P1
                k2 = min(range(len(poly)), key=lambda q: dist(poly[q], P0))
                poly = poly[k2:] + poly[:k2]
                new = poly[1:]
                if dist(new[-1], P1) > 1e-3:
                    new.append(P1)
            else:
                new = [X, P1]
        pos = P0
        for q in new:
            if dist(q, pos) > 1e-3:
                out.append((pos, "lineTo", [q]))
                pos = q
        i = j
    return out


def to_d(cs, scale, dx, base):
    def f(p):
        return f"{round(p[0]*scale+dx,3)} {round(base-p[1]*scale,3)}"

    d = []
    for c in cs:
        d.append("M" + f(c[0][0]))
        for p0, op, a in c:
            d.append(("L" if op == "lineTo" else "C") + " ".join(f(q) for q in a))
        d.append("Z")
    return "".join(d)


def glyph(gs, name, mode):
    r = RecordingPen()
    gs[name].draw(r)
    cs = contours(r.value)
    ys = [p[1] for c in cs for s in c for p in samples(s)]
    return [sharpen_contour(c, mode, (min(ys), max(ys))) for c in cs]
