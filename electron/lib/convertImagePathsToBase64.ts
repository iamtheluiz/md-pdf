import fs from 'fs'

function base64Encode (file: string): string {
  const bitmap = fs.readFileSync(file)

  return Buffer.from(bitmap).toString('base64')
}

interface ImageObject {
  source: string;
  base64: string;
}

/**
 * Convert images paths from a HTML string to Base64
 * @param html HTML string with local images
 * @return HTML string with base64 images
 */
export default function convertImagePathsToBase64 (html: string): string {
  const reg = /<img[^>]+src\s*=\s*['"]([^'"]+)['"][^>]*>/g
  let image = null
  const images: ImageObject[] = []

  // Get all images
  // eslint-disable-next-line no-cond-assign
  while (image = reg.exec(html)) {
    const source = image[1] // Get image source

    images.push({
      source: image[1],
      base64: source.match(/http/) ? source : base64Encode(source)
    })
  }

  // Replace each source
  images.forEach(image => {
    html = html.replace(image.source, `data:image/png;base64,${image.base64}`)
  })

  return html
}
