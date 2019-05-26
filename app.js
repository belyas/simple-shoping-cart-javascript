(function() {
    const cartBtn = document.querySelector('.cart-btn');
    const cartOverlay = document.querySelector('.cart-overlay');
    const cartDOM = document.querySelector('.cart');
    const closeCartBtn = document.querySelector('.close-cart');
    const cartContent = document.querySelector('.cart-content');
    const cartItemsCount = document.querySelector('.cart-items');
    const cartTotalPrice = document.querySelector('.cart-total');
    const avaialableProducts = [];
    const cart = { items: [], totalPrice: 0 };

    const formatPrice = (price, currency = '$') => {
        let formattedPrice = price;

        switch (currency) {
            case '$':
                formattedPrice = `${currency}${price}`;
                break;
        }

        return formattedPrice;
    };
    const itemTotalPrice = price => qty => +parseFloat(price * qty).toFixed(2);

    const showCart = () => {
        cartOverlay.classList.add('transparentBcg');
        cartDOM.classList.add('showCart');
    };

    const hideCart = () => {
        cartOverlay.classList.remove('transparentBcg');
        cartDOM.classList.remove('showCart');
    };

    const createNode = (type, classes, content) => {
        const elem = document.createElement(type);
        elem.classList.add(classes);
        elem.innerHTML = content;

        return elem;
    };
    const createCartItemContent = item => formatter => {
        return `<img src="${item.image_url}" alt="${item.title}" />
            <div>
                <h4>${item.title}</h4>
                <h5>${formatter(item.price)}</h5>
                <span class="remove-item" data-id="${item.id}">remove</span>
            </div>
            <div>
                <i class="fas fa-chevron-up" data-id="${item.id}"></i>
                <p class="item-amount" data-id="${item.id}">${item.qty}</p>
                <i class="fas fa-chevron-down" data-id="${item.id}"></i>
            </div>`;
    };

    const itemExists = itemId =>
        cart.items.findIndex(item => item.id && item.id === itemId);

    const updateCartItemQty = item => {
        document.querySelectorAll('.item-amount').forEach(amount => {
            if (+amount.dataset.id === item.id) {
                amount.textContent = item.qty;
            }
        });
    };

    const calcTotalCartPrice = () => {
        let totalPrice = 0;
        cart.items.length &&
            cart.items.forEach(
                item => (totalPrice += itemTotalPrice(item.price)(item.qty))
            );
        cart.totalPrice = +parseFloat(totalPrice).toFixed(2);

        return cart.totalPrice;
    };

    const renderCartItemLayout = product => formatter => {
        const itemContent = createCartItemContent(product)(formatter);
        const itemNode = createNode('div', 'cart-item', itemContent);

        cartContent.appendChild(itemNode);

        // attach event to remove button
        itemNode
            .querySelector('.remove-item')
            .addEventListener('click', removeItemFromItem);
    };

    const renderCartItemsLayout = () => {
        cartContent.innerHTML = '';

        cart.items &&
            cart.items.forEach(product => {
                renderCartItemLayout(product)(formatPrice);
            });
    };

    const addItemTocart = itemId => {
        const product = avaialableProducts.filter(
            prod => prod.id === itemId
        )[0];
        const currentItemIndex = itemExists(itemId);

        if (currentItemIndex > -1) {
            const updatedCart = [...cart.items];
            updatedCart[currentItemIndex] = {
                ...updatedCart[currentItemIndex],
                qty: updatedCart[currentItemIndex].qty + 1,
            };

            cart.items = updatedCart;
            // update individual item in cart's quantity
            updateCartItemQty(updatedCart[currentItemIndex]);
        } else {
            cart.items.push(product);
            renderCartItemLayout(product)(formatPrice);
        }

        // update cart items icon
        cartItemsCount.textContent = cart.items.length;
        // re-calculcate total cart price
        cartTotalPrice.textContent = formatPrice(calcTotalCartPrice());
    };

    const removeItemFromItem = function() {
        const itemId = +this.dataset.id;
        const updatedCart = [...cart.items];

        cart.items = updatedCart.filter(item => item.id !== itemId);
        // update cart items icon
        cartItemsCount.textContent = cart.items.length;
        // re-calculcate total cart price
        cartTotalPrice.textContent = formatPrice(calcTotalCartPrice());

        renderCartItemsLayout();
    };

    const loadProductsFromJson = async () => {
        const result = await fetch('products.json');
        const products = await result.json();

        return products;
    };

    const productGridLayout = product => formatter => {
        return `<article class="product">
            <div class="img-container">
                <img
                    src="${product.image_url}"
                    alt="${product.title}"
                    class="product-img"
                />
                <button class="bag-btn" data-id="${product.id}">
                    <i
                        class="fa fa-shopping-cart"
                        aria-hidden="true"
                    ></i>
                    add to cart
                </button>
            </div>
            <h3>${product.title}</h3>
            <h4>${formatter(product.price)}</h4>
        </article>`;
    };

    const addToCartBtnHandler = () => {
        document.querySelectorAll('.bag-btn').forEach(btn =>
            btn.addEventListener('click', function(event) {
                const ItemId = +btn.dataset.id;
                addItemTocart(ItemId);
            })
        );
    };

    const createProductsGrids = loadProductsfunc => async formatter => {
        const productsContainer = document.getElementById('products-container');
        const products = await loadProductsfunc();
        let _html = '';

        products.items.forEach(product => {
            avaialableProducts.push({ ...product, qty: 1 });
            _html += productGridLayout(product)(formatter);
        });

        productsContainer.innerHTML = _html;

        // attach button to click event
        addToCartBtnHandler();
    };

    // Display products from json file
    createProductsGrids(loadProductsFromJson)(formatPrice);

    cartBtn.addEventListener('click', showCart);
    closeCartBtn.addEventListener('click', hideCart);
})();
