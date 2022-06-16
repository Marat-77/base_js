
/*
2.
 Сделать генерацию корзины динамической: верстка корзины не должна находиться в HTML-структуре.
Там должен быть только div, в который будет вставляться корзина, сгенерированная на базе JS:
a. Пустая корзина должна выводить строку «Корзина пуста»;
b. Наполненная должна выводить «В корзине: n товаров на сумму m рублей».

3.
 * Сделать так, чтобы товары в каталоге выводились при помощи JS:
a. Создать массив товаров (сущность Product);
b. При загрузке страницы на базе данного массива генерировать вывод из него.
HTML-код должен содержать только div id=”catalog” без вложенного кода.
Весь вид каталога генерируется JS.
*/

// Класс Goods(Товары )
class Goods {
  constructor(
    id,
    price=0.0,
    name='Товар',
    description='Описание товара',
    quantity=0,
    imagepath='',
    currency='руб.'
  ) {
    this.id = id;
    this.price = price;
    this.name = name;
    this.description = description;
    this.quantity = quantity;
    this.currency = currency;
    this.imagePath = imagepath;
  }
}

// Класс Basket(Корзина )
class Basket {
  constructor(userId) {
    this.userId = userId;
    this.productBasket = new Map();
  }
  // Добавить товар в корзину:
  addToBasket(product, count) {
    if (product instanceof Goods) {
      // product должен быть объектом класса Goods!
      this.productBasket.set(product, count)
      product.quantity -= count;
    } else {console.log('не является товаром нашего магазина')}
  }
  // Расчет общей стоимости корзины
  totalBasket() {
    this.total = 0;
    for (let [key, value] of this.productBasket) {
      this.total += key.price * value;
    }
    return this.total
  }
  // Информация о корзине:
  infoBasket() {
    console.log('Информация о корзине:');
    console.log('user Id: ' + this.userId +
    '\nсостав корзины:');
   const cb = (value, key) => console.log(`${key.name}, цена: ${key.price} ${key.currency} - ${value} шт.`);
   this.productBasket.forEach(cb);
  }
}


const product1 = new Goods(
  1001,
  23.10,
  'Ручка синяя',
  'Отличная ручка! Она может писать!',
  100,
  './img/pen_mini.jpg'
);

const product2 = new Goods(
  1002,
  8.90,
  'Карандаш',
  'Отличный карандаш! Карандашом можно рисовать!',
  100,
  './img/pencil_mini.jpg'
);

const product3 = new Goods(
  1003,
  18.20,
  'Линейка',
  'Отличная линейка! Линейкой можно измерять!',
  100,
  './img/ruler_mini.jpg'
);

const product4 = new Goods(
  1004,
  20.50,
  'Тетрадь',
  'Отличная тетрадь! В тетради можно писать!',
  100,
  './img/copybook_mini.jpg'
);

// список товаров:
productList = [];
productList.push(product1);
productList.push(product2);
productList.push(product3);
productList.push(product4);
// TODO добавить в будущюю функцию добавления товара

const btnRunMyShop = document.getElementById("button_ishop_id");
btnRunMyShop.addEventListener('click', (event) => {
  structureBasket.runBasket();
  catalogGoods.runGoods();
})

// создание корзины HTML
const structureBasket = {
  parentElement: document.body,
  containerElement: null,
  userId: 770000000,
  init() {
    this.userId += 1;
    const userBasket = new Basket (this.userId );
    this.containerElement = this.parentElement.innerHTML = '';

    const divBasket = document.createElement('div');
    this.parentElement.appendChild(divBasket);
    // добавление id к divBasket
    divBasket.id = 'basket_main_id';
    //  добавление классов к divBasket
    divBasket.classList.add('main', 'container_basket');

    const divBasketInfo = document.createElement('div');
    divBasket.appendChild(divBasketInfo);
    // добавление id к divBasketInfo
    divBasketInfo.id = 'basket_info_id';
    //  добавление классов к divBasketInfo
    divBasketInfo.classList.add('basket_info');
    //
    const headBasketInfo = document.createElement('h2');
    divBasketInfo.appendChild(headBasketInfo);
    headBasketInfo.classList.add('basket_info_header');
    headBasketInfo.textContent = 'Информация о корзине:';
    //
    const pBasketUserId = document.createElement('p');
    divBasketInfo.appendChild(pBasketUserId);
    pBasketUserId.classList.add('user_id');
    pBasketUserId.textContent = `user Id: ${userBasket.userId}`;
    //
    const pBasketText = document.createElement('p');
    divBasketInfo.appendChild(pBasketText);
    pBasketText.classList.add('basket_text');
    pBasketText.textContent = 'состав корзины:';

    const divBasketItem = document.createElement('div');
    divBasket.appendChild(divBasketItem);
    // добавление id к divBasketItem
    divBasketItem.id = 'basket_item_id';
    //  добавление классов к divBasketItem
    divBasketItem.classList.add('basket_item');
    // пока не реализовал добавление по кнопке в корзину
    // добавим что-нибудь в корзину
    userBasket.addToBasket(product2, 8);
    userBasket.addToBasket(product3, 6);
    //
    if (userBasket.productBasket.size === 0) {
      divBasketItem.textContent = 'В Вашей корзине ещё ничего нет';
    } else {
      for (let prod of userBasket.productBasket) {
        // divBasketItem
        const divBasketProd = document.createElement('div');
        divBasketItem.appendChild(divBasketProd);
        divBasketProd.classList.add('basket_item_text');
        divBasketProd.textContent = `${prod[0].name}, цена: ${prod[0].price}${prod[0].currency} - ${prod[1]} шт.`;
        // TODO Добавить внутреннюю ссылку #1001 - на карточку товара
      }
    }
  },
  runBasket() {
    this.init();
  },

}

// функция создания каталога HTML
const catalogGoods = {
  containerElement: null,
  //
  init() {
    // создание элемента для каталога:
    const divCatalogGoods = document.createElement('div');
    // добавление в конец body
    document.body.append(divCatalogGoods);
    // добавление id
    divCatalogGoods.id = 'catalog';
    this.containerElement = document.getElementById('catalog');
    //  добавление классов
    divCatalogGoods.classList.add('main', 'catalog');
    // добавление горизонтальной линии:
    divCatalogGoods.insertAdjacentHTML('afterbegin', '<hr>')
    // console.log(divCatalogGoods);
    divCatalogGoods.insertAdjacentHTML('beforeend', '<h1 class="catalog_header">Наш каталог:</h1>')
    for (let prod of productList) {
      // div product_card
      const divProductCard = document.createElement('div');
      divProductCard.classList.add('product_card');
      this.containerElement.append(divProductCard);
      // div product_card_img
      const divProductCardImg = document.createElement('div');
      divProductCardImg.classList.add('product_card_img');
      divProductCard.append(divProductCardImg);
      // сюда надо добавить картинку prod.imagePath
      const imgProductCardImg = document.createElement('img');
      imgProductCardImg.classList.add('product_img');
      // добавление атрибута src=""
      imgProductCardImg.setAttribute('src', prod.imagePath);
      imgProductCardImg.setAttribute('alt', `${prod.name}`);
      divProductCardImg.append(imgProductCardImg);
      // div product_card_info
      const divProductCardInfo = document.createElement('div');
      divProductCardInfo.classList.add('product_card_info');
      divProductCard.append(divProductCardInfo);
      // Заголовок - название товара
      const hProductCardHead = document.createElement('h1');
      const stringProd = `${prod.id}`;
      hProductCardHead.id = stringProd;
      hProductCardHead.classList.add('product_card_header');
      // вставка текста с названием товара:
      hProductCardHead.textContent = `${prod.name}`;
      divProductCardInfo.append(hProductCardHead);
      // Описание
      const pProductCardDesc = document.createElement('p');
      pProductCardDesc.classList.add('product_card_desc');
      pProductCardDesc.textContent = `${prod.description}`;
      divProductCardInfo.append(pProductCardDesc);
      // артикул
      const pProductCardId = document.createElement('p');
      pProductCardId.classList.add('product_card_id');
      pProductCardId.textContent = `артикул: ${prod.id}`;
      divProductCardInfo.append(pProductCardId);
      // цена
      const pProductCardPrice = document.createElement('p');
      pProductCardPrice.classList.add('product_card_price');
      pProductCardPrice.textContent = `цена: ${prod.id} ${prod.currency}`;
      divProductCardInfo.append(pProductCardPrice);
      // в наличии
      const pProductCardQuantity = document.createElement('p');
      pProductCardQuantity.classList.add('product_card_quantity');
      pProductCardQuantity.textContent = `в наличии: ${prod.quantity} шт.`;
      divProductCardInfo.append(pProductCardQuantity);
      //
      const divProductCardButtonAdd = document.createElement('div');
      divProductCardButtonAdd.classList.add('product_card_to_basket');
      divProductCardInfo.append(divProductCardButtonAdd);
      //
      const inputProductCardBasketAdd = document.createElement('input');
      inputProductCardBasketAdd.classList.add('product_card_to_basket');
      inputProductCardBasketAdd.setAttribute('type', 'number');
      inputProductCardBasketAdd.setAttribute('name', `input${prod.id}`);
      inputProductCardBasketAdd.setAttribute('value', '1');
      inputProductCardBasketAdd.setAttribute('min', '1');
      inputProductCardBasketAdd.setAttribute('max', '100');
      divProductCardInfo.append(inputProductCardBasketAdd);
      //
      const btnProductCardBasketAdd = document.createElement('button');
      btnProductCardBasketAdd.classList.add('to_basket_btn');
      btnProductCardBasketAdd.setAttribute('type', 'button');
      btnProductCardBasketAdd.setAttribute('name', `btn${prod.id}`);
      btnProductCardBasketAdd.textContent = `добавить в корзину`;
      divProductCardInfo.append(btnProductCardBasketAdd);
    }
  },

  runGoods() {
    this.init();
  },
}
