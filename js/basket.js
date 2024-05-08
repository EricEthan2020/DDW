/* data adding when click add to cart btn */
function addToCart(productName,imageUrl,price){
    const cart = JSON.parse(localStorage.getItem("cart"))||[];
    cart.push({productName,imageUrl,price});

    localStorage.setItem("cart",JSON.stringify(cart));
    alert("Item is added.");
}

/* style for showing cart items in basket.html */
const cart = [];
let total = 0;

function displayCart(){
    const cartItems = JSON.parse(localStorage.getItem("cart"))||[];
    const cartContainer = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total");

    let total = 0;

    cartContainer.innerHTML = "";/* default cart container */

    const groupItems = {};

    cartItems.forEach(item=>{
        if(!groupItems[item.productName]){
            groupItems[item.productName] = {
                quantity : 0,
                price : 0
            };
        }


            groupItems[item.productName].quantity +=1;
            groupItems[item.productName].price += item.price;

    });

    for(const productName in groupItems){
        const item = groupItems[productName];

        const cartItem = document.createElement("div");

        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `<img src="${cartItems.find(item=>item.productName===productName).imageUrl}" alt="${productName}Image"><div class="cart-item-details"><p class="cart-item-name">${productName}(Qty:${item.quantity} )</p><p class="cart-item-price">$ ${item.price.toFixed(2)}</p></div>`;

        cartContainer.appendChild(cartItem);
        total += item.price;/* calculate total price */
    }

    totalPrice.textContent = `$ ${total.toFixed(2)}`;/* show total price */
}

function clearCart(){
    localStorage.removeItem("cart");
    displayCart();
}
displayCart();