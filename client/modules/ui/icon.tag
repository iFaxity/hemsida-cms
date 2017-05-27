<ui-icon class={classes}>
  <script>
    const {
      classify, useKey,
      useKeyOrValueAndKey
    } = require("./util");
  
    this.classes = classify(
      opts.size,
      opts.icon,
      useKeyOrValueAndKey(opts.aligned, "aligned"),
      "icon"
    );
  </script>
</ui-icon>