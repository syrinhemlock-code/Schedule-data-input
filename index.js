window.addEventListener('DOMContentLoaded', () => {
  const topRow = document.querySelector('.gridRow.topRow');
  const rows = Array.from(document.querySelectorAll('.gridRow')).slice(1); // readonly rows
  const clearBtn = document.getElementById('clearBtn');
  const submitBtn = document.getElementById('submitBtn');
  const form = document.getElementById('scheduleForm');

  // Initialize schedule array from localStorage or fill with temporary test data
  let schedule = JSON.parse(localStorage.getItem('schedule')) || [
    { title: "Stream 1", datetime: "2026-01-05T12:00" },
    { title: "Stream 2", datetime: "2026-01-06T14:00" },
    { title: "Stream 3", datetime: "2026-01-07T16:00" },
    { title: "Stream 4", datetime: "2026-01-08T18:00" },
    { title: "Stream 5", datetime: "2026-01-09T20:00" },
    { title: "Stream 6", datetime: "2026-01-10T22:00" }
  ];

  // Helper: update all readonly rows to match schedule
  function updateRows() {
    rows.forEach((row, idx) => {
      const inputs = row.querySelectorAll('input');
      inputs[0].value = schedule[idx].title;
      inputs[1].value = schedule[idx].datetime;
    });
    localStorage.setItem('schedule', JSON.stringify(schedule));
  }

  // Attach delete buttons
  rows.forEach((row, idx) => {
    const delBtn = row.querySelector('.deleteBtn');
    delBtn.onclick = () => {
      // Shift up all entries below the deleted row
      for (let i = idx; i < schedule.length - 1; i++) {
        schedule[i] = { ...schedule[i + 1] };
      }
      // Empty the last row
      schedule[schedule.length - 1] = { title: "", datetime: "" };
      updateRows();
    };
  });

  // Initial population
  updateRows();

  // Save top row
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = topRow.querySelectorAll('input');
    const title = inputs[0].value.trim();
    const datetime = inputs[1].value;

    if (!title || !datetime) return alert("Please fill in both title and date/time!");

    // Push new entry to top, shift others down
    schedule.pop(); // remove last to keep 6 rows
    schedule.unshift({ title, datetime });

    // Clear top row inputs
    inputs[0].value = "";
    inputs[1].value = "";

    updateRows();
  });

  // Clear top row only
  clearBtn.addEventListener('click', () => {
    const inputs = topRow.querySelectorAll('input');
    inputs[0].value = "";
    inputs[1].value = "";
  });

  // Submit placeholder
  submitBtn.addEventListener('click', () => console.log("Submit clicked"));
});
