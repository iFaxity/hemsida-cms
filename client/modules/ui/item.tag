<ui-item class={classes}>
  <ui-icon if={opts.icon} icon={opts.icon}/>
  
  <a if={opts.href} href={opts.href}><yield/></a>
  <yield if={!opts.href}/>

  <script>
    const {
      classify, useKey,
      useKeyOrValueAndKey
    } = require("./util");

    this.classes = classify(
      useKey(opts.header, "header"),
      useKey(opts.active, "active"),
      useKeyOrValueAndKey(opts.fitted, "fitted"),
      "item"
    );
  </script>
</ui-item>