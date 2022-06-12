/* 1.
С помощью цикла while вывести все простые числа в промежутке от 0 до 100.
*/
console.log('\n1. С помощью цикла while вывести все простые числа в промежутке от 0 до 100.');

// функция для создания множества от min до max с шагом step:
function mySetRange(min, max, step) {
  const setRange = new Set();  // создание множества
  for (let i = min; i < max; setRange.add(i), i += step) {};  //заполнение множества от min до max с шагом step
  return setRange;
}

// функция "Решето Эратосфена"
function sieveEr(n) {
  const result = [];  // массив для сохранения простых чисел
  let sieve = mySetRange(2, n + 1, 1);  // множества чисел до 100.

  // цикл обхода множества
  while (sieve.size > 0) {
    let prime = Math.min(...sieve);  // минимальное значение в массиве
    result.push(prime);  // добавление этого значения в результирующий список
    const sieve2 = mySetRange(prime, n + 1, prime);  // множество от prime до конца с шагом prime
    sieve = new Set([...sieve].filter(x => !sieve2.has(x)));  // разнсоть множеств
  };
  // вывод результатируещего списка:
  return result;
};

console.log('Список простых чисел от 0 до 100:');
console.log(sieveEr(100).join(', '));

// **************************************************

/*
4.
* Вывести с помощью цикла for числа от 0 до 9, не используя тело цикла.
Выглядеть это должно так:
for(...){// здесь пусто}
*/
console.log('\n4. * Вывести с помощью цикла for числа от 0 до 9, не используя тело цикла.');
for (let i = 0; i < 10; console.log(i), i++) {};


// **************************************************

/*
5. * Нарисовать пирамиду с 20 рядами с помощью console.log, как показано на рисунке:
X
XX
XXX
XXXX
XXXXX
*/

console.log('\n5. * Нарисовать пирамиду с 20 рядами с помощью console.log');
for (let i = 'x'; i.length < 21; console.log(i), i += 'x') {};

// **************************************************

// Другая пирамида
console.log('\nДругая пирамида:');

// height of the pyramid
const heightPyramid = 21;  // высота пирамиды
const startK = Math.floor(heightPyramid / 2);  // стартовый коэфициент

// Стартовый массив для пирамиды
const pyramid = [];
for (let i = 0; i < startK; pyramid.push(' '), i++) {};
pyramid.push('X');

console.log('\nПирамида:');
// Строительство пирамиды ;)
console.log(pyramid.join(''));  // выводим первую строку
for (var i = 0; i < heightPyramid; i++) {
  pyramid.splice(pyramid.length - i - 2, 1);  // удаляем пробел перед первым X
  pyramid.push('XX');  // добавляем XX в конец массива
  console.log(pyramid.join(''));  // выводим строку
};


// **************************************************
