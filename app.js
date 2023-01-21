// window.addEventListener("load", () => {});

const shipping = 10;
const items = document.querySelectorAll(".item");
const subtotalElement = document.querySelector("#subtotal span");
const taxElement = document.querySelector("#tax span");
const shippingElement = document.querySelector("#shipping span");
shippingElement.innerText = shipping;
const totalElement = document.querySelector("#total span");
items.forEach((item) => {
  const plusButton = item.querySelector(".plus");
  plusButton.addEventListener("click", increment);

  const minusButton = item.querySelector(".minus");
  minusButton.addEventListener("click", decrement);

  let count = 1;

  function increment() {
    count++;
    updateCount(item);
    updateTotalPrice(item);
    updateSubtotal();
    updateTax();
    totalPrice();
  }

  function decrement() {
    if (count > 1) {
      count--;
      updateCount(item);
      updateTotalPrice(item);
      updateSubtotal();
      updateTax();
      totalPrice();
    }
  }

  function updateCount(item) {
    const countElement = item.querySelector(".amount");
    countElement.innerText = count;
  }
  function updateTotalPrice(item) {
    const price = parseFloat(item.querySelector(".price").innerHTML);
    const totalPriceElement = item.querySelector(".total-price");
    totalPriceElement.innerText = price * count;
  }
  function updateSubtotal() {
    subtotal = 0;
    items.forEach((item) => {
      const price = parseFloat(item.querySelector(".total-price").innerHTML);
      subtotal += price;
    });
    subtotalElement.innerText = "$" + subtotal;
  }
  function updateTax() {
    taxtotal = 0;
    items.forEach((item) => {
      const tax = parseFloat(item.querySelector(".total-price").innerHTML);
      taxtotal += tax * 0.18;
    });
    taxElement.innerText = "$" + taxtotal;
  }
  function totalPrice() {
    total = 0;

    items.forEach((item) => {
      const price = parseFloat(item.querySelector(".total-price").innerHTML);
      total += price;
    });

    total += shipping + taxtotal;

    totalElement.innerText = "$" + total;
  }

  const removeButtons = item.querySelectorAll(".btn-remove");
  removeButtons.forEach((removeButton) => {
    removeButton.addEventListener("click", removeItem);
  });
  function removeItem(event) {
    const item = event.target.closest(".item");
    const price = parseFloat(item.querySelector(".total-price").innerHTML);
    subtotal -= price;
    subtotalElement.innerText = "$" + subtotal;
    taxtotal -= price * 0.18;
    taxElement.innerText = "$" + taxtotal;
    total = subtotal + shipping + taxtotal;
    totalElement.innerText = "$" + total;
    item.remove();
  }
});
