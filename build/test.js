import test from 'node:test'
import { match, ok, strictEqual } from 'node:assert'
import 'untap-inprocess'

import { readdir, readFile } from 'node:fs/promises'

const files = await readdir('dist')
const cssNames = files.filter(font => font.endsWith('.css'))
const cssContents = await Promise.all(cssNames.map(name =>
  readFile(`dist/${name}`, 'utf8')))

test('otf format was copied', () => {
  const otf = files.filter(font => font.endsWith('.otf'))
  strictEqual(otf.length, 23)
})

test('stylesheets were written', () => {
  strictEqual(cssNames.length, 8)
})

test('all formats were generated', () => {
  const otf = files.filter(font => font.endsWith('.otf'))
  // css + eot, svg, otf, ttf, woff, woff2 
  strictEqual(files.length, otf.length * 6 + cssNames.length)
})

test('valid font styles', () => {
  for (const css of cssContents) {
    const [...styles] = css.matchAll(/\bfont-style:\s*([^;]+);/g)
    ok(styles.length >= 1, 'font style found')
    for (const style of styles) match(style[1], /normal|italic/)
  }
})

test('valid font weights', () => {
  for (const css of cssContents) {
    const [...weights] = css.matchAll(/\bfont-weight:\s*([^;]+);/g)
    ok(weights.length >= 1, 'font weight found')
    for (const weight of weights) match(weight[1], /normal|\d+/)
  }
})

test('font format "opentype" referred to', () => {
  for (const css of cssContents) {
    const [...formats] = css.matchAll(/\bformat\("opentype"\)/g)
    ok(formats.length >= 1, '"opentype" font format found')
  }
})

test('local fonts enabled', () => {
  for (const css of cssContents) {
    const [...locals] = css.matchAll(/\blocal\("[^"]+"\)/g)
    ok(locals.length >= 1, 'local fonts found')
  }
})
