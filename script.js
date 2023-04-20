//Ряды для создания клавиатуры

const ROWS = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',"TAB", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\", 'DEL', 'CAPS LOCK', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'ENTER', 'SHIFT', '\\', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', '0', 'SHIFT', 'CTRL', 'WIN', 'ALT', '', 'ALT', 'CTRL', '', '', ''];
const ROW1_TOP = [ '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', ''];

const body = document.querySelector('body');

const keyboard = {
  elements: {
    textarea: null,
    main: null,
    rows: null,
    button: null
  },

  init() {
    this.elements.textarea = document.createElement('textarea');
    this.elements.textarea.rows = 15;
    this.elements.textarea.className = 'text';
    body.append(this.elements.textarea);

    this.elements.main = document.createElement('div');
    this.elements.main.className = 'keyboard';
    body.append(this.elements.main);

    this.elements.rows = document.createElement('div');
    this.elements.rows.className = 'row';
    this.elements.main.append(this.elements.rows);
  },

  createButtons() {
    for(let i=0; i<ROWS.length; i++) {
      this.elements.button = document.createElement('button');
      if(i>=0 && i<=12) {
        const topLetter = document.createElement('div');
        const centerLetter = document.createElement('div');
        topLetter.className = 'row1__top_letter';
        topLetter.textContent = ROW1_TOP[i];
        centerLetter.textContent = ROWS[i];
        this.elements.button.append(topLetter);
        this.elements.button.append(centerLetter);
        this.elements.button.className = 'row__letter';
      } else if( i === 54) {
        this.elements.button.className = 'row__letter';
        this.elements.button.classList.add('up');
      } else if(i === 62) {
        this.elements.button.className = 'row__letter';
        this.elements.button.classList.add('left');
      } else if(i === 63) {
        this.elements.button.className = 'row__letter';
        this.elements.button.classList.add('down');
      } else if(i === 64) {
        this.elements.button.className = 'row__letter';
        this.elements.button.classList.add('right');
      } else {
        this.elements.button.textContent = ROWS[i];
        this.elements.button.className = 'row__letter';
      }
      if(i >= 56) {
        this.elements.button.classList.add('row5__letter');
      }
      this.elements.rows.append(this.elements.button);
  }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  keyboard.init()
  keyboard.createButtons()
})
