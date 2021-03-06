// const electron = require('electron');
// const app = electron.app;
// const BrowserWindow = electron.BrowserWindow;
import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from "path";
import retrieveIoTData from "./multicastReader";
import { loadAppsFromWorkDirectory, saveAppToWorkDirectory, deleteAppFromWorkDirectory, loadRelationships, saveRelationship } from "./projectLoader";
import executeTheApp from "./appExecuter";
import runService from "./serviceExecuter";

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    title: "Visual IoT",
    width: 1200,
    height: 700,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  
  // and load the index.html of the app.
  // mainWindow.loadFile("http://localhost:8080");
  mainWindow.loadFile('./dist/index.html');
  // mainWindow.webContents.openDevTools();
}

ipcMain.on('get-iot-data', (event) => {
  retrieveIoTData(event);
  event.reply('handle-iot-data', 'abc')
});

ipcMain.on('save-app', (event, appData) => {
  saveAppToWorkDirectory(appData);
});

ipcMain.on('load-apps', (event) => {
  event.returnValue = loadAppsFromWorkDirectory();
});

ipcMain.on('delete-app', (event, appName) => {
  deleteAppFromWorkDirectory(appName);
});

ipcMain.on('run-service', (event, evalInfo: any) => {
  event.returnValue = runService(event, evalInfo);
});

ipcMain.on('load-relationships', (event) => {
  event.returnValue = loadRelationships();
});

ipcMain.on('save-relationship', (event, saveObj) => {
  saveRelationship(saveObj);
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if ((<any> (process)).platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
