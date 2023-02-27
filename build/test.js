import test from 'node:test'
import { strictEqual } from 'node:assert'
import 'untap-inprocess'

import { readdir } from 'node:fs/promises'

const all = await readdir('dist')
const css = all.filter(font => font.endsWith('.css'))

test('otf format was copied', () => {
  const otf = all.filter(font => font.endsWith('.otf'))
  strictEqual(otf.length, 23)
})

test('stylesheets were written', () => {
  strictEqual(css.length, 8)
})

test('all formats were generated', () => {
  const otf = all.filter(font => font.endsWith('.otf'))
  // css + eot, svg, otf, ttf, woff, woff2 
  strictEqual(all.length, otf.length * 6 + css.length)
})
