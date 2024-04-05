(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector("#mainNav");
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#mainNav",
      rootMargin: "0px 0px -40%",
    });
  }

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".sticky-top").addClass("shadow-sm").css("top", "0px");
    } else {
      $(".sticky-top").removeClass("shadow-sm").css("top", "-150px");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Event carousel
  $(".event-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    margin: 25,
    loop: true,
    center: true,
    dots: false,
    nav: true,
    navText: [
      '<i class="bi bi-chevron-left"></i>',
      '<i class="bi bi-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });

  // Testimonial carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    items: 1,
    loop: true,
    dots: true,
    nav: false,
  });

  // Header carousel
  for (let i = 1; i <= 10; i++) {
    $(".carousel-inner").append(
      `<div class="carousel-item position-relative ${i === 1 ? "active" : ""}" >
        <img class="w-100" src="img/c${i}.jpg" alt="Image" />
        <div class="d-none carousel-caption">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-7 text-center">
                <p class="fs-4 text-white animated fadeIn">
                  Welcome to <strong class="text-dark">Hermit Trust</strong>
                </p>
                <h1 class="display-1 text-dark mb-4 animated fadeIn">
                  Vision
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div class="overlay position-absolute" style="background-image:url(img/c${i}.jpg);"></div>
      </div>`
    );
  }
})(jQuery);
