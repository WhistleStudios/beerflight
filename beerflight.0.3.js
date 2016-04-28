var beerFlight = {

  // BEER FLIGHT CONFIGURATION

  // console.log debug messages yes or no
  debugMode: true, // FIXME set me to false before release
  // link to stylesheet used for Beer Flight elements
  stylesheetHref: 'beerflight.0.3.css', // FIXME must use CDN
  // HTML element attribute namespace
  attributeNamespace: 'beerflight', // not yet used TODO

  // end BF CONFIG

  // for keeping track of CSS classes, so they can be easiliy changed in the future
  cssClasses: { // FIXME this is not utilized much yet
    activeTaster: 'beerflight-active-taster',
  },

  // the Beer Flight elements look like this:
  // <div id="beerflight">
  //   <div id="beerflight-paddle">
  //     <div id="beerflight-tasters"><!-- taster buttons --></div>
  //   </div>
  // </div>

  elementIds: { // fka = formerly known (in legacy code) as
    paddleContainer: 'beerflight', // fka #fixed-beerflight-container and #beerflight-paddle
    paddle: 'beerflight-paddle', // fka #fixed-beerflight
    tasterGroup: 'beerflight-tasters', // fka .group or #add-buttons-here
    mainButton: 'beerflight-coaster', // fka #beerflight-button
  },

  // zero-indexed integer representing the current taster selected and displaying
  currentTasterIndex: undefined, // set on init

  // DOM elements the user has added to activate and configure Beer Flight
  tasters: undefined, // set on init with document.querySelectorAll

  // HELPER FUNCTIONS

  // get all the Beer Flight button elements from the page
  getButtons: function() {
    return document.querySelectorAll('#' + this.elementIds.tasterGroup + ' button');
  },

  // get button by its index number
  getButton: function(index) {
    return this.getButtons()[index];
  },

  // console.logs a message only if beerflight.debugMode == true
  debugLog: function(msg) {
    if (this.debugMode)
      console.log(msg);
  },


  toggleTaster: function(index) { // toggle on or off the given taster by index number

    // get the given taster's toggle target (selector) from the data attribute
    var toggleTarget = this.tasters[index].dataset.beerflightSelector || this.tasters[index].getAttribute('beerflight-selector');
    // find all the elements that match the given taster's selector
    var toggleTargets = document.querySelectorAll(toggleTarget);

    var toggleClass = this.tasters[index].dataset.beerflightClass || this.tasters[index].getAttribute('beerflight-class');

    this.debugLog('toggleTarget: ' + toggleTarget + 'toggleTargets:' + toggleTargets + 'toggleClass:' + toggleClass);

    // toggle the specified class for each element
    for (var i = 0; i < toggleTargets.length; i++) {
      toggleTargets[i].classList.toggle(toggleClass);
    }

    // toggle the display of target elements if requested
    // if taster script has bf-toggle-display attriubte with value of empty string
    // if (this.tasters[index].dataset.beerflightDisplay === '' || this.tasters[index].getAttribute('beerflight-display')) {
    //   for (var i = 0; i < toggleTargets.length; i++) {
    //     if (toggleTargets[i].style.display === '')
    //       toggleTargets[i].style.display = 'none';
    //     else toggleTargets[i].style.display = '';
    //   }
    // }

  },

  // approximates radio button-esque functionality by toggling and styling
  switchToTaster: function(index) {

    // undo what the current selected taster has done to the DOM
    this.toggleTaster(this.currentTasterIndex);
    // unpress the currently selected taster's button with CSS
    this.getButton(this.currentTasterIndex).classList.toggle(this.cssClasses.activeTaster);
    // toggle on the new taster's styles
    this.toggleTaster(index);
    // set new taster as current taster
    this.currentTasterIndex = index;
    // depress this new taster button with CSS
    this.getButton(index).classList.toggle(this.cssClasses.activeTaster);

    this.debugLog('Sipping ' + (this.tasters[index].dataset.beerflightTaster || this.tasters[index].getAttribute('beerflight-taster')) + '(' + index + ')' );

  },

  // INITIALIZATION FUNCTIONS

  loadStyles: function() {
    var beerflightStyleLink = document.createElement('link');
    beerflightStyleLink.rel = 'stylesheet';
    beerflightStyleLink.href = this.stylesheetHref;
    document.getElementsByTagName('head')[0].appendChild(beerflightStyleLink);
  },


  // initializes Beer Flight by reading document for Beer Flight configuration
  // markup (data attributes)
  init: function() {

    // create the Beer Flight paddle
    var beerflightContainer = document.createElement('div');
    beerflightContainer.setAttribute('id', this.elementIds.paddleContainer);

    // <div id="beerflight"> <!-- fka as bf-paddle, fixed-bf-container -->
    //   <div id="beerflight-paddle"> <!-- fka fixed-beerflight -->
    //     <div class="group" id="add-buttons-here"></div>
    //   </div>
    // </div>

    // generate above beer paddle HTML elements
    var beerflightPaddle = document.createElement('div');
    beerflightPaddle.setAttribute('id', this.elementIds.paddle);
    var tasterGroup = document.createElement('div');
    tasterGroup.setAttribute('id', this.elementIds.tasterGroup);
    tasterGroup.classList.add('group');
    beerflightPaddle.appendChild(tasterGroup);

    beerflightContainer.appendChild(beerflightPaddle);
    document.body.appendChild(beerflightContainer); // attach Beer Flight to DOM

    // generate whistle logofader
    // var beerflightPaddle = document.getElementById(this.elementsIds.paddle);
    // beerflightPaddle.style.display = 'none';

    var beerFlightButton = document.createElement('button');
    beerFlightButton.setAttribute('id', this.elementIds.mainButton);
    beerFlightButton.classList.add('beerflight-paddle-not-served');
    beerFlightButton.innerHTML = '<span>+</span>';

    beerFlightButton.addEventListener('click', function(e) {
      e.preventDefault();

      beerFlightButton.classList.toggle('beerflight-paddle-not-served');
      if (beerflightPaddle.style.display == 'none') {
        beerflightPaddle.style.display = '';
        beerFlightButton.innerHTML = '<span>&times</span>';
      } else {
        beerflightPaddle.style.display = 'none';
        beerFlightButton.innerHTML = '<span>+</span>';
      }
    });

    document.getElementById(this.elementIds.paddleContainer).appendChild(beerFlightButton);

    this.loadStyles(); // insert beerflight css

    // set the data-bf-taster label designated script tags to beerFlight object
    this.tasters = document.querySelectorAll('[data-beerflight-taster],[beerflight-taster]');

    // default unless otherwise specified with data-bf-taster-default (see below)
    this.currentTasterIndex = 0;

    this.debugLog('Default taster set to 0. ' + this.tasters.length + 'tasters found.');

    for (var i = 0; i < this.tasters.length; i++) {

      // set default taster as specified by user with data-bf-taster-default
      if (this.tasters[i].dataset.beerflightDefault === '' || this.tasters[i].getAttribute('beerflight-default')) {
        this.currentTasterIndex = i;
        this.debugLog('Default taster set to', i);
      }

      var button = document.createElement('button');
      button.setAttribute('type', 'button');
      button.setAttribute('value', i);
      var label = this.tasters[i].dataset.beerflightTaster || this.tasters[i].getAttribute('beerflight-taster');
      button.innerHTML = label;

      var bf = this; // self trick to include reference to Beer Flight in anon on click functions
      button.addEventListener('click', function(e) {
        e.preventDefault();

        if (bf.currentTasterIndex == parseInt(this.value)) {
          if (bf.debugMode) console.log('Already sipping this one (' + this.value + ').');
        } else {
          bf.switchToTaster(parseInt(this.value));
        }
      });

      document.getElementById(this.elementIds.tasterGroup).appendChild(button);

      this.debugLog(label, 'added to paddle.');

    }

    this.getButton(this.currentTasterIndex).classList.toggle(this.cssClasses.activeTaster);

    this.debugLog('Beer Flight is served (and debugMode is enabled).');

  },

};

// Wait until the DOM is fully realized before manipulation
document.addEventListener('DOMContentLoaded', function() {
  beerFlight.init();
});
