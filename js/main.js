var waypoints = $('.part').waypoint(function (direction) {
  //console.log(this.element.innerHTML);
  //console.log($(this.element));
  //$(this.element).children().addClass('active');
}, {
  offset: '100%'
});

let observer;

let options = {
  root: null,
  rootMargin: '-100px',
  threshold: .2
}

let callback = (entries, observer) => {
  entries.forEach(entry => {
    let el = $(entry.target);
    if (el.has("video").length == 0) {
      if (entry.isIntersecting) {
        $(entry.target).addClass("active");
      } else {
        $(entry.target).removeClass("active");
      }
    } else {
      $(entry.target).addClass("active");
    }
  })
};

observer = new IntersectionObserver(callback, options);

let targets = document.querySelectorAll(".part");

targets.forEach(target => {
  observer.observe(target);
});

let mainObserver;

let mainOptions = {
  root: null,
  rootMargin: '0px',
  threshold: .1
}

let mainCallback = (entries, mainObserver) => {
  entries.forEach(entry => {
    if (entry.isIntersecting == false) {
      $(".section-content").animate({
        scrollLeft: last_known_scroll_position
      }, "slow");
      $(entry.target).parent().removeClass("active");
    } else {
      $(entry.target).parent().addClass("active");
    }
  });
};

mainObserver = new IntersectionObserver(mainCallback, mainOptions);

let mainTargets = document.querySelectorAll(".section-content");

mainTargets.forEach(mainTarget => {
  mainObserver.observe(mainTarget);
  mainTarget.addEventListener('scroll', function (e) {
    last_known_scroll_position = mainTarget.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(function () {
        doSomething(mainTarget, last_known_scroll_position);
        ticking = false;
      });
      ticking = true;
    }
  });
});

let last_known_scroll_position = 0;
let ticking = false;

function doSomething(target, pos) {
  $(target).animate({
    scrollLeft: pos
  }, "slow");
  $("html, body").stop().animate({
    scrollTop: $(target).parent().offset().top
  }, "slow");
}

/*let mainObserver;

let mainOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 1.0
}

let mainCallback = (entries, mainObserver) => {
  entries.forEach(entry => {
    $(entry.target).addClass("visible");
    console.log($(entry.target));
  })
};

mainObserver = new IntersectionObserver(mainCallback, mainOptions);

let targets = document.querySelectorAll("section");

targets.forEach(target => {
  mainObserver.observe(target);
});

let sections = document.querySelectorAll(".section-content");

sections.forEach(section => {

  let observer;

  let options = {
    root: section,
    rootMargin: '0px',
    threshold: 1.0
  }

  let callback = (entries, observer) => {
    entries.forEach(entry => {
      if ($(entry.target).parents("section").hasClass("visible")) {
        $(entry.target).addClass("active");
        console.log($(entry.target));
      }
    })
  };

  observer = new IntersectionObserver(callback, options);

  let targets = section.querySelectorAll(".part");

  targets.forEach(target => {
    observer.observe(target);
  });
})*/

/*let backButtons = document.querySelectorAll(".back-bttn");

backButtons.forEach(button => {
  let bttn = $(button);
  bttn.click(function(){
    console.log($(bttn.parents("section")));
    $(bttn.parents("section")).scrollTo($(bttn.parents("section").children(".section-content")));
  })
});*/

/*Scroll to top when arrow up clicked BEGIN*/
$(".section-content").scroll(function () {
  var width = $(this).scrollLeft();
  //console.log("scrolled! " + width);
  if (width > 100) {
    $('.back-bttn').addClass("turned");
    $('.back-bttn.first').removeClass("hidden");
  } else {
    $('.back-bttn').removeClass("turned");
    $('.back-bttn.first').addClass("hidden");
  }
});
$(document).ready(function () {
  $('.back-bttn').click(function (event) {
    event.preventDefault();
    if ($(this).hasClass("turned")) {
      $(".section-content").animate({
        scrollLeft: 0
      }, "slow");
    } else {
      event.preventDefault();
      $("html").animate({
        scrollTop: 0
      }, "fast");
    }
    return false;
  });

});
/*Scroll to top when arrow up clicked END*/
