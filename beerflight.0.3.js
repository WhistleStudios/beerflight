var beerFlight = {

  debugMode: true,

  // for keeping track of CSS classes, so they can be easiliy changed in the future
  cssClasses: { // FIXME this is not utilized much yet
    activeTaster: 'beerflight-active-taster',
  },

  // zero-indexed integer representing the current taster selected and displaying
  currentTasterIndex: undefined, // set on init

  // DOM elements the user has added to activate and configure Beer Flight
  tasters: undefined, // set on init with document.querySelectorAll

  toggleTaster: function(index) { // toggle on or off the given taster by index number

    // get the given taster's toggle target (selector) from the data attribute
    var toggleTarget = this.tasters[index].dataset.beerflightToggleTarget || this.tasters[index].getAttribute('beerflight-toggle-target');
    // find all the elements that match the given taster's selector
    var toggleTargets = document.querySelectorAll(toggleTarget);

    var toggleClass = this.tasters[index].dataset.beerflightToggleClass || this.tasters[index].getAttribute('beerflight-toggle-class');

    // toggle the specified class for each element
    for (var i = 0; i < toggleTargets.length; i++) {
      toggleTargets[i].classList.toggle(toggleClass);
    }

    // toggle the display of target elements if requested
    // if taster script has bf-toggle-display attriubte with value of empty string
    if (this.tasters[index].dataset.beerflightToggleDisplay === '' || this.tasters[index].getAttribute('beerflight-toggle-display')) {
      for (var i = 0; i < toggleTargets.length; i++) {
        if (toggleTargets[i].style.display === '')
          toggleTargets[i].style.display = 'none';
        else toggleTargets[i].style.display = '';
      }
    }

  },

  // approximates radio button-esque functionality by toggling and styling
  switchToTaster: function(index) {

    // undo what the current selected taster has done to the DOM
    this.toggleTaster(this.currentTasterIndex);
    // unpress the currently selected taster's button with CSS
    document.querySelectorAll('#add-buttons-here button')[this.currentTasterIndex].classList.toggle(this.cssClasses.activeTaster);
    // toggle on the new taster's styles
    this.toggleTaster(index);
    // set new taster as current taster
    this.currentTasterIndex = index;
    // depress this new taster button with CSS
    document.querySelectorAll('#add-buttons-here button')[index].classList.toggle(this.cssClasses.activeTaster);

    if (this.debugMode)
      console.log('Sipping', this.tasters[index].dataset.beerflightTaster || this.tasters[index].getAttribute('beerflight-taster'), '(' + index + ')' );

  },

  // initializes Beer Flight by reading document for Beer Flight configuration
  // markup (data attributes)
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

    // set the data-bf-taster label designated script tags to beerFlight object
    this.tasters = document.querySelectorAll('[data-beerflight-taster],[beerflight-taster]');

    // default unless otherwise specified with data-bf-taster-default (see below)
    this.currentTasterIndex = 0;

    if (this.debugMode) {
      console.log('Default taster set to 0.', this.tasters.length, 'tasters found.');
    }

    for (var i = 0; i < this.tasters.length; i++) {

      // set default taster as specified by user with data-bf-taster-default
      if (this.tasters[i].dataset.beerflightDefault === '' || this.tasters[i].getAttribute('beerflight-default')) {
        this.currentTasterIndex = i;
        if (this.debugMode) console.log('Default taster set to', i);
      }

      var button = document.createElement('button');
      button.setAttribute('type', 'button');
      button.setAttribute('value', i);
      var label = this.tasters[i].dataset.beerflightTaster || this.tasters[i].getAttribute('beerflight-taster');
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
