var beerFlight = {

  // BEER FLIGHT CONFIGURATION

  // console.log debug messages yes or no
  debugMode: true, // FIXME set me to false before release
  // link to stylesheet used for Beer Flight elements
  stylesheetHref: 'beerflight.0.1.0-alpha.css', // FIXME must use CDN

  // HTML element attribute namespace and attribute names
  attributeNamespace: 'beerflight', // not yet used TODO
  // labelAttribute: 'taster',
  // selectorAttribute: 'selector',
  // toggleClassAttribute: 'class',

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

  // for keeping track of CSS classes, so they can be easiliy changed in the future
  cssClasses: { // FIXME this is not utilized much yet
    activeTaster: 'beerflight-active-taster',
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

    if (this.debugMode) {
      // FIXME by removing this
      var beerflightStyleLinkDebug = document.createElement('link');
      beerflightStyleLinkDebug.rel = 'stylesheet';
      beerflightStyleLinkDebug.href = '../' + this.stylesheetHref;
      document.getElementsByTagName('head')[0].appendChild(beerflightStyleLinkDebug);
      console.log('DebugMode tries to load an extra fallback stylesheet (../). Expect one ERR_FILE_NOT_FOUND console message for one of the Beer Flight stylesheets.');
    }
  },

  // HARD-CODED ASSETS

  // svg: { // switched to using CSS class
  //   x: '&times;',
  //   plus: '+',
  // },

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

    // check to see if user requested paddle to be attached to specific element
    // <button beerflight-position-absolute></button>

    if (document.querySelector('[data-beerflight-position-absolute],[beerflight-position-absolute]')) {
      // figure out where parent element of buttons
      var target = document.querySelector('[data-beerflight-taster],[beerflight-taster]').parentElement;

      // add `beerflight-is-attached-to-element` class
      beerflightContainer.classList.add('beerflight-is-attached-to-element');

      // append the paddle to that element
      target.appendChild(beerflightContainer);
      this.debugLog('Beer Flight paddle attached to ' + target.nodeName);
    } else { // default make it fixed to the viewport
      document.body.appendChild(beerflightContainer); // attach Beer Flight to DOM
    }

    var beerFlightButton = document.createElement('button');
    beerFlightButton.setAttribute('id', this.elementIds.mainButton);
    // beerFlightButton.innerHTML = '<span>' + this.svg.x + '</span>';
    // beerFlightButton.innerHTML = this.svg.x;
    beerflightContainer.classList.add('beerflight-is-served');

    var bf = this;
    beerFlightButton.addEventListener('click', function(e) {
      e.preventDefault();

      // if the button is mid-animation, don't let it be pressed
      if (!beerflightContainer.classList.contains('beerflight-is-going-away')) {

        beerflightContainer.classList.toggle('beerflight-is-served')

        // beerFlightButton.classList.toggle('beerflight-paddle-not-served');
        if (beerflightPaddle.style.display == 'none') {
          beerflightPaddle.style.display = '';
          // beerFlightButton.innerHTML = '<span>' + bf.svg.x + '</span>';
          // beerFlightButton.innerHTML = bf.svg.x;
        } else {
          beerflightContainer.classList.add('beerflight-is-going-away');
          setTimeout(function() {
            beerflightContainer.classList.remove('beerflight-is-going-away');
            beerflightPaddle.style.display = 'none';
          }, 300);

          // beerflightPaddle.style.display = 'none';
          // beerFlightButton.innerHTML = '<span>' + bf.svg.plus + '</span>';
          //  beerFlightButton.innerHTML = bf.svg.plus;
        }

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
          bf.debugLog('Already sipping this one (' + this.value + ').');
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
