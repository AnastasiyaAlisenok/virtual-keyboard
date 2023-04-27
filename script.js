// Ряды для создания клавиатуры
const body = document.querySelector('body');

class Keyboard {
  constructor() {
    this.ROWS = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'TAB', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\', 'DEL', 'CAPS LOCK', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'ENTER', 'SHIFT', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', '', 'SHIFT', 'CTRL', 'WIN', 'ALT', 'SPACE', 'ALT', '', '', '', 'CTRL'];
    this.ROWS_SHIFT = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace', 'TAB', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'DEL', 'CAPS LOCK', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'ENTER', 'SHIFT', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '', 'SHIFT', 'CTRL', 'WIN', 'ALT', 'SPACE', 'ALT', '', '', '', 'CTRL'];
    this.rusRows = ['ё', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.'];
    this.textarea = null;
    this.main = null;
    this.rows = null;
    this.button = null;
    this.value = '';
    this.capsLock = false;
  }

  init() {
    this.textarea = document.createElement('textarea');
    this.textarea.rows = 10;
    this.textarea.className = 'text';
    body.append(this.textarea);

    this.main = document.createElement('div');
    this.main.className = 'keyboard';
    body.append(this.main);

    this.rows = document.createElement('div');
    this.rows.className = 'row';
  }

  addButtons() {
    for (let i = 0; i < this.ROWS.length; i += 1) {
      const button = document.createElement('button');
      if (i === 13 || i === 14 || i === 28 || i === 29
        || i === 41 || i === 42 || i === 63 || (i >= 54 && i <= 59)) {
        button.textContent = this.ROWS[i];
        button.className = 'row__letter';
      } else if (i === 53) {
        button.className = 'row__letter';
        button.classList.add('up');
      } else if (i === 60) {
        button.className = 'row__letter';
        button.classList.add('left');
      } else if (i === 61) {
        button.className = 'row__letter';
        button.classList.add('down');
      } else if (i === 62) {
        button.className = 'row__letter';
        button.classList.add('right');
      } else {
        button.textContent = this.ROWS[i].toLowerCase();
        button.className = 'row__letter';
        button.classList.add('letter');
      }
      if (i >= 55) {
        button.classList.add('row5__letter');
      }

      switch (button.textContent) {
        case 'Backspace':
          button.addEventListener('click', () => {
            button.classList.add('active');
            this.value = this.value.substring(0, this.value.length - 1);
            this.textarea.value = this.value;
          });
          button.addEventListener('animationend', () => {
            button.classList.remove('active');
          });
          break;

        case 'CAPS LOCK':
          button.addEventListener('click', () => {
            button.classList.add('active');
            this.toggleCapsLock();
            button.classList.toggle('caps', this.capsLock);
          });
          break;

        case 'SPACE':
          button.addEventListener('click', () => {
            button.classList.add('active');
            this.value += ' ';
            this.textarea.value = this.value;
          });
          button.addEventListener('animationend', () => {
            button.classList.remove('active');
          });
          break;

        case 'ENTER':
          button.addEventListener('click', () => {
            button.classList.add('active');
            this.value += '\n';
            this.textarea.value = this.value;
          });
          button.addEventListener('animationend', () => {
            button.classList.remove('active');
          });
          break;

        case 'TAB':
          button.addEventListener('click', () => {
            button.classList.add('active');
            this.value += '    ';
            this.textarea.value = this.value;
          });
          button.addEventListener('animationend', () => {
            button.classList.remove('active');
          });
          break;

        case 'DEL':
          button.addEventListener('click', () => {
            button.classList.add('active');
            this.value = this.textarea.value.slice(0, this.textarea.selectionStart)
            + this.textarea.value
              .slice(this.textarea.selectionStart + 1, this.textarea.value.length);
            this.textarea.value = this.value;
          });
          button.addEventListener('animationend', () => {
            button.classList.remove('active');
          });
          break;

        case 'CTRL':
          button.addEventListener('click', () => {
            button.classList.add('active');
          });
          button.addEventListener('animationend', () => {
            button.classList.remove('active');
          });
          break;

        case 'SHIFT':
          button.addEventListener('mousedown', () => {
            button.classList.add('active-shift');
            const buttons = document.querySelectorAll('.row__letter');
            for (let j = 0; j < buttons.length; j += 1) {
              buttons[j].textContent = this.ROWS_SHIFT[j];
            }
          });
          button.addEventListener('mouseup', () => {
            button.classList.remove('active-shift');
            const buttons = document.querySelectorAll('.row__letter');
            for (let j = 0; j < buttons.length; j += 1) {
              if (j === 13 || j === 14 || j === 28 || j === 29
                || j === 41 || j === 42 || j === 63 || (j >= 54 && j <= 59)) {
                buttons[j].textContent = this.ROWS[j];
              } else {
                buttons[j].textContent = this.ROWS[j].toLowerCase();
              }
            }
          });
          break;

        case 'ALT':
          button.addEventListener('click', () => {
            button.classList.add('active');
          });
          button.addEventListener('animationend', () => {
            button.classList.remove('active');
          });
          break;

        default:
          button.addEventListener('click', (event) => {
            button.classList.add('active');
            if (event.shiftKey) {
              this.value += button.textContent;
            } else {
              this.value += this.capsLock ? button.textContent.toUpperCase()
                : button.textContent.toLowerCase();
            }
            this.textarea.value = this.value;
          });
          button.addEventListener('animationend', () => {
            button.classList.remove('active');
          });
          break;
      }
      this.rows.append(button);
    }
    this.main.append(this.rows);
  }

  toggleCapsLock() {
    const letters = document.querySelectorAll('.letter');
    this.capsLock = !this.capsLock;

    letters.forEach((item) => {
      const letter = item;
      if (letter.childElementCount === 0) {
        letter.textContent = this.capsLock ? letter.textContent.toUpperCase()
          : letter.textContent.toLowerCase();
      }
    });
  }

  clickPhisicalKeyboard() {
    document.addEventListener('keydown', (event) => {
      event.preventDefault();
      const buttons = document.querySelectorAll('.row__letter');
      const letter = Array.from(buttons).find((item) => item.innerHTML === event.key.toLowerCase()
      || item.textContent === event.key || item.innerHTML.toLowerCase() === event.key);

      if (event.key === 'Backspace') {
        this.value = this.value.substring(0, this.value.length - 1);
        buttons.forEach((item) => (item.textContent === 'Backspace' ? item.classList.add('active') : 0));
      } else if (event.key === 'Enter') {
        this.value += '\n';
        buttons.forEach((item) => (item.textContent === 'ENTER' ? item.classList.add('active') : 0));
      } else if (event.code === 'ControlLeft') {
        for (let i = 0; i < buttons.length; i += 1) {
          if (i === 55 && buttons[i].textContent === 'CTRL') {
            buttons[i].classList.add('active');
          }
        }
      } else if (event.code === 'ControlRight') {
        for (let i = 0; i < buttons.length; i += 1) {
          if (i === 63 && buttons[i].textContent === 'CTRL') {
            buttons[i].classList.add('active');
          }
        }
      } else if (event.code === 'AltLeft') {
        for (let i = 0; i < buttons.length; i += 1) {
          if (i === 57 && buttons[i].textContent === 'ALT') {
            buttons[i].classList.add('active');
          }
        }
      } else if (event.code === 'AltRight') {
        for (let i = 0; i < buttons.length; i += 1) {
          if (i === 59 && buttons[i].textContent === 'ALT') {
            buttons[i].classList.add('active');
          }
        }
      } else if (event.code === 'ShiftLeft') {
        for (let i = 0; i < buttons.length; i += 1) {
          if (i === 42 && buttons[i].textContent === 'SHIFT') {
            buttons[i].classList.add('active-shift');
          }
          buttons[i].textContent = this.ROWS_SHIFT[i];
        }
      } else if (event.code === 'ShiftRight') {
        for (let i = 0; i < buttons.length; i += 1) {
          if (i === 54 && buttons[i].textContent === 'SHIFT') {
            buttons[i].classList.add('active-shift');
          }
          buttons[i].textContent = this.ROWS_SHIFT[i];
        }
      } else if (event.code === 'Space') {
        this.value += ' ';
        buttons.forEach((item) => (item.textContent === 'SPACE' ? item.classList.add('active') : 0));
      } else if (event.key === 'CapsLock') {
        this.toggleCapsLock();
        buttons.forEach((item) => (item.textContent === 'CAPS LOCK' ? item.classList.toggle('caps', this.capsLock) : 0));
      } else if (event.key === 'Tab') {
        buttons.forEach((item) => (item.textContent === event.key.toUpperCase() ? item.classList.add('active') : 0));
        this.value += '    ';
      } else if (event.code === 'Delete') {
        this.value = this.textarea.value.slice(0, this.textarea.selectionStart)
            + this.textarea.value
              .slice(this.textarea.selectionStart + 1, this.textarea.value.length);
        buttons.forEach((item) => (item.textContent === 'DEL' ? item.classList.add('active') : 0));
      } else if (letter !== undefined && (event.key.toLowerCase() === letter.textContent
      || event.key === letter.textContent || event.key === letter.textContent.toLowerCase())) {
        if (this.capsLock) {
          buttons.forEach((item) => (item.textContent === event.key
            || item.textContent.toLowerCase() === event.key
            ? item.classList.add('active') : 0));
        } else {
          buttons.forEach((item) => (item.textContent === event.key.toLowerCase() ? item.classList.add('active') : 0));
        }
        if (event.shiftKey) {
          buttons.forEach((item) => (item.textContent === event.key
            || item.textContent.toLowerCase() === event.key
            ? item.classList.add('active') : 0));
        }
        this.value += letter.textContent;
      }
      this.textarea.value = this.value;
      buttons.forEach((item) => item.addEventListener('animationend', () => {
        item.classList.remove('active');
      }, false));
    });
    document.addEventListener('keyup', (event) => {
      const buttons = document.querySelectorAll('.row__letter');

      if (event.key === 'Shift') {
        for (let i = 0; i < buttons.length; i += 1) {
          if (buttons[i].textContent === 'SHIFT') {
            buttons[i].classList.remove('active-shift');
          }
          if (i === 13 || i === 14 || i === 28 || i === 29
            || i === 41 || i === 42 || i === 63 || (i >= 54 && i <= 59)) {
            buttons[i].textContent = this.ROWS[i];
          } else {
            buttons[i].textContent = this.ROWS[i].toLowerCase();
          }
        }
      }
    });
  }

  switchLanguage() {
    const letters = document.querySelectorAll('.letter');

    for (let i = 0; i < letters.length; i += 1) {
      if ((i < 1 || i > 12) && i !== 25) {
        letters[i].classList.add('translate');
      }
    }

    const lettersTranslate = document.querySelectorAll('.translate');

    for (let i = 0; i < lettersTranslate.length; i += 1) {
      lettersTranslate[i].textContent = this.rusRows[i];
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const keyboard = new Keyboard();
  keyboard.init();
  keyboard.addButtons();
  keyboard.clickPhisicalKeyboard();
  document.querySelector('.keyboard').addEventListener('click', () => {
    document.querySelector('.text').focus();
  });
});
