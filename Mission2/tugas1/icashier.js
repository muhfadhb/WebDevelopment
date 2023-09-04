// Function to update quantity
function updateQuantity(index, change) {
  const currentQuantity = parseInt(quantityInputs[index].textContent);
  const newQuantity = currentQuantity + change;

  if (newQuantity >= 0) {
    quantityInputs[index].textContent = newQuantity;
    calculateTotalPrice();
  }
}

// Function to add an item to the cart
function addToCart(index) {
  const itemName = document.querySelectorAll('.catalog-name')[index].textContent;
  const itemPrice = document.querySelectorAll('.catalog-price')[index].textContent;
  const itemQuantity = parseInt(quantityInputs[index].textContent);

  if (itemQuantity > 0) {
    const parsedPrice = parseFloat(itemPrice.replace('$', ''));
    const totalItemPrice = parsedPrice * itemQuantity;
    const itemImageSrc = document.querySelectorAll('.product-box img')[index].src;

    // Create a new cart item element
    const cartItem = createCartItemElement(itemName, itemPrice, itemQuantity, itemImageSrc, totalItemPrice);

    // Append the cart item to the cart section
    const cartSection = document.querySelector('.cart');
    const cartItems = document.querySelectorAll('.cart-item');
    cartSection.insertBefore(cartItem, cartItems[0]);
    quantityInputs[index].textContent = '0';

    calculateTotalPrice();
  }
}

// Function to create a cart item element
function createCartItemElement(name, price, quantity, imageSrc, totalItemPrice) {
  const cartItem = document.createElement('div');
  cartItem.classList.add('cart-item');
  cartItem.innerHTML = `
      <p><strong>${name}</strong></p>
      <p>${price} x ${quantity} </p>
      <img src="${imageSrc}" alt="${name}" class="cart-item-image">
      <p><strong>$${totalItemPrice.toFixed(2)}</strong></p>
      <hr>
  `;
  return cartItem;
}

// Function to calculate the total price
function calculateTotalPrice() {
  const cartItems = document.querySelectorAll('.cart-item');
  let totalPrice = 0;
  let tax = 0;
  let totalPayment = 0;

  cartItems.forEach((item) => {
    const itemPriceString = item.querySelector('p:nth-child(2)').textContent;
    const itemQuantity = parseInt(item.querySelector('p:nth-child(2)').textContent.split('x')[1].trim());
    const itemPrice = parseFloat(itemPriceString.replace('$', ''));

    totalPrice += itemPrice * itemQuantity;
    tax = 0.11 * totalPrice;
    totalPayment = totalPrice + tax;
  });
  
  const totalElement = document.querySelector('.total-price');
  const taxElement = document.querySelector('.Tax');
  const totalPaymentElement = document.querySelector('.total-payment');

  totalElement.textContent = `Total Purchase: $${totalPrice.toFixed(2)}`;
  taxElement.textContent = `Tax 11%: $${tax.toFixed(2)}`;
  totalPaymentElement.textContent = `Total Payment: $${totalPayment.toFixed(2)}`;
}

// Add event listeners to buttons
const minusButtons = document.querySelectorAll('.btn-primary.text-center.minus');
const plusButtons = document.querySelectorAll('.btn-primary.text-center.plus');
const quantityInputs = document.querySelectorAll('.form-control.text-center');
const addToCartButtons = document.querySelectorAll('.btn-success');

minusButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    updateQuantity(index, -1);
  });
});

plusButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    updateQuantity(index, 1);
  });
});

addToCartButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    addToCart(index);
  });
});
