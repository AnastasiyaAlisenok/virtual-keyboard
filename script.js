//Ряды для создания клавиатуры
const body = document.querySelector('body');

class Keyboard {
  constructor() {
    this.ROWS = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',"TAB", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\", 'DEL', 'CAPS LOCK', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'ENTER', 'SHIFT', '\\', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', '', 'SHIFT', 'CTRL', 'WIN', 'ALT', 'SPACE', 'ALT', 'CTRL', '', '', ''];
    this.ROW1_TOP = [ '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', ''];
    this.textarea = null,
    this.main = null,
    this.rows = null,
    this.button = null,
    this.value = '',
    this.capsLock = false
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
   

      for(let i=0; i<this.ROWS.length; i++) {
        const button = document.createElement('button');
        if(i>=0 && i<=13) {
          const topLetter = document.createElement('div');
          const centerLetter = document.createElement('div');
          centerLetter.className = 'row1__center_letter';
          topLetter.className = 'row1__top_letter';
          topLetter.textContent = this.ROW1_TOP[i];
          centerLetter.textContent = this.ROWS[i];
          button.append(topLetter);
          button.append(centerLetter);
          button.className = 'row__letter';
        } else if(i === 14 || i === 28 || i === 29 || i === 41 || i === 42 || (i >= 55 && i <= 61)) {
          button.textContent = this.ROWS[i];
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
          button.textContent = this.ROWS[i].toLowerCase();
          button.className = 'row__letter';
          button.classList.add('letter');
        }
        if(i >= 56) {
          button.classList.add('row5__letter');
        }
  
        switch(button.textContent) {
          case 'Backspace': 
            button.addEventListener('click', () => {
              this.value = this.value.substring(0, this.value.length-1);
              this.textarea.value = this.value;
            })
            break;
  
            case 'CAPS LOCK':
            button.addEventListener('click', () => {
              this.toggleCapsLock();
              button.classList.toggle('caps', this.capsLock);
              
            })
            break;
      
            case 'SPACE':
            button.addEventListener('click', () => {
              this.value += ` `;
              this.textarea.value = this.value;
            })
            break;
  
            case 'ENTER':
            button.addEventListener('click', () => {
              this.value += '\n';
              this.textarea.value = this.value;
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
              this.value += this.capsLock ? button.textContent.toUpperCase() : button.textContent.toLowerCase();
              this.textarea.value = this.value;
            })
            break;
        }
        console.log(button);
        this.rows.append(button);
    }
    this.main.append(this.rows);
  }

  toggleCapsLock() {
    const letters = document.querySelectorAll('.letter');
    this.capsLock = ! this.capsLock;

    for(const button of letters) {
      if(button.childElementCount === 0) {
        button.textContent = this.capsLock ? button.textContent.toUpperCase() :  button.textContent.toLowerCase();
      }
    }

}

  clickPhisicalKeyboard() {
    document.addEventListener('keydown', (event) => {
      const buttons = document.querySelectorAll('.row__letter');
      const centerButtons = document.querySelectorAll('.row1__center_letter');
      const letter = this.capsLock ? Array.from(buttons).find(item => item.innerHTML === event.key) : Array.from(buttons).find(item => item.innerHTML === event.key.toLowerCase());
      const number = Array.from(centerButtons).find(item => item.textContent === event.key.toUpperCase());

     if(event.key === 'Backspace') {
       this.value = this.value.substring(0, this.value.length-1);
       buttons.forEach(item => item.textContent === 'Backspace'? item.classList.add('active') : 0)
     } else if(event.key === 'Enter') {
       this.value += '\n';
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
        this.value += ` `;
        buttons.forEach(item => item.textContent === 'SPACE'? item.classList.add('active') : 0)
      } else if(event.key === 'CapsLock') {
        if(this.capsLock) {
          this.toggleCapsLock();
          buttons.forEach(item => item.textContent === 'CAPS LOCK'? item.classList.toggle('caps', this.capsLock) : 0);
        } else {
          this.toggleCapsLock();
          buttons.forEach(item => item.textContent === 'CAPS LOCK'? item.classList.toggle('caps', this.capsLock) : 0);
        }
      } else if(number !== undefined && event.key === number.textContent ) {
       buttons.forEach(item => item.textContent[1] === event.key ? item.classList.add('active') : 0);
       this.value += number.textContent;
     } else if(letter !== undefined && (event.key.toLowerCase() === letter.textContent || event.key === letter.textContent)) {
      if(this.capsLock) {
        buttons.forEach(item => item.textContent === event.key ? item.classList.add('active') : 0);
      } else {
        buttons.forEach(item => item.textContent === event.key.toLowerCase() ? item.classList.add('active') : 0);
      }
       this.value += letter.textContent;
     }
       buttons.forEach(item => item.addEventListener('animationend', () => {
           item.classList.remove('active');
     }, false))
     })
  }
}

window.addEventListener('DOMContentLoaded', () => {
  let keyboard = new Keyboard();
  keyboard.init();
  keyboard.clickPhisicalKeyboard();
})
