// const { app, BrowserWindow } = require('electron')
// const isDev = require('electron-is-dev')

import { app, BrowserWindow, ipcMain  } from 'electron'
import isDev from 'electron-is-dev'
import { join, resolve, dirname } from 'node:path'

const __dirname = resolve(dirname(''))
let mainWindow

app.on('ready', () => {
  handleIpc()
  createWindow()
  loadHtml()
})

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    minWidth: 800,
    minHeight: 600,
    resizable: false,
    webPreferences: {
      preload: join(__dirname, 'preload.mjs'),
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      enableRemoteModule: true,
      contextIsolation: true,
      webSecurity: false,
    }
  })
}

const loadHtml = () => {
  if (isDev) {
    const url = isDev ? 'http://localhost:3000': 'https://?'
    mainWindow.loadURL(url)
  } else {
    const filePath = './build/index.html'
    console.log(filePath)
    mainWindow.loadFile(filePath)
  }
}

const handleIpc = () => {
  ipcMain.handle('ping', () => 'pong')
}
