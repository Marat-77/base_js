/* 3.
Объявить две целочисленные переменные — a и b и задать им произвольные начальные значения.
Затем написать скрипт, который работает по следующему принципу:
если a и b положительные, вывести их разность;
если a и b отрицательные, вывести их произведение;
если a и b разных знаков, вывести их сумму;
Ноль можно считать положительным числом.
*/
let a;
let b;

function calculation( a, b ){
  if ( a >=0 && b >=0 ) {
    return  a - b;
  } else if (a <0 && b <0) {
    return a * b;
  } else if (a <0 || b >=0 ) {
    return a + b;
  }
}

a = 5;
b = 7;
console.log(`Входные данные: a = ${a}, b = ${b}`);
alert(`Входные данные: a = ${a}, b = ${b}`);
console.log(`Результат: ${calculation(a, b)}`);
alert(`Результат: ${calculation(a, b)}`);

a = -3;
b = -6;
console.log(`Входные данные: a = ${a}, b = ${b}`);
alert(`Входные данные: a = ${a}, b = ${b}`);
console.log(`Результат: ${calculation(a, b)}`);
alert(`Результат: ${calculation(a, b)}`);

a = -3;
b = 4;
console.log(`Входные данные: a = ${a}, b = ${b}`);
alert(`Входные данные: a = ${a}, b = ${b}`);
console.log(`Результат: ${calculation(a, b)}`);
alert(`Результат: ${calculation(a, b)}`);

// **************************************************

/*
4.
Присвоить переменной а значение в промежутке [0..15].
С помощью оператора switch организовать вывод чисел от a до 15.
*/

function printList() {
  let a = Math.floor(Math.random() * 15);
  console.log(`a = ${a}`);
  switch (a){
      case (0):
          console.log(0)
          ++a
      case (1):
          console.log(1)
          ++a
      case (2):
          console.log(2)
          ++a
      case (3):
          console.log(3)
          ++a
      case (4):
          console.log(4)
          ++a
      case (5):
          console.log(5)
          ++a
      case (6):
          console.log(6)
          ++a
      case (7):
          console.log(7)
          ++a
      case (8):
          console.log(8)
          ++a
      case (9):
          console.log(9)
          ++a
      case (10):
          console.log(10)
          ++a
      case (11):
          console.log(11)
          ++a
      case (12):
          console.log(12)
          ++a
      case (13):
          console.log(13)
          ++a
      case (14):
          console.log(14)
          ++a
      case (15):
          console.log(15)
          ++a
  }
}

// Решение с помощью for
function printListFor() {
  const randNum = Math.floor(Math.random() * 15);
  console.log(`a = ${randNum}`);
  for (let i = randNum; i < 15; i++) {
    return randNum, i;
  }
}

console.log('\n4. Присвоить переменной а значение в промежутке [0..15].' +
'С помощью оператора switch организовать вывод чисел от a до 15.');
printList();

console.log('\n4. Решение через "for"');
console.log(printListFor());

// **************************************************

/*
5. Реализовать четыре основные арифметические операции в виде функций с двумя параметрами. Обязательно использовать оператор return.
*/
console.log('\n5. Реализовать четыре основные арифметические операции в виде функций с двумя параметрами. Обязательно использовать оператор return.');

function mySum(x, y) {
  return x + y;
}

function myDiff(x, y) {
  return x - y;
}

function myMult(x, y) {
  return x * y;
}

function myDiv(x, y) {
  if ( y == 0 ) {
    return 'error: на ноль делить нельзя';
  }else {
    return x / y;
  }
}

a = 5;
b = 7;

console.log(`a = ${a}, b = ${b}`);
console.log(`a + b = ${mySum(a, b)}`);
console.log(`a - b = ${myDiff(a, b)}`);
console.log(`a * b = ${myMult(a, b)}`);
console.log(`a / b = ${myDiv(a, b)}`);

console.log(`a / 0 = ${myDiv(a, 0)}`);

// **************************************************

/*
6. Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation), где arg1, arg2 — значения аргументов, operation — строка с названием операции. В зависимости от переданного значения выполнить одну из арифметических операций (использовать функции из пункта 5) и вернуть полученное значение (применить switch).
*/

function mathOperation(arg1, arg2, operation) {
  switch (operation) {
    case '+':
      return mySum(arg1, arg2);
    case '-':
      return myDiff(arg1, arg2);
    case '*':
      return myMult(arg1, arg2);
    case '/':
      return myDiv(arg1, arg2);
    default:
      return 'error: неизвестное действие'
  }
}

console.log(`a + b = ${mathOperation(a, b, '+')}`);
console.log(`a - b = ${mathOperation(a, b, '-')}`);
console.log(`a * b = ${mathOperation(a, b, '*')}`);
console.log(`a / b = ${mathOperation(a, b, '/')}`);
console.log(`a / 0 = ${mathOperation(a, 0, '/')}`);

console.log(`a r b = ${mathOperation(a, b, 'r')}`);

// **************************************************

console.log('\n7. Сравнение 0 и null');

console.log(`0 > null: ${0 > null}`);  // false
console.log(`0 < null: ${0 < null}`);  // false
/*
сранение 0 > nul (0 < null, null > 0, null < 0) в JS происходит по Алгоритму сравнения абстрактного отношения (7.2.13 Abstract Relational Comparison https://262.ecma-international.org/12.0/#sec-abstract-relational-comparison)
x > y
x = 0, y = null
В пунктах 1 и 2 алгоритм преобразует левую (0) и правую (null) в примитивы, но при этом 0 и null остаются 0 и null:
px = ToPimitive(x) = 0
py = ToPimitive(x) = null
в п.3 не заходим - так как тип px и тип py не являются строками (String)
в п.4 попадаем в подпункты d. и e., где px py преобразовываются:
nx = ToNumber(px) = 0
ny = ToNumber(px) = +0 (positive zero)
в итоге заходим в подпункт k. и сравниваем nx и ny:
если nx < ny - true, иначе false
0 < +0 - false
Следовательно 0 > nul - false.
*/

console.log(`0 == null: ${0 == null}`);  // false
/*
сранение 0 == nul (null == 0) в JS происходит по Алгоритму сравнения абстрактного равенства  (7.2.14 Abstract Equality Comparison https://262.ecma-international.org/12.0/#sec-abstract-equality-comparison)
в п.1 не попадаем, т.к. Type(x) и Type(y) разные
п.2-п.10
попадаем в п.11, так как наш Type(x) - Number, а Type(y) - Object, следовательно надо вернуть результат сравнения x == ToPrimitive(y), в нашем случае
y = null
py = ToPimitive(y) = null
при сравнении x == py (0 и null) получаем false
Следовательно 0 == nul - false.
*/

console.log(`0 >= null: ${0 >= null}`);  // true
console.log(`0 <= null: ${0 <= null}`);  // true
/*
В случае с 0 >= null JS производит проверку 0 < null - если false, то true
то есть если 0 не меньше null - значит 0 >= null верно
*/

// **************************************************

/*
8 * С помощью рекурсии организовать функцию возведения числа в степень. Формат: function power(val, pow), где val — заданное число, pow –— степень.
*/

console.log('\n8. * С помощью рекурсии организовать функцию возведения числа в степень.');

function power(val, pow) {
    if (pow === 0) {
            return 1
        }
    if (pow === 1) {
            return val
        }

    if (pow > 0) {
        return val * power(val, pow - 1)
    }
    else {
        return  1 / val * power(val, pow + 1)
    }
}

console.log(power(2, 3));
console.log(power(2, -3));
