<ui-menu class={classes}>
  <yield/>
  <script>
    const {
      classify, useKey, useWidth,
      useKeyOrValueAndKey, useValueAndKey
    } = require("./util");

    this.classes = classify(
      "ui",
      opts.color,
      opts.size,
      useKey(opts.borderless, "borderless"),
      useKey(opts.compact, "compact"),
      useKey(opts.fluid, "fluid"),
      useKey(opts.inverted, "inverted"),
      useKey(opts.pagination, "pagination"),
      useKey(opts.pointing, "pointing"),
      useKey(opts.secondary, "secondary"),
      useKey(opts.stackable, "stackable"),
      useKey(opts.text, "text"),
      useKey(opts.vertical, "vertical"),
      useKeyOrValueAndKey(opts.attached, "attached"),
      useKeyOrValueAndKey(opts.floated, "floated"),
      useKeyOrValueAndKey(opts.icon, "icon"),
      useKeyOrValueAndKey(opts.tabular, "tabular"),
      useValueAndKey(opts.fixed, "fixed"),
      useWidth(opts.widths, "item"),
      "menu"
    );
  </script>
</ui-menu>