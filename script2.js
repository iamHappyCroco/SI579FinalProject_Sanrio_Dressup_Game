/**
 * Preview image element for the currently selected character.
 * @type {HTMLImageElement}
 */
const characterPreview = document.querySelector('#character-preview');

/**
 * Text element to display the selected character's name.
 * @type {HTMLElement}
 */
const characterName = document.querySelector('#character-name');

/**
 * A list of available characters for selection.
 * @type {{name: string, img: string}[]}
 */
const characters = [
  { name: 'Hello Kitty', img: 'assets/characters/Hello Kitty.png' },
  { name: 'My Melody', img: 'assets/characters/My Melody.png' },
  { name: 'Kuromi', img: 'assets/characters/Kuromi.png' },
  { name: 'Cinnamoroll', img: 'assets/characters/Cinnamoroll.png' },
  { name: 'Pompompurin', img: 'assets/characters/Pompompurin.png' },
  { name: 'Pochacco', img: 'assets/characters/Pochacco.png' },
  { name: 'Badtz-Maru', img: 'assets/characters/Badtz-Maru.png' },
  { name: 'Keroppi', img: 'assets/characters/Keroppi.png' },
];

/**
 * The index of the character currently being shown.
 * @type {number}
 */
let current = 0;

/**
 * Updates the character image and name preview based on the current index.
 */
const updatePreview = () => {
  characterPreview.src = characters[current].img;
  characterName.innerText = characters[current].name;
};

/**
 * Navigates to the previous character in the list.
 * Wraps around to the end if at the beginning.
 */
document.querySelector('#prev-button').addEventListener('click', () => {
  current = (current - 1 + characters.length) % characters.length;
  updatePreview();
});

/**
 * Navigates to the next character in the list.
 * Wraps around to the start if at the end.
 */
document.querySelector('#next-button').addEventListener('click', () => {
  current = (current + 1) % characters.length;
  updatePreview();
});

/**
 * Saves the selected character to localStorage and navigates to the dress-up page.
 */
document.querySelector('#confirm-button').addEventListener('click', () => {
  const selected = characters[current];
  localStorage.setItem('selectedCharacter', JSON.stringify(selected));
  window.location.href = 'dressup.html';
});

// Initialize preview on page load
updatePreview();
