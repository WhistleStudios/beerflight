var beerflight = {

  // # STYLE

  // All references to Beer Flight in code are styled thusly:
  // `beerflight` (one word, all lowercase)

  // # CONFIGURATION

  // Show debugging messages, yes or no
  debugMode: false,
  // debugMode: true,

  // ## Stylesheet Location

  // FIXME by choosing stylesheet and uncommenting it:

  // - local
  // stylesheetHref: 'beerflight.0.1.0-alpha.css',

  // - RawGit development
  stylesheetHref: 'https://rawgit.com/WhistleStudios/beerflight/master/beerflight.0.1.0-alpha.css',

  // - RawGit CDN production
  // stylesheetHref: 'https://cdn.rawgit.com/WhistleStudios/beerflight/master/beerflight.0.1.0-alpha.css',

  // ## Analytics Mode
  analytics: {
    enabled: false, // turn me on or off
    ua: 'UA-XXXXX-Y', // FIXME
    tracker: 'beerflightTracker',
    fields: {} // not used
  },

  // # CUSTOMIZATION

  // HTML element attribute namespace and attribute names
  // attributeNamespace: 'beerflight', // not yet used TODO
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

  // # HELPERS

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
      console.log('BF:', msg);
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

  // # INITIALIZATION

  loadStyles: function() {

    var beerflightStyleLink = document.createElement('link');
    beerflightStyleLink.rel = 'stylesheet';

    // check for specified (non-CDN) BF stylesheet (development)
    var localOption = document.querySelector('[data-beerflight-local-css],[beerflight-local-css]');

    if (localOption) {
      var localStylesheet = localOption.getAttribute('data-beerflight-local-css') || localOption.getAttribute('beerflight-local-css');
      beerflightStyleLink.href = localStylesheet || 'beerflight.0.1.0-alpha.css';
    } else {
      beerflightStyleLink.href = this.stylesheetHref;
    }
    this.debugLog('Using stylesheet: ' + beerflightStyleLink.href);

    document.getElementsByTagName('head')[0].appendChild(beerflightStyleLink);

    // if (this.debugMode) {
    //   // FIXME by removing this
    //   var beerflightStyleLinkDebug = document.createElement('link');
    //   beerflightStyleLinkDebug.rel = 'stylesheet';
    //   beerflightStyleLinkDebug.href = '../' + this.stylesheetHref;
    //   document.getElementsByTagName('head')[0].appendChild(beerflightStyleLinkDebug);
    //   console.log('DebugMode tries to load an extra fallback stylesheet (../). Expect one ERR_FILE_NOT_FOUND console message for one of the Beer Flight stylesheets.');
    // }
  },

  // Initializes Beer Flight by reading document for config markup (data attributes)
  init: function() {

    // Set up analytis

    if (self == top && this.analytics.enabled) {

      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

      ga('create', this.analytics.ua, 'auto', this.analytics.tracker);
      ga(this.analytics.tracker + '.send', 'pageview');

      if (this.debugMode) {
        ga(function() {
          console.log('Trackers installed:', ga.getAll());
        });
      }

    }

    // Check to see if user explicitly requested debug messages
    if (document.querySelector('[data-beerflight-debug],[beerflight-debug]')) {
      this.debugMode = !this.debugMode;
    }

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
      this.debugLog('paddle attached to ' + target.nodeName);
    } else { // default make it fixed to the viewport
      document.body.appendChild(beerflightContainer); // attach Beer Flight to DOM
    }

    var beerflightButton = document.createElement('button');
    beerflightButton.setAttribute('id', this.elementIds.mainButton);
    // beerflightButton.innerHTML = '<span>' + this.svg.x + '</span>';
    // beerflightButton.innerHTML = this.svg.x;
    beerflightContainer.classList.add('beerflight-is-served');

    var bf = this;
    beerflightButton.addEventListener('click', function(e) {
      e.preventDefault();

      // if the button is mid-animation, don't let it be pressed
      if (!beerflightContainer.classList.contains('beerflight-is-going-away')) {

        beerflightContainer.classList.toggle('beerflight-is-served')

        // beerflightButton.classList.toggle('beerflight-paddle-not-served');
        if (beerflightPaddle.style.display == 'none') {
          beerflightPaddle.style.display = '';
          // beerflightButton.innerHTML = '<span>' + bf.svg.x + '</span>';
          // beerflightButton.innerHTML = bf.svg.x;
        } else {
          beerflightContainer.classList.add('beerflight-is-going-away');
          setTimeout(function() {
            beerflightContainer.classList.remove('beerflight-is-going-away');
            beerflightPaddle.style.display = 'none';
          }, 300);

          // beerflightPaddle.style.display = 'none';
          // beerflightButton.innerHTML = '<span>' + bf.svg.plus + '</span>';
          //  beerflightButton.innerHTML = bf.svg.plus;
        }

      }

    });

    document.getElementById(this.elementIds.paddleContainer).appendChild(beerflightButton);

    this.loadStyles(); // insert beerflight css

    // set the data-bf-taster label designated script tags to beerflight object
    this.tasters = document.querySelectorAll('[data-beerflight-taster],[beerflight-taster]');

    // default unless otherwise specified with data-bf-taster-default (see below)
    this.currentTasterIndex = 0;

    this.debugLog(this.tasters.length + ' tasters found. Default taster set to #0.');

    for (var i = 0; i < this.tasters.length; i++) {

      // set default taster as specified by user with data-bf-taster-default
      if (this.tasters[i].dataset.beerflightDefault === '' || this.tasters[i].getAttribute('beerflight-default') === '') {
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
  beerflight.init();
});
