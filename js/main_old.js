
var test = new Letterize({
  targets: "#header-title, h2",
  className: "letter"
});

test.listAll();
for (var i = 0; i < test.listAll().length; i++) {
  test.listAll()[i].addEventListener("mouseover", function (e) {
    e.target = anime({
      targets: e.target,
      duration: 100,
      translateX: anime.random(-5, 5),
      translateY: anime.random(-5, 5),
      rotate: anime.random(-5, 5),
      opacity: 0.9
    });
  });

  test.listAll()[i].addEventListener("mouseout", function (e) {
    e.target = anime({
      targets: e.target,
      duration: 3000,
      opacity: 1
    });
  });
}


var waypoints = $('').waypoint(function (direction) {
  //console.log(this.element.innerHTML);
  console.log($(this.element));
  randomize($(this.element));
}, {
  offset: '100%'
});

function randomize(el) {
  var array = parseTextToArray(el.data('text'), false);
  console.log(array);
  var newArray = parseTextToArray(el.data('text'), false);
  console.log(newArray);
  array.forEach(function (e, i) {
    e = randomLetters[parseInt(Math.random() * randomLetters.length)];
    console.log(e);
    newArray[i] = e;
    console.log(el.children()[i]);
    el.children()[i].innerHTML = e;
  });
  //el.html(newArray.join(''));
  if (!arraysEqual(array, newArray)) {
    //console.log(array, newArray);
    newArray.forEach(function (e, i) {
      var char = $(el.children()[i]);
      console.log(char.text(), array[i]);
      normaliseLetter(char, array[i]);
    });
    /*
    setTimeout(function () {
      //normalise(el, array, newArray, 1);

    }, 200);*/
  }
}

function normaliseLetter(el, original) {
  if (el.text() != original) {
    var ioe = randomLetters.indexOf(el.text());
    var ioid = randomLetters.indexOf(original);
    if (ioe > ioid) {
      el.addClass("preanimate");
      setTimeout(function () {
        el.text(randomLetters[ioe - 1]);
        el.removeClass("preanimate");
      }, 100);
    } else {
      el.addClass("preanimate");
      setTimeout(function () {
        el.text(randomLetters[ioe + 1]);
        el.removeClass("preanimate");
      }, 100);
    }
  }
  if (el.text() != original) {
    setTimeout(function () {
      normaliseLetter(el, original);
    }, 200);
  }
}

function normalise(el, oldText, currentText, latency) {
  currentText.forEach(function (e, i) {
    if (e != oldText[i]) {
      var ioe = randomLetters.indexOf(e);
      var ioid = randomLetters.indexOf(oldText[i]);
      if (ioe > ioid) {
        e = randomLetters[randomLetters.indexOf(e) - 1];
      } else {
        e = randomLetters[randomLetters.indexOf(e) + 1];
      }
    }
    currentText[i] = e;
    var char = $(el.children()[i]);
    char.addClass("animate");
    char.text(currentText[i]);
    if (char.text() != oldText[i]) {
      setTimeout(function () {
        char.removeClass("animate");
      }, 300);
    };
  });
  if (!arraysEqual(oldText, currentText)) {
    latency++;
    setTimeout(function () {
      normalise(el, oldText, currentText, latency);
      //console.log(currentText);
    }, 100);
  }
}


var randomLetters = parseTextToArray('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789: ',
  false);

function parseTextToArray(text, cleanSpaces) {
  if (cleanSpaces) {
    text = text.replace(' ', '');
  }
  return text.split('');
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
