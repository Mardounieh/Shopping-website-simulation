// import { limitText } from "./limitText.js";

//? HTML Elements
const search = document.getElementById('searchInput');
const menuButton = document.getElementById('menuBtn');
const closeMenuButton = document.getElementById('closeMenuBtn');
const menu = document.getElementById('menu');
const login = document.getElementById('login');
const cart = document.getElementById('cart');
const loginSection = document.getElementById('loginSection');
const productCartContainer = document.getElementById('productCartContainer');
const main = document.getElementById('main');
const catItems = document.querySelectorAll('#menu li')

menuButton.addEventListener('click', () => {
    menu.classList.toggle('-left-96')
    menu.classList.toggle('left-0')
})
closeMenuButton.addEventListener('click', () => {
    menu.classList.toggle('-left-96');
    menu.classList.toggle('left-0')
})

//* Filter Product Section
const filterProducts = async (event) => {
    let targetCat = event.target.nodeName === "IMG" ? event.target.alt : event.target.innerText;
    const result = await fetch('./assets/products/products.json')
    const data = await result.json();
    const productResults = data.filter((product) => product.category === targetCat.toLowerCase());
    createProduct(productResults);
}
catItems.forEach(catItem => catItem.addEventListener('click', filterProducts));
//* Filter Product Section

//? Search
const searchProducts = async () => {
    if(search.value.length === 1) return;
    const result = await fetch('./assets/products/products.json')
    const data = await result.json();
    const productResults = data.filter(product => {
        return product.title.toLowerCase().includes(search.value.toLowerCase());
    })
    createProduct(productResults);
}
search.addEventListener('input', searchProducts)
//? Search

const createProduct = (data) => {
    if(data.length === 0) {
        main.innerHTML = `
            <h2 class="absolute top-24 text-2xl font-bold text-red-600">Not Found</h2>
        `
    }
    main.innerHTML = '';
    data.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('rounded', 'shadow-lg','w-2/3','flex','flex-col','gap-2');
        productDiv.innerHTML = `
        <div class="">
            <img src="${product.image}" alt="" class="w-full">
        </div>
        <div class="flex justify-between gap-2 px-2 font-bold">
            <p title="${product.title}" class="font-bold">${product.title}</p>
            <p class="rounded-md shadow p-1">${product.price}<span class="text-emerald-500">$</span></p>
        </div>
        <div class="flex justify-around p-2 text-xl">
            <button class="fal fa-cart-circle-plus duration-100 hover:scale-125 active:scale-100"></button>
            <button class="fal fa-circle-ellipsis duration-100 hover:scale-125 active:scale-100"></button>
            <button class="fal fa-heart duration-100 hover:scale-125 active:scale-100"></button>
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

//! login and cart section
login.addEventListener('click', () => {
    loginSection.classList.toggle('hidden');
})
cart.addEventListener('click', () => {
    productCartContainer.classList.toggle('hidden')
})
productCartContainer.style.left = cart.offsetLeft/1.3 + 'px';
loginSection.style.left = login.offsetLeft/1.3 + 'px'
if(window.innerWidth <= 320) {
    loginSection.style.left = login.offsetLeft/2 + 'px';
    productCartContainer.style.left = cart.offsetLeft/2 + 'px';
}
else if(window.innerWidth > 320 && window.innerWidth <= 640) {
    loginSection.style.left = login.offsetLeft/1.4 + 'px';
    productCartContainer.style.left = cart.offsetLeft/1.4 + 'px';
}
//! login and cart section