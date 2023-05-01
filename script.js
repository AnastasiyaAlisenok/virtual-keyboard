import Keyboard from './keyboard.js';

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
