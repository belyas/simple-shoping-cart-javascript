(function() {
    const cartBtn = document.querySelector('.cart-btn');
    const cartOverlay = document.querySelector('.cart-overlay');
    const cartDOM = document.querySelector('.cart');

    cartBtn.addEventListener('click', showCart);

    function showCart() {
        cartOverlay.classList.add('transparentBcg');
        cartDOM.classList.add('showCart');
    }
})();
