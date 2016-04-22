var beerFlight = {

  debugMode: true,

  tasters: document.querySelectorAll('[data-beerflight-taster-href]'), // optional/sample stylesheets to hotswap in

  togglers: document.querySelectorAll('[data-beerflight-toggler]'), // toggle scripts

  toggleTaster: function(index) {

    // if a taster/stylesheet is already enabled (by having a valid href attribute)
    // then remove that href attribute to disabled it.
    if (this.tasters[index].hasAttribute('href')) {
      this.tasters[index].removeAttribute('href');
    } else { // otherwise enable it by giving it an href attribute
      this.tasters[index].setAttribute('href', this.tasters[index].dataset.beerflightTasterHref);
    }

  },

  init: function() {

    // TODO check for titles on the stylesheet link elements and alternate stylesheets
    // those would mess things up and require some better logic to handle to properly accommodate them
    // apparently stylesheets are grouped by web browsers depending on their title or lackthereof

    if (this.debugMode) {
      console.log('BeerFlight is served. (DebugMode is enabled.)');
    }

    for (var i = 0; i < this.tasters.length; i++) {

      // set up a button for the taster
      var button = document.createElement('button');

      // set the button's value to the index of its corresponding stylesheet
      button.setAttribute('value', i);

      // put the stylesheet's label on the button
      // var label = this.tasters[i].getAttribute('data-beerflight-taster-label');
      var label = this.tasters[i].dataset.beerflightTasterLabel;
      button.innerHTML = label;

      // atttach click listener to toggle the corresponding stylesheet
      var bf = this; // self trick, ie hooking a reference to the beerflight object
      button.addEventListener('click', function(e) {
        e.preventDefault();
        this.classList.toggle('beerflight-button-toggled');
        bf.toggleTaster(parseInt(this.value));
      });
      // document.getElementById('beerflight-paddle').appendChild(button);
      document.getElementById('add-buttons-here').appendChild(button);

      if (this.debugMode) {
        console.log('Taster loaded:', label);
      }

    }

    for (var j = 0; j < this.togglers.length; j++) {

      var button = document.createElement('button');

      button.innerHTML = this.togglers[j].dataset.beerflightTasterLabel;

      var target = this.togglers[j].dataset.beerflightTarget;
      var toggleClass = this.togglers[j].dataset.beerflightToggleClass;

      var bf = this;
      button.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('hey:', toggleClass, target);
        var targets = document.querySelectorAll(target);
        for (var k = 0; k < targets.length; k++) {
          targets[k].classList.toggle(toggleClass);
        }
      });

      document.getElementById('add-buttons-here').appendChild(button);

      if (this.debugMode) {
        console.log('Taster loaded:', this.togglers[j].dataset.beerflightTasterLabel);
      }

    }

  },

};

beerFlight.init();
