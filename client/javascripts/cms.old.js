(function() {
  const { h, render, Component } = preact;

  function save() {
    const app = document.getElementById("app");
    const params = new URLSearchParams();
    params.append("html", app.innerHTML);

    // Save through fetch
    fetch(location.pathname, {
      method: "POST",
      credentials: "same-origin",
      body: params
    });
  }

  app.addEventListener("click", e => {
    const { target } = e;
  });

  /*class Editor extends Component {
    render() {
    }
  }

  class Menu extends Component {
    render() {
    }
  }*/

  //render(h(Editor));
  //render(h(Menu));
})();