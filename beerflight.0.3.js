var beerFlight = {

  debugMode: true,

  cssClasses: {
    activeTaster: 'beerflight-active-taster',
  },

  currentTasterIndex: undefined,

  tasters: undefined,

  toggleTaster: function(index) {

    var toggleTarget = this.tasters[index].dataset.beerflightToggleTarget;
    var toggleClass = this.tasters[index].dataset.beerflightToggleClass;
    var displayTarget = this.tasters[index].dataset.beerflightDisplayTarget;
    var displayClass = this.tasters[index].dataset.beerflightDisplayToggle;

    // find all the elements that match the given selector
    var targets = document.querySelectorAll(toggleTarget);

    // toggle the target class for each element
    for (var i = 0; i < targets.length; i++) {
      targets[i].classList.toggle(toggleClass);
    }

  },

  switchToTaster: function(index) {

    // undo what the current selected taster has done to the DOM
    this.toggleTaster(this.currentTasterIndex);
    document.querySelectorAll('#add-buttons-here button')[this.currentTasterIndex].classList.toggle(this.cssClasses.activeTaster);

    this.toggleTaster(index);

    // record this taster as currently on tap
    this.currentTasterIndex = index;
    document.querySelectorAll('#add-buttons-here button')[index].classList.toggle(this.cssClasses.activeTaster);
    if (this.debugMode) console.log('Sipping', this.tasters[index].dataset.beerflightTasterLabel, '(' + index + ')' );

  },

  init: function() {

    // create the Beer Flight paddle
    var paddle = document.createElement('div');
    paddle.setAttribute('id', 'beerflight-paddle');


    // <div id="beerflight-paddle">
    //   <div id="fixed-beerflight">
    //     <div class="group" id="add-buttons-here"></div>
    //   </div>
    // </div>

    // generate above beer paddle HTML elements
    var fixedBeerFlight = document.createElement('div');
    fixedBeerFlight.setAttribute('id', 'fixed-beerflight');
    var group = document.createElement('div');
    group.setAttribute('id', 'add-buttons-here');
    group.classList.add('group');
    fixedBeerFlight.appendChild(group);

    paddle.appendChild(fixedBeerFlight);
    document.body.appendChild(paddle); // attach paddle to DOM

    // generate whistle logofader
    var fixedBeerFlight = document.getElementById('fixed-beerflight');
    fixedBeerFlight.style.display = 'none';

    var beerFlightButton = document.createElement('button');
    beerFlightButton.setAttribute('id', 'beerflight-button');
    beerFlightButton.classList.add('beerflight-paddle-not-served');
    beerFlightButton.innerHTML = '<span>+</span>';

    beerFlightButton.addEventListener('click', function(e) {
      e.preventDefault();

      beerFlightButton.classList.toggle('beerflight-paddle-not-served');
      if (fixedBeerFlight.style.display == 'none') {
        fixedBeerFlight.style.display = '';
        beerFlightButton.innerHTML = '<span>&times</span>';
      } else {
        fixedBeerFlight.style.display = 'none';
        beerFlightButton.innerHTML = '<span>+</span>';
      }
    });

    document.getElementById('beerflight-paddle').appendChild(beerFlightButton);

    if (this.debugMode) {
      console.log('Beer Flight paddle is ready (and debugMode is enabled).');
    }

    // insert beerflight css
    var beerflightStyleLink = document.createElement('link');
    beerflightStyleLink.rel = 'stylesheet';
    beerflightStyleLink.href = 'beerflight.0.3.css'; // FIXME must use CDN
    document.getElementsByTagName('head')[0].appendChild(beerflightStyleLink);

    // set the data-bf-taster-label designated script tags to beerFlight object
    this.tasters = document.querySelectorAll('[data-beerflight-taster-label]');

    // default unless otherwise specified with data-bf-taster-default (see below)
    this.currentTasterIndex = 0;

    if (this.debugMode) {
      console.log('Default taster set to 0.', this.tasters.length, 'tasters found.');
    }

    for (var i = 0; i < this.tasters.length; i++) {

      // set default taster as specified by user with data-bf-taster-default
      if (this.tasters[i].dataset.beerflightTasterDefault === '') {
        this.currentTasterIndex = i;
        if (this.debugMode) console.log('Default taster set to', i);
      }

      var button = document.createElement('button');
      button.setAttribute('type', 'button');
      button.setAttribute('value', i);
      var label = this.tasters[i].dataset.beerflightTasterLabel;
      button.innerHTML = label;

      var bf = this;
      button.addEventListener('click', function(e) {
        e.preventDefault();

        if (bf.currentTasterIndex == parseInt(this.value)) {
          if (bf.debugMode) console.log('Already sipping this one (' + this.value + ').');
        } else {
          bf.switchToTaster(parseInt(this.value));
        }
      });

      document.getElementById('add-buttons-here').appendChild(button);

      if (this.debugMode) console.log(label, 'added to paddle.');

    }

    document.querySelectorAll('#add-buttons-here button')[this.currentTasterIndex].classList.toggle(this.cssClasses.activeTaster);

  },

};

// Wait until the DOM is fully realized before manipulation
document.addEventListener('DOMContentLoaded', function() {
  beerFlight.init();
});
