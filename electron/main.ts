import 'regenerator-runtime/runtime'

import { app, BrowserWindow, ipcMain } from 'electron'
import fs from 'fs'
import * as path from 'path'
import * as url from 'url'

import convertContentToHtml from './lib/convertContentToHtml'
import createPdfFromHtml from './lib/createPdfFromHtml'
import addStylesToHtmlString from './lib/addStylesToHtmlString'

let mainWindow: Electron.BrowserWindow | null

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 700,
    minWidth: 1000,
    backgroundColor: '#282a36',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
    frame: false,
    title: 'MD PDF'
  })

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:4000')
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'renderer/index.html'),
        protocol: 'file:',
        slashes: true
      })
    )
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

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

app.on('ready', createWindow)
app.allowRendererProcessReuse = true
