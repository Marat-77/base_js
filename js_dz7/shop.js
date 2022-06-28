// Урок 7
/*
1.
 Реализовать страницу корзины:
a. Добавить возможность не только смотреть состав корзины, но и редактировать его, обновляя общую стоимость или выводя сообщение «Корзина пуста».

2.
На странице корзины:
a. Сделать отдельные блоки «Состав корзины», «Адрес доставки», «Комментарий»;
b. Сделать эти поля сворачиваемыми;
c. Заполнять поля по очереди, то есть давать посмотреть состав корзины, внизу которого есть кнопка «Далее». Если нажать ее, сворачивается «Состав корзины» и открывается «Адрес доставки» и так далее.

3.
* Убрать границы поля: пересекая их, змейка должна появляться с противоположной стороны.
- решение в snakearound.html snakearound.js

4.
* Для задачи со звездочкой из шестого урока реализовать функционал переключения между картинками по стрелкам на клавиатуре.

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

      // ============================================================== ПРОВЕРКА !
      count = this.checkProductQuantity(product, count);

      if (this.productBasket.has(product)) {
        // если этот товар есть в корзине
        this.productBasket.set(product, this.productBasket.get(product) + count);
      } else {
        this.productBasket.set(product, count);
      }

      this.changeProductQuantity(product, count);
    } else {console.log('не является товаром нашего магазина')}
  }
  //
  changeBasket(product, count) {
    if (product instanceof Goods) {
      // product должен быть объектом класса Goods!
      let prevCount = this.productBasket.get(product);

      // ============================================================== ПРОВЕРКА !
      count = this.checkProductQuantity(product, count, prevCount);

      this.productBasket.set(product, count);

      this.changeProductQuantity(product, count, prevCount);
    } else {console.log('не является товаром нашего магазина')}
  }
  // удаление товара из корзины
  delFromBasket(product, count) {
    const prevCount = this.productBasket.get(product);
    this.productBasket.delete(product);

    this.changeProductQuantity(product, count, prevCount);
  }
  // изменение остатка товара
  changeProductQuantity(product, count, prevCount = 0) {
    product.quantity -= count - prevCount;
  }
  // проверка остатка товара
  checkProductQuantity(product, count, prevCount = 0) {
    //
    if (count - prevCount > product.quantity) {
      count = product.quantity + prevCount;
    }
    return count;
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
    const productBasketArray = Array.from(this.productBasket.values());
    const sumCount = productBasketArray.reduce( (prev, item) => prev + item, 0);
    return sumCount;
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
  isButtonFurther: false,
  insideDivBasket: '',
  divDeliveryAddress: '',
  divOneLineBasket: '',
  init() {
    this.userId += 1;
    this.userBasket = new Basket (this.userId );
    this.containerElement = this.parentElement.innerHTML = '';
    this.divBasket = document.createElement('div');
    this.parentElement.appendChild(this.divBasket);
    // добавление id к divBasket
    this.divBasket.id = 'basket_main_id';
    //  добавление классов к divBasket
    this.divBasket.classList.add('main', 'container_basket');
    this.isButtonFurther;
    this.insideDivBasket;
    this.divDeliveryAddress;
    this.divOneLineBasket;
    this.renderBasket();
    // this.renderButtonFurther();
  },

  // отрисовка состава корзины
  renderBasket(addRenderButtonFurther = true) {
    this.divBasket.innerHTML = '';

    const divBasketInfo = document.createElement('div');
    // this.divBasket.appendChild(divBasketInfo);  // ------------------------------------------------
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
    // this.divBasket.appendChild(divBasketItem);  // -----------------------------------------------------
    // добавление id к divBasketItem
    divBasketItem.id = 'basket_item_id';
    //  добавление классов к divBasketItem
    divBasketItem.classList.add('basket_item');
    //
    if (this.userBasket.productBasket.size === 0) {
      divBasketItem.textContent = 'В Вашей корзине ещё ничего нет';
      this.isButtonFurther = false;
    } else {
      this.isButtonFurther = true;
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
    }  // end of else - если в корзине что-то есть

    this.divBasket.appendChild(divBasketInfo);
    this.divBasket.appendChild(divBasketItem);
    this.insideDivBasket = 'BasketItem';
    // console.log(this.insideDivBasket);
    if (addRenderButtonFurther) {
      this.renderButtonFurther();
    }
  },  // end of renderBasket

    // прослушиватель для кнопки Добавление
  handlerButtonFurther() {
    // let commandButtonFurther;
    switch (this.insideDivBasket) {
      case 'BasketItem':
        // console.log('case BasketItem ', this.insideDivBasket);
        // commandButtonFurther = this.renderDeliveryAddress();
        document.getElementById('button_further_id').addEventListener('click', () => this.renderDeliveryAddress());
        // this.renderOneLineBasket();
        break;
      // default:
      case 'DeliveryAddress':
        // console.log('case DeliveryAddress');
        // commandButtonFurther = this.renderComment();
        document.getElementById('button_further_id').addEventListener('click', () => this.renderComment());
        break;
      case 'Comment':
        // console.log('case Comment');
        // commandButtonFurther = alert('order complite');
        const textAlert = 'Ваш заказ передан в службу доставки'
        document.getElementById('button_further_id').addEventListener('click', () => alert(textAlert));
        break;
    }
    // document.getElementById('button_further_id').addEventListener('click', () => commandButtonFurther);
  },

  // кнопка Далее
  renderButtonFurther() {
    // console.log(this.isButtonFurther);
    if (this.isButtonFurther) {
      const divButtonFurther = document.createElement('div')
      // div_button_further
      divButtonFurther.classList.add('div_button_further');
      divButtonFurther.id = 'button_further_id';
      divButtonFurther.textContent = 'Далее'
      this.divBasket.appendChild(divButtonFurther);
      this.handlerButtonFurther();
    }
  },

  renderOneLine(inputParent, inputDiv, inputText) {
    //
    inputDiv.classList.add('div_one_line');
    inputDiv.textContent = inputText;
    inputDiv.addEventListener('click', () => {
      this.renderBasket();
    });
    inputParent.appendChild(inputDiv);
  },

  // renderDeliveryAddress
  renderDeliveryAddress() {
    this.divBasket.innerHTML = '';

    this.divDeliveryAddress = document.createElement('div');
    this.divDeliveryAddress.classList.add('div_delivery_address');

    this.divOneLineBasket = document.createElement('div');
    this.renderOneLine(this.divDeliveryAddress, this.divOneLineBasket, 'Состав корзины');

    const headerDeliveryAddress = document.createElement('h2');
    headerDeliveryAddress.classList.add('basket_info_header');
    headerDeliveryAddress.textContent = 'Введите адрес доставки:';
    this.divDeliveryAddress.appendChild(headerDeliveryAddress);

    const formDeliveryAddress = document.createElement('form');
    formDeliveryAddress.id = 'form_id';
    this.divDeliveryAddress.appendChild(formDeliveryAddress);
    // город
    const labelFormDeliveryCity = document.createElement('label');
    labelFormDeliveryCity.textContent = 'город: ';
    const inputDeliveryCity = document.createElement('input');
    inputDeliveryCity.id = 'input_city_id';
    labelFormDeliveryCity.appendChild(inputDeliveryCity);
    formDeliveryAddress.appendChild(labelFormDeliveryCity);

    labelFormDeliveryCity.insertAdjacentHTML('afterend', '<br>');
    // улица
    const labelFormDeliveryStreet = document.createElement('label');
    labelFormDeliveryStreet.textContent = 'улица/микрорайон/квартал: ';
    const inputDeliveryStreet = document.createElement('input');
    inputDeliveryStreet.id = 'input_street_id';
    labelFormDeliveryStreet.appendChild(inputDeliveryStreet);
    formDeliveryAddress.appendChild(labelFormDeliveryStreet);
    labelFormDeliveryStreet.insertAdjacentHTML('afterend', '<br>');
    // дом
    const labelFormDeliveryHouse = document.createElement('label');
    labelFormDeliveryHouse.textContent = 'номер дома: ';
    const inputDeliveryHouse = document.createElement('input');
    inputDeliveryHouse.id = 'input_house_id';
    labelFormDeliveryHouse.appendChild(inputDeliveryHouse);
    formDeliveryAddress.appendChild(labelFormDeliveryHouse);
    labelFormDeliveryHouse.insertAdjacentHTML('afterend', '<br>');

    const btnFormDeliveryAddress = document.createElement('button')
    btnFormDeliveryAddress.id = 'btn_delivery_id';
    btnFormDeliveryAddress.textContent = `Сохранить адрес доставки`;
    formDeliveryAddress.appendChild(btnFormDeliveryAddress);

    // console.log(this.divDeliveryAddress);
    this.divBasket.appendChild(this.divDeliveryAddress);
    this.insideDivBasket = 'DeliveryAddress';
    // console.log(this.insideDivBasket);
    this.renderButtonFurther();
  },


  // renderComment
  renderComment() {
    this.divBasket.innerHTML = '';
    const divComment = document.createElement('div');
    divComment.classList.add('div_comment');

    this.renderOneLine(divComment, this.divOneLineBasket, 'Состав корзины');

    const divOneLineDeliveryAddress = document.createElement('div');
    divOneLineDeliveryAddress.classList.add('div_one_line');
    divOneLineDeliveryAddress.textContent = 'Адрес доставки';
    divOneLineDeliveryAddress.addEventListener('click', () => {
    this.renderDeliveryAddress();
    });
    divComment.appendChild(divOneLineDeliveryAddress);

    const headerComment = document.createElement('h2');
    headerComment.classList.add('basket_info_header');
    headerComment.textContent = 'Добавьте комментарий к Вашему заказу:';
    divComment.appendChild(headerComment);

    const textareaComment = document.createElement('textarea');
    textareaComment.id = 'textarea_comment_id';
    textareaComment.setAttribute('cols', '30');
    textareaComment.setAttribute('row', '10');
    textareaComment.setAttribute('placeholder', 'Ваш комментарий к заказу');
    textareaComment.classList.add('text_area_comment');
    divComment.appendChild(textareaComment);
    const brComment = document.createElement('br');
    divComment.appendChild(brComment);

    const btnSaveComment = document.createElement('button')
    btnSaveComment.id = 'btn_delivery_id';
    btnSaveComment.textContent = `Добавить комментарий к заказу`;
    divComment.appendChild(btnSaveComment);

    this.divBasket.appendChild(divComment);
    this.insideDivBasket = 'Comment';
    // console.log(this.insideDivBasket);
    this.renderButtonFurther();
  },

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
      // const stringProd = `${prod.id}`;
      hProductCardHead.id = `${prod.id}`;
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
    // Object.assign(this.settings, userSettings);
    this.modalImageClose = this.settings.modalImageClose;

    const galleryContainerAll = document.querySelectorAll(this.settings.previewSelector);
    galleryContainerAll.forEach((galleryContainer) => {
      galleryContainer.addEventListener('click', (event) => this.containerClickHandler(event));
    });
  },

  containerClickHandler(event) {
    // console.log(event.target);
    if (event.target.tagName !== 'IMG') {
      return;
    }
    this.modalNow = event.target;
    this.createGalleryModal(this.modalNow);
    // после загрузки модалки включается слушатель кнопок:
    this.setEventHandlers();
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
    this.galleryModal.appendChild(galleryClose);

    // стрелка влево
    const galleryPrev = new Image();
    galleryPrev.classList.add(this.settings.modalImagePrev);
    galleryPrev.src = this.settings.modalImagePrevSrc;
    this.galleryModal.appendChild(galleryPrev);

    // стрелка вправо
    const galleryNext = new Image();
    galleryNext.classList.add(this.settings.modalImageNext);
    galleryNext.src = this.settings.modalImageNextSrc;
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
  close() {
    const closeImg = this.galleryModal.querySelector(`.${this.modalImageClose}`);
    closeImg.parentElement.remove();
  },
  //
  prevImg() {
    this.modalNow = (this.modalNow.previousElementSibling === null) ? this.modalNow.parentElement.lastElementChild : this.modalNow.previousElementSibling;
    this.imageInModal(this.modalNow);
  },
  //
  nextImg() {
    this.modalNow = (this.modalNow.nextElementSibling === null) ? this.modalNow.parentElement.firstElementChild : this.modalNow.nextElementSibling;
    this.imageInModal(this.modalNow);
  },

  // переключение кнопками и по клику в модалке =================================
  setEventHandlers() {
    // Close
    const toClose = '.'+ this.settings.modalImageClose;
    this.galleryModal.querySelector(toClose).addEventListener('click', () => this.close());
    // картинка Next - Right
    const toNext = '.'+ this.settings.modalImageNext;
    this.galleryModal.querySelector(toNext).addEventListener('click', () => this.nextImg());
    // картинка Prev - Left
    const toPrev = '.'+ this.settings.modalImagePrev;
    this.galleryModal.querySelector(toPrev).addEventListener('click', () => this.prevImg());
    // нажатие клавиш
    document.addEventListener( 'keydown', (event) => {
      // console.log(event);
      this.keyDownHandler(event);
    });
  },

  keyDownHandler(event) {
    const isGalleryModal = document.querySelector(`.${this.settings.modalImageContainer}`);
    // слушатель кнопок должен работать только внутри модалки:
    if (isGalleryModal === null) {
      return;
    }
    this.actionByCode(event.code);
  },

  // actionByCode(event.code) Action
  actionByCode(code) {
    switch (code) {
      case 'Escape':
        // return 'Escape';
        this.close();
        break;
      case 'ArrowLeft':
        // return 'left';
        this.prevImg();
        break;
      case 'ArrowRight':
        // return 'right';
        this.nextImg();
        break;
    }
  },
  // переключение кнопками и по клику в модалке =================================
};
