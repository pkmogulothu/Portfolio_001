function attachImagesToCursor() {
    var elements = document.querySelectorAll(".element");
    var cursorImages = [
      document.getElementById("imagePreloader").src,
      document.getElementById("imagePreloader2").src,
      document.getElementById("imagePreloader3").src,
    ];

    var customCursor;

    elements.forEach(function (element, index) {
      element.addEventListener("mouseenter", function () {
        customCursor = document.createElement("div");
        customCursor.classList.add("custom-cursor");
        customCursor.innerHTML = `<img src="${cursorImages[index]}" alt="Cursor Image">`;
        document.body.appendChild(customCursor);
      });

      element.addEventListener("mouseleave", function () {
        if (customCursor) {
          customCursor.remove();
        }
      });
    });

    // Update custom cursor position and rotation on mouse move
    window.addEventListener("mousemove", function (event) {
      if (customCursor) {
        gsap.set(customCursor, {
          x: event.clientX ,
          y: event.clientY ,
        });

        // Calculate the rotation angle based on mouse X position relative to the window width
        var windowWidth = window.innerWidth;
        var rotationAmount = -1 * (event.clientX / windowWidth - 0.5) * 60; // Reverse rotation and adjust sensitivity (here 60 is used)

        gsap.to(customCursor, {
          rotation: rotationAmount,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });
  }

  // Preload images
  // function preloadImages() {
  //   var imagePreloader = document.getElementById("imagePreloader");
  //   var imagePreloader2 = document.getElementById("imagePreloader2");
  //   var imagePreloader3 = document.getElementById("imagePreloader3");

  //   var imageSources = [
  //     imagePreloader.src,
  //     imagePreloader2.src,
  //     imagePreloader3.src,
  //   ];

  //   imageSources.forEach(function (src) {
  //     var img = new Image();
  //     img.src = src;
  //   });
  // }

  document.addEventListener("DOMContentLoaded", function() {
    
    attachImagesToCursor();
  });

  // Follow mouse cursor
  function circleMouseFollower() {
    var minicircle = document.querySelector("#minicircle");
    var scaleX = 1;
    var scaleY = 1;

    gsap.set(minicircle, { xPercent: -50, yPercent: -50, scaleX: scaleX, scaleY: scaleY });

    var resetTimeout;

    function updateCircleTransform(dets) {
      var xPos = dets.clientX;
      var yPos = dets.clientY;
      var width = window.innerWidth;
      var height = window.innerHeight;

      scaleX = gsap.utils.clamp(0.5, 1.5, xPos / width);
      scaleY = gsap.utils.clamp(0.5, 1.5, yPos / height);

      gsap.to(minicircle, {
        duration: 0.3,
        ease: "power2.out",
        scaleX: scaleX,
        scaleY: scaleY,
        x: xPos,
        y: yPos,
      });

      // Clear previous timeout and set a new one to reset minicircle size after 300ms
      clearTimeout(resetTimeout);
      resetTimeout = setTimeout(function() {
        gsap.to(minicircle, {
          duration: 0.3,
          ease: "power2.out",
          scaleX: 1,
          scaleY: 1,
        });
      }, 300);
    }

    window.addEventListener("mousemove", function(dets) {
      clearTimeout(resetTimeout);
      updateCircleTransform(dets);
    });
  }

  document.addEventListener("DOMContentLoaded", circleMouseFollower);