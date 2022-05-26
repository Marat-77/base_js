/* 1.
Задать температуру в градусах по Цельсию.
Вывести в alert соответствующую температуру в градусах по Фаренгейту.
Подсказка: расчет идет по формуле Tf = (9 / 5) * Tc + 32,
где Tf — температура по Фаренгейту, Tc — по Цельсию.
*/

// degreeCelsius - переменная со значением температуры в градусах Цельсия
let degreeCelsius = 20.3255;
// degreeCelsius - переменная со значением температуры в градусах по Фаренгейту.
// значение округляется до 1 знака после запятой
let degreeFahrenheit = ((9 / 5) * degreeCelsius + 32).toFixed(1);
alert(`Комнатная температура: ${degreeFahrenheit} градусов по шкале Фаренгейта`);

/*
2.
Объявить две переменные: admin и name. Записать в name строку "Василий";
Скопировать значение из name в admin. Вывести admin (должно вывестись «Василий»).
*/
let name = 'Василий';
let admin = name;
alert(admin);