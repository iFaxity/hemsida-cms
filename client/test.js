const { h, Component, render } = preact;

// Slideshow for index page
(function() {
  const slideshow = document.querySelector(".slideshow");
  const images = slideshow.querySelector(".images").children;
  const controls = slideshow.querySelector(".controls");
  let interval, slideIndex = 0;

  controls.addEventListener("click", e => {
    // Check if the controller icon was clicked
    if(!e.target.matches(".radio.icon:not(.selected)")) {
      let node = e.target.parentElement,
          index = 0;

      for (; node = node.previousSibling; index++);
      setSlide(index);
      resetInterval();
    }
  }, false);

  function resetInterval() {
    if(interval) {
      clearInterval(interval);
    }
    interval = setInterval(() => setSlide((slideIndex + 1) % images.length), 5000);
  }
  function setSlide(index) {
    const { children } = controls;

    images[slideIndex].classList.remove("active");
    children[slideIndex].firstChild.classList.remove("selected");

    slideIndex = index;
    images[slideIndex].classList.add("active");
    children[slideIndex].firstChild.classList.add("selected");
  }

  // Start the carousel 
  resetInterval();
})();