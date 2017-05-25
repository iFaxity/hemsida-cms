<ui-menu class={className}>
  <yield/>
  <script>
    const {isStr, classify} = require("./util.js");
    const {size, width, color, attach, fixed} = opts;

    const classes = {
      icon: opts.icon,
      labeled: opts.labeled,
      text: opts.text,
      vertical: opts.vertical,
      stackable: opts.stackable,
      inverted: opts.inverted,
      borderless: opts.borderless,
      pagination: opts.pagination,
      compact: opts.compact,
      pointing: opts.pointing,
      tabular: opts.tabular,
      fluid: opts.fluid
    };

    if (color) {
      classes[color] = true;
    }
    if(size) {
      classes[size] = true;
    }
    if(width) {
      classes[width] = true;
      classes.item = true;
    }
    if (isStr(attach)) {
      if (attach)
        classes[attach] = true;
      classes.attached = true;
    }
    if (isStr(fixed)) {
      if (fixed)
        classes[fixed] = true;
      classes.fixed = true;
    }

    this.classes = classify(classes, "menu");
  </script>
</ui-menu>