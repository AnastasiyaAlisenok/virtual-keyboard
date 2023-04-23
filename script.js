//Ряды для создания клавиатуры

const ROWS = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',"TAB", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\", 'DEL', 'CAPS LOCK', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'ENTER', 'SHIFT', '\\', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', '', 'SHIFT', 'CTRL', 'WIN', 'ALT', 'SPACE', 'ALT', 'CTRL', '', '', ''];
const ROW1_TOP = [ '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', ''];

const body = document.querySelector('body');

const keyboard = {
  elements: {
    textarea: null,
    main: null,
    rows: null,
    button: null
  },
  properties: {
    value: '',
    capsLock: false
  },

  init() {
    this.elements.textarea = document.createElement('textarea');
    this.elements.textarea.rows = 10;
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
      const button = document.createElement('button');
      if(i>=0 && i<=12) {
        const topLetter = document.createElement('div');
        const centerLetter = document.createElement('div');
        centerLetter.className = 'row1__center_letter';
        topLetter.className = 'row1__top_letter';
        topLetter.textContent = ROW1_TOP[i];
        centerLetter.textContent = ROWS[i];
        button.append(topLetter);
        button.append(centerLetter);
        button.className = 'row__letter';
      } else if( i === 54) {
        button.className = 'row__letter';
        button.classList.add('up');
      } else if(i === 62) {
        button.className = 'row__letter';
        button.classList.add('left');
      } else if(i === 63) {
        button.className = 'row__letter';
        button.classList.add('down');
      } else if(i === 64) {
        button.className = 'row__letter';
        button.classList.add('right');
      } else {
        button.textContent = ROWS[i];
        button.className = 'row__letter';
      }
      if(i >= 56) {
        button.classList.add('row5__letter');
      }
      switch(button.textContent) {
        case 'Backspace': 
          button.addEventListener('click', () => {
            console.log(this.properties.value);
            console.log(this.elements.textarea.textContent)
            this.properties.value = this.properties.value.substring(0, this.properties.value.length-1);
            this.elements.textarea.value = this.properties.value;
            
          })
          break;
    
          case 'CAPS LOCK':
          button.addEventListener('click', () => {
            button.classList.toggle(this.properties.capsLock);
            this.toggleCapsLock();
          })
          break;
    
          case 'SPACE':
          button.addEventListener('click', () => {
            this.properties.value += ` `;
            this.elements.textarea.value = this.properties.value;
          })
          break;

          case 'ENTER':
          button.addEventListener('click', () => {
            this.properties.value += '\n';
            this.elements.textarea.value = this.properties.value;
          })
          break;

          case 'CTRL':
          button.addEventListener('click', () => {
            return
          })
          break;

          case 'SHIFT':
          button.addEventListener('click', () => {
            return
          })
          break;

          case 'ALT':
          button.addEventListener('click', () => {
            return
          })
          break;
    
          default:
          button.addEventListener('click', () => {
            this.properties.value += this.properties.capsLock ? button.textContent.toUpperCase() : button.textContent.toLowerCase();
            this.elements.textarea.value = this.properties.value;
          })
          break;
      }
      this.elements.button = this.elements.rows.querySelectorAll('.row__letter');
      this.elements.rows.append(button);
  }
  },
  toggleCapsLock() {
      this.properties.capsLock = ! this.properties.capsLock;
  },
  clickPhisicalKeyboard() {
    document.addEventListener('keydown', (event) => {
      const buttons = document.querySelectorAll('.row__letter');
      const centerButtons = document.querySelectorAll('.row1__center_letter');
      const letter = Array.from(buttons).find(item => item.innerHTML === event.key.toLocaleUpperCase());
      const number = Array.from(centerButtons).find(item => item.textContent === event.key.toLocaleUpperCase());
      console.log(event.code)

     if(event.key === 'Backspace') {
       this.properties.value = this.properties.value.substring(0, keyboard.properties.value.length-1);
       buttons.forEach(item => item.textContent === 'Backspace'? item.classList.add('active') : 0)
     } else if(event.key === 'Enter') {
       this.properties.value += '\n';
       buttons.forEach(item => item.textContent === 'ENTER'? item.classList.add('active') : 0)
     } else if(event.code === 'ControlLeft') {
      for(let i=0; i<buttons.length; i++) {
        if(i === 56 && buttons[i].textContent === 'CTRL') {
          buttons[i].classList.add('active')
        }
      }
     } else if(event.code === 'ControlRight') {
      for(let i=0; i<buttons.length; i++) {
        if(i === 61 && buttons[i].textContent === 'CTRL') {
          buttons[i].classList.add('active')
        }
      }
     } else if(event.code === 'AltLeft') {
      for(let i=0; i<buttons.length; i++) {
        if(i === 58 && buttons[i].textContent === 'ALT') {
          buttons[i].classList.add('active')
        }
      }
     } else if(event.code === 'AltRight') {
      for(let i=0; i<buttons.length; i++) {
        if(i === 60 && buttons[i].textContent === 'ALT') {
          buttons[i].classList.add('active')
        }
      }
     } else if(event.code === 'ShiftLeft') {
      for(let i=0; i<buttons.length; i++) {
        if(i === 42 && buttons[i].textContent === 'SHIFT') {
          buttons[i].classList.add('active')
        }
      }
      } else if(event.code === 'ShiftRight') {
        for(let i=0; i<buttons.length; i++) {
          if(i === 55 && buttons[i].textContent === 'SHIFT') {
            buttons[i].classList.add('active')
          }
        }
      } else if(event.code === 'Space') {
        this.properties.value += ` `;
        buttons.forEach(item => item.textContent === 'SPACE'? item.classList.add('active') : 0)
      } else if(number !== undefined && event.key === number.textContent ) {
       buttons.forEach(item => item.textContent[1] === event.key.toUpperCase() ? item.classList.add('active') : 0);
       this.properties.value += number.textContent;
     } else if(letter !== undefined && event.key === letter.textContent.toLocaleLowerCase()) {
       buttons.forEach(item => item.textContent === event.key.toUpperCase() ? item.classList.add('active') : 0);
       this.properties.value += letter.textContent.toLocaleLowerCase();
     }
       buttons.forEach(item => item.addEventListener('animationend', () => {
           item.classList.remove('active');
     }, false))
     })
  }
}

window.addEventListener('DOMContentLoaded', () => {
  keyboard.init()
  keyboard.createButtons()
  keyboard.clickPhisicalKeyboard()
})




console.log(keyboard)
console.log(keyboard.properties)