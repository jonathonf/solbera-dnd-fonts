import { readdir, readFile, writeFile, unlink } from 'node:fs/promises'
import fontfacegen from 'fontfacegen'

// Read all font file names and sort them in the order regular, bold, italic and
// bold italic to be able to have font faces in the stylesheet in this order
let fontFiles = await readdir('dist') // all files are *.otf
fontFiles = fontFiles.sort((left, right) => {
  left = left.length
  right = right.length
  // Bold is shorter than Italic and they both are shorter than Bold Italic
  return left < right ? -1 : left > right ? 1 : 0
})

// Generate other font formats and initial stylesheets
for (const fontFile of fontFiles) {
  console.log(`${fontFile}\n`)
  fontfacegen({ source: `dist/${fontFile}`, dest: 'dist' })
  console.log()
}

// Create a map of the regular font name and array of the others:
//   name => [regular, bold, italic and bold italic names]
const fontFaces = fontFiles.reduce((fontFaces, fontFile) => {
  const fileName = fontFile.slice(0, -4) // cut ".otf"
  // Get the regular font name by cutting Bold, Italic or Bold Italic
  const fontName = fileName.replace(/\s*(?:Bold|Italic)/g, '')
  let fileNames = fontFaces[fontName]
  if (!fileNames) fileNames = fontFaces[fontName] = []
  fileNames.push(fileName)
  return fontFaces
}, {})

// Write stylesheets with the regular font names containing font faces for all
// regular, bold, italic and bold italic fonts and delete the initially
// generated stylesheets for each font face, also insert the "opentype" font
// formats and and reset the font families to the regular font names
await Promise.all(Object.keys(fontFaces).map(async fontName => {
  const fileNames = fontFaces[fontName]
  console.log(fileNames
    .map(fileName => fileName.length > fontName.length
      // Do not duplicate the regular font name in logging
      ? fileName.substring(fontName.length + 1) : fileName)
    .join(', '))
  const fontStyles = await Promise.all(fileNames.map(async fileName => {
  let css = await readFile(`dist/${fileName}.css`, 'utf8')
  // TODO: Consider replacing the messy workarounds by hand-written stylesheets
  // Work around bugs in fontfacegen or fontforge
  if (/font-weight: italic;/.test(css)) {
    css = css
      .replace(/font-weight: italic;/, 'font-weight: normal;')
      .replace(/font-style: [^;]+;/, 'font-style: italic;')
  }
  if (/font-weight: (?:smblditlc|bolditalic);/.test(css)) {
    css = css
      .replace(/font-weight: (?:smblditlc|bolditalic);/, 'font-weight: 700;')
      .replace(/font-style: [^;]+;/, 'font-style: italic;')
  }
  if (/font-weight: regular;/.test(css)) {
    css = css.replace(/font-weight: regular;/, 'font-weight: normal;')
  }
  if (fontName === 'Mr Eaves Small Caps') {
    css = css.replace(/url\("Mr Eaves Small Caps\.svg#MrEavesSCRemakeMedium"\) format\("svg"\);/,
      `$&\n    font-feature-settings: "smcp" on;`)
  }
  return css
    // Use the regular font name for all font faces
    .replace(/font-family: "[^"]+"/g, `font-family: "${fontName}"`)
    // Insert local(...) font sources to prevent unnecessary font downloads
    .replace(/url\("([^."]+)\.eot\?#iefix"\) format\("embedded-opentype"\),/g,
      `local("${fontName} Remake"),\n         ` +
      `local("${fontName}"),\n         $&`)
    // Insert the "opentype" font format
    .replace(/url\("([^."]+).ttf"\) format\("ttf"\),/g,
      `$&\n         ` +
      `url("$1.otf") format("opentype"),`)
  }))
  // Delete the initially created stylesheets
  await Promise.all(fileNames.map(fileName => unlink(`dist/${fileName}.css`)))
  // Write one stylesheet with all font faces
  await writeFile(`dist/${fontName}.css`, fontStyles.join('\n\n'))
}))
