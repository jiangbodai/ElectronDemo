'use strict'

import { app, protocol, BrowserWindow, Menu, globalShortcut, ipcMain} from 'electron'
import { autoUpdater } from 'electron-updater'
import {
  createProtocol,
} from 'vue-cli-plugin-electron-builder/lib'

const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{
  scheme: 'app',
  privileges: {
    secure: true,
    standard: true
  }
}])

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1200,
    maxWidth: 1200,
    minWidth: 1200,
    height: 700,
    maxHeight: 700,
    minHeight: 700,
    webPreferences: {
        webSecurity: false,
        nodeIntegration: true
    },
    icon: `${__static}/app.ico`,
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST)
    win.webContents.openDevTools()
    win.webContents.openDevTools({mode:'right'});
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })

  createMenu();
}

function createMenu(){
    if (process.platform === 'darwin') {
        const template = [
            {
                label: '扁鹊飞救',
                submenu: [
                    {
                        role: 'about',
                    },
                    {
                        role: 'quit'
                    }
                ]
            }
        ]
        let menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);
    } else {
        Menu.setApplicationMenu(null);
    }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  globalShortcut.register('CommandOrControl+Shift+i', function () {
      win.webContents.openDevTools()
  })
  app.allowRendererProcessReuse = true
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

ipcMain.on('login', () => {
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
  } else {
    win.loadURL('app://./index.html')
  }
})