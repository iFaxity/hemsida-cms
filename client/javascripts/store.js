require.config({
  baseUrl: "/modules"
});

require(["dom"], DOM => {
  const form = DOM.find("form");

  form.addEventListener("submit", e => {
    e.preventDefault();

    const data = {
      user: form.elements.user.value,
      password: form.elements.pass.value
    };

    DOM.Ajax({
      url: "/cms/login",
      method: "POST",
      data: data
    }).then(console.log, console.error);
  });
});