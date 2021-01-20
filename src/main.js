const { BrowserWindow, Notification } = require('electron');
const { getConnection } = require('./database');

async function createProduct(product) {
    const db = getConnection();
    const res = await db.awaitQuery('INSERT INTO products SET ?', product).catch(err => {
        new Notification({
            title: 'Electron | Mysql | Error',
            body: 'Error At Creating The Product'
        }).show();
        return;
    });
    
    new Notification({
        title: 'Electron | Mysql',
        body: 'Product Created Successfully'
    }).show();

    product.id = res.insertId;
    return product;
}

async function getProduct(id) {
    const db = getConnection();
    const res = await db.awaitQuery('SELECT * FROM products WHERE id = ?', id).catch(err => {
        new Notification({
            title: 'Electron | Mysql | Error',
            body: 'Error At Getting The Product'
        }).show();
        return;
    });

    return res[0];
}

async function getProducts() {
    const db = getConnection();
    const query = await db.awaitQuery("SELECT * FROM products").catch(err => {
        new Notification({
            title: 'Electron | Mysql | Error',
            body: 'Error At Getting The Products'
        }).show();
        return;
    });

    return query;
}

async function deleteProduct(id) {
    const db = getConnection();
    const query = await db.awaitQuery('DELETE FROM products WHERE id = ?', parseFloat(id)).catch(err => {
        new Notification({
            title: 'Electron | Mysql | Error',
            body: 'Error At Deleting The Product'
        }).show();
        return;
    });
    new Notification({
        title: 'Electron | Mysql',
        body: `Product ${id} Deleted Successfully`
    }).show();
    return;
}   

async function updateProduct(id,product) {
    const db = getConnection();
    const query = await db.awaitQuery('UPDATE products SET ? WHERE id = ?', [product,id]).catch(err => {
        new Notification({
            title: 'Electron | Mysql | Error',
            body: 'Error At Updating The Product'
        }).show();
        return;
    });
    new Notification({
        title: 'Electron | Mysql',
        body: `Product Updated Successfully`
    }).show();
    return;
}

function createWindow() {
    const w = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        },
    });

    w.loadFile('src/ui/index.html')
}

module.exports = {
    createWindow,
    createProduct,
    getProducts,
    deleteProduct,
    getProduct,
    updateProduct
}