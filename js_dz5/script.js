/*
1.
Создать функцию, генерирующую шахматную доску. Можно использовать любые html-теги.
Доска должна быть верно разлинована на черные и белые ячейки.
Строки должны нумероваться числами от 1 до 8, столбцы — латинскими буквами A, B, C, D, E, F, G, H.
*/
// -----------------------------------------------------------------

// настройки
const settings = {
	rowsCount: 10,
	colsCount: 10,
	chessCols: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
};

const player = {
  direction: null,

  init(chessCols) {
    this.chessCols = chessCols;
  },

  makeStep() {
    //
  },
}

//
const chess = {
  settings: settings,
  player: player,
  containerElement: null,

  init() {
    this.player.init(
			this.settings.chessCols,
    );
    this.containerElement = document.getElementById('chess');
		this.renderChessDesk();
		// this.renderChesssymbols();
    //
  },

  runChess() {
    this.init();
  },

  // Отрисовка шахматной доски
  renderChessDesk() {
    // вычищаем this.containerElement (<table id="chess"></table>):
    this.containerElement.innerHTML = '';

		let charChess;
		let numChess;
    for (let row = 0; row < this.settings.rowsCount; row++) {
      const trElem = document.createElement('tr');
      this.containerElement.append(trElem);
      for (let col = 0; col < this.settings.colsCount; col++) {
        const tdElem = document.createElement('td');

				switch (true) {
					case (
						// верхнее поле с буквами
						row === 0 && col > 0 && col < this.settings.rowsCount - 1
					):
						tdElem.classList.add('border_field', 'border_field_top');
						charChess = this.settings.chessCols[col - 1];
						tdElem.textContent = charChess;
						break;
					case (
						// нижнее поле с буквами
						row === this.settings.rowsCount - 1 && col > 0 &&
						col < this.settings.rowsCount - 1
					):
						tdElem.classList.add('border_field', 'border_field_bottom');
						charChess = this.settings.chessCols[col - 1];
						tdElem.textContent = charChess;
						// console.log(tdElem);
						break;
					case (row === 0 || row === this.settings.rowsCount - 1):
						// угловые клетки
						tdElem.classList.add('border_field');
						// console.log(tdElem);
						break;
					case (col === 0):
						// левое поле с цифрами
						numChess = 9 - row;
						// console.log(numChess);
						tdElem.classList.add('border_field', 'border_field_left');
						tdElem.textContent = numChess;
						break;
					case (col === this.settings.colsCount - 1):
						// правое поле с цифрами
						numChess = 9 - row;
						// console.log(numChess);
						tdElem.classList.add('border_field', 'border_field_right');
						tdElem.textContent = numChess;
						break;
					case (
						row % 2 !== 0 && col % 2 ===0 ||
	          row % 2 === 0 && col % 2 !==0
					):
						// клетки внутри
						tdElem.style.backgroundColor = '#808ba0';
	          tdElem.style.borderColor = '#dbdbdd';

						switch (true) {
							case (row === 8 && col === 7):
								// console.log('белый конь');
								tdElem.innerHTML = '&#9816;'
								break;
							case (row === 8 && col === 5):
								// console.log('белый король');
								tdElem.innerHTML = '&#9812;'
								break;
							case (row === 8 && col === 3):
								// console.log('белый слон');
								tdElem.innerHTML = '&#9815;'
								break;
							case (row === 8 && col === 1):
								// console.log('белая ладья');
								tdElem.innerHTML = '&#9814;'
								break;
							case (row === 7):
								// console.log('белая пешка');
								tdElem.innerHTML = '&#9817;'
								break;

							case (row === 1 && col === 2):
								// console.log('черный конь');
								tdElem.innerHTML = '&#9822;'
								break;
							case (row === 1 && col === 4):
								// console.log('черный ферзь');
								tdElem.innerHTML = '&#9819;'
								break;
							case (row === 1 && col === 6):
								// console.log('черный слон');
								tdElem.innerHTML = '&#9821;'
								break;
							case (row === 1 && col === 8):
								// console.log('черная ладья');
								tdElem.innerHTML = '&#9820;'
								break;
							case (row === 2):
								// console.log('черная пешка');
								tdElem.innerHTML = '&#9823;'
								break;
						}
						// &#9812;
						break;
						case (row === 8 && col === 2):
							// console.log('белый конь');
							tdElem.innerHTML = '&#9816;'
							break;
						case (row === 8 && col === 4):
							// console.log('белый ферзь');
							tdElem.innerHTML = '&#9813;'
							break;
						case (row === 8 && col === 6):
							// console.log('белый слон');
							tdElem.innerHTML = '&#9815;'
							break;
						case (row === 8 && col === 8):
							// console.log('белая ладья');
							tdElem.innerHTML = '&#9814;'
							break;
						case (row === 7):
							// console.log('белая пешка');
							tdElem.innerHTML = '&#9817;'
							break;

						case (row === 1 && col === 7):
							// console.log('черный конь');
							tdElem.innerHTML = '&#9822;'
							break;
						case (row === 1 && col === 5):
							// console.log('черный король');
							tdElem.innerHTML = '&#9818;'
							break;
						case (row === 1 && col === 3):
							// console.log('черный слон');
							tdElem.innerHTML = '&#9821;'
							break;
						case (row === 1 && col === 1):
							// console.log('черная ладья');
							tdElem.innerHTML = '&#9820;'
							break;
						case (row === 2):
							// console.log('черная пешка');
							tdElem.innerHTML = '&#9823;'
							break;
				}
        trElem.append(tdElem);
      }
    }
  },

	/*
	renderChesssymbols() {
		// расставим фигуры
		for (let row = 0; row < this.settings.rowsCount; row++) {
      console.log(row);
			// console.log(this);
      for (let col = 0; col < this.settings.colsCount; col++) {
				console.log('col ' + col);
				let chessCell = this.containerElement.getElementsByTagName('td');
				console.log(chessCell);
				switch (true) {
					case (row === 1 && col === 1 || row === 1 && col === 8):
						console.log('черная ладья');
						break;

					case (1 2 || 1 7):
						черный конь
						break;
					case (1 3 || 1 6):
						черный слон
						break;
					case (1 4):
						черный ферзь
						break;
					case (1 5):
						черный король
						break;
					case (2 1 --- 2 8):
						черная пешка
						break;
					case (2 1 || 2 8):
						белая ладья
						break;
					case (2 2 || 2 7):
						белый конь
						break;
					case (2 3 || 2 6):
						белый слон
						break;
					case (8 4):
						белый ферзь
						break;
					case (8 5):
						белый король
						break;
					case (7 1 ---7 8):
						белая пешка
						break;
					default:
				}

			}
		}
	}
	*/
}

window.addEventListener( 'load', () => {
  // здесь вызовем chess.runChess()
  chess.runChess();
});
