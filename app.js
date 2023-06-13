/**
 * ! Generate shop
 *  todo : because the products are the same and repeated
 */
// *todo lay du lieu ra vao localStorage, bo [] neu k co du lieu nao se day loi
let basket = JSON.parse(localStorage.getItem("data")) || []; //rổ

let shop = document.querySelector("#shop");

/**
 * todo : mỗi khi bạn chọn bất kỳ thẻ nào,
 * todo : việc sẽ làm là lưu trữ dữ liệu bên trong basket
 * todo : { id : 'ssss', item : 1,} , id va so luong
 * todo :
 */

let generateShop = function () {
    return (shop.innerHTML = shopItemsData
        .map(function (x) {
            //destructor
            let { id, name, price, img, desc } = x;
            // *todo tim kiem de cap nhat moi thu cung luc

            let search =
                basket.find(function (x) {
                    return x.id === id;
                }) || [];

            return `
        <div id=product-id-${id} class="item">
            <img class="item-img" src="${img}" alt="" />
            <div class="details">
                <h3>${name}</h3>
                <p>
                ${desc}
                </p>
                <div class="price-quantity">
                    <h2>$ ${price}</h2>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
                        <div id=${id} class="quantity">
                            ${search.item === undefined ? 0 : search.item} 
                        </div> 
                        <i onclick="increment(${id})" class="fa-solid fa-plus"></i>
                    </div>
                </div>
            </div>
        </div>`;
        })
        .join(""));
};
generateShop();

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

    localStorage.setItem("data", JSON.stringify(basket));
};

let update = function (id) {
    // kiem tra xem id ton tai chua va cap nhat so luong san pham
    let search = basket.find(function (x) {
        return x.id === id;
    });
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

let calculation = function () {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket
        .map(function (x) {
            return x.item;
        })
        .reduce(function (x, y) {
            return x + y;
        }, 0);
};
calculation();
