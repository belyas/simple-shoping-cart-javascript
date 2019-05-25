(function() {
    const cartBtn = document.querySelector('.cart-btn');
    const cartOverlay = document.querySelector('.cart-overlay');
    const cartDOM = document.querySelector('.cart');
    const closeCartBtn = document.querySelector('.close-cart');

    cartBtn.addEventListener('click', showCart);
    closeCartBtn.addEventListener('click', hideCart);

    function showCart() {
        cartOverlay.classList.add('transparentBcg');
        cartDOM.classList.add('showCart');
    }
})();
