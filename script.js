const startInput = document.getElementById('startDate');
const output = document.getElementById('output');
const notifyBtn = document.getElementById('notifyBtn');

function updateDisplay() {
  if (!startInput.value) { output.textContent = 'Bitte Datum auswählen'; return; }
  const start = new Date(startInput.value);
  const now = new Date();
  const diffDays = Math.floor((now - start) / (1000*60*60*24));
  const months = Math.floor(diffDays / 30);
  const weeks = Math.floor((diffDays % 30) / 7);
  const days = diffDays % 7;
  output.textContent = `Seit dem ${start.toLocaleDateString()}: ${months} Monate, ${weeks} Wochen und ${days} Tage`;
}

startInput.addEventListener('change', updateDisplay);

notifyBtn.addEventListener('click', () => {
  if (!('Notification' in window)) {
    alert('Dein Browser unterstützt keine Notifications.');
    return;
  }
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      const days = 100;
      const start = new Date(startInput.value);
      const notifyTime = start.getTime() + days * 24*60*60*1000;
      const delay = notifyTime - Date.now();
      if (delay <= 0) return alert('Dieser Zeitpunkt liegt in der Vergangenheit.');
      setTimeout(() => {
        new Notification(`100 Tage zusammen! 💕`);
      }, delay);
      alert('Erinnerung geplant!');
    }
  });
});
