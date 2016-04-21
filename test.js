var beerFlight = {

  debugMode: true,

  tasters: document.querySelectorAll('[data-beerflight-taster-href]'),

  toggleTaster: function(index) {

    // if a taster/stylesheet is already enabled (by having a valid href attribute)
    // then remove that href attribute to disabled it.
    if (this.tasters[index].hasAttribute('href')) {
      this.tasters[index].removeAttribute('href');
    } else { // otherwise enable it by giving it the href attribute
      this.tasters[index].setAttribute('href', this.tasters[index].getAttribute('data-beerflight-taster-href'));
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
      var label = this.tasters[i].getAttribute('data-beerflight-taster-label')
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

  },


}

beerFlight.init();
