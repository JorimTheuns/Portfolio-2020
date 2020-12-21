let iframeObserver;

let iframeOptions = {
  root: null,
  rootMargin: '0px',
  threshold: .9
}

let iframeCallback = (entries, iframeObserver) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log(entry);
      entry.target.contentWindow.loop();
      console.log("Loop");
    } else {
      entry.target.contentWindow.noLoop();
      console.log("noLoop");
    }
  })
};

iframeObserver = new IntersectionObserver(iframeCallback, iframeOptions);

let iframeTargets = document.querySelectorAll("iframe");

iframeTargets.forEach(iframeTarget => {
 iframeObserver.observe(iframeTarget);
});

/*

var iframes = document.querySelectorAll("iframe");

iframes.forEach(iframe => {
  console.log(iframe);
  iframe.addEventListener("load", function () {
    iframe.addEventListener("mouseenter", function () {
      iframe.contentWindow.loop();
      console.log(this + "Loop");
    });
    iframe.addEventListener("mouseleave", function () {
      iframe.contentWindow.noLoop();
      console.log(this + "noLoop");
    });
    iframe.contentWindow.noLoop();
  });
});


*/