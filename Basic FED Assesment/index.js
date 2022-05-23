//MODAL
var modal = document.getElementById("myModal");
var btn = document.getElementById("cart-btn");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
  modal.style.display = "block";
}
span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//CAROUSEL

const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.right-button');
const prevButton = document.querySelector('.left-button');
const dotsNav = document.querySelector('.carousel-nav');
const dot = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;


const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
}
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot, targetDot) =>{
currentDot.classList.remove('current-slide');
targetDot.classList.add('current-slide');

}


prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;

    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
})


nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
});


dotsNav.addEventListener ('click', e => {

const targetDot = e.target.closest('button');

if (!targetDot) return;
    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dot.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    
   updateDots(currentDot, targetDot);

})

//ITEM DISPLAY
fetch ("products.json")
.then(function(response){
    return response.json();

})

.then(function(products){

    let placeholder = document.querySelector("#content");

    let out="";

    for (let product of products){
        out+= `
       <div class ="items">
       <img class="productImage" src='${product.image}'> <br>
        <p class = "productName">${product.name} <p><br>
        ${product.description} <br>
        <p class = "price"> ${product.price} </p>
        <button class = "addBtn" type: "button">Add to Cart</button><br>
        </div>
    
        `;
    }

placeholder.innerHTML = out;

})


let productsInCart =[];
const parentElement = document.querySelector(".modal-content");
const cartSumPrice = document.querySelector("#cart-total-value");
const products = document.querySelectorAll('.items');

const updateShoppingCartHTML = function(){
  if(productsInCart.length > 0){
    let result = productsInCart.map(product => {
      return `

      <div class ="items">
       <img class="productImage" src='${product.image}'> <br>
        <p class = "productName">${product.name} <p><br>
        ${product.description} <br>
        <p class = "price"> ${product.price} </p>
        <button class = "addBtn" type: "button">Add to Cart</button><br>
        </div>
      `
    })
  }else {
    parentElement.innerHTML = '<h4 class = "empty"> Your shopping cart is empty</h4>';


  }
}

function updateProductsInCart(product){
  for (let i=0; i< productsInCart.length; i++){
    if (productsInCart[i].id == product.id){
      productsInCart[i].count +=1;
      productsInCart[i].price
    }
  }
}

products.forEach(product => {
  product.addEventListener('click', (e)=>{
    if(e.target.classList.contains('addBtn')){
      const productName = product.querySelector('.productName');
      const productPrice = product.querySelector('.price');
      const productImage = product.querySelector('.productImage');

      let productToCart={
        name: productName,
        image: productImage,
        price: productPrice
      }
updateProductsInCart(productToCart)
updateShoppingCartHTML();

    }
  })

}










)
