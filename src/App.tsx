import React, { useState } from 'react'
import './App.css'

function App() {
  const [pingResult, setPingResult] = useState('')

  const _window = window as any
  const ipcBridges = _window.ipcBridges
  const systemInfo = ipcBridges.systemInfo
  const testPing = ipcBridges.testPing

  const onPingClick = async () => {
    const res = await testPing()
    console.log(res)
    setPingResult(res)
  }

  return (
    <div className="App">
      <h1>Hello Electron</h1>
      <div>
        <div>versions</div>
        <div>node: {systemInfo.node}</div>
        <div>chrome: {systemInfo.chrome}</div>
        <div>electron: {systemInfo.electron}</div>

        <div style={{ paddingTop: 8 }}>
          <div>pingResult: {pingResult}</div>
        </div>
        <button onClick={onPingClick}>ping</button>
      </div>
    </div>
  )
}

export default App
