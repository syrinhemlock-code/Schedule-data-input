window.addEventListener('DOMContentLoaded', () => {
  // --- References ---
  const form = document.getElementById('scheduleForm');
  const topRow = document.querySelector('.gridRow.topRow');
  const rows = Array.from(document.querySelectorAll('.gridRow')).slice(1); // rows 1–6
  const saveBtn = document.getElementById('saveBtn');
  const submitBtn = document.getElementById('submitBtn');
  const clearBtn = document.getElementById('clearBtn');

  // --- Initialize schedule array for rows 1–6 ---
  let schedule = [];
  for (let i = 0; i < rows.length; i++) {
    schedule.push({ title: "", datetime: "" });
  }

  // --- Function to render schedule in readonly rows ---
  function renderSchedule() {
    rows.forEach((row, idx) => {
      const inputs = row.querySelectorAll('input');
      inputs[0].value = schedule[idx].title;
      inputs[1].value = schedule[idx].datetime;
    });
    attachDeleteEvents(); // reattach delete buttons after render
  }

  // --- Attach delete events to each row ---
  function attachDeleteEvents() {
    rows.forEach((row, idx) => {
      const delBtn = row.querySelector('.deleteBtn');
      if (!delBtn) return;

      delBtn.onclick = () => {
        schedule.splice(idx, 1); // remove this entry
        renderSchedule();
      };
    });
  }

  // Initial render
  renderSchedule();

  // --- Save Button / Form Submit ---
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputs = topRow.querySelectorAll('input');
    const titleInput = inputs[0].value.trim();
    const datetimeInput = inputs[1].value;

    if (!titleInput || !datetimeInput) {
      alert("Please fill in both title and date/time!");
      return;
    }

    // Shift schedule down
    schedule.pop(); // remove oldest (bottom)
    schedule.unshift({ title: titleInput, datetime: datetimeInput }); // add new at top

    // Clear top row inputs
    inputs[0].value = "";
    inputs[1].value = "";

    // Re-render readonly rows
    renderSchedule();
  });

  // --- Clear Button ---
  clearBtn.addEventListener('click', () => {
    const inputs = topRow.querySelectorAll('input');
    if (inputs.length >= 2) {
      inputs[0].value = ""; // Clear title
      inputs[1].value = ""; // Clear date/time
    }
  });

  // --- Submit Button Placeholder ---
  submitBtn.addEventListener('click', () => {
    console.log("Submit clicked");
  });
});
