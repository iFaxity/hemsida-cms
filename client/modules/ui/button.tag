<ui-button class={classes} tabindex={opts.tabindex}>
  <ui-icon if={opts.icon} icon={opts.icon}/>
  <yield/>
  
  <script>
    const {
      classify, useKey, useValueAndKey,
      useKeyOrValueAndKey
    } = require("./util.js");

    this.classes = classify(
      "ui",
      opts.color,
      opts.size,
      useKey(opts.basic, "basic"),
      useKey(opts.active, "active"),
      useKey(opts.disabled, "disabled"),
      useKey(opts.loading, "loading"),
      useKey(opts.labeled, "labeled"),
      useKey(opts.circular, "circular"),
      useKey(opts.compact, "compact"),
      useKey(opts.fluid, "fluid"),
      useKey(opts.positie, "positive"),
      useKey(opts.negative, "negative"),
      useKey(opts.primary, "primary"),
      useKey(opts.secondary, "secondary"),
      useKey(opts.toggle, "toggle"),
      useKeyOrValueAndKey(opts.animated, "animated"),
      useKeyOrValueAndKey(opts.attached, "attached"),
      useKeyOrValueAndKey(opts.floated, "floated"),
      useKeyOrValueAndKey(opts.icon, "icon"),
      useKeyOrValueAndKey(opts.social, "social"),
      "button"
    );
  </script>  
</ui-button>