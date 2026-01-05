const form = document.getElementById('scheduleForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const schedule = [];

  for (let i = 0; i < 7; i++) {
    const title = form[`title${i}`].value;
    const datetime = form[`datetime${i}`].value;

    schedule.push({ title, datetime });
  }

  console.log("Schedule entered:", schedule);
  alert("Check console for schedule output!");
});
