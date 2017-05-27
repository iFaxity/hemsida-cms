<ui-menu class={classes}>
  <yield/>
  <script>
    const {classify, enumOf, SIZES, WIDTHS, COLORS} = require("./util.js");
    const {size, width, color, fixed, attached, tabular} = opts;
    const classes = {
      icon: opts.icon,
      labeled: opts.labeled,
      text: opts.text,
      attached: opts.attached,
      vertical: opts.vertical,
      stackable: opts.stackable,
      inverted: opts.inverted,
      borderless: opts.borderless,
      pagination: opts.pagination,
      compact: opts.compact,
      pointing: opts.pointing,
      tabular: opts.tabular,
      fluid: opts.fluid,
      fixed: opts.fixed
    };

    // Enumerator
    if(fixed != null) {
      classes[fixed] = true;
      enumOf(fixed, ["top", "right", "bottom", "left"], classes.add)
      classes.fixed = true;
      classes[fixed] = enumOf();
    }
    classes[size] = enumOf(size, SIZES);
    classes[color] = enumOf(color, COLORS);
    if(enumOf(width, WIDTH)) {
      classes[width] = true;
      classes.item = true;
    }

    this.classes = classify(classes, "menu");
  </script>
</ui-menu>