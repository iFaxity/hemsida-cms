(function(global, factory) {
  // Module exporting
  if (typeof define === "function" && define.amd) {
    define(["dom"], factory);
  } else {
    if (typeof module !== "undefined" && module.exports) {
      module.exports = factory();
    }
  }
})(this, function(DOM) {
  const MONTH_NAMES = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"];



  class Calendar extends DOM.Component {
    constructor(props) {
      super(props);

      const date = new Date();
      this.props.date = date;

      this.state = {
        year: 0,
        month: 0,
        selected: {
          year: 0,
          month: 0,
          day: 0
        }
      };

      this.state = {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate()
      };
    }

    render() {
      const {year, month, day} = this.state;
      const count = this.daysInMonth();

      const container = this.create({className: "calendar"});
      const header = container.create({className: "ui top attached block header"})
                              .create({className: "ui grid"});

      header.create({className: "one wide column"})
            .create("i", {className: "triangle left icon"});
      header.create({className: "fourteen wide column"})
            .create("h4", {className: "ui header center aligned", textContent: MONTH_NAMES[month] + " " + year});
      header.create({className: "one wide column"})
            .create("i", {className: "triangle right icon"});

      const days = container.create({className: "ui bottom attached segment"})
                            .create({className: "days ui eight column grid"});

      for(let index = 1; index <= count; index++) {
        const className = "ui button fluid middle aligned" + (day === index ? " selected" : "");
        days.create({className: "column"})
            .create("a", {className, textContent: `${index}`});
      }
    }
    mounted() {
      this.on("click", e => {
        if(e.target.matches(".header .left")) {
          this.prevMonth();
        }
        else if(e.target.matches(".header .right")) {
          this.nextMonth();
        }
        else if(e.target.matches(".days .button")) {
          const day = parseInt(e.target.textContent);
          if(day < 1) {
            throw new TypeError("Cant handle click!");
          }

          this.updateState({day});
        }
      });
    }

    nextMonth() {
      const {year, month} = this.state;
      if(month === 11) {
        this.setState({year: year + 1, month: 0});
      } else {
        this.setState({year, month: month + 1});
      }
    }
    prevMonth() {
      const {year, month} = this.state;
      const {date} = this.props;

      if(year > date.getFullYear()) {
        if(month === 0) {
          this.updateState({year: year - 1, month: 11});
        } else {
          this.updateState({month: month - 1});
        }
      } else if(month > date.getMonth()) {
        this.updateState({month: month - 1});
      }
    }

    daysInMonth() {
      const {year, month} = this.state;
      return new Date(year, month + 1, 0).getDate();
    }
    getDate() {
      const {year, month, day} = this.state;
      return `${year}:${month}:${day}`;
    }
  }

  return Calendar;
});
