/*
1.
Написать функцию, преобразующую число в объект.
Передавая на вход число от 0 до 999, надо получить на выходе объект, в котором в соответствующих свойствах описаны единицы, десятки и сотни.
Например, для числа 245 надо получить следующий объект: {‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}.
Если число превышает 999, необходимо выдать соответствующее сообщение с помощью console.log и вернуть пустой объект.
*/

function ObjectNum(num) {
  numArr = [];
  for (let i of String(num)) {
    numArr.push(+i);
  };

  if (num > 999 || num < 0) {
    console.log('Число должно быть от 0 до 999 (включительно)');
    return {}
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

// **********************************
