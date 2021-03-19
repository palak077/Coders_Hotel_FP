
	


(function() {
  // VARS
  const productsContainer = document.querySelector(".grid");
  const cartContainer = document.querySelector("#shopping-cart");
  const crossbtnw = document.querySelector(".close-btnw");
  const crossbtnc = document.querySelector(".close-btnc");
  const wishContainer = document.querySelector("#shopping-wishlist");
  const cartContent = document.querySelector("#cart-content");
  const wishContent = document.querySelector("#wish-content");
  const toggleCartBtn = document.querySelector("#toggle-cart-btn");
  const toggleWishBtn = document.querySelector("#toggle-wish-btn");
  const clearCartBtn = document.querySelector("#clear-cart");
  const clearWishBtn = document.querySelector("#clear-service");
  const checkoutBtn = document.querySelector("#checkout-btn");
  const wishtocart = document.querySelector("#wishtocart");
  const totalPriceContainer = document.querySelector("#total-price");

  // FUNCTIONS

  function toggleCart() {
    // toggle shopping cart visibility
    cartContainer.classList.toggle("open");
  }
function toggleWish() {
    // toggle shopping cart visibility
    wishContainer.classList.toggle("open");
  }
  function getLSContent() {
    // get contents from local storage.
    // if nothing is there, create an empty array
    const lsContent = JSON.parse(localStorage.getItem("products")) || [];
    return lsContent;
  }

  function setLSContent(lsContent) {
    // save content inside local storage
    localStorage.setItem("products", JSON.stringify(lsContent));
  }

  function calculateTotal(prices) {
    // calculate the total price in the cart
    return prices.reduce(function(prev, next) {
      return prev + next;
    }, 0);
  }

  function getCartItemPrices() {
    // extract the price numbers from the cart items to calculate total
    const prices = [];
    // retrieve the td element in the cart where the product price is stored
    // for each product in the cart
    let nums = cartContent.querySelectorAll("tr td:nth-child(3)");

    // iterate over each td node and extract the price
    // strip the $ sign from the text, turn the string into
    // a number and push the number into the prices array
    if (nums.length > 0) {
      for (let cell = 0; cell < nums.length; cell++) {
        let num = nums[cell].innerText;
        num = num.replace(/[^\d]/g, "");
        num = parseFloat(num);
        prices.push(num);
      }
      // return the prices array
      return prices;
    } else {
      return;
    }
  }

  function displayCartTotal() {
    // display the total cost in the cart
    const prices = getCartItemPrices();
    let total = 0;
    if (prices) {
      total = calculateTotal(prices);
      totalPriceContainer.innerHTML = `<span class="total">Total: $${total.toFixed(
        2
      )}</span>`;
    } else {
      totalPriceContainer.innerHTML = '<span class="total">Total: $0</span>';
    }
  }

  function displayProducts() {
    // display all products in the cart

    // get contents from local storage
    const lsContent = getLSContent();
    let productMarkup = "";
    // if local storage is not empty, build the
    // cart items markup and the appropriate details
    if (lsContent !== null) {
      for (let product of lsContent) {
        productMarkup += `
          <tr>
          <td><img class="cart-image" src="${product.image}" alt="${
          product.name
        }" width="120"></td>
          <td>
            ${product.name}
          </td>
          <td>${product.price}</td>
          <td><a href="#" data-id="${product.id}" class="remove">X</a></td>
          </tr>
        `;
      }
    } else {
      // if no content is in local storage, alert user
      productMarkup = "Your cart is empty.";
    }
    // add markup to DOM
    cartContent.querySelector("tbody").innerHTML = productMarkup;
  }

  function saveProduct(clickedBtn) {
    // save selected product in local storage and display it in the cart together

    // vars
    const productId = clickedBtn.getAttribute("data-id");
    //const card = clickedBtn.parentElement.parentElement;
    const cardInfo = clickedBtn.parentElement;
    const prodImage = cardInfo.querySelector("img").src;
    const prodName = cardInfo.querySelector("h3").textContent;
    const prodPrice = cardInfo.querySelector(".card__price").textContent;

    let isProductInCart = false;

    // get local storage array
    const lsContent = getLSContent();

    // to avoid user adds the same course twice, check
    // the product is not in LS already before adding it
    lsContent.forEach(function(product) {
      if (product.id === productId) {
        alert("This service is already in your cart.");
        isProductInCart = true;
      }
    });

    // only if the product is not already in the cart,
    // create an object representing selected product info
    // and push it into local storage array
    if (!isProductInCart) {
      lsContent.push({
        id: productId,
        image: prodImage,
        name: prodName,
        price: prodPrice
      });

      // add product into into local storage
      setLSContent(lsContent);
      // update the display of courses in the shopping cart
      displayProducts();
    }
  }

  function removeProduct(productId) {
    // remove product from cart (and from local storage)

    // retrieve list of products from LS
    const lsContent = getLSContent();

    // get the index of the product item to remove
    // inside the local storage content array
    let productIndex;
    lsContent.forEach(function(product, i) {
      if (product.id === productId) {
        productIndex = i;
      }
    });

    // modify the items in local storage array
    // to remove the selected product item

    lsContent.splice(productIndex, 1);
    // update local storage content
    setLSContent(lsContent);

    displayProducts();
  }
  
  function removewProduct(productId) {
    // remove product from cart (and from local storage)

    // retrieve list of products from LS
    const lswContent = getLSwContent();

    // get the index of the product item to remove
    // inside the local storage content array
    let productIndex;
    lswContent.forEach(function(product, i) {
      if (product.id === productId) {
        productIndex = i;
      }
    });

    // modify the items in local storage array
    // to remove the selected product item

    lswContent.splice(productIndex, 1);
    // update local storage content
    setLSwContent(lswContent);

    displaywishProducts();
  }
  

  function clearCart() {
    // clear all products from cart (and local storage)

    // retrieve list of products from LS
    const lsContent = getLSContent();
    // empty array in local storage
    lsContent.splice(0, lsContent.length);
    // update local storage
    setLSContent(lsContent);
    // display cart content again
    displayProducts();
  }
   function clearWish() {
    // clear all products from cart (and local storage)

    // retrieve list of products from LS
    const lswContent = getLSwContent();
    // empty array in local storage
    lswContent.splice(0, lswContent.length);
    // update local storage
    setLSwContent(lswContent);
    // display cart content again
    displaywishProducts();
  }

  function checkout() {
    // checkout: just clear the cart
    // after user confirms the checkout process
    const cartProducts = cartContent.querySelector("tbody").innerHTML;
    if (cartProducts !== "" && confirm("Are you sure you want to checkout?")) {
      clearCart();
	  cartContainer.classList.remove("open");
    } else {
      return;
    }
  }
  function wishtocartf() {
    // checkout: just clear the cart
    // after user confirms the checkout process
    const wishProducts = wishContent.querySelector("tbody").innerHTML;
    const cartProducts = wishProducts;
    if (wishProducts !== "" && confirm("Are you sure you want to move to cart?")) {
		cartContent.querySelector("tbody").innerHTML+=cartProducts;
      clearWish();
	  wishContainer.classList.remove("open");
	  
    } else {
      return;
    }
  }
  
  

  // BIND EVENTS AND CALL FUNCTIONS

  // Page load:
  document.addEventListener("DOMContentLoaded", function(e) {
    // display list of products in cart, if any, on page load
    displayProducts();
    displaywishProducts();
    // display cart total
    displayCartTotal();
  });

  // open and close shopping cart
  // when cart button is clicked
  toggleCartBtn.addEventListener("click", function(e) {
    e.preventDefault();
    toggleCart();
	wishContainer.classList.remove("open");
  });


	toggleWishBtn.addEventListener("click", function(e) {
    e.preventDefault();
    toggleWish();
	cartContainer.classList.remove("open");
  });
  
  crossbtnw.addEventListener("click", function(e) {
	  
    e.preventDefault();
    
	
	wishContainer.classList.remove("open");
	
  });
  crossbtnc.addEventListener("click", function(e) {
	  
    e.preventDefault();
    
	cartContainer.classList.remove("open");
	
	
  });

  // Save product in cart and Local Storage
  // when add to cart button is clicked
  productsContainer.addEventListener("click", function(e) {
    if (e.target.classList.contains("add-to-cart")) {
      e.preventDefault();
      const clickedBtn = e.target;
      saveProduct(clickedBtn);
    }
  });

  productsContainer.addEventListener("click", function(e) {
    if (e.target.classList.contains("add-to-cart")) {
      displayCartTotal();
    }
  });

  // bind removeProduct to click event of the cartContent table
  cartContent.querySelector("tbody").addEventListener("click", function(e) {
    e.preventDefault();
    // identify the button that was clicked
    const clickedBtn = e.target;
    // if it's a remove button
    if (e.target.classList.contains("remove")) {
      // get the value of the data-id property, which contains the
      // id of the selected product
      const productId = clickedBtn.getAttribute("data-id");
      // use the id to remove the selected product
      removeProduct(productId);
      // display products in the cart again,
      // now the list should be displayed with 1 less product
      // or empty if no products are left in the cart

      // adjust the total
      displayCartTotal();
    }
  });

  // bind the button to clear the cart both to the function that
  // clears the cart and to the function that adjusts the total price
  clearCartBtn.addEventListener("click", function(e) {
    e.preventDefault();
    clearCart();
  });
  clearCartBtn.addEventListener("click", displayCartTotal);

  // bind the button that does the checkout both to the function that
  // controls the checkout and and to the function that adjusts the total price
  checkoutBtn.addEventListener("click", function(e) {
    e.preventDefault();
    checkout();
  });
  wishtocart.addEventListener("click", function(e) {
    e.preventDefault();
    wishtocartf();
  });
  checkoutBtn.addEventListener("click", displayCartTotal);
  
  
  // wishlist code ******************************************************************************************************************************************************************************************************************************************************************************************************************************************
  
  function getLSwContent() {
    // get contents from local storage.
    // if nothing is there, create an empty array
    const lswContent = JSON.parse(localStorage.getItem("wproducts")) || [];
    return lswContent;
  }

  function setLSwContent(lswContent) {
    // save content inside local storage
    localStorage.setItem("wproducts", JSON.stringify(lswContent));
  }
  
function wishProduct(wishbutton) {
    // save selected product in local storage and display it in the cart together

    // vars
    const productId = wishbutton.getAttribute("data-id");
    
    const cardInfo = wishbutton.parentElement;
    const prodImage = cardInfo.querySelector("img").src;
    const prodName = cardInfo.querySelector("h3").textContent;
    const prodPrice = cardInfo.querySelector(".card__price").textContent;

    let isProductInCart = false;

    // get local storage array
    const lswContent = getLSwContent();

    // to avoid user adds the same course twice, check
    // the product is not in LS already before adding it
    lswContent.forEach(function(product) {
      if (product.id === productId) {
        alert("This service is already in your wishlist.");
        isProductInCart = true;
      }
    });

    // only if the product is not already in the cart,
    // create an object representing selected product info
    // and push it into local storage array
    if (!isProductInCart) {
      lswContent.push({
        id: productId,
        image: prodImage,
        name: prodName,
        price: prodPrice
      });

      // add product into into local storage
      setLSwContent(lswContent);
      // update the display of courses in the shopping cart
      displaywishProducts();
    }
  }
  
  
  productsContainer.addEventListener("click", function(e) {
    if (e.target.classList.contains("add-to-wish")) {
      e.preventDefault();
	  
      const wishbutton = e.target;
      wishProduct(wishbutton);
    }
  });


wishContent.querySelector("tbody").addEventListener("click", function(e) {
    e.preventDefault();
    // identify the button that was clicked
    const wishbutton = e.target;
    // if it's a remove button
    if (e.target.classList.contains("remove")) {
      // get the value of the data-id property, which contains the
      // id of the selected product
      const productId = wishbutton.getAttribute("data-id");
      // use the id to remove the selected product
      removewProduct(productId);
      // display products in the cart again,
      // now the list should be displayed with 1 less product
      // or empty if no products are left in the cart

      // adjust the total
      
    }
  });
  
  // bind the button to clear the cart both to the function that
  // clears the cart and to the function that adjusts the total price
  clearWishBtn.addEventListener("click", function(e) {
    e.preventDefault();
    clearWish();
  });
  //clearCartBtn.addEventListener("click", displayCartTotal);
  
  function displaywishProducts() {
    // display all products in the cart

    // get contents from local storage
    const lswContent = getLSwContent();
    let productMarkup = "";
    // if local storage is not empty, build the
    // cart items markup and the appropriate details
    if (lswContent !== null) {
      for (let product of lswContent) {
        productMarkup += `
          <tr>
          <td><img class="cart-image" src="${product.image}" alt="${
          product.name
        }" width="120"></td>
          <td>
            ${product.name}
          </td>
          <td>${product.price}</td>
          <td><a href="#" data-id="${product.id}" class="remove">X</a></td>
          </tr>
        `;
      }
    } else {
      // if no content is in local storage, alert user
      productMarkup = "Your cart is empty.";
    }
    // add markup to DOM
    wishContent.querySelector("tbody").innerHTML = productMarkup;
  }
  
  
  
  
})();




