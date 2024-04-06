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

  // spinner();

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

const ids = ["name", "email", "subject", "message"];

function getValueById(id) {
  return document.getElementById(id).value;
}

function getFormValues() {
  return ids.reduce(function (acc, i) {
    acc[i] = getValueById(i);
    return acc;
  }, {});
}

function clearValues() {
  ids.forEach((id) => {
    document.getElementById(id).value = "";
  });
}

function showNotification(msg, type = "success") {
  const classes = {
    success: "alert-success",
    error: "alert-danger",
  };

  const messageEl = document.getElementById("form-message");
  messageEl.classList.add(classes[type]);
  messageEl.classList.remove("d-none");
  messageEl.classList.add("d-block");
  messageEl.innerHTML = msg;

  setTimeout(function () {
    messageEl.classList.remove("d-block");
    messageEl.classList.add("d-none");
  }, 2000);

  setTimeout(function () {
    messageEl.classList.remove(classes[type]);
  }, 2500);
}


function enableSubmitBtn() {
  document.getElementById("submitBtn").disabled = false;
}

function disableSubmitBtn() {
  document.getElementById("submitBtn").disabled = true;
}

function submitForm() {
  const { name, email, subject, message } = getFormValues();
  if (!(name && email && subject && message)) {
    showNotification("Name, email, subject and message are required", "error");
    return;
  }

  var xhttp = new XMLHttpRequest();

  const data = new FormData();
  data.append("entry.1494288265", name);
  data.append("entry.1928966834", email);
  data.append("entry.1202903610", subject);
  data.append("entry.1841566636", message);

  const qs = [...data.entries()]
    .map((x) => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
    .join("&");

  xhttp.open(
    "POST",
    "https://docs.google.com/forms/d/e/1FAIpQLSeWUzhhelvpfTTeA_vUHTVjeDz95xwScIDBqEDZjcDnpQpXfg/formResponse?&submit=Submit?usp=pp_url&" +
      qs,
    true
  );
  xhttp.send();

  showNotification("Your response is submitted. Thank You", "success");
  grecaptcha.reset();
  disableSubmitBtn();
  clearValues();

  return false;
}
