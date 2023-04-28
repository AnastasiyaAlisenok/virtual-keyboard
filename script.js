// Ряды для создания клавиатуры
const body = document.querySelector('body');

class Keyboard {
  constructor() {
    this.ROWS = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'BACKSPACE', 'TAB', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'DEL', 'CAPS LOCK', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'ENTER', 'SHIFT', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '', 'SHIFT', 'CTRL', 'WIN', 'ALT', 'SPACE', 'ALT', '', '', '', 'CTRL'];
    this.ROWS_SHIFT = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'BACKSPACE', 'TAB', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '{', '}', '|', 'DEL', 'CAPS LOCK', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ':', '"', 'ENTER', 'SHIFT', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<', '>', '?', '', 'SHIFT', 'CTRL', 'WIN', 'ALT', 'SPACE', 'ALT', '', '', '', 'CTRL'];
    this.rusRows = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'BACKSPACE', 'TAB', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '|', 'DEL', 'CAPS LOCK', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'ENTER', 'SHIFT', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '', 'SHIFT', 'CTRL', 'WIN', 'ALT', 'SPACE', 'ALT', '', '', '', 'CTRL'];
    this.RUS_ROWS_SHIFT = ['ё', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'BACKSPACE', 'TAB', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '|', 'DEL', 'CAPS LOCK', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'ENTER', 'SHIFT', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', ',', '', 'SHIFT', 'CTRL', 'WIN', 'ALT', 'SPACE', 'ALT', '', '', '', 'CTRL'];
    this.textarea = null;
    this.main = null;
    this.rows = null;
    this.button = null;
    this.value = '';
    this.capsLock = false;
    this.lang = null;
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
      } else if (i === 53) {
        button.classList.add('up');
      } else if (i === 60) {
        button.classList.add('left');
      } else if (i === 61) {
        button.classList.add('down');
      } else if (i === 62) {
        button.classList.add('right');
      } else {
        button.textContent = this.ROWS[i];
        button.classList.add('letter');
      }
      button.classList.add('row__letter');
      if (i >= 55) {
        button.classList.add('row5__letter');
      }

      switch (button.textContent) {
        case 'BACKSPACE':
          button.addEventListener('mousedown', () => {
            button.classList.add('active');
            this.value = this.value.substring(0, this.value.length - 1);
            this.textarea.value = this.value;
          });
          break;

        case 'CAPS LOCK':
          button.addEventListener('click', () => {
            this.toggleCapsLock();
            button.classList.toggle('active', this.capsLock);
          });
          break;

        case 'SPACE':
          button.addEventListener('mousedown', () => {
            button.classList.add('active');
            this.value += ' ';
            this.textarea.value = this.value;
          });
          break;

        case 'ENTER':
          button.addEventListener('mousedown', () => {
            button.classList.add('active');
            this.value += '\n';
            this.textarea.value = this.value;
          });
          break;

        case 'TAB':
          button.addEventListener('mousedown', () => {
            button.classList.add('active');
            this.value += '    ';
            this.textarea.value = this.value;
          });
          break;

        case 'DEL':
          button.addEventListener('mousedown', () => {
            button.classList.add('active');
            this.value = this.textarea.value.slice(0, this.textarea.selectionStart)
            + this.textarea.value
              .slice(this.textarea.selectionStart + 1, this.textarea.value.length);
            this.textarea.value = this.value;
          });
          break;

        case 'CTRL':
          button.addEventListener('mousedown', () => {
            button.classList.add('active');
          });
          break;

        case 'SHIFT':
          button.addEventListener('mousedown', () => {
            button.classList.add('active');
            const buttons = document.querySelectorAll('.row__letter');
            for (let j = 0; j < buttons.length; j += 1) {
              if (this.lang === 'en') {
                buttons[j].textContent = this.capsLock
                  ? this.ROWS_SHIFT[j] : this.ROWS_SHIFT[j].toUpperCase();
              } else {
                buttons[j].textContent = this.capsLock
                  ? this.RUS_ROWS_SHIFT[j] : this.RUS_ROWS_SHIFT[j].toUpperCase();
              }
            }
          });
          button.addEventListener('mouseup', () => {
            button.classList.remove('active');
            const buttons = document.querySelectorAll('.row__letter');
            for (let j = 0; j < buttons.length; j += 1) {
              if (this.lang === 'en') {
                buttons[j].textContent = this.capsLock ? this.ROWS[j].toUpperCase() : this.ROWS[j];
              } else {
                buttons[j].textContent = this.capsLock
                  ? this.rusRows[j].toUpperCase() : this.rusRows[j];
              }
            }
          });
          break;

        case 'ALT':
          button.addEventListener('mousedown', () => {
            button.classList.add('active');
          });
          break;

        default:
          button.addEventListener('mousedown', (event) => {
            button.classList.add('active');
            if (event.shiftKey) {
              this.value += button.textContent;
            } else {
              this.value += this.capsLock ? button.textContent.toUpperCase()
                : button.textContent;
            }
            this.textarea.value = this.value;
          });
          break;
      }
      button.addEventListener('mouseup', () => {
        button.classList.remove('active');
      });
      this.rows.append(button);
    }
    this.main.append(this.rows);
    this.lang = 'en';
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
        buttons.forEach((item) => (item.textContent === 'BACKSPACE' ? item.classList.add('active') : 0));
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
            buttons[i].classList.add('active');
          }
          if (this.lang === 'en') {
            buttons[i].textContent = this.capsLock
              ? this.ROWS_SHIFT[i] : this.ROWS_SHIFT[i].toUpperCase();
          } else {
            buttons[i].textContent = this.capsLock
              ? this.RUS_ROWS_SHIFT[i] : this.RUS_ROWS_SHIFT[i].toUpperCase();
          }
        }
      } else if (event.code === 'ShiftRight') {
        for (let i = 0; i < buttons.length; i += 1) {
          if (i === 54 && buttons[i].textContent === 'SHIFT') {
            buttons[i].classList.add('active');
          }
          if (this.lang === 'en') {
            buttons[i].textContent = this.capsLock
              ? this.ROWS_SHIFT[i] : this.ROWS_SHIFT[i].toUpperCase();
          } else {
            buttons[i].textContent = this.capsLock
              ? this.RUS_ROWS_SHIFT[i] : this.RUS_ROWS_SHIFT[i].toUpperCase();
          }
        }
      } else if (event.code === 'Space') {
        this.value += ' ';
        buttons.forEach((item) => (item.textContent === 'SPACE' ? item.classList.add('active') : 0));
      } else if (event.key === 'CapsLock') {
        this.toggleCapsLock();
        buttons.forEach((item) => (item.textContent === 'CAPS LOCK' ? item.classList.toggle('active', this.capsLock) : 0));
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
            || item.textContent.toUpperCase() === event.key
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
            buttons[i].classList.remove('active');
          }
          if (this.lang === 'en') {
            buttons[i].textContent = this.capsLock ? this.ROWS[i].toUpperCase() : this.ROWS[i];
          } else {
            buttons[i].textContent = this.capsLock
              ? this.rusRows[i].toUpperCase() : this.rusRows[i];
          }
        }
      } else {
        buttons.forEach((item) => (item.textContent !== 'CAPS LOCK' ? item.classList.remove('active') : 0));
      }
    });
  }

  switchLanguage() {
    document.addEventListener('keydown', (event) => {
      const buttons = document.querySelectorAll('.row__letter');
      if (event.altKey && event.ctrlKey) {
        if (this.lang === 'en') {
          for (let i = 0; i < buttons.length; i += 1) {
            buttons[i].textContent = this.capsLock
              ? this.rusRows[i].toUpperCase() : this.rusRows[i];
          }
          this.lang = 'ru';
        } else {
          for (let i = 0; i < buttons.length; i += 1) {
            buttons[i].textContent = this.capsLock ? this.ROWS[i].toUpperCase() : this.ROWS[i];
          }
          this.lang = 'en';
        }
      }
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const keyboard = new Keyboard();
  keyboard.init();
  keyboard.addButtons();
  keyboard.clickPhisicalKeyboard();
  keyboard.switchLanguage();
  document.querySelector('.keyboard').addEventListener('click', () => {
    document.querySelector('.text').focus();
  });
});
