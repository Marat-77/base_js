// Урок 6
/*
1.
 Продолжаем реализовывать модуль корзины:
a. Добавлять в объект корзины выбранные товары по клику на кнопке «Купить» без перезагрузки страницы;
b. Привязать к событию покупки товара пересчет корзины и обновление ее внешнего вида.

2.
 * У товара может быть несколько изображений. Нужно:
a. Реализовать функционал показа полноразмерных картинок товара в модальном окне;
b. Реализовать функционал перехода между картинками внутри модального окна.
*/

// Класс Goods(Товары )
class Goods {
  constructor(
    id,
    price=0.0,
    name='Товар',
    description='Описание товара',
    quantity=0,
    imagepath=['',],
    // imagepath2='',
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
      if (this.productBasket.has(product)) {
        // если этот товар есть в корзине
        this.productBasket.set(product, this.productBasket.get(product) + count);
      } else {
        this.productBasket.set(product, count);
      }
      product.quantity -= count;
    } else {console.log('не является товаром нашего магазина')}
  }
  //
  changeBasket(product, count) {
    if (product instanceof Goods) {
      // product должен быть объектом класса Goods!
      const prevCount = this.productBasket.get(product);
      this.productBasket.set(product, count);
      product.quantity -= count - prevCount;
    } else {console.log('не является товаром нашего магазина')}
  }
  // удаление товара из корзины
  delFromBasket(product, count) {
    const prevCount = this.productBasket.get(product);
    this.productBasket.delete(product);
    product.quantity -= count - prevCount;
  }
  // Расчет общей стоимости корзины
  totalBasket() {
    this.total = 0;
    for (let [key, value] of this.productBasket) {
      this.total += key.price * value;
    }
    return this.total;
  }
  sumCountBasket() {
    this.sum = 0;
    for (let [key, value] of this.productBasket) {
      this.sum += value;
    }
    return this.sum;
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
  ['./img/pen_mini.jpg', './img/pen_mini2.jpg']
  // './img/pen_mini.jpg',
  // './img/pen_mini2.jpg'
);

const product2 = new Goods(
  1002,
  8.90,
  'Карандаш',
  'Отличный карандаш! Карандашом можно рисовать!',
  100,
  ['./img/pencil_mini.jpg',]
  // './img/pencil_mini.jpg'
);

const product3 = new Goods(
  1003,
  18.20,
  'Линейка',
  'Отличная линейка! Линейкой можно измерять!',
  100,
  ['./img/ruler_mini.jpg',]
  // './img/ruler_mini.jpg'
);

const product4 = new Goods(
  1004,
  20.50,
  'Тетрадь',
  'Отличная тетрадь! В тетради можно писать!',
  100,
  ['./img/copybook_mini.jpg',]
  // './img/copybook_mini.jpg'
);

// список товаров:
productList = [];
productList.push(product1);
productList.push(product2);
productList.push(product3);
productList.push(product4);
// TODO добавить в будущюю функцию добавления товара

window.addEventListener('load', () => {
  const btnRunMyShop = document.getElementById("button_ishop_id");
  btnRunMyShop.addEventListener('click', () => {
    structureBasket.runBasket();
    catalogGoods.runGoods();
  })
});


// создание корзины HTML
const structureBasket = {
  parentElement: document.body,
  containerElement: null,
  userId: 770000000,
  userBasket: null,
  divBasket: '',
  init() {
    this.userId += 1;
    this.userBasket = new Basket (this.userId );
    this.containerElement = this.parentElement.innerHTML = '';
    this.divBasket = document.createElement('div');
    this.divBasket = document.createElement('div');
    this.parentElement.appendChild(this.divBasket);
    // добавление id к divBasket
    this.divBasket.id = 'basket_main_id';
    //  добавление классов к divBasket
    this.divBasket.classList.add('main', 'container_basket');
    this.renderBasket();
  },

  // отрисовка состава корзины
  renderBasket() {
    this.divBasket.innerHTML = '';

    const divBasketInfo = document.createElement('div');
    this.divBasket.appendChild(divBasketInfo);
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
    pBasketUserId.textContent = `user Id: ${this.userBasket.userId}`;
    //
    const pBasketText = document.createElement('p');
    divBasketInfo.appendChild(pBasketText);
    pBasketText.classList.add('basket_text');
    pBasketText.textContent = 'состав корзины:';

    const divBasketItem = document.createElement('div');
    this.divBasket.appendChild(divBasketItem);
    // добавление id к divBasketItem
    divBasketItem.id = 'basket_item_id';
    //  добавление классов к divBasketItem
    divBasketItem.classList.add('basket_item');
    //
    if (this.userBasket.productBasket.size === 0) {
      divBasketItem.textContent = 'В Вашей корзине ещё ничего нет';
    } else {
      for (let prod of this.userBasket.productBasket) {
        // divBasketItem
        const divBasketProd = document.createElement('div');
        divBasketItem.appendChild(divBasketProd);
        divBasketProd.classList.add('basket_item_text');
        // ссылка на товар
        const linkBasketProd = document.createElement('a');
        linkBasketProd.classList.add('basket_item_link');
        linkBasketProd.href = `#${prod[0].id}`
        linkBasketProd.text = `${prod[0].name}, цена: ${prod[0].price}${prod[0].currency} - ${prod[1]} шт.`;
        divBasketProd.appendChild(linkBasketProd);
        // + Добавить внутреннюю ссылку #1001 - на карточку товара
        divBasketProd.append(' ');
        const inputBasketProdCount = document.createElement('input');
        inputBasketProdCount.classList.add('product_card_to_basket');
        inputBasketProdCount.setAttribute('type', 'number');
        inputBasketProdCount.setAttribute('name', `count_prod${prod[0].id}`);
        inputBasketProdCount.setAttribute('value', `${prod[1]}`);
        inputBasketProdCount.setAttribute('min', '0');
        inputBasketProdCount.setAttribute('max', '100');
        divBasketProd.append(inputBasketProdCount);

        // кнопка изменения кол-ва товара в корзине
        const btnBasketProdCount = document.createElement('button');
        btnBasketProdCount.classList.add('to_basket_btn');
        btnBasketProdCount.setAttribute('type', 'button');
        btnBasketProdCount.textContent = `изменить`;
        btnBasketProdCount.addEventListener('click', () => {
          this.changeProdBasket(prod[0], Number(inputBasketProdCount.value));
        });
        divBasketProd.append(btnBasketProdCount);
        divBasketProd.append(' ');

        // кнопка удаления товара из корзины
        const btnBasketProdDel = document.createElement('button');
        btnBasketProdDel.classList.add('to_basket_btn');
        btnBasketProdDel.setAttribute('type', 'button');
        btnBasketProdDel.textContent = `удалить`;
        btnBasketProdDel.addEventListener('click', () => {
          this.delProdFromBasket(prod[0], 0);
        });
        divBasketProd.append(btnBasketProdDel);
      }

      // вывод кол-ва товаров и общей стоимости
      divBasketItem.appendChild(document.createElement('hr'));
      const divBasketTotal = document.createElement('div');
      divBasketTotal.textContent = `Товаров: ${this.userBasket.sumCountBasket()} шт. на сумму: ${this.userBasket.totalBasket().toFixed(2)} руб.`
      divBasketItem.append(divBasketTotal);
    }
  },  // end of renderBasket

  // функция добавления товара в корзину
  addProdToBasket(prod, value) {
    this.userBasket.addToBasket(prod, value);
    this.renderBasket();
    catalogGoods.renderCatalogGoods();
  },

  // функция изменения кол-ва товара в корзине
  changeProdBasket(prod, count) {
    this.userBasket.changeBasket(prod, count);
    this.renderBasket();
    catalogGoods.renderCatalogGoods();
  },

  // функция удаления товара из каталога
  delProdFromBasket(prod, count) {
    this.userBasket.delFromBasket(prod, count)
    this.renderBasket();
    catalogGoods.renderCatalogGoods();
  },

  runBasket() {
    this.init();
  },

}

// создание каталога HTML
const catalogGoods = {
  containerElement: null,

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
    divCatalogGoods.insertAdjacentHTML('afterbegin', '<hr>');
    // console.log(divCatalogGoods);
    divCatalogGoods.insertAdjacentHTML('beforeend', '<h1 class="catalog_header">Наш каталог:</h1>');
    this.renderCatalogGoods();
  },  // end of init catalogGoods

  // отрисовка каталога
  renderCatalogGoods() {
    // обновление содержимого
    this.containerElement.innerHTML = '';
    for (let prod of productList) {
      // div product_card
      const divProductCard = document.createElement('div');
      divProductCard.classList.add('product_card');
      this.containerElement.append(divProductCard);
      // div product_card_img
      const divProductCardImg = document.createElement('div');
      divProductCardImg.classList.add('product_card_img');
      divProductCard.append(divProductCardImg);
      // новая версия с массивом
      for (var prodImg of prod.imagePath) {
        // console.log(prodImg);
        const imgProductCardImg = new Image();
        imgProductCardImg.classList.add('product_img');
        // добавление атрибута src=""
        // imgProductCardImg.setAttribute('src', prodImg);
        imgProductCardImg.src = prodImg;
        fullImagePath = './img/big/' + prodImg.split('/' )[2].split('_mini').join('');
        // ------------------------------------------------------ создать dataset
        // secondItem.dataset.side = 'evil'
        // divProductCardImg.dataset.fullImageUrl = './img/big/pen.jpg'; - не сработало
        imgProductCardImg.setAttribute('data-full-image-url', fullImagePath);
        imgProductCardImg.setAttribute('alt', `${prod.name}`);
        divProductCardImg.append(imgProductCardImg);
        // console.log(imgProductCardImg);

      }
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
      pProductCardPrice.textContent = `цена: ${prod.price} ${prod.currency}`;
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
      inputProductCardBasketAdd.setAttribute('min', '0');
      inputProductCardBasketAdd.setAttribute('max', `${prod.quantity}`);
      divProductCardButtonAdd.append(inputProductCardBasketAdd);
      //
      const btnProductCardBasketAdd = document.createElement('button');
      btnProductCardBasketAdd.classList.add('to_basket_btn');
      btnProductCardBasketAdd.setAttribute('type', 'button');
      btnProductCardBasketAdd.setAttribute('name', `btn${prod.id}`);
      btnProductCardBasketAdd.textContent = `добавить в корзину`;
      btnProductCardBasketAdd.addEventListener('click', () => {
        structureBasket.addProdToBasket(prod, Number(inputProductCardBasketAdd.value));
      });
      divProductCardButtonAdd.append(btnProductCardBasketAdd);
    }
    // *************************************************************************
    gallery.init();
    // *************************************************************************
  },

  runGoods() {
    this.init();
  },
}

// ========================================= gallery!!!!
const gallery = {
  // настройки
  settings: {
    galleryMainContainer: '.product_card',
    previewSelector: '.product_card_img',
    modalImageContainer: 'gallery__modal',
    modalImageClass: 'gallery__image',
    modalImageScreen: 'gallery__back',
    modalImageClose: 'gallery__close',
    modalImageCloseSrc: './img/btns/close.png',
    modalImagePrev: 'gallery__prev',
    modalImagePrevSrc: './img/btns/prev.png',
    modalImageNext: 'gallery__next',
    modalImageNextSrc: './img/btns/next.png',
    modalNow: null,
    galleryModal: null,
  },

  // инициализация
  init(userSettings = {}) {
    Object.assign(this.settings, userSettings);

    const galleryContainerAll = document.querySelectorAll(this.settings.previewSelector);
    // console.log(galleryContainerAll);
    galleryContainerAll.forEach((galleryContainer) => {
      // console.log(galleryContainer);
      galleryContainer.addEventListener('click', (event) => this.containerClickHandler(event));
    });
  },

  containerClickHandler(event) {
    // console.log(event.target);
    if (event.target.tagName !== 'IMG') {
      return;
    }
    this.modalNow = event.target;
    this.createGalleryModal(event.target);
  },

  createGalleryModal(img) {
    this.galleryModal = document.createElement('div');
    this.galleryModal.classList.add(this.settings.modalImageContainer);
    // console.log(this.galleryModal);
    const galleryScreen = document.createElement('div');
    galleryScreen.classList.add(this.settings.modalImageScreen);
    this.galleryModal.appendChild(galleryScreen);

    // const galleryClose = document.createElement('img');
    const galleryClose = new Image();
    galleryClose.classList.add(this.settings.modalImageClose);
    galleryClose.src = this.settings.modalImageCloseSrc;
    galleryClose.addEventListener('click', (event) => {
      // стрелочная функция закрытия модального окна
      this.close(event.target);
    });
    this.galleryModal.appendChild(galleryClose);
    // console.log(galleryClose);

    // стрелка влево
    const galleryPrev = new Image();
    galleryPrev.classList.add(this.settings.modalImagePrev);
    galleryPrev.src = this.settings.modalImagePrevSrc;
    galleryPrev.addEventListener('click', (event) => {
      // стрелочная функция переход к предыдущей картинке
      this.prevImg(event.target);  // -----------------------------left - prevImg
    });
    this.galleryModal.appendChild(galleryPrev);

    // стрелка вправо
    const galleryNext = new Image();
    galleryNext.classList.add(this.settings.modalImageNext);
    galleryNext.src = this.settings.modalImageNextSrc;
    galleryNext.addEventListener('click', (event) => {
      // стрелочная функция переход к предыдущей картинке
      this.nextImg(event.target);  // -----------------------------right - nextImg
    });
    this.galleryModal.appendChild(galleryNext);

    this.imageInModal(img);
  },
  // функция - картинка в модалке
  imageInModal(img) {
    // console.log(img);
    const ifNotEmpty = this.galleryModal.querySelector(`.${this.settings.modalImageClass}`.toString());
    if (ifNotEmpty !== null) {
      ifNotEmpty.remove();
    }
    const galleryImageBig = new Image();
    galleryImageBig.classList.add(this.settings.modalImageClass);
    galleryImageBig.src = img.dataset.fullImageUrl
    //
    this.galleryModal.appendChild(galleryImageBig);
    document.querySelector(this.settings.galleryMainContainer).appendChild(this.galleryModal);
  },
  //
  close(closeImg) {
    closeImg.parentElement.remove();
  },
  //
  prevImg(leftImg) {

    this.modalNow = (this.modalNow.previousElementSibling === null) ? this.modalNow.parentElement.lastElementChild : this.modalNow.previousElementSibling;
    this.imageInModal(this.modalNow);
  },
  //
  nextImg(rightImg) {

    this.modalNow = (this.modalNow.nextElementSibling === null) ? this.modalNow.parentElement.firstElementChild : this.modalNow.nextElementSibling;
    this.imageInModal(this.modalNow);
  }
};
