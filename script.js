const body = document.querySelector('body');

class Keyboard {
  constructor() {
    this.ROWS = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'BACKSPACE', 'TAB', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'DEL', 'CAPS LOCK', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'ENTER', 'SHIFT', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '', 'SHIFT', 'CTRL', 'WIN', 'ALT', 'SPACE', 'ALT', '', '', '', 'CTRL'];
    this.ROWS_SHIFT = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'BACKSPACE', 'TAB', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '{', '}', '|', 'DEL', 'CAPS LOCK', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ':', '"', 'ENTER', 'SHIFT', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<', '>', '?', '', 'SHIFT', 'CTRL', 'WIN', 'ALT', 'SPACE', 'ALT', '', '', '', 'CTRL'];
    this.rusRows = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'BACKSPACE', 'TAB', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '|', 'DEL', 'CAPS LOCK', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'ENTER', 'SHIFT', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '', 'SHIFT', 'CTRL', 'WIN', 'ALT', 'SPACE', 'ALT', '', '', '', 'CTRL'];
    this.RUS_ROWS_SHIFT = ['ё', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'BACKSPACE', 'TAB', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '|', 'DEL', 'CAPS LOCK', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'ENTER', 'SHIFT', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', ',', '', 'SHIFT', 'CTRL', 'WIN', 'ALT', 'SPACE', 'ALT', '', '', '', 'CTRL'];
    this.code = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight', 'ControlLeft', 'AltLeft', 'Space', 'AltRight'];
    this.textarea = null;
    this.main = null;
    this.rows = null;
    this.button = null;
    this.value = '';
    this.capsLock = false;
    this.lang = 'en';
    this.p = null;
  }

  init() {
    this.textarea = document.createElement('textarea');
    this.textarea.rows = 8;
    this.textarea.className = 'text';
    body.append(this.textarea);

    this.main = document.createElement('div');
    this.main.className = 'keyboard';
    body.append(this.main);

    this.rows = document.createElement('div');
    this.rows.className = 'row';
    this.p = document.createElement('p');
    this.p.textContent = 'Клавиатура создана в ОС Windows.\n Для переключения языка используйте левые CTRL + ALT.';
    body.append(this.p);
  }

  addButtons() {
    for (let i = 0; i < this.ROWS.length; i += 1) {
      const button = document.createElement('button');
      if (i === 13 || i === 14 || i === 28 || i === 29
        || i === 41 || i === 42 || i === 63 || (i >= 54 && i <= 59)) {
        button.textContent = this.lang === 'en' ? this.ROWS[i] : this.rusRows[i];
      } else if (i === 53) {
        button.classList.add('up');
      } else if (i === 60) {
        button.classList.add('left');
      } else if (i === 61) {
        button.classList.add('down');
      } else if (i === 62) {
        button.classList.add('right');
      } else {
        button.textContent = this.lang === 'en' ? this.ROWS[i] : this.rusRows[i];
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
      const buttons = document.querySelectorAll('.row__letter');

      if (event.key === 'Backspace') {
        event.preventDefault();
        this.value = this.value.substring(0, this.value.length - 1);
        buttons.forEach((item) => (item.textContent === 'BACKSPACE' ? item.classList.add('active') : 0));
      } else if (event.key === 'Enter') {
        event.preventDefault();
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
        event.preventDefault();
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
        event.preventDefault();
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
        event.preventDefault();
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
        event.preventDefault();
        this.value += ' ';
        buttons.forEach((item) => (item.textContent === 'SPACE' ? item.classList.add('active') : 0));
      } else if (event.key === 'CapsLock') {
        event.preventDefault();
        this.toggleCapsLock();
        buttons.forEach((item) => (item.textContent === 'CAPS LOCK' ? item.classList.toggle('active', this.capsLock) : 0));
      } else if (event.key === 'Tab') {
        event.preventDefault();
        buttons.forEach((item) => (item.textContent === event.key.toUpperCase() ? item.classList.add('active') : 0));
        this.value += '    ';
      } else if (event.code === 'Delete') {
        event.preventDefault();
        this.value = this.textarea.value.slice(0, this.textarea.selectionStart)
            + this.textarea.value
              .slice(this.textarea.selectionStart + 1, this.textarea.value.length);
        buttons.forEach((item) => (item.textContent === 'DEL' ? item.classList.add('active') : 0));
      } else {
        event.preventDefault();
        let ind1;
        let ind2;
        if (event.shiftKey) {
          ind1 = this.code.indexOf(event.code);
          buttons[ind1].classList.add('active');
          this.value += buttons[ind1].textContent;
        } else {
          ind1 = this.capsLock ? this.ROWS.indexOf(event.key.toLowerCase())
            : this.ROWS.indexOf(event.key.toLowerCase());
          ind2 = this.capsLock ? this.rusRows.indexOf(event.key.toLowerCase())
            : this.rusRows.indexOf(event.key.toLowerCase());
          if (ind1 === -1) {
            buttons[ind2].classList.add('active');
            this.value += buttons[ind2].textContent;
          } else {
            buttons[ind1].classList.add('active');
            this.value += buttons[ind1].textContent;
          }
        }
      }
      this.textarea.value = this.value;
    });
    document.addEventListener('keyup', (event) => {
      const buttons = document.querySelectorAll('.row__letter');

      if (event.key === 'Shift') {
        for (let i = 0; i < buttons.length; i += 1) {
          if (this.lang === 'en') {
            buttons[i].textContent = this.capsLock ? this.ROWS[i].toUpperCase() : this.ROWS[i];
          } else {
            buttons[i].textContent = this.capsLock
              ? this.rusRows[i].toUpperCase() : this.rusRows[i];
          }
          if (buttons[i].textContent === 'SHIFT') {
            buttons[i].classList.remove('active');
          }
        }
      } else {
        buttons.forEach((item) => (item.textContent !== 'CAPS LOCK' && item.textContent !== 'SHIFT' ? item.classList.remove('active') : 0));
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
          this.saveLang();
        } else {
          for (let i = 0; i < buttons.length; i += 1) {
            buttons[i].textContent = this.capsLock ? this.ROWS[i].toUpperCase() : this.ROWS[i];
          }
          this.lang = 'en';
          this.saveLang();
        }
      }
    });
  }

  saveLang() {
    localStorage.setItem('lang', this.lang);
  }

  getLang() {
    if (localStorage.getItem('lang')) {
      this.lang = localStorage.getItem('lang');
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const keyboard = new Keyboard();
  window.addEventListener('load', keyboard.getLang());
  keyboard.init();
  keyboard.addButtons();
  keyboard.clickPhisicalKeyboard();
  keyboard.switchLanguage();
  document.querySelector('.keyboard').addEventListener('click', () => {
    document.querySelector('.text').focus();
  });
});
