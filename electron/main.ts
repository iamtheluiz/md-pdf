import 'regenerator-runtime/runtime'

import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import * as url from 'url'

// Require remote modules
import './events/file'
import './events/folder'

let mainWindow: Electron.BrowserWindow | null

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 700,
    minWidth: 1000,
    minHeight: 700,
    maxHeight: 700,
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

app.on('ready', createWindow)
app.allowRendererProcessReuse = true
