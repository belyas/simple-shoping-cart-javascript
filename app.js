(function() {
    const cartBtn = document.querySelector('.cart-btn');
    const cartOverlay = document.querySelector('.cart-overlay');
    const cartDOM = document.querySelector('.cart');
    const closeCartBtn = document.querySelector('.close-cart');

    const showCart = () => {
        cartOverlay.classList.add('transparentBcg');
        cartDOM.classList.add('showCart');
    };

    const hideCart = () => {
        cartOverlay.classList.remove('transparentBcg');
        cartDOM.classList.remove('showCart');
    };

    cartBtn.addEventListener('click', showCart);
    closeCartBtn.addEventListener('click', hideCart);
})();
