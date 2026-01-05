// Get references
let countdown = document.getElementById("Countdown");
let gridSchedule = document.getElementById("gridSchedule");
let streamNowEle = document.getElementById("streamNow");
let streamCountdownEle = document.getElementById("streamCountdown");
let updateCountdownTimer;

// Grab all rows
const rows = Array.from(document.querySelectorAll('.gridRow'));

// Keep top row as editable input
const topRow = rows[0];

// Initialize schedule array (rows 1–6)
let schedule = [];
for (let i = 1; i < 7; i++) {
  schedule.push({ title: "", datetime: "" });
}

// Function to render schedule into readonly rows
function renderSchedule() {
  for (let i = 1; i < 7; i++) {
    const inputs = rows[i].querySelectorAll('input');
    inputs[0].value = schedule[i - 1].title;
    inputs[1].value = schedule[i - 1].datetime;
  }
}

// Initial render
renderSchedule();

// Form submit
const form = document.getElementById('scheduleForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const newEntry = {
    title: topRow.querySelector('input[name="title0"]').value,
    datetime: topRow.querySelector('input[name="datetime0"]').value
  };

  if (!newEntry.title || !newEntry.datetime) {
    alert("Please enter both title and date/time!");
    return;
  }

  // Shift schedule down
  schedule.pop();           // remove oldest (bottom) entry
  schedule.unshift(newEntry); // add new entry at top

  // Clear top row
  topRow.querySelector('input[name="title0"]').value = "";
  topRow.querySelector('input[name="datetime0"]').value = "";

  // Render all readonly rows
  renderSchedule();
});
