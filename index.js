window.addEventListener('DOMContentLoaded', () => {
  const topRow = document.querySelector('.gridRow.topRow');
  const rows = Array.from(document.querySelectorAll('.gridRow')).slice(1); // readonly rows
  const clearBtn = document.getElementById('clearBtn');
  const submitBtn = document.getElementById('submitBtn');
  const form = document.getElementById('scheduleForm');

  // Initialize schedule array
  let schedule = JSON.parse(localStorage.getItem('schedule')) || rows.map(() => ({ title: "", datetime: "" }));

  // Render schedule in rows
  function renderSchedule() {
    rows.forEach((row, idx) => {
      const entry = schedule[idx] || { title: "", datetime: "" };
      const inputs = row.querySelectorAll('input');
      inputs[0].value = entry.title;
      inputs[1].value = entry.datetime;
    });
    attachDeleteEvents(); // reattach delete button handlers
    localStorage.setItem('schedule', JSON.stringify(schedule));
  }

  // Attach delete button handlers
  function attachDeleteEvents() {
    rows.forEach((row, idx) => {
      const delBtn = row.querySelector('.deleteBtn');
      if (!delBtn) return;
      delBtn.onclick = () => {
        // Remove the entry and shift up
        schedule.splice(idx, 1);
        schedule.push({ title: "", datetime: "" }); // keep array length 6
        renderSchedule();
      };
    });
  }

  // Initial render
  renderSchedule();

  // Save button functionality
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = topRow.querySelectorAll('input');
    const title = inputs[0].value.trim();
    const datetime = inputs[1].value;

    if (!title || !datetime) return alert("Please fill in both title and date/time!");

    schedule.pop(); // remove last
    schedule.unshift({ title, datetime }); // add new at top

    // Clear top row
    inputs[0].value = "";
    inputs[1].value = "";

    renderSchedule();
  });

  // Clear top row
  clearBtn.addEventListener('click', () => {
    const inputs = topRow.querySelectorAll('input');
    inputs[0].value = "";
    inputs[1].value = "";
  });

  // Submit placeholder
  submitBtn.addEventListener('click', () => console.log("Submit clicked"));
});
