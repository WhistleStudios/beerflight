var beerFlight = {

  debugMode: true,

  currentTaster: undefined,

  // stylesheets to hotswap
  // tasters: document.querySelectorAll('[data-beerflight-taster-href]'), // optional/sample stylesheets to hotswap in

  // togglers: document.querySelectorAll('[data-beerflight-toggler]'), // toggle scripts

  // toggleTaster: function(index) {
  //
  //   // if a taster/stylesheet is already enabled (by having a valid href attribute)
  //   // then remove that href attribute to disabled it.
  //   if (this.tasters[index].hasAttribute('href')) {
  //     this.tasters[index].removeAttribute('href');
  //   } else { // otherwise enable it by giving it an href attribute
  //     this.tasters[index].setAttribute('href', this.tasters[index].dataset.beerflightTasterHref);
  //   }
  //
  // },

  init: function() {

    // TODO check for titles on the stylesheet link elements and alternate stylesheets
    // those would mess things up and require some better logic to handle to properly accommodate them
    // apparently stylesheets are grouped by web browsers depending on their title or lackthereof

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

    // make stylesheet switchers
    // for (var i = 0; i < this.tasters.length; i++) {
    //
    //   // set up a button for the taster
    //   var button = document.createElement('button');
    //
    //   // set the button's value to the index of its corresponding stylesheet
    //   button.setAttribute('value', i);
    //
    //   // put the stylesheet's label on the button
    //   // var label = this.tasters[i].getAttribute('data-beerflight-taster-label');
    //   var label = this.tasters[i].dataset.beerflightTasterLabel;
    //   button.innerHTML = label;
    //
    //   // atttach click listener to toggle the corresponding stylesheet
    //   var bf = this; // self trick, ie hooking a reference to the beerflight object
    //   button.addEventListener('click', function(e) {
    //     e.preventDefault();
    //     this.classList.toggle('beerflight-button-toggled');
    //     bf.toggleTaster(parseInt(this.value));
    //   });
    //   // document.getElementById('beerflight-paddle').appendChild(button);
    //   document.getElementById('add-buttons-here').appendChild(button);
    //
    //   if (this.debugMode) {
    //     console.log('Taster loaded:', label);
    //   }
    //
    // }

    // process all the Beer Flight togglers
    // FIXME there's gotta a more modular or streamlined

    // for (var j = 0; j < this.togglers.length; j++) {
    //
    //   var button = document.createElement('button');
    //
    //   button.innerHTML = this.togglers[j].dataset.beerflightTasterLabel;
    //
    //   var target = this.togglers[j].dataset.beerflightTarget;
    //   var toggleClass = this.togglers[j].dataset.beerflightToggleClass;
    //
    //   var bf = this;
    //   button.addEventListener('click', function(e) {
    //     e.preventDefault();
    //
    //     // find all the elements that match the given selector
    //     var targets = document.querySelectorAll(target);
    //
    //     // toggle the target class for each element
    //     for (var k = 0; k < targets.length; k++) {
    //       targets[k].classList.toggle(toggleClass);
    //     }
    //   });
    //
    //   document.getElementById('add-buttons-here').appendChild(button);
    //
    //   if (this.debugMode) {
    //     console.log('Taster loaded:', this.togglers[j].dataset.beerflightTasterLabel);
    //   }
    //
    // }

    // insert beerflight css
    var beerflightStyleLink = document.createElement('link');
    beerflightStyleLink.rel = 'stylesheet';
    beerflightStyleLink.href = 'beerflight.0.3.css'; // FIXME must use CDN
    document.getElementsByTagName('head')[0].appendChild(beerflightStyleLink);

    var tasters = document.querySelectorAll('[data-beerflight-taster-label]');

    for (var i = 0; i < tasters.length; i++) {
      var button = document.createElement('button');
      button.setAttribute('type', 'button');
      button.setAttribute('value', i);
      button.innerHTML = tasters[i].dataset.beerflightTasterLabel;

      var toggleTarget = tasters[i].dataset.beerflightToggleTarget;
      var toggleClass = tasters[i].dataset.beerflightToggleClass;
      var displayTarget = tasters[i].dataset.beerflightDisplayTarget;
      var displayClass = tasters[i].dataset.beerflightDisplayToggle;

      var bf = this;
      button.addEventListener('click', function(e) {
        e.preventDefault();

        if (bf.debugMode) console.log('index of taster clicked:', this.value);

        if (bf.currentTaster == this.value) {
          // do nothing
        } else {

          bf.currentTaster = this.value;

          // find all the elements that match the given selector
          var targets = document.querySelectorAll(toggleTarget);

          // toggle the target class for each element
          for (var i = 0; i < targets.length; i++) {
            targets[i].classList.toggle(toggleClass);
          }
        }
      });

      document.getElementById('add-buttons-here').appendChild(button);

    }

  },

};

// Wait until the DOM is fully realized before manipulation
document.addEventListener('DOMContentLoaded', function() {
  beerFlight.init();
});
