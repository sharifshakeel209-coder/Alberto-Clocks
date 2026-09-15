/* =====================================================
   HERO SLIDER
===================================================== */

const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".dot");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentSlide = 0;


function showSlide(index) {

    slides.forEach(function(slide) {
        slide.classList.remove("active");
    });

    dots.forEach(function(dot) {
        dot.classList.remove("active");
    });

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
}


function nextSlide() {
    showSlide(currentSlide + 1);
}


function previousSlide() {
    showSlide(currentSlide - 1);
}


nextBtn.addEventListener("click", nextSlide);

prevBtn.addEventListener("click", previousSlide);


dots.forEach(function(dot, index) {

    dot.addEventListener("click", function() {

        showSlide(index);

    });

});


/* Automatic slider */

setInterval(function() {

    nextSlide();

}, 5000);


/* =====================================================
   MOBILE MENU
===================================================== */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", function() {

    navLinks.classList.toggle("active");

});


document.querySelectorAll(".nav-links a").forEach(function(link) {

    link.addEventListener("click", function() {

        navLinks.classList.remove("active");

    });

});


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealSections = document.querySelectorAll(".reveal");


const observer = new IntersectionObserver(
    function(entries) {

        entries.forEach(function(entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },
    {
        threshold: 0.2
    }
);


revealSections.forEach(function(section) {

    observer.observe(section);

});


/* =====================================================
   SHOPPING CART
===================================================== */

let cart = JSON.parse(
    localStorage.getItem("timeoraCart")
) || [];


const addButtons =
    document.querySelectorAll(".add-to-cart");

const cartIcon =
    document.getElementById("cartIcon");

const cartPanel =
    document.getElementById("cartPanel");

const closeCart =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");

const checkoutBtn =
    document.getElementById("checkoutBtn");


/* =====================================================
   ADD TO CART
===================================================== */

addButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);


        const existingProduct = cart.find(function(item) {

            return item.name === name;

        });


        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({

                name: name,

                price: price,

                quantity: 1

            });

        }


        saveCart();

        displayCart();


        button.textContent = "Added ✓";

        button.classList.add("added");


        setTimeout(function() {

            button.textContent = "Add to Cart";

            button.classList.remove("added");

        }, 1000);

    });

});


/* =====================================================
   SAVE CART
===================================================== */

function saveCart() {

    localStorage.setItem(
        "timeoraCart",
        JSON.stringify(cart)
    );

}


/* =====================================================
   DISPLAY CART
===================================================== */

function displayCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';

        cartCount.textContent = "0";

        cartTotal.textContent = "$0.00";

        return;

    }


    let total = 0;
    let quantity = 0;


    cart.forEach(function(item, index) {

        total += item.price * item.quantity;

        quantity += item.quantity;


        const cartItem =
            document.createElement("div");


        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-info">

                <h3>${item.name}</h3>

                <p>
                    $${item.price.toFixed(2)}
                </p>


                <div class="quantity-controls">

                    <button
                        class="decrease"
                        data-index="${index}">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        class="increase"
                        data-index="${index}">
                        +
                    </button>

                </div>

            </div>


            <button
                class="remove-item"
                data-index="${index}">
                Remove
            </button>

        `;


        cartItems.appendChild(cartItem);

    });


    cartCount.textContent = quantity;

    cartTotal.textContent =
        "$" + total.toFixed(2);


    /* Increase quantity */

    document.querySelectorAll(".increase").forEach(function(button) {

        button.addEventListener("click", function() {

            const index =
                Number(button.dataset.index);

            cart[index].quantity++;

            saveCart();

            displayCart();

        });

    });


    /* Decrease quantity */

    document.querySelectorAll(".decrease").forEach(function(button) {

        button.addEventListener("click", function() {

            const index =
                Number(button.dataset.index);


            if (cart[index].quantity > 1) {

                cart[index].quantity--;

            } else {

                cart.splice(index, 1);

            }


            saveCart();

            displayCart();

        });

    });


    /* Remove */

    document.querySelectorAll(".remove-item").forEach(function(button) {

        button.addEventListener("click", function() {

            const index =
                Number(button.dataset.index);

            cart.splice(index, 1);

            saveCart();

            displayCart();

        });

    });

}


/* =====================================================
   OPEN CART
===================================================== */

cartIcon.addEventListener("click", function() {

    cartPanel.classList.add("active");

});


/* =====================================================
   CLOSE CART
===================================================== */

closeCart.addEventListener("click", function() {

    cartPanel.classList.remove("active");

});


/* =====================================================
   CHECKOUT
===================================================== */

checkoutBtn.addEventListener("click", function() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }


    alert(
        "Thank you for shopping with TIMEORA!\n\n" +
        "Checkout functionality can be connected to a payment system later."
    );

});


/* =====================================================
   VIEW BUTTON
===================================================== */

const viewButtons =
    document.querySelectorAll(".view-btn");


viewButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const name = button.dataset.name;

        const price = button.dataset.price;


        alert(
            "Product: " + name +
            "\nPrice: $" + price +
            "\n\nProduct details coming soon."
        );

    });

});


/* =====================================================
   SEARCH
===================================================== */

const searchInput =
    document.getElementById("searchInput");

const searchBtn =
    document.getElementById("searchBtn");


function searchProducts() {

    const searchText =
        searchInput.value.toLowerCase().trim();


    const products =
        document.querySelectorAll(".product-card");


    products.forEach(function(product) {

        const productText =
            product.textContent.toLowerCase();


        if (
            searchText === "" ||
            productText.includes(searchText)
        ) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });

}


searchBtn.addEventListener(
    "click",
    searchProducts
);


searchInput.addEventListener(
    "keyup",
    function(event) {

        if (event.key === "Enter") {

            searchProducts();

        }

    }
);


/* =====================================================
   INITIALIZE CART
===================================================== */

displayCart();

    const questions = document.querySelectorAll(".faq-question");

    questions.forEach(question => {
        question.addEventListener("click", () => {

            const answer = question.nextElementSibling;
            const icon = question.querySelector("span");

            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                icon.textContent = "+";
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
                icon.textContent = "−";
            }
        });
    });

    


  