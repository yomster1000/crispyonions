// Simple handlers used by index.html buttons

const noMessages = [
  "Nope",
  "Are you sure 😅",
  "Maybe you miss clicked?",
  "Not today!",
  "Try again!",
  "Come on...",
];

let lastNoIndex = -1;

function handleYesClick() {
  // navigate to the yes page
  window.location.href = 'yes_page.html';
}

function handleNoClick() {
  const btn = document.querySelector('.no-button');
  if (!btn) return;

  // Update the button text to a new random message (avoid repeating the same one)
  if (noMessages.length > 0) {
    let idx = Math.floor(Math.random() * noMessages.length);
    if (idx === lastNoIndex) {
      idx = (idx + 1) % noMessages.length;
    }
    btn.textContent = noMessages[idx];
    lastNoIndex = idx;
  }

  // Trigger text-change animation: remove / force reflow / add so it restarts reliably
  btn.classList.remove('animate-text');
  // force reflow to restart animation
  void btn.offsetWidth;
  btn.classList.add('animate-text');

  // cleanup after animation just in case
  const onAnimEnd = () => {
    btn.classList.remove('animate-text');
    btn.removeEventListener('animationend', onAnimEnd);
  };
  btn.addEventListener('animationend', onAnimEnd);

  // Ensure the button can be absolutely positioned
  btn.style.position = 'absolute';

  const padding = 20;
  const maxX = Math.max(window.innerWidth - btn.offsetWidth - padding, padding);
  const maxY = Math.max(window.innerHeight - btn.offsetHeight - padding, padding);

  const x = Math.floor(Math.random() * (maxX - padding)) + padding;
  const y = Math.floor(Math.random() * (maxY - padding)) + padding;

  btn.style.left = x + 'px';
  btn.style.top = y + 'px';
}
