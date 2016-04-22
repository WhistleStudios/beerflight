BEERFLIGHT = {
  groups: [],
  scripts: [],
  markedStuff: '',
  addControlGroup: function(heading, buttons) {

    buttons.forEach(function(b,i,buttons) {
      b.className = typeof b.className !== 'undefined' ? b.className : 'BEERFLIGHT-button';
      b.id = typeof b.id !== 'undefined' ? b.id : 'BEERFLIGHT-button-' + i;
      b.label = typeof b.label !== 'undefined' ? b.label : 'Button ' + i;
      b.callback = typeof b.callback !== 'undefined' ? b.callback : 'BEERFLIGHT.do_nothing';
      b.targetClass = typeof b.targetClass !== 'undefined' ? b.targetClass : '';
      b.targetId = typeof b.targetId !== 'undefined' ? b.targetId : '';

      if(b.toggleClass !== undefined) {
        b.callback = 'function() { BEERFLIGHT.toggleClass(\''+b.toggleClass+'\', this) }';
      }
      if(b.toggleDisplay !== undefined) {
        b.callback = 'function() { BEERFLIGHT.toggleDisplay(this) }';
      }

      buttons[i] = b;
    });

    this.groups.push({"heading": heading, "buttons": buttons});
  },
  setScripts: function(scripts) {
    scripts.push(scripts);
  },
  display: function() {
    BEERFLIGHT.mark('<div id="fixed-beerflight-container" style="display:none;"><div id="fixed-beerflight">');
    this.groups.forEach(function(g,i){
      BEERFLIGHT.mark('<div class="group"><h1>' + g.heading + '</h1>');
      g.buttons.forEach(function(b,j){
        BEERFLIGHT.mark('<button data-targetClass="'+b.targetClass+'" data-targetId="'+b.targetId+'" data-controlled="' + BEERFLIGHT.slugify(g.heading + '-' + b.id) + '" id="'+b.id+'" class="'+b.className+'">' + b.label + '</button>');
      });
      BEERFLIGHT.mark('</div>');
    });

    //var scriptblock = '';
    //BEERFLIGHT.mark('<script>'+  scriptblock +'</script>');
    //document.getElementById('fixed-beerflight').addEventListener('click', BEERFLIGHT.handleClick, false);

    BEERFLIGHT.mark('<script>');
    BEERFLIGHT.mark(this.scripts.join(''));
    BEERFLIGHT.mark('<\/script><\/div><\/div>');

    BEERFLIGHT.markDraw();

    BEERFLIGHT.handleClicks();

  },
  slugify: function(string) {
    return string.toString().toLowerCase().trim()
      .replace(/\s+/g, '-')
      .replace(/&/g, '-and-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');
  },
  mark: function(string) {
    this.markedStuff = this.markedStuff + string;
  },
  markDraw: function() {
    var wrapper= document.createElement('div');
    wrapper.innerHTML= this.markedStuff;
    var mark= wrapper.firstChild;
    document.body.appendChild(mark);
  },
  doNothing: function() {
    /* nada */
  },
  toggleClass: function(whatClass, btn) {
    var targetId = btn.getAttribute('data-targetId');
    if(targetId != '') {
      document.getElementById(targetId).classList.toggle(whatClass);
    }
    var targetClass = btn.getAttribute('data-targetClass');
    if(targetClass != '') {
      var whatElements = document.getElementsByClassName(targetClass);
      for(i = 0; i < whatElements.length; i++) {
        whatElements[i].classList.toggle(whatClass);
      }
    }
  },
  toggleDisplay: function(btn) {
    var targetId = btn.getAttribute('data-targetId');
    if(targetId != '') {
      if(document.getElementById(targetId).style.display == 'none' ) {
        document.getElementById(targetId).style.display = '';
      }
      else {
        document.getElementById(targetId).style.display = 'none';
      }
    }
    var targetClass = btn.getAttribute('data-targetClass');
    if(targetClass != '') {
      var whatElements = document.getElementsByClassName(targetClass);
      for(i = 0; i < whatElements.length; i++) {
        if(whatElements[i].style.display == 'none' ) {
          whatElements[i].style.display = '';
        }
        else {
          whatElements[i].style.display = 'none';
        }
      }
    }
  },
  handleClicks: function() {
    this.groups.forEach(function(g,i){
      g.buttons.forEach(function(b,j){
        eval('document.getElementById("'+b.id+'").addEventListener(\'click\',' + b.callback + ', false);');
      });
    });
  }
}

var cb = function(){

    var bf;
    var a = document.querySelectorAll('[data-beerflight]');

    if(a) {
      bf = BEERFLIGHT;
    }


    var l = document.createElement('link'); l.rel = 'stylesheet';
    l.href = 'beerflight.0.2.css';
    var h = document.getElementsByTagName('title')[0];
    h.parentNode.insertBefore(l, h);

    if(document.getElementById("fixed-beerflight-container")) {
      var fcc = document.getElementById("fixed-beerflight-container").offsetHeight;
      var css = document.createElement("style");
      css.type = "text/css";
      css.innerHTML = "body { padding-bottom: "+fcc+"px; height:auto; }";
      document.body.appendChild(css);
    }

    for (var i = 0; i < a.length; i++) {
      // var heading = a[i].getAttribute('data-beerflight');
      var heading = a[i].dataset.beerflight;
      var button_defs = a[i].children;
      var buttons = [];
      for (var b = 0; b < button_defs.length; b++) {
        btn = button_defs[b];
        btnElem = {};
        if(btn.className) {
          btnElem.className = btn.className;
        }
        if(btn.hasAttribute('data-toggleDisplay')) {
          btnElem.toggleDisplay = true;
          btnElem.targetClass = btn.getAttribute('data-toggleDisplay');
        }
        // if(btn.hasAttribute('data-targetClass')) {
        //   btnElem.targetClass = btn.getAttribute('data-targetClass');
        // }
        if(btn.hasAttribute('data-toggleClass')) {
          btnElem.toggleClass = btn.getAttribute('data-toggleClass');
        }
        if(btn.hasAttribute('data-callback')) {
          btnElem.callback = btn.getAttribute('data-callback');
        }
        if(btn.hasAttribute('data-targetId')) {
          btnElem.targetId = btn.getAttribute('data-targetId');
        }
        btnElem.label = btn.textContent;
        buttons.push(btnElem);
      }
      bf.addControlGroup(heading, buttons);
      a[i].remove();
    }
    bf.display();

    var fixedBeerFlight = document.getElementById('fixed-beerflight');
    fixedBeerFlight.style.display = 'none';

    var beerFlightButton = document.createElement('button');
    beerFlightButton.setAttribute('id', 'beerflight-button');
    beerFlightButton.classList.add('beerflight-paddle-not-served')
    beerFlightButton.innerHTML = '+';

    beerFlightButton.addEventListener('click', function(e) {
      e.preventDefault();

      beerFlightButton.classList.toggle('beerflight-paddle-not-served');
      if (fixedBeerFlight.style.display == 'none') {
        fixedBeerFlight.style.display = '';
        beerFlightButton.innerHTML = '&times;';
      } else {
        fixedBeerFlight.style.display = 'none';
        beerFlightButton.innerHTML = '+';
      }
    });

    document.getElementById('fixed-beerflight-container').appendChild(beerFlightButton);

};
var raf = requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame;
if (raf) raf(cb);
else window.addEventListener('load', cb);
