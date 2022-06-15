# Базовый курс JavaScript
## Урок 4. Объекты в JavaScript
### Практическое задание

1. Написать функцию, преобразующую число в объект.
Передавая на вход число от 0 до 999, надо получить на выходе объект, в котором в соответствующих свойствах описаны единицы, десятки и сотни.
Например, для числа 245 надо получить следующий объект: {‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}.
Если число превышает 999, необходимо выдать соответствующее сообщение с помощью console.log и вернуть пустой объект.

Решение:

```js
function ObjectNum(num) {
  numArr = [];
  for (let i of String(num)) {
    numArr.push(+i);
  }

  if (num > 999 || num < 0) {
    console.log('Число должно быть от 0 до 999 (включительно)');
    return {};
  }

  this.units = numArr[numArr.length - 1];
  switch (true) {
      case (numArr.length > 1):
          this.tens = numArr[numArr.length - 2]
      case (numArr.length > 2):
          this.hundreds = numArr[numArr.length - 3]
  }
}

const number1 = new ObjectNum(456);

console.log(number1);
console.log('тип number1: ' + typeof(number1));
console.log('Единицы: ' + number1.units);
console.log('Десятки: ' + number1.tens);
console.log('Сотни: ' + number1.hundreds);

const number2 = new ObjectNum(1000);

console.log(number2);
console.log('тип number2: ' + typeof(number2));
```

2. Продолжить работу с интернет-магазином:
a. В прошлом домашнем задании вы реализовали корзину на базе массивов. Какими объектами можно заменить их элементы?
b. Реализуйте такие объекты.
c. Перенести функционал подсчета корзины на объектно-ориентированную базу.

3. \* Подумать над глобальными сущностями
К примеру, сущность «Продукт» в интернет-магазине актуальна не только для корзины, но и для каталога.
Стремиться нужно к тому, чтобы объект «Продукт» имел единую структуру для различных модулей сайта, но в разных местах давал возможность вызывать разные методы.

Решение:

```js
// Класс Goods(Товары )
class Goods {
  constructor(
    id,
    price=0.0,
    name='Товар',
    description='Описание товара',
    quantity=0,
    currency='рубль'
  ) {
    this.id = id;
    this.price = price;
    this.name = name;
    this.description = description;
    this.quantity = quantity;
    this.currency = currency;
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
  100
);

const product2 = new Goods(
  1002,
  8.90,
  'Карандаш',
  'Отличный карандаш! Карандашом можно рисовать!',
  100
);

const product3 = new Goods(
  1003,
  18.20,
  'Линейка',
  'Отличная линейка! Линейкой можно измерять!',
  100
);

const product4 = new Goods(
  1004,
  20.50,
  'Тетрадь',
  'Отличная тетрадь! В тетради можно писать!',
  100
);

const mybasket01 = new Basket (7000001);
mybasket01.addToBasket(product1, 5);
mybasket01.infoBasket();
mybasket01.addToBasket(product2, 1);
mybasket01.infoBasket();
console.log('===================================');
console.log(mybasket01.totalBasket());
console.log('');
const mybasket02 = new Basket (7000002);
mybasket01.addToBasket(product1, 5);
mybasket01.addToBasket(product2, 8);
mybasket01.addToBasket(product3, 6);
mybasket01.addToBasket(product4, 23);
console.log('===================================');
mybasket02.infoBasket();
console.log(mybasket01.totalBasket());

console.log('');
console.log(product1);
console.log(product2);
console.log(product3);
console.log(product4);

console.log('');
console.log('===================================');
const product5 = [];
mybasket01.addToBasket(product5, 23);

```
