let label = document.getElementById("label");

let ShoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItems = () => {
    if (basket.length !== 0) {
        ShoppingCart.innerHTML = basket
            .map(function (x) {
                let { id, item } = x; // destructor
                let search =
                    shopItemsData.find(function (y) {
                        // match id of data with id of id destructor
                        return y.id === id;
                    }) || [];
                let { img, name, price } = search;
                return `
            <div class="cart-item">
                    <img src="${img}" alt="" />
                    <div class="details">
                        <div class="title-price-x">
                            <h4 class="title-price">
                                <p class="product-name">${name}</p>
                                <p class ="cart-item-price" >$ ${price}</p>
                            </h4>
                            <i  onclick="removeItem(${id})" class="fa-solid bi-x-lg  fa-xmark"></i>
                        </div>
                        <div class="buttons">
                            <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
                            <div id=${id} class="quantity">${item}</div>
                            <i onclick="increment(${id})" class="fa-solid fa-plus"></i>
                        </div>
                        <h3>$ ${item * price}</h3
                        <div class="title-price-x"></div>
                    </div>
            </div>
            `;
            })
            .join("");
    } else {
        // xet th khong co gi trong basket
        ShoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
          <button class="HomeBtn btn-empty">Back to home</button>
        </a>
        `;
    }
};
generateCartItems();

/**
 * ! Increment Function(tang),Decrement  Function(giam)
 */
// Da co 1 loi do id co so , va chuoi
let increment = function (id) {
    let selectedItem = id;
    /**
     * todo : tao chuc nang tim kiem de xem thu do co thuc su ton tai tren gio hang hay khong
     * todo : sp co ton tai tren gio hay khong, neu ton tai , chi muc tang , neu khong ton tai
     * todo : đẩy 1 vật thể mới vào trong giỏ
     * todo : tim 1 thu duy nhat
     */

    let search = basket.find(function (x) {
        return x.id === selectedItem.id;
    });

    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    } else {
        search.item += 1;
    }
    // *todo de du lieu vao localStorage
    localStorage.setItem("data", JSON.stringify(basket));
    generateCartItems();
    update(selectedItem.id);
};
let decrement = function (id) {
    let selectedItem = id;
    let search = basket.find(function (x) {
        return x.id === selectedItem.id;
    });

    // Neu ma k co du lieu ma khogn co dong nay se sinh ra loi
    if (search === undefined) return;
    // Ngan khong cho no = 0
    else if (search.item === 0) {
        return;
    } else {
        search.item -= 1;
    }
    update(selectedItem.id);
    // *todo neu du lieu bang 0 thi se khong cho luu vao localStorage
    basket = basket.filter(function (x) {
        return x.item !== 0;
    });
    generateCartItems(); //*todo do khong con trong localStorage nen no se xoa di
    localStorage.setItem("data", JSON.stringify(basket));
};

let update = function (id) {
    // kiem tra xem id ton tai chua va cap nhat so luong san pham
    let search = basket.find(function (x) {
        return x.id === id;
    });
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalAmount();
};

let removeItem = function (id) {
    let selectedItem = id;
    basket = basket.filter(function (x) {
        return x.id !== selectedItem.id;
    });
    generateCartItems();
    calculation();
    totalAmount();
    localStorage.setItem("data", JSON.stringify(basket));
};

let totalAmount = function () {
    if (basket.length !== 0) {
        // *todo lay price * item
        let amount = basket
            .map(function (x) {
                let { item, id } = x;
                let search = shopItemsData.find(function (y) {
                    return y.id === id;
                });
                return item * search.price;
            })
            .reduce(function (x, y) {
                return x + y;
            }, 0);
        label.innerHTML = `
            <h2>Total Bill : $ ${amount}</h2>
            <button class="checkout">Checkout</button>
            <button onclick="clearCart()" class="removeAll">Clear Cart</button>
            `;
    } else {
        return;
    }
};
let clearCart = function () {
    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem("data1", JSON.stringify(basket));
};
totalAmount();
