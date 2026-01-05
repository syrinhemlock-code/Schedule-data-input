const form = document.getElementById('scheduleForm');
const rows = Array.from(document.querySelectorAll('.row'));

// Initialize schedule array with 7 empty slots
let schedule = [
  { title: "", datetime: "" },
  { title: "", datetime: "" },
  { title: "", datetime: "" },
  { title: "", datetime: "" },
  { title: "", datetime: "" },
  { title: "", datetime: "" },
  { title: "", datetime: "" }
];

// Function to render the schedule to the rows
function renderSchedule() {
  for (let i = 0; i < 7; i++) {
    rows[i].querySelector('input[type="text"]').value = schedule[i].title;
    rows[i].querySelector('input[type="datetime-local"]').value = schedule[i].datetime;
  }
}

// On page load, render initial schedule
renderSchedule();

// Handle form submit
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Take top row input
  const newEntry = {
    title: form.title0.value,
    datetime: form.datetime0.value
  };

  if (!newEntry.title || !newEntry.datetime) {
    alert("Please enter both title and date/time!");
    return;
  }

  // Shift schedule down
  schedule.pop(); // remove last entry
  schedule.unshift(newEntry); // add new entry to top

  // Clear top row inputs
  form.title0.value = "";
  form.datetime0.value = "";

  // Re-render all rows
  renderSchedule();
});
