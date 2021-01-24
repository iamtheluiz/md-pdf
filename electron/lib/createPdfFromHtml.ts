import hb from 'handlebars'
import puppeteer from 'puppeteer'
import path from 'path'

/**
 * Convert a HTML string page to a PDF buffer
 * @param html HTML string page
 * @return PDF buffer
 */
export default async function createPdfFromHtml (html: string): Promise<ArrayBuffer> {
  let localChromium = puppeteer.executablePath().split('\\.local-chromium\\')[1]
  localChromium = `\\.local-chromium\\${localChromium}`

  const template = hb.compile(html, { strict: true })
  const result = template({})

  const browser = await puppeteer.launch({
    executablePath: process.env.NODE_ENV === 'development' || __dirname.substr(__dirname.length - 5) === '\\dist'
      ? (path.resolve(__dirname, '..', 'node_modules', 'puppeteer') + localChromium).replace('\\app.asar\\', '\\app.asar.unpacked\\')
      : puppeteer.executablePath().replace('app.asar', 'app.asar.unpacked')
  })
  const page = await browser.newPage()
  await page.emulateMediaType('screen')
  await page.setContent(result)

  const buffer = await page.pdf({ format: 'A4' })
  await browser.close()

  return buffer
}
