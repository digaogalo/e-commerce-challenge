const openShopping = document.querySelector(".shopping");
const closeShopping = document.querySelector(".closeShopping");
const list = document.querySelector(".list");
const listCard = document.querySelector(".listCard");
const total = document.querySelector(".total");
const body = document.querySelector("body");
const quantity = document.querySelector(".quantity");

openShopping.addEventListener("click", () => {
    body.classList.add("active")
})

closeShopping.addEventListener("click", () => {
    body.classList.remove("active")
})

let products = [
   {
    id: 1,
    name: "NIKE",
    images: "1.PNG",
    price: 249.99
   } ,

   {
    id: 2,
    name: "MIZUNO",
    images: "2.PNG",
    price: 308.99
   } ,

   {
    id:3,
    name: "ASICS",
    images: "3.PNG",
    price: 359.99
   } ,

   {
    id: 4,
    name: "NIKE RENEW",
    images: "4.PNG",
    price: 369.99
   } ,

   {
    id: 5,
    name: "ADIDAS OLD SCHOOL",
    images: "5.PNG",
    price: 279.99
   } ,

   {
    id: 6,
    name: "ADIDAS RUNNER",
    images: "6.PNG",
    price: 259.99
   } ,
]

let listCards = [];

const initApp = () => {
    products.forEach((value, key) => {
        let newDiv = document.createElement("div");
        newDiv.classList.add("item");
        newDiv.innerHTML = `
            <img src ="img/${value.images}">
            <div class ="title">${value.name}</div>
            <div class ="price">R$${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">ADICIONAR AO CARRINHO</button>
        `

        list.appendChild(newDiv)
    })
}

initApp()

const addToCard = (key) => {
    if(listCards[key] == null){
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1
    }

    reloadCard();
}

const discountPercent = 5;
const ipiPercent = 10;

const calculateSubtotal = (product) => {
    const subtotal = product.price * product.quantity;
    const discount = (subtotal * discountPercent) / 100;
    const ipi = (subtotal * ipiPercent) / 100;
    return subtotal - discount + ipi;
};

const calculateTotal = () => {
    let totalProducts = 0;
    let totalTaxes = 0;

    for (const key in listCards) {
        if (listCards.hasOwnProperty(key)) {
            const product = listCards[key];
            const subtotal = calculateSubtotal(product);
            totalProducts += subtotal;
            totalTaxes += (subtotal - (product.price * product.quantity));
        }
    }

    return {
        totalProducts,
        totalTaxes,
        totalOrder: totalProducts + totalTaxes,
    };
};

const reloadCard = () => {
    listCard.innerHTML = "";
    let totalPrice = 0;
    let totalQuantity = 0;

    for (const key in listCards) {
        if (listCards.hasOwnProperty(key)) {
            const value = listCards[key];
            const subtotal = calculateSubtotal(value);

            let newDiv = document.createElement("li");
            newDiv.innerHTML = `
                <div><img src="img/${value.images}"></div>
                <div class="cardTitle">${value.name}</div>
                <div class="cardPrice">R$${subtotal.toLocaleString()}</div>

                <div>
                    <button style="background-color: #560bad"   
                    class="cardButton" onclick="changeQuantity(${key},  
                    ${value.quantity - 1})">-</button>  

                    <div class="count">${value.quantity}</div>

                    <button style="background-color: #560bad"   
                    class="cardButton" onclick="changeQuantity(${key},  
                    ${value.quantity + 1})">+</button>
                </div>
            `;

            listCard.appendChild(newDiv);

            totalPrice += subtotal;
            totalQuantity += value.quantity;
        }
    }

    const { totalProducts, totalTaxes, totalOrder } = calculateTotal();

    total.innerText = totalProducts.toLocaleString();
    quantity.innerText = totalQuantity;
    taxes.innerText = totalTaxes.toLocaleString();
    orderTotal.innerText = totalOrder.toLocaleString();
};

const changeQuantity = (key, quantity) => {
    if (quantity == 0) {
        const confirmation = confirm("Tem certeza de que deseja excluir este produto?");
        
        if (confirmation) {
            delete listCards[key];
        }
    } else {
        listCards[key].quantity = quantity;
    }

    reloadCard();
}


