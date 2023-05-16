const product = {
    crazy: {
        name: 'Crazy',
        price: 31000,
        img: 'img/crazy.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    light: {
        name: 'Light',
        price: 26000,
        img: 'img/light.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    cheeseburger: {
        name: 'CheeseBurger',
        price: 29000,
        img: 'img/cheseeburger.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    dburger: {
        name: 'dBurger',
        price: 24000,
        img: 'img/dBurger.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
}

let productBtns = document.querySelectorAll('.card__item_btn'),
    productMenu = document.querySelector('.basket__inner'),
    baskentBtn = document.querySelector('.basket'),
    close = document.querySelector('.close'),
    MenuList = document.querySelector('.basket__list'),
    menuTotalPrice = document.querySelector('.basket__down_price'),
    productCount = document.querySelector('.basket__span');




productBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        plusOrMinus(this)
    })
})

function plusOrMinus(btn) {
    let parent = btn.closest('.card'),
        parentId = parent.getAttribute('id');

    product[parentId].amount++;

    basket();
}


function basket() {

    const productArr = [];
    let totalCount = 0;

    for (const key in product) {
        const pk = product[key];


        const productCard = document.querySelector(`#${pk.name.toLowerCase()}`),
            productIndicator = productCard.querySelector('.card__span');

        if (pk.amount) {
            productArr.push(pk);
            productCount.classList.add('active');
            totalCount += pk.amount;
            productIndicator.classList.add('active');
            productIndicator.innerHTML = pk.amount;
        } else {
            productIndicator.classList.remove('active');
            productIndicator.innerHTML = 0;
        }
        productCount.innerHTML = totalCount;
    }
    MenuList.innerHTML = ''

    for (let i = 0; i < productArr.length; i++) {
        MenuList.innerHTML += menuItemBurger(productArr[i])

    }

    menuTotalPrice.innerHTML = totalSumProduct()

}

function menuItemBurger(productItem) {
    const {
        name,
        totalSum: price,
        amount,
        img
    } = productItem;

    return `<div class="basket__list">
    <div class="basket__list_item">
        <div class="basket__list_left">
            <img src="${img}" alt="crazy">
            <div class="basket__list_desc">
                <h4 class="basket__list_desc-title">${name}</h4>
                <p class="basket__list_desc-text">${price}</p>
            </div>
        </div>
        <div class="basket__btns" id="${name.toLowerCase()}__card">
            <button class="basket__btn minus" data-symbol="-">-</button>
            <output class="basket__count">${amount}</output>
            <button class="basket__btn plus" data-symbol="+">+</button>
        </div>
    </div>
</div>`
}

window.addEventListener('click', (e) => {
    const btn = e.target

    if (btn.classList.contains('basket__btn')) {
        const attr = btn.getAttribute('data-symbol')
        const parent = btn.closest('.basket__btns')
        if (parent) {
            const idProduct = parent.getAttribute('id').split('__')[0]
            if (attr == '-') {
                product[idProduct].amount--
            } else if (attr == '+') {
                product[idProduct].amount++
            }
            basket()
        }
    }
})

function totalSumProduct() {
    let totalPrice = 0;
    for (const key in product) {
        totalPrice += product[key].totalSum
    }
    return totalPrice;
}

baskentBtn.addEventListener('click', function () {
    productMenu.classList.toggle('active');
})

close.addEventListener('click', function () {
    productMenu.classList.remove('active')
})