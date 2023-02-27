import { readdir, readFile, writeFile } from 'node:fs/promises'
import fontfacegen from 'fontfacegen'

// Read all otf font file names
const fontFiles = await readdir('dist') // all files are *.otf

// If a new font is added, let initial stylesheets be generated
const { argv, env } = process
const css = 'NO_COLOR' in env || argv.includes('--css')

// Generate other font formats
for (const fontFile of fontFiles) {
  if (!fontFile.endsWith('.otf')) continue
  console.log(`${fontFile}\n`)
  fontfacegen({ source: `dist/${fontFile}`, dest: 'dist', css })
  console.log()
}

// Update paths in the complete stylesheet
console.log('stylesheet.css')
let stylesheet = await readFile('stylesheet.css', 'utf8')
stylesheet = stylesheet.replace(/\burl\("([^"]+)"\)/g, 'url("dist/$1")')
await writeFile('stylesheet.css', stylesheet)
