const taxRate = 0.18;
const shippingPrice = 15;
const shippingFreePrice = 300;

window.addEventListener("load", () => {
  localStorage.setItem("taxRate", taxRate);
  localStorage.setItem("shippingPrice", shippingPrice);
  localStorage.setItem("shippingFreePrice", shippingFreePrice);

  //show chart totals on window load!
  calculateCartPrice();
});

const itemsDiv = document.querySelector(".items");
itemsDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-minus")) {
    // alert("dlkglk");
    if (e.target.parentElement.querySelector(".amount").innerText > 1) {
      e.target.parentElement.querySelector(".amount").innerText--;
      calculateProductPrice(e.target);
    } else {
      if (
        confirm(
          `${
            e.target.closest(".item-details").querySelector("h3").innerText
          } will be removed!`
        )
      ) {
        e.target.closest(".item").remove();
      }
    }
    calculateCartPrice();
  } else if (e.target.classList.contains("fa-plus")) {
    e.target.parentElement.querySelector(".amount").innerText++;
    calculateProductPrice(e.target);
    calculateCartPrice();
  } else if (e.target.getAttribute("class") == "btn-remove") {
    if (
      confirm(
        `${
          e.target.closest(".item-details").querySelector("h3").innerText
        } will be removed!`
      )
    ) {
      e.target.closest(".item").remove();
    }
    calculateCartPrice();
  } else {
    // alert("other element clicked");
  }
});

const calculateProductPrice = (target) => {
  //each product total calculation
  //productTotalPrice => quantity * price
  const productInfoDiv = target.closest(".item-details");

  //unit price
  const price = productInfoDiv.querySelector(".price").innerText;
  //quantity
  const quantity = productInfoDiv.querySelector(".amount").innerText;
  productInfoDiv.querySelector(".total-price").innerText = (
    price * quantity
  ).toFixed(2);
};

const calculateCartPrice = () => {
  const productLinePriceDivs = document.querySelectorAll(".total-price");

  let subtotal = 0;

  productLinePriceDivs.forEach((div) => {
    subtotal += parseFloat(div.innerText);
  });

  const taxPrice = subtotal * localStorage.getItem("taxRate");

  const shippingPrice = parseFloat(
    subtotal > 0 && subtotal < localStorage.getItem("shippingFreePrice")
      ? localStorage.getItem("shippingPrice")
      : 0
  );

  const totalPrice = subtotal + taxPrice + shippingPrice;

  document.getElementById("subtotal").innerText = subtotal.toFixed(2);
  document.getElementById("tax").innerText = taxPrice.toFixed(2);
  document.getElementById("shipping").innerText = shippingPrice.toFixed(2);
  document.getElementById("total").innerText = totalPrice.toFixed(2);
};
//div.class vs. .class as performance
