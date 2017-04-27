require.config({
  baseUrl: "/modules"
});

require(["dom", "components/book/Calendar"], (DOM, Calendar) => {
  const calendar = new Calendar();
  const form = DOM.find("form");

  // Render the calendar and register form events
  DOM.render("#calendar", calendar);
  DOM.on(form, "submit", e => {
    e.preventDefault();
    const data = new FormData(form);
    data.append("date", calendar.getDate());

    DOM.Ajax({
      url: "add",
      method: "POST",
      data
    }).then(res => {
      alert("Din tid har registrerats korrekt");
    }, err => {
      alert("Din tid har inte registrerats.");
    });
  });
});
