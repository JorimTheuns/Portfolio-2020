// Master DOManipulator v2 ------------------------------------------------------------
const sections = document.querySelectorAll('section'),
  allParts = document.querySelectorAll('.part'),
  sectionControl = document.getElementById('section-controls'),
  partControl = document.getElementById('part-controls'),
  sectionTooltip = document.getElementById('section-tooltip'),
  partTooltip = document.getElementById('part-tooltip');

//console.log(sections, parts, sectionControl, partControl);

/*
let currentSection = 0;
let currentPart = [0, 0];
*/

var sectionControls;
var partControls;
var currentSection = 0;
var currentPart = [];

const nav = {
  init: () => {
    var partIndex = 0;
    var ulsection = document.createElement('ul');
    sectionControl.appendChild(ulsection);
    var ulpart = document.createElement('ul');
    partControl.appendChild(ulpart);
    sections.forEach((section, index) => {
      var li = document.createElement('li');
      li.classList.add("control");
      li.dataset.index = index;
      currentPart[index] = 0;
      ulsection.appendChild(li);
      var waypoint = new Waypoint({
        element: section,
        handler: function (direction) {
          if (direction == "up") {
            currentSection = index - 1;
            //currentPart[0] = currentSection;
          } else {
            currentSection = index;
            //currentPart[0] = currentSection;
          }
          var inactive = section.querySelectorAll(".inactive");
          inactive.forEach((sec) => {
            sec.classList.remove("inactive");
          });
          nav.partControler(currentSection);
          nav.partReset();
          nav.sectionReset();
        },
        offset: '50%'
      });
      var parts = section.querySelectorAll('.part');
      parts.forEach((part, i) => {
        var li = document.createElement('li');
        li.classList.add("control");
        li.dataset.index = partIndex;
        li.dataset.part = i;
        li.dataset.section = index;
        ulpart.appendChild(li);
        var verticalWaypoint = new Waypoint({
          element: part,
          handler: function (direction) {
            if (this === this.group.first()) {
              //console.log(index, li.dataset.index);
              //nav.partReset();
            }
          },
          offset: '50%',
          group: index
        });
        var horizontalWaypoint = new Waypoint({
          element: part,
          handler: function (direction) {
            //console.log(i, direction, index);
            if (direction == "left") {
              currentPart[index] = i - 1;
            } else {
              currentPart[index] = i;
            }
            nav.partReset();
            //console.log(currentPart);
          },
          offset: '50%',
          context: section,
          horizontal: true
        });
        partIndex++;
      });
    });
    partControls = document.querySelectorAll('#part-controls .control');
    sectionControls = document.querySelectorAll('#section-controls .control');
    partControls.forEach((control) => {
      control.addEventListener('click', e => {
        nav.clickedPartControl(e);
      });
      control.addEventListener('mouseover', e => {
        nav.hoverPartControl(e);
      });
      control.addEventListener('mouseout', e => {
        nav.mouseOutPartControl(e);
      });
    });
    sectionControls.forEach((control) => {
      control.addEventListener('click', e => {
        nav.clickedSectionControl(e);
      });
      control.addEventListener('mouseover', e => {
        nav.hoverSectionControl(e);
      });
      control.addEventListener('mouseout', e => {
        nav.mouseOutSectionControl(e);
      });
    });
  }, //PART CONTROLS
  clickedPartControl: e => {
    nav.partReset();
    const control = e.target,
      sectionIndex = Number(control.dataset.section),
      partIndex = Number(control.dataset.part);
    control.classList.add('active');
    sections[sectionIndex].querySelectorAll(".part").item(partIndex).scrollIntoView({
      behavior: "smooth"
    });
    /*
        allParts[dataIndex].scrollIntoView({
          behavior: "smooth"
        });*/
    currentPart[sectionIndex] = partIndex;
    console.log(currentPart);
    //currentPart = dataIndex;
  },
  partReset: () => { // Remove active classes
    //console.log("BREAK");
    partControls.forEach(control => {
      control.classList.remove('active');
      const sectionIndex = Number(control.dataset.section),
        partIndex = Number(control.dataset.part);
      if (sectionIndex == currentSection && currentPart[currentSection] == partIndex) {
        control.classList.add('active');
        //console.log("MATCH");
      }
    });
  },
  partControler: sec => {
    partControls.forEach((control) => {
      if (control.dataset.section != sec) {
        control.style.display = "none";
      } else {
        control.style.display = "inline-block";
      }
    });
  },
  hoverPartControl: e => {
    const control = e.target,
      sectionIndex = Number(control.dataset.section),
      partIndex = Number(control.dataset.part);
    //console.log("IN Part: " + (partIndex + 1));
    partTooltip.classList.remove("inactive");
    partTooltip.innerHTML = ("P:" + (partIndex + 1));
    //currentPart = dataIndex;
  },
  mouseOutPartControl: e => {
    const control = e.target,
      sectionIndex = Number(control.dataset.section),
      partIndex = Number(control.dataset.part);
    //console.log("OUT Part: " + (partIndex + 1));
    partTooltip.classList.add("inactive");
    partTooltip.innerHTML = ("P:" + (partIndex + 1));
    //currentPart = dataIndex;
  }, //SECTION CONTROLS
  clickedSectionControl: e => {
    nav.sectionReset();
    const control = e.target,
      dataIndex = Number(control.dataset.index);
    control.classList.add('active');
    console.log(dataIndex);
    sections[dataIndex].scrollIntoView({
      behavior: "smooth"
    });
    currentSection = dataIndex;
  },
  hoverSectionControl: e => {
    const control = e.target,
      sectionIndex = Number(control.dataset.index);
    //console.log("IN Section: " + (sectionIndex + 1));
    sectionTooltip.classList.remove("inactive");
    sectionTooltip.innerHTML = ("S:" + (sectionIndex + 1));
    //currentPart = dataIndex;
  },
  mouseOutSectionControl: e => {
    const control = e.target,
      sectionIndex = Number(control.dataset.index);
    //console.log("OUT Section: " + (sectionIndex + 1));
    sectionTooltip.classList.add("inactive");
    sectionTooltip
    sectionTooltip.innerHTML = ("S:" + (sectionIndex + 1));
    //currentPart = dataIndex;
  },
  sectionReset: () => { // Remove active classes
    sectionControls.forEach(control => control.classList.remove('active'));
    sectionControls[currentSection].classList.add('active');
  }
};

nav.init();
$(".first .inactive").removeClass("inactive");

$('section').scroll(function () {
  var scrollLeft = $(this).scrollLeft();
  //console.log(scrollLeft);
  $('#section-controls').css({
    opacity: function () {
      var mod = scrollLeft % (window.innerWidth);
      var mod1 = window.innerWidth - mod;
      var calc = Math.sqrt(mod * mod1) / (window.innerWidth / 2);
      //console.log(mod, mod1, calc);
      return 1 - calc;
    }
  });
});

$(window).scroll(function () {
  var scrollTop = $(this).scrollTop();
  $('#part-controls').css({
    opacity: function () {
      var mod = scrollTop % (window.innerHeight);
      var mod1 = window.innerHeight - mod;
      var calc = Math.sqrt(mod * mod1) / (window.innerHeight / 2);
      //console.log(mod, mod1, calc);
      return 1 - calc;
    }
  });

});

window.onmousemove = function (e) {
  var x = e.clientX,
    y = e.clientY;
  var secToolSize = sectionTooltip.getBoundingClientRect();
  var parToolSize = partTooltip.getBoundingClientRect();
  
  //console.log(secToolSize.height, parToolSize.height);
  sectionTooltip.style.top = (y - (secToolSize.height/2) + 'px');
  sectionTooltip.style.left = (x + 20) + 'px';
  partTooltip.style.top = (y -(parToolSize.height) - 20) + 'px';
  partTooltip.style.left = (x -(parToolSize.width/2)) + 'px';
};

/*
let current = 0;

const slider = {
  init: () => {
    controls.forEach(control => control.addEventListener('click', e => {slider.clickedControl(e);}));
    controls[current].classList.add('active');
    items[current].classList.add('active');
    items[current].scrollIntoView();
  },
  nextSlide: () => {// Increment current slide and add active class
    if (current === items.length - 1) current = -1; // Check if current slide is last in array
    current++;
    controls[current].classList.add('active');
    items[current].classList.add('active');
    items[current].scrollIntoView();
  },
  clickedControl: e => {// Add active class to clicked control and corresponding slide
    

    const control = e.target,
    dataIndex = Number(control.dataset.index);

    control.classList.add('active');
    items.forEach((item, index) => {
      if (index === dataIndex) {// Add active class to corresponding slide
        item.classList.add('active');
      }
    });
    current = dataIndex; // Update current slide
    slider.transitionDelay(headerItems);
    slider.transitionDelay(descriptionItems);
    intervalF = setInterval(slider.nextSlide, interval); // Fire that bad boi back up
  },
  reset: () => {// Remove active classes
    items.forEach(item => item.classList.remove('active'));
    controls.forEach(control => control.classList.remove('active'));
  },
  transitionDelay: items => {// Set incrementing css transition-delay for .item-header & .item-description, .vertical-part, b elements
    let seconds;

    items.forEach(item => {
      const children = item.childNodes; // .vertical-part(s)
      let count = 1,
      delay;

      item.classList.value === 'item-header' ? seconds = .015 : seconds = .007;

      children.forEach(child => {// iterate through .vertical-part(s) and style b element
        if (child.classList) {
          item.parentNode.classList.contains('active') ? delay = count * seconds + activeDelay : delay = count * seconds;
          child.firstElementChild.style.transitionDelay = `${delay}s`; // b element
          count++;
        }
      });
    });
  } };


let intervalF = setInterval(slider.nextSlide, interval);
slider.init();

*/
