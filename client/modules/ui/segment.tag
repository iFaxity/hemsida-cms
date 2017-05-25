<ui-segment class={classes}>
  <yield/>

  <script>
    const { isStr } = require("./util.js");
    const {color, attach, float, align} = opts;

    this.classes = {
      ui: true,
      segment: true,
      raised: isStr(opts.raised),
      stacked: isStr(opts.stacked),
      piled: isStr(opts.piled),
      vertical: isStr(opts.vertical),
      disabled: isStr(opts.disabled),
      loading: isStr(opts.loading),
      inverted: isStr(opts.inverted),
      padded: isStr(opts.padded),
      compact: isStr(opts.compact),
      circular: isStr(opts.circular),
      clearing: isStr(opts.clearing),
      basic: isStr(opts.basic)
    };

    if(color) {
      this.classes[color] = true;
    }
    if(isStr(attach)) {
      this.classes.attached = true;
      if(attach) {
        this.classes[attach] = true;
      }
    }
    if(isStr(float)) {
      this.classes.floated = true;
      if(float) {
        this.classes[float] = true;
      }
    }
    if(isStr(align)) {
      this.classes.aligned = true;
      if(align) {
        this.classes[align] = true;
      }
    }
  </script>
</ui-segment>