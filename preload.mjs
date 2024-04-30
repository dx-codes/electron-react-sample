import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('ipcBridges', {
  systemInfo: {
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron,
  },

  testPing: () => ipcRenderer.invoke('ping')


})