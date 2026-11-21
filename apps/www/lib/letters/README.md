# Letter outlines

`glyphs.ts` is generated, not hand-edited. Install Python 3 and
[`fonttools`](https://github.com/fonttools/fonttools), then run:

```sh
pnpm --filter www letters:generate
pnpm exec prettier --write apps/www/lib/letters/glyphs.ts
```

The generator reads the system Latin Modern installation. Override `LM_FONT_DIR`
and `LM_MATH_FONT` to use another installation. On Debian/Ubuntu these are
provided by `fonts-lmodern` and `fonts-texgyre-math`. It downloads the small
doublestroke archive from CTAN; no font binaries are committed. For Python
installations without a system CA store configured, set `SSL_CERT_FILE` to your
system CA bundle (on Ubuntu, `/etc/ssl/certs/ca-certificates.crt`).

Each style uses its H cap height to map the cap line to y=200 and baseline to
y=800 in a 1000-square frame. Lowercase keeps the same scale and baseline as
uppercase. Visible horizontal bounds are centred; descenders and Q tails keep
their original proportions. Font curves remain curves, not traced polygons.

## Sources and licences

- [Latin Modern](https://www.gust.org.pl/projects/e-foundry/latin-modern) Roman
  regular and bold, and [Latin Modern Math](https://www.gust.org.pl/projects/e-foundry/lm-math)
  mathematical italic and double-struck. Copyright holders are the respective
  Latin Modern font authors, including Bogusław Jackowski and Janusz M. Nowacki.
  Distributed under the [GUST Font License](https://www.gust.org.pl/projects/e-foundry/licenses/GUST-FONT-LICENSE.txt).
  These extracted SVG outlines are documents produced with the fonts, not
  renamed or redistributed font software.
- [doublestroke 1.111](https://ctan.org/pkg/doublestroke), Olaf Kummer, 2002.
  Roman (`dsrom10`) and sans (`dsss10`) Type 1 outlines. Its licence states:
  “You may use and distribute these fonts as you like. You may modify these
  fonts as long as you do not rename the files to one of those names that
  Donald E. Knuth chose for the Computer Modern fonts.” Only available alphabet
  characters are extracted; unavailable lowercase glyphs are not synthesized.

`double-stroke.ts` is an original set of hand-authored skeletons. Cubics are
sampled, offset into hollow bands, combined with polyclip-ts (the arbitrary-
precision successor to polygon-clipping), and cut at
the cap line and baseline (except Q's tail). Hairlines are subtracted from band
interiors before the final union. Exports are one filled compound path, with
holes preserved by winding, and no font dependency.
