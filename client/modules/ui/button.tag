<ui-button class={classes} tabindex={tabindex}>
  <ui-icon if={icon} icon={icon}/>
  <yield/>
  
  <script>
    const { isStr, classify } = require("./util.js");
    const { icon, color, social, size, float, attach } = opts;
    const classes = {
      basic: opts.basic,
      animated: opts.animated,
      active: opts.active,
      disabled: opts.disabled,
      loading: opts.loading,
      compact: opts.compact,
      toggle: opts.toggle,
      fluid: opts.fluid,
      circular: opts.circular,
      labeled: opts.labeled
    };

    classes[size] = size;
    classes[color] = color;

    // social or icon not both
    if(isStr(icon)) {
      classes.icon = true;
      if(icon) {
        this.icon = opts.icon;
      }
    } else if(isStr(social)) {
      classes[social] = true;
      if(social) {
        this.icon = social;
      }
    }

    if(isStr(float)) {
      classes.floated = true;
      if(float) {
        classes[float] = true;
      }
    }
    if(isStr(attach)) {
      classes.attached = true;
      if(attach) {
        classes[attach] = true;
      }
    }
    // Set the classes variable
    this.classes = classify(classes, "button");
  </script>  
</ui-button>