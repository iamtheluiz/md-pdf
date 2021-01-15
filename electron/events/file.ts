import { ipcMain } from 'electron'
import fs from 'fs'

import convertContentToHtml from '../lib/convertContentToHtml'
import createPdfFromHtml from '../lib/createPdfFromHtml'
import addStylesToHtmlString from '../lib/addStylesToHtmlString'

ipcMain.handle('convertFileToPdf', async (event, { from, to }) => {
  const content = fs.readFileSync(from)

  let html = convertContentToHtml(content.toString())
  html = addStylesToHtmlString(html)
  const pdf = await createPdfFromHtml(html)

  fs.writeFileSync(to, new Uint8Array(pdf))

  return to
})

ipcMain.handle('getFileData', async (event, filePath) => {
  const content = fs.readFileSync(filePath)

  return new Uint8Array(content)
})
