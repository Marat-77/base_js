/*
const goods = [
  {
    "id": 1001,
    "name": "Ручка синяя",
    "price": 23.10,
    "currency": "рубль",
    "description": "Отличная ручка! Она может писать!",
    "quantity": 100
  },
  {
    "id": 1002,
    "name": "Карандаш",
    "price": 8.90,
    "currency": "рубль",
    "description": "Отличный карандаш! Карандашом можно рисовать!",
    "quantity": 100
  },
  {
    "id": 1003,
    "name": "Линейка",
    "price": 18.2,
    "currency": "рубль",
    "description": "Отличная линейка! Линейкой можно измерять!",
    "quantity": 98
  },
  {
    "id": 1004,
    "name": "Тетрадь",
    "price": 20.5,
    "currency": "рубль",
    "description": "Отличная тетрадь! В тетради можно писать!",
    "quantity": 98
  },
]
*/

const basket = [
  [1001, "Ручка синяя", 23.10, "рубль", 2],
  [1002, "Карандаш", 8.90, "рубль", 9],
  [1003, "Линейка", 18.20, "рубль", 1],
  [1004, "Тетрадь", 20.5, "рубль", 8],
]

const basket2 = [
  [1003, "Линейка", 18.20, "рубль", 1],
  [1004, "Тетрадь", 20.5, "рубль", 1],
]

const countBasketPrice =(basket) => {
  return basket.reduce( (count, value) => {
    return count + value[2] * value[4];
  }, 0);
}

console.log('Суммарная стоимость товаров первой корзины:');
console.log(countBasketPrice(basket));
console.log('Суммарная стоимость товаров второй корзины:');
console.log(countBasketPrice(basket2));
