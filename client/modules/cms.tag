<cms>
  <h3>{opts.title} - {opts.count}</h3>
  <form>
    <input ref="input" type="text" oninput={onInput}>

    <h3>Hello {greeting}</h3>
  </form>

  <ui-button basic icon="linkify">Hello mate</ui-button>
  <ui-segment>
    <ui-button>Click me</ui-button>
  </ui-segment>

  <style>
    cms {
      margin-left: 16rem;
      display: block;
    }
    h3 {
      color: red;
    }
  </style>

  <script>
    this.greeting = "Kek";
    this.items = ["kek", "lel", "lol", "halal", "tripp"];

    onInput(e) {
      this.greeting = this.refs.input.value;
    }
  </script>
</cms>