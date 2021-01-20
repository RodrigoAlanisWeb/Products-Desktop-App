const { createWindow } = require('./main');
const { app } = require('electron');
const { getConnection } = require('./database');

require('electron-reload')(__dirname)

app.allowRendererProcessReuse = false;
app.whenReady().then(createWindow)