import { Remarkable } from 'remarkable'

import convertImagePathsToBase64 from './convertImagePathsToBase64'
import figure from 'remarkable-figure-plugin'

const md = new Remarkable('full', {
  html: true,
  typographer: true
})
md.use(figure)

/**
 * Convert markdown string to HTML
 * @param content Markdown string
 * @return HTML string
 */
export default function convertContentToHtml (content: string): string {
  // Convert md to HTML
  let html = md.render(content.toString())

  // Transform images to base64 data
  html = convertImagePathsToBase64(html)

  return html
}
