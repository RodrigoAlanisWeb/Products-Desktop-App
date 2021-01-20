const productForm = document.getElementById('product-form');

const remote = require('electron').remote;
const main = remote.require('./main');
const list = document.getElementById('products');
let products = [];

const productName = document.getElementById('name');
const productPrice = document.getElementById('price');
const productDesc = document.getElementById('description');

let editing = false;
let productId = '';

productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(productForm);
    const product = {
        name: formData.get('name'),
        price: parseFloat(formData.get('price')),
        description: formData.get('description'),
    }
    if (!editing) {
        let result = await main.createProduct(product);
        await getProducts();
    } else {
        await main.updateProduct(productId,product);
        editing = false;
        await getProducts();
    }
    productForm.reset();
    productForm.focus();
    
});

async function deleteProduct(id) {
    const res = confirm("Are You Sure You Want To Delete It?");
    if (res) {
        await main.deleteProduct(id);
        await getProducts();
    } else {
        return;
    }

    editing = true;
    
}

async function editProduct(id) {
    const product = await main.getProduct(id);
    productName.value = product.name;
    productPrice.value = product.price;
    productDesc.value = product.description;
    editing = true;
    productId = product.id;
}

function renderProducts(items) {
    list.innerHTML = '';
    items.forEach(item => {
        list.innerHTML += `
        <div class="card card-body my-2">
            <h4>${item.name}</h4>
            <p>${item.description}</p>
            <h3>$${item.price}</h3>
            <p>
                <button id="delete" class="btn btn-danger" onclick="deleteProduct(${item.id})">
                    DELETE
                </button>
                <button class="btn btn-secondary" onclick="editProduct(${item.id})">
                    EDIT
                </button>
            </p>
        </div>
        `
    });
}

const getProducts = async () => {
    products = await main.getProducts();
    renderProducts(products);
}


(function init(){
    getProducts();
})()