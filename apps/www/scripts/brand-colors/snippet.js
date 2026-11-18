// Paste into DevTools on a page you are signed in to (claude.ai, an app),
// for sites measure.mjs cannot reach. Copies a colour-only summary to the
// clipboard: painted colours by role, weighted by area or characters.
// No text content, class names or ids are captured; ids in the path are
// replaced. Run once per page and theme, then paste the results back.
;(() => {
  const c = document.createElement("canvas")
  c.width = c.height = 1
  const x = c.getContext("2d", { willReadFrequently: true })
  const memo = new Map()
  const rgba = (col) => {
    if (memo.has(col)) return memo.get(col)
    x.clearRect(0, 0, 1, 1)
    x.fillStyle = "rgba(0,0,0,0)"
    x.fillStyle = col
    x.fillRect(0, 0, 1, 1)
    const d = x.getImageData(0, 0, 1, 1).data
    const v = [d[0], d[1], d[2], d[3] / 255]
    memo.set(col, v)
    return v
  }
  const over = (t, u) =>
    [0, 1, 2].map((i) => t[i] * t[3] + u[i] * (1 - t[3])).concat(1)
  const hex = (v) =>
    "#" +
    v
      .slice(0, 3)
      .map((n) => Math.round(n).toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  const root = (() => {
    const b = rgba(getComputedStyle(document.body).backgroundColor)
    const h = rgba(getComputedStyle(document.documentElement).backgroundColor)
    const base = h[3] > 0 ? h : [255, 255, 255, 1]
    return b[3] > 0 ? over(b, base) : base
  })()
  const bgMemo = new Map()
  const bgOf = (el) => {
    if (!el || el === document.documentElement) return root
    if (bgMemo.has(el)) return bgMemo.get(el)
    const own = rgba(getComputedStyle(el).backgroundColor)
    const v =
      own[3] > 0 ? over(own, bgOf(el.parentElement)) : bgOf(el.parentElement)
    bgMemo.set(el, v)
    return v
  }
  const roleOf = (el) => {
    const t = el.tagName.toLowerCase()
    if (t === "button" || el.getAttribute("role") === "button") return "button"
    if (t === "a") return "link"
    if (/^h[1-6]$/.test(t)) return "heading"
    if (t === "input" || t === "textarea" || el.isContentEditable)
      return "field"
    if (el.closest("pre, code")) return "code"
    if (el.closest("button,[role=button]")) return "button"
    if (el.closest("a")) return "link"
    if (el.closest("nav, aside")) return "nav"
    return "other"
  }
  const tally = new Map()
  const add = (kind, key, w) => {
    const k = `${kind}|${key}`
    const e = tally.get(k) ?? { kind, key, w: 0, n: 0 }
    e.w += w
    e.n++
    tally.set(k, e)
  }
  for (const el of document.body.querySelectorAll("*")) {
    const s = getComputedStyle(el)
    if (s.display === "none" || s.visibility === "hidden" || +s.opacity === 0)
      continue
    const r = el.getBoundingClientRect()
    if (r.width < 1 || r.height < 1) continue
    const role = roleOf(el)
    const tag = el.tagName.toLowerCase()
    if (el.closest("svg")) {
      if (tag !== "svg") {
        for (const p of ["fill", "stroke"]) {
          const v = s[p]
          if (v && v !== "none" && !v.startsWith("url") && rgba(v)[3] > 0.08)
            add("fill", `${hex(rgba(v))} ${role}`, (r.width * r.height) / 1000)
        }
      }
      continue
    }
    const own = rgba(s.backgroundColor)
    const bg = bgOf(el)
    if (own[3] > 0.02)
      add(
        "surface",
        `${hex(bg)}${own[3] < 1 ? ` a${own[3].toFixed(2)}` : ""} ${role} r${s.borderTopLeftRadius}`,
        (r.width * r.height) / 1000
      )
    const bw = parseFloat(s.borderTopWidth) || parseFloat(s.borderBottomWidth)
    const bc = rgba(
      parseFloat(s.borderTopWidth) ? s.borderTopColor : s.borderBottomColor
    )
    if (bw > 0 && bc[3] > 0.02 && s.borderTopStyle !== "none")
      add(
        "border",
        `${hex(over(bc, bg))} a${bc[3].toFixed(2)} on ${hex(bg)} ${role}`,
        1
      )
    let chars = 0
    for (const n of el.childNodes)
      if (n.nodeType === 3) chars += n.textContent.trim().length
    if (
      chars > 0 ||
      ((tag === "input" || tag === "textarea") && el.placeholder)
    ) {
      const col = rgba(s.color)
      add(
        "text",
        `${hex(over(col, bg))} a${col[3].toFixed(2)} on ${hex(bg)} ${role} ${s.fontSize}/${s.fontWeight} ${s.fontFamily.split(",")[0].replace(/"/g, "")}`,
        chars || 1
      )
    }
  }
  const out = {
    path: location.pathname.replace(/[0-9a-f]{8}-[0-9a-f-]{27,}/gi, ":id"),
    host: location.host,
    dark:
      matchMedia("(prefers-color-scheme: dark)").matches ||
      /dark/.test(
        document.documentElement.className +
          JSON.stringify(document.documentElement.dataset)
      ),
    htmlAttrs: [...document.documentElement.attributes].map((a) =>
      a.name === "class" || a.name.startsWith("data-")
        ? `${a.name}=${a.value}`
        : a.name
    ),
    root: hex(root),
    rows: [...tally.values()]
      .sort((a, b) => b.w - a.w)
      .slice(0, 160)
      .map((e) => `${e.kind} ${e.key} w${Math.round(e.w)} n${e.n}`),
  }
  const json = JSON.stringify(out)
  if (typeof copy === "function") copy(json)
  console.log(
    `${out.rows.length} rows${typeof copy === "function" ? ", copied to clipboard" : ""}`
  )
  return out
})()
