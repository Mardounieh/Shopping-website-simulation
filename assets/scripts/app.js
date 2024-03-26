const limitText = (data,limit) => {
    data = data.split(' ');
    if(data.length >= limit) {
        data.length = limit;
        data.push('...');
    }
    return data.join(' ')
}
//? HTML Elements
const search = document.getElementById('searchInput');
const menuButton = document.getElementById('menuBtn');
const closeMenuButton = document.getElementById('closeMenuBtn');
const menu = document.getElementById('menu');
const login = document.getElementById('login');
const cart = document.getElementById('cart');
const loginSection = document.getElementById('loginSection');
const loginButton = document.getElementById('loginButton');
const productCartContainer = document.getElementById('productCartContainer');
const main = document.getElementById('main');
const cartCounter = document.getElementById('cartCounter');
const catItems = document.querySelectorAll('#menu li');
const cartMain = document.getElementById('cartMain');

menuButton.addEventListener('click', () => {
    menu.classList.toggle('-left-96')
    menu.classList.toggle('left-0')
})
closeMenuButton.addEventListener('click', () => {
    menu.classList.toggle('-left-96');
    menu.classList.toggle('left-0')
})
//! login and cart section
const loginFunction = async () => {
    loginButton.value = `Logging in...`;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const request = await fetch('https://fakestoreapi.com/auth/login',{
        method:'POST',
        body: JSON.stringify({username, password}),
        headers : {"Content-Type" : "Application/json"}
    })
    if(request.ok) {
        loginButton.value = `Logged in`;
    } else {
        loginButton.value = `False info`;
        setTimeout(() => {
            loginButton.value = `Login`;
        }, 1000);
    }
}
loginButton.addEventListener('click', loginFunction)
login.addEventListener('click', () => {
    if(productCartContainer.classList.contains('hidden')) {
        loginSection.classList.toggle('hidden');
        main.classList.toggle('brightness-50');
        main.classList.toggle('blur-sm');
    } else {
        productCartContainer.classList.toggle('hidden');
        loginSection.classList.toggle('hidden');
    }
})
cart.addEventListener('click', () => {
    if(loginSection.classList.contains('hidden')) {
        productCartContainer.classList.toggle('hidden');
        main.classList.toggle('brightness-50');
        main.classList.toggle('blur-sm');
    } else {
        loginSection.classList.toggle('hidden');
        productCartContainer.classList.toggle('hidden');
    }
})
//! login and cart section

const addToCart = async (event) => {
    const result = await fetch('./assets/products/products.json')
    const data = await result.json();
    cartCounter.innerHTML++;
    const addToCartButton = event.target;
    addToCartButton.disabled = true;
    if(addToCartButton.classList[1] == 'fal') {
        addToCartButton.classList.replace('fal','fas');
        addToCartButton.classList.replace('fa-cart-circle-plus','fa-cart-circle-check');
    } else {
        addToCartButton.classList.replace('fas','fal');
        addToCartButton.classList.replace('fa-cart-circle-check','fa-cart-circle-plus');
    }
    const productId = event.target.parentNode.parentNode.getAttribute('data-id');
    const targetedProduct = data[+productId];
    const productCartDiv = document.createElement('div');
    productCartDiv.classList.add('bg-stone-100','flex','items-center','justify-between','border','border-emerald-500','p-2','rounded','w-full');
    productCartDiv.innerHTML = `
        <div class="flex items-center gap-2">
            <div class="w-1/6">
                <img src="${targetedProduct.image}" alt="${targetedProduct.title}" class="w-full rounded">
            </div>
            <div class="flex flex-col self-start">
                <div class="flex gap-2">
                    <p>${limitText(targetedProduct.title,3)}</p>
                    <p>${targetedProduct.price}<span class="text-emerald-700">$</span></p>    
                </div>
                <p class="hidden sm:flex" title="${targetedProduct.description}">${limitText(targetedProduct.description,5)}</p>
            </div>
        </div>
        <div class="flex items-center gap-4">
            <div class="flex flex-col items-center">
            <i class="fas fa-chevron-up cursor-pointer"></i>
            <span>0</span>
            <i class="fas fa-chevron-down cursor-pointer"></i>
            </div>
            <i class="fas fa-trash-can cursor-pointer duration-200 hover:text-rose-600"></i>
        </div>
    `
    cartMain.appendChild(productCartDiv);
}
const addToFavorite = (event) => {
    if(event.target.classList[1] == 'fal'){
        event.target.classList.replace('fal','fas');
        event.target.classList.add('text-rose-500')
    } else if(event.target.classList[1] == 'fas') {
        event.target.classList.replace('fas','fal')
        event.target.classList.remove('text-rose-500')
    }
}
const showDescription = (event) => {
    const description = event.target.parentElement.parentElement.children[2];
    const productContainer = event.target.parentElement.parentElement;
    if(event.target.classList[1] === 'fal') {
        event.target.classList.replace('fal','fas')
        description.classList.replace('hidden','block')
    } else if(event.target.classList[1] === 'fas') {
        event.target.classList.replace('fas','fal')
        description.classList.replace('block','hidden')
    }
}
const productButtons = (event) => {
    switch(event.target.classList[0]){
        case "add-to-cart" :
            addToCart(event);
            break;
        case "description" :
            showDescription(event)
            break;
        case "add-to-favorite" :
            addToFavorite(event);
            break;
        default:
            break;
    }
}
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
        <div class="overflow-hidden">
            <img src="${product.image}" alt="${product.title}" class="w-full duration-200 hover:scale-110">
        </div>
        <div class="flex justify-between gap-2 px-2 font-bold items-center">
            <p title="${product.title}" class="font-bold">${limitText(product.title,3)}</p>
            <p class="rounded-md shadow p-1">${product.price}<span class="text-emerald-500">$</span></p>
        </div>
            <p class="px-4 hidden">${product.description}</p>
        <div class="flex justify-around p-2 text-xl border-t border-emerald-500/35">
            <button class="add-to-cart fal fa-cart-circle-plus duration-100 hover:scale-125 active:scale-100"></button>
            <button class="description fal fa-circle-ellipsis duration-100 hover:scale-125 active:scale-100"></button>
            <button class="add-to-favorite fal fa-heart duration-100 hover:scale-125 active:scale-100"></button>
        </div>
        `
        productDiv.dataset.id = product.id;
        productDiv.addEventListener('click', productButtons)
        main.appendChild(productDiv)
    });
}

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

//? Search section
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
//? Search section

const getProducts = async () => {
    const result = await fetch('./assets/products/products.json')
    const data = await result.json();
    createProduct(data)
}
document.addEventListener('DOMContentLoaded', getProducts)