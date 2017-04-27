(function(global, factory) {
  // Module exporting
  if (typeof define === "function" && define.amd) {
    define(factory);
  } else {
    const exports = factory();
    if (typeof module !== "undefined" && module.exports) {
      module.exports = exports;
    }
  }
})(this, function() {
  // Helpers for the user. May be heavily changed in the future.
  const Utils = {
    /**
     * Gets a random floating point number between min and max inclusive
     * @param min {number} Minimum value (inclusive)
     * @param max {number} Maximum value (inclusive)
     * @returns {number}
     */
    random(min, max) {
      min = min ? Math.ceil(min) : 0;
      max = max ? Math.floor(max) : 1;

      return Math.random() * (max - min + 1) + min;
    },

    /**
     * Gets a random integer between min and max inclusive.
     * @param min {number} Minimum value (inclusive)
     * @param max {number} Maximum value (inclusive)
     * @returns {number}
     */
    randomInt(min, max) {
      return Math.floor(this.random(min, max));
    },

    /**
     * Shuffles an array
     * @param arr {Array} - Array to shuffle
     * @returns {Array} - Shuffled array
     */
    shuffle(arr) {
      if (!Array.isArray(arr)) {
        throw new TypeError("The parameter is not an array");
      }

      let length = arr.length,
          rand, temp;

      while (length) {
        rand = this.randomInt(0, length--);
        temp = arr[length];

        arr[length] = arr[rand];
        arr[rand] = temp;
      }
    },

    /**
     * Checks if an object is a pure object
     * @param obj {*} - Object to check
     * @returns {boolean}
     */
    isPureObject(obj) {
      return this.isObject(obj) && obj.constructor === Object;
    },

    /**
     * Checks if a variable is an object
     * @param obj
     * @returns {*|boolean}
     */
    isObject(obj) {
      return obj != null && typeof obj === "object";
    },

    /*
     * Formats a string using the ES6 template string
     * @param {String} str - String to format
     * @param {Object} vars - Variables to format the string with
     * @returns {String} - Formatted string
     * */
    format(str, vars) {
      return str.replace(/\${(\w*)}/g, (match, key) => vars.hasOwnProperty(key) ? vars[key] : "");
    },

    /**
     * Checks if 2 objects are equal to each other
     * Only traverses down objects once.
     * @param {*} obj1 - First object to compare with
     * @param {*} obj2 - Second object to compare with
     * @param {boolean} [deep] - If deep property check should be used
     * @returns {boolean}
     */
    isEqual(obj1, obj2, deep = true) {
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);

      if (keys1.length !== keys2.length) {
        return false;
      }

      return keys1.every(key => {
        const val1 = obj1[key];
        const val2 = obj2[key];

        if(deep) {
          // Only traverse once
          if(this.isObject(val1) && this.isObject(val2)) {
            return this.isEqual(val1, val2, false);
          }
        }

        return keys2.includes(key) && val1 === val2;
      });
    }
  };

  function createEvent(el, eventName, listener) {
    // Parameter check
    if(Array.isArray(eventName)) {
      return eventName.every(name => this.on(el, name, listener));
    } else if (typeof eventName !== "string" || typeof listener !== "function") {
      throw new TypeError("Parameter error in DOM.on");
    }

    const index = eventName.indexOf(" ");
    const event = {selector: null, listener};

    // Check if selector was added
    if (index !== -1) {
      event.selector = eventName.substr(index + 1);
      eventName = eventName.substr(0, index);

      event.listener = function(e) {
        if(e.target.matches(event.selector)) {
          listener.call(this, e);
        }
      };
    }

    // Add to DOM event list
    if (!el.__DOMEvents) {
      el.__DOMEvents = {};
    }
    if (!el.__DOMEvents[eventName]) {
      el.__DOMEvents[eventName] = [];
    }
    el.__DOMEvents[eventName].push(event);
    el.addEventListener(eventName, event.listener);
    return event.listener;
  }

  const DOM = {
    /**
     * The version of this library
     * @returns {string}
     */
    version: "0.4.3",

    /**
     * Finds an element in the dom that matches a specified selector
     * @param {String} str - CSS Selector to query by
     * @param {Element} [el] - Element to search in
     * @returns {Element|null}
     */
    find(str, el) {
      el = el || document;

      const result = el.querySelector(str);
      return result || null;
    },

    /**
     * Finds all elements in the dom that matches a specified selector
     * @param {String} str - CSS Selector to query by
     * @param {Element} [el] - Element to search in
     * @returns {NodeList|null}
     */
    findAll(str, el) {
      el = el || document;

      const result = el.querySelectorAll(str);
      return result.length > 0 ? result : null;
    },

    /**
     * Find all element with specified tag name
     * @param {String} tagName - Tagname of the elements to find
     * @param {Element} [el] - Element to search in
     * @returns {NodeList|null}
     */
    findTagName(tagName, el) {
      el = el || document;

      const result = el.getElementsByTagName(tagName);
      return result.length > 0 ? result : null;
    },

    /**
     * Finds an element with a specified id
     * @param {String} id - ID of the element to find
     * @returns {Element|null}
     * */
    findId(id) {
      const result = document.getElementById(id);
      return result || null;
    },

    /**
     * Find all elements with the matching class/classes
     * @param {String} className - Class/classes to search by
     * @param {Element} [el] - Element to search in
     * @returns {NodeList|null}
     * */
    findClass(className, el) {
      el = el || document;

      const result = el.getElementsByClassName(className);
      return result.length > 0 ? result : null;
    },

    /**
     * Parses HTML into DOM.
     * Not recommended to run a lot. Performance is not great.
     * @param {String} html - representing any number of sibling elements
     * @param {Object} [vars] - ES6 template varaibles
     * @return {DocumentFragment} - Document fragment of parsed HTML
     */
    parseHTML(html, vars) {
      let template = document.createElement("template");

      if (Utils.isPureObject(vars)) {
        html = Utils.format(html, vars);
      }

      // Check if we support templates
      if ("content" in template) {
        template.innerHTML = html;
        return template.content;
      } else {
        // Do we need document fragment?
        const doc = new DOMParser().parseFromString(html, "text/html");
        const docfrag = document.createDocumentFragment();

        docfrag.appendChild(doc.documentElement);
        return docfrag;
      }
    },

    /**
     * Creates a new Element or TextNode
     * @param tagName {String} - Element tag name
     * @param props {Object|String} - Element's properties
     * @param events {Object} - Element's events
     * @returns {Element} Created element
     */
    create(tagName, props, events) {
      let element;

      // Create a text node
      if(!props || tagName === "#text") {
        const text = typeof props === "string" ? props : tagName;
        element = document.createTextNode(text);
      } else {
        element = document.createElement(tagName);

        // Set properties
        if(typeof props === "string") {
          element.textContent = props;
        } else if(props) {
          Object.keys(props).forEach(prop => {
            if (prop in element) {
              element[prop] = props[prop];
            }
          });
        }

        // Set all events
        if (events) {
          Object.keys(events).forEach(event => {
            DOM.on(element, event, events[event]);
          });
        }
      }

      return element;
    },

    /**
     * Dispatches an event on an element
     * @param element {Element} - Element to trigger event on
     * @param eventName {string} - Event name
     * @param data {Object} - Custom Event detail data
     */
    dispatch(element, eventName, data = null) {
      let event;
      const options = {
        bubbles: true,
        cancelable: true
      };

      // Create the event before dispatching
      if (data != null) {
        options.detail = data;
        event = new CustomEvent(eventName, options);
      } else {
        event = new Event(eventName, options);
      }
      // Finally dispatch the event
      element.dispatchEvent(event);
    },

    /**
     * Add event listener
     * @param {Node|Element} el
     * @param {String} eventName
     * @param {Function} listener
     */
    on(el, eventName, listener) {
      createEvent(el, eventName, listener);
    },

    /**
     * Add event listener, runs once
     * @param {Node|Element} el
     * @param {String} eventName
     * @param {Function} listener
     */
    once(el, eventName, listener) {
      const fn = createEvent(el, eventName, e => {
        const index = eventName.indexOf(" ");
        // Check if selector was added
        if (index !== -1) {
          eventName = eventName.substr(0, index);
        }

        const val = DOM.off(el, eventName, fn);
        return listener.call(this, e);
      });
    },

    /**
     * Remove event listener
     * @param {Node|Element} el
     * @param {String} eventName
     * @param {Function} [listener]
     * @returns {Boolean} Succeeded or not
     */
    off(el, eventName, listener) {
      if(typeof listener !== "function") {
        listener = null;
      }

      if(el && el.__DOMEvents) {
        if(Array.isArray(eventName)) {
          return eventName.every(name => this.off(el, name, listener));
        } else if(typeof eventName !== "string") {
          return Object.keys(el.__DOMEvents).every(eventName => this.off(el, eventName));
        } else if(el.__DOMEvents[eventName]) {
          const events = [];
          let fn = event => el.removeEventListener(eventName, event.listener);

          // Only remove with specific listener
          if(listener) {
            fn = event => {
              if(event.listener === listener) {
                el.removeEventListener(eventName, listener);
              } else {
                events.push(event);
              }
            };
          }

          el.__DOMEvents[eventName].forEach(fn);
          el.__DOMEvents[eventName] = events;
          return true;
        }
      }
      // Removal failed
      return false;
    }
  };

  function setProps(el, props) {
    Object.keys(props).forEach(prop => {
      const value = props[prop];

      if(typeof el[prop] !== "undefined" && value != null) {
        el[prop] = value;
      }

      /*if(elVal != null && elVal !== value && elVal.constructor === value.constructor) {
       el[prop] = value;
       }*/
    });
  }
  function setEvents(el, events) {
    events.forEach(event => {
      if(event.type === "on") {
        DOM.on(el, event.eventName, event.listener);
      } else if(event.type === "once") {
        DOM.once(el, event.eventName, event.listener);
      }
    });
  }

  // Traverses children and compares them to each other
  function traverse(context, el, callback) {
    setTimeout(() => {
      // Traverse all the children
      el.children.forEach((child, index) => {
        const ctxChild = context.childNodes[index];
        const isComponent = child instanceof Component;

        // Render components before comparing
        if (isComponent) {
          child.children = [];
          child.render();
        }

        // Decide what action to take
        if (!ctxChild) {
          // No context is not yet created
          const el = createElement(child);
          context.appendChild(el);
        }
        else {
          // Diff the virtual to the actual DOM
          const shouldUpdate = shouldUpdate(ctxChild, child);

          // Update or re-create the context
          if(shouldUpdate) {
            updateElement(ctxChild, child);
          } else {
            const newChild = createElement(child);

            // Unmount if a component
            const ctxComponent = ctxChild.__DOMComponent;
            if(ctxComponent instanceof Component) {
              ctxComponent.unmounted();
            }

            context.replaceChild(newChild, ctxChild);
          }

          /* If tag has changed. Re-create the element
           /if (ctxChild.nodeName !== child.tagName) {
           const el = createElement(child);

           // Check if unmounting is needed
           const ctxComponent = ctxChild.__DOMComponent;
           if(ctxComponent && ctxComponent instanceof Component) {
           ctxComponent.unmounted();
           }

           context.replaceChild(el, ctxChild);
           }
           else {
           updateElement(ctxChild, child);
           }*/
        }
      });

      // Remove elements that does not belong anymore
      const diff = context.childNodes.length - el.children.length;
      for(let i = 0; i < diff; i++) {
        removeElement(context, context.lastChild);
      }

      // Exec callback if defined
      if(typeof callback === "function") {
        callback();
      }
    }, 0);
  }

  // Checks if a context should just update or be recreated
  function shouldUpdate(ctxEl, el) {
    const component = ctxEl.__DOMComponent;
    const isComponent = ctxEl instanceof Component;
    let shouldUpdate = true;

    // Check if we should just update or recreate the context
    if(isComponent) {
      if(isComponent) {
        if(component.constructor !== el.constructor) {
          shouldUpdate = false;
        }
      } else {
        shouldUpdate = false;
      }
    } else if(ctxEl.nodeName !== el.tagName) {
      shouldUpdate = false;
    }

    return shouldUpdate;
  }

  // Updates virtual element to rendered element
  function updateElement(context, el) {
    //TODO: update to support text nodes
    //TODO: verify events and rebind them

    // Patch all the properties
    setProps(context, el.props);

    // Traverse the next children
    if(el.children) {
      traverse(context, el);
    }
  }

  // Creates an element from virtual element or component
  function createElement(el) {
    let element;
    const isComponent = el instanceof Component;

    // Check if element is text node
    if(el.tagName === "#text") {
      element = document.createTextNode(el.props.textContent);
    } else {
      if (isComponent) {
        element = document.createElement("div");
        element.__DOMComponent = el;
        el.context = element;
      } else {
        element = document.createElement(el.tagName);
      }

      // Set all properties
      setProps(element, el.props);
      if (el.children) {
        // Traverse the next children
        el.children.forEach(child => element.appendChild(createElement(child)));
      }

      // Mount & set events
      if(isComponent) {
        el.mounted(element);
      }
      setEvents(element, el.events);
    }
    return element;
  }

  // Removes all elements down a chain & safely unmounts all components
  function removeElement(context, el) {
    if(el.children) {
      for(let child of el.children) {
        removeElement(el, child);
      }
    }

    context.removeChild(el);
    if(el.__DOMComponent) {
      el.__DOMComponent.unmounted();
      el.__DOMComponent.context = null;
    }
  }

  class DOMNode {
    constructor() {
      this.events = [];
      this.children = [];
    }

    create(tagName, props, events, component) {
      const child = tagName instanceof Component
          ? tagName
          : new DOMElement(tagName, props, events, component);

      this.children.push(child);
      return child;
    }

    on(eventName, listener) {
      const component = this instanceof Component ? this : this.component;
      this.events.push({type: "on", eventName, listener: listener.bind(component)});
      return this;
    }
    once(eventName, listener) {
      const component = this instanceof Component ? this : this.component;
      this.events.push({type: "once", eventName, listener: listener.bind(component)});
      return this;
    }
    off(eventName, listener) {
      if(this.context) {
        DOM.off(this.context, eventName, listener);
      } else {
        throw new TypeError("Cant call off on a non component.");
      }
    }
  }

  class Component extends DOMNode {
    /**
     * Constructs a new Component
     * @param {Object} [props] - Properties of the component
     */
    constructor(props) {
      super();
      this.props = props || {};
      if(!this.state) {
        this.state = {};
      }
    }

    /**
     * Renders virtual representation of the component to use in the diffing of the component
     */
    render() {}

    /**
     * Executes whenever the component becomes mounted onto the DOM
     * @param {HTMLElement} context - Context of the mounted component
     */
    mounted(context) {}

    /**
     * Executes whenever the component becomes unmounted from the DOM
     */
    unmounted() {}

    /**
     * Sets the state of the component. If the new state is the same as the present state then nothing will change.
     * @param {Object} newState - The new state to set
     */
    setState(newState) {
      //this.prevState = this.state;
      this.state = newState;
      Component.render(this);

      // Check if re-render is needed
      /*if (!Utils.isEqual(this.state, newState)) {
       this.state = newState;
       Component.render(this.context, this);
       }*/
    }

    /**
     * Updates some properties of the state of the component. If the updated state is the same as the present then nothing will change.
     * @param {string} newState
     */
    updateState(newState) {
      if (!this.state) {
        throw new TypeError("Cant update state if no initial state was set.");
      }
      const state = Object.assign({}, this.state, newState);
      this.setState(state);
    }

    /*on(eventName, listener) {
     super.on(eventName, listener.bind(this));
     }
     once(eventName, listener) {
     super.on(eventName, listener.bind(this));
     }*/

    create(tagName, props, events) {
      return super.create(tagName, props, events, this);
    }

    /**
     * Renders an element or component to context
     * @param {HTMLElement} [context] - Element to render to
     * @param {Component} el - Component to diff from
     */
    static render(context, el) {
      let firstMount = false;

      // Parameter checking
      if(context instanceof Component) {
        el = context;
        context = el.context;
      } else {
        if(!(el instanceof Component)) {
          throw new TypeError("Unidentified component defined in Component.render");
        }
        if(typeof context === "string") {
          context = DOM.find(context);
        }
      }

      if(!(context instanceof HTMLElement)) {
        throw new TypeError("Unidentified context defined in Component.render");
      }

      // Check if render was called on already mounted component
      if(el.context !== context) {
        // Component reference on element
        firstMount = true;
        el.context = context;
        context.__DOMComponent = el;
      }

      // Do the render on the component
      el.children = [];
      el.render();
      traverse(context, el, () => {
        // is component first time mounted?
        if (firstMount) {
          el.mounted(context);
          setEvents(context, el.events);
        }
      });
    }

    /**
     * Unmounts a component from the DOM
     * Removes an element or component from the DOM
     * @param {HTMLElement | Component} el - Context or Component to unmount component from
     */
    static remove(el) {
      const component = el.__DOMComponent || el;
      const context = component.context;
      if(!(component instanceof Component)) {
        throw new TypeError("The parameter has to be a rendered Component or an element that contains a rendered Component.");
      }

      while(context.firstChild) {
        removeElement(context, context.firstChild);
      }

      // Unmount component and remove custom props
      component.unmounted();
      delete context.__DOMComponent;
      DOM.off(context);
    }
  }

  class DOMElement extends DOMNode {
    /**
     * Constructs a virtual DOM element
     * @param {string} tagName - Tag name of element e.g "p", "div" "#text". The latter will create a text node
     * @param {Object|string} props - Properties of the element e.g {textContent: "Text", className:"text item"}. If tagName is "#text" then only string is accepted.
     * @param {Object} events - Event listeners to add to element
     * @param {Component} component - DOM Component to mount it on
     */
    constructor(tagName, props, events, component) {
      super();
      this.component = component;

      // Text nodes cant have
      if(tagName === "#text") {
        if(typeof props !== "string") {
          throw new TypeError("DOM Error: A text node requires to have parameter 'props' as string");
        }

        this.props = {textContent: props};
        this.tagName = tagName;
      }
      else {
        if(Utils.isObject(tagName)) {
          events = props;
          props = tagName;
          tagName = "div";
        }

        // Set events
        if(Utils.isObject(events)) {
          Object.keys(events).forEach(eventName => {
            this.on(eventName, events[eventName]);
          });
        }

        // Set element properties
        this.tagName = tagName.toUpperCase();
        this.props = typeof props === "string"
            ? {textContent: props}
            : props || {};

        // Append text as text nodes
        if(this.props.textContent) {
          this.create("#text", this.props.textContent);
          delete this.props.textContent;
        }
      }
    }

    create(tagName, props, events) {
      return super.create(tagName, props, events, this.component);
    }
  }

  /**
   * Constructs a promise based Ajax request
   * @param {Object} options - Request options.
   * @returns {Promise}
   */
  function Ajax(options) {
    const settings = {
      url: null,
      method: "GET",
      timeout: 0,
      data: null,
      type: null
    }, xhr = new XMLHttpRequest();

    if (!Utils.isObject(options)) {
      throw "QLib: AJAX's parameter must be an object!";
    }

    // Override default settings
    Object.assign(settings, options);

    // Use promise with ajax request
    return new Promise((resolve, reject) => {
      try {
        const data = settings.data;
        const method = settings.method.toUpperCase();
        let url = settings.url, formData;

        // Add events to resolve the promise
        xhr.addEventListener("error", () => reject(new Error("Network Error")));
        xhr.addEventListener("load", () => {
          if (xhr.status >= 200 && xhr.status < 400) {
            resolve(xhr.response || xhr.responseText);
          } else {
            reject(new Error(`Code: ${xhr.status}; Message: ${xhr.statusText}`));
          }
        });

        if (Utils.isObject(data)) {
          // If method is POST then use FormData
          // Otherwise use query string
          if(method === "POST") {
            if(data instanceof FormData) {
              formData = data;
            } else {
              formData = new FormData();
              Object.keys(data).forEach(key => formData.append(key, data[key]));
            }
          }
          else {
            url += "?" + Ajax.param(data);
          }
        }

        if (settings.timeout) {
          xhr.timeout = settings.timeout;
        }
        if (settings.type) {
          xhr.responseType = settings.type;
        }

        // Send with data (if specified)
        xhr.open(method, url);
        xhr.send(formData);
      }
      catch (ex) {
        reject(ex);
      }
    });
  }

  Ajax.get = (url, data) => Ajax({url, data, method: "GET"});
  Ajax.post = (url, data) => Ajax({url, data, method: "POST"});
  Ajax.put = (url, data) => Ajax({url, data, method: "PUT"});
  Ajax.delete = (url, data) => Ajax({url, data, method: "DELETE"});

  /**
   * Gets JSON data of an requested url
   * @param {string} url - URL to get JSON data from
   * @param {Object} [data] - Data to send on the request
   * @returns {Promise}
   */
  Ajax.getJSON = (url, data) => {
    //type: "json" not supported in IE11.
    return Ajax({url, data}).then(json => {
      try {
        return JSON.parse(json);
      }
      catch (err) {
        return Promise.reject(err);
      }
    });
  };

  /**
   * Creates a query string from an object or array
   * @param {Object|Array} params - Object to convert into query string
   * @returns {string}
   */
  Ajax.param = params => {
    // Only an object or array is allowed
    if (!Utils.isObject(params) && !Array.isArray(params)) {
      throw new TypeError("Parameter 'obj' is not an object or an array");
    }

    // Remove all null and undefined values and encode the key's and values
    const arr = [];
    Object.keys(params).forEach(param => {
      if(typeof params[param] !== "undefined") {
        arr.push(encodeURIComponent(param) + "=" + encodeURIComponent(params[param]));
      }
    });

    return arr.join("&");
  };

  class Template {
    constructor(template) {
      if(!("content" in template)) {
        throw new TypeError("Invalid Parameter in DOM.Template! First parameter has to be TemplateElement.");
      }

      this.template = template;
    }

    render(target, vars) {
      if(target.nodeType === Node.ELEMENT_NODE && Utils.isPureObject(vars)) {
        const node = document.importNode(this.template.content, true);

        // Template all the template literals
        renderTemplate(node, vars);

        target.appendChild(node);
      }
    }
  }

  function renderTemplate(node, vars) {
    if(node.childNodes && node.childNodes.length > 0) {
      // Traverse the children off node
      node.childNodes.forEach(child => {
        // Only get text nodes
        if(child.nodeType === Node.ELEMENT_NODE) {
          renderTemplate(child, vars);
        }
        else if(child.nodeType === Node.TEXT_NODE) {
          if(child.nodeValue.indexOf("${") >= 0) {
            child.nodeValue = Utils.format(child.nodeValue, vars);
          }
        }
      });
    }
  }

  Object.assign(DOM, {
    Utils,
    Ajax,
    Template,
    Component,
    render: Component.render,
    remove: Component.remove
  });

  // Always export to window if available
  if(window && !window.DOM) {
    window.DOM = DOM;
  }
  return DOM;
});
