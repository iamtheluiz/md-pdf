import { ipcMain, shell } from 'electron'

ipcMain.handle('openFolder', async (event, folder) => {
  try {
    await shell.openItem(folder)

    return true
  } catch (error) {
    console.log(error)
    return false
  }
})
