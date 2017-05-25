<ui-item class={classes}>
  <ui-icon if={icon} icon={icon}/>
  <a if={opts.href} href={opts.href}><yield/></a>
  <yield if={!opts.href}/>

  <script>
    const {icon} = opts;

    if(icon) {
      this.icon = icon;
    }
  </script>
</ui-item>