const menuButton = document.getElementById('menuBtn');
const closeMenuButton = document.getElementById('closeMenuBtn');
const menu = document.getElementById('menu');
const login = document.getElementById('login');
const cart = document.getElementById('cart');
const loginSection = document.getElementById('loginSection');
const productCartContainer = document.getElementById('productCartContainer');
const main = document.getElementById('main')

const createProduct = (data) => {
    data.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('rounded', 'shadow-md','w-2/3');
        productDiv.innerHTML = `
        <div class="">
            <img src="${product.image}" alt="" class="w-full">
        </div>
        <div>
            <p title="${product.title}">${product.title}</p>
            <p>${product.price}$</p>
        </div>
        <div class="flex justify-between p-2">
            <button class="fal fa-cart-circle-plus"></button>
            <button class="fal fa-circle-ellipsis"></button>
            <button class="fal fa-heart"></button>
        </div>
        `
        main.appendChild(productDiv)
    });
}
const getProducts = async () => {
    const result = await fetch('./assets/products/products.json')
    const data = await result.json();
    createProduct(data)
}
document.addEventListener('DOMContentLoaded', getProducts)

login.addEventListener('click', () => {
    loginSection.classList.toggle('hidden');
})
loginSection.style.left = login.offsetLeft/1.3 + 'px'
cart.addEventListener('click', () => {
    productCartContainer.classList.toggle('hidden')
})
productCartContainer.style.left = cart.offsetLeft/1.3 + 'px';
menuButton.addEventListener('click', () => {
    menu.classList.toggle('-left-96')
    menu.classList.toggle('left-0')
})
closeMenuButton.addEventListener('click', () => {
    menu.classList.toggle('-left-96');
    menu.classList.toggle('left-0')
})