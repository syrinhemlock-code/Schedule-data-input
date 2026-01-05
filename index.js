// Get references
const form = document.getElementById('scheduleForm');
const topRow = document.querySelector('.gridRow.topRow');
const rows = Array.from(document.querySelectorAll('.gridRow')).slice(1); // rows 1–6
const saveBtn = document.getElementById('saveBtn');
const submitBtn = document.getElementById('submitBtn');
const clearBtn = document.getElementById('clearBtn');

// Initialize schedule array for rows 1–6
let schedule = [];
for (let i = 0; i < rows.length; i++) {
  schedule.push({ title: "", datetime: "" });
}

// Function to render schedule in readonly rows
function renderSchedule() {
  rows.forEach((row, idx) => {
    const inputs = row.querySelectorAll('input');
    inputs[0].value = schedule[idx].title;
    inputs[1].value = schedule[idx].datetime;
  });
}

// Initial render
renderSchedule();

// --- Save Button / Form Submit ---
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const titleInput = topRow.querySelector('input[name="title0"]').value.trim();
  const datetimeInput = topRow.querySelector('input[name="datetime0"]').value;

  if (!titleInput || !datetimeInput) {
    alert("Please fill in both title and date/time!");
    return;
  }

  // Shift schedule down
  schedule.pop(); // remove oldest (bottom)
  schedule.unshift({ title: titleInput, datetime: datetimeInput }); // add new at top

  // Clear top row inputs
  topRow.querySelector('input[name="title0"]').value = "";
  topRow.querySelector('input[name="datetime0"]').value = "";

  // Re-render readonly rows
  renderSchedule();
});

// --- Clear Button ---
clearBtn.addEventListener('click', () => {
  topRow.querySelector('input[name="title0"]').value = "";
  topRow.querySelector('input[name="datetime0"]').value = "";
});

// --- Submit Button Placeholder ---
submitBtn.addEventListener('click', () => {
  console.log("Submit clicked");
  // Future: add code to send schedule to main site / backend
});
