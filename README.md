# Beer Flight

## A drop-in tool for quickly presenting web design prototypes

Beer Flight is a script that generates an interactive sampler paddle for showing off custom design variations. Add some markup to describe each variation (what we're calling a taster) and the script does all the work. Click on a taster to have its styles applied live to the page.

As long as you don’t spill anything, you won’t get your hands any wetter than basic HTML and CSS selectors.

## Quick Start

1. Identify the HTML elements and CSS styles you want to present, such as toggling a `try-blue` class or displaying a `notification` class.

2. Describe each sample for your Beer Flight paddle by adding a `button` in your design's HTML. It'll look like this: `<button data-beerflight-taster-label="More Blue" data-beerflight-toggle-target="#container" data-beerflight-toggle-class="try-blue"></button>`

3. Include the Beer Flight JavaScript file in your HTML document: `<script src=”/path/to/beerflight.js”></script>`

Pour and serve by letting Beer Flight automatically generate a menu on the page

## Examples

Say you have an assortment of coloring and style options, and you want a sampler paddle that will let you browse the page with each one applied on demand. You'll put a series of HTML buttons like this at the end of your HTML document (just inside the the `body`, i.e. just before the `</body>` tag but before the Beer Flight `script` tag.) and it'll look like this:

```html
<button data-beerflight-taster-label="Pilsener" data-beerflight-toggle-target="#beer-main" data-beerflight-toggle-class="try-pilsener"></button>
<button data-beerflight-taster-label="Pale Ale" data-beerflight-taster-default></button>
<button data-beerflight-taster-label="Saison" data-beerflight-toggle-target="#beer-main" data-beerflight-toggle-class="try-saison"></button>
<button data-beerflight-taster-label="Lager" data-beerflight-toggle-target="#beer-main" data-beerflight-toggle-class="try-lager"></button>
<button data-beerflight-taster-label="Stout" data-beerflight-toggle-target="#beer-main" data-beerflight-toggle-class="try-stout"></button>
```

Or this:

```html
<button data-beerflight-taster-label="bitter brew"></button>
<button data-beerflight-taster-label="less hops please" data-beerflight-toggle-target=".extra-hops" data-beerflight-toggle-display></script>
```

Each `button` describes a "taster" and tells Beer Flight how to implement the taster when the button is pressed.

## Describe each taster in the Beer Flight with `data-beerflight` attributes

### `data-beerflight-taster-label`

- Used to specify the name to appear on the paddle

Example: `data-beerflight-taster-label="layout with larger sidebar"`

### `data-beerflight-taster-default`

- Used to indicate a default taster that should be enabled on page load. If not specified, the first taster is treated as the default.

Example: `<button data-beerflight-taster-label="default taster" data-beerflight-taster-default></button>`

### `data-beerflight-toggle-target`

- Used to designate target elements for the style changes. Any valid CSS selectors should work here, such as `.try-alpha-version` (classes), `#main-content` (IDs), `div` (html elements), and `#main-content h2` (specific child elements).

Example: `<button [...] data-beerflight-toggle-target="#main-content h2" [...]></button>`

### `data-beerflight-toggle-class`

- Used to toggle a given class on target elements (indicated by the `data-beerflight-toggle-target` attribute). Don't precede the class name with a period (as is done with selectors).

Example: `<button [...] data-beerflight-toggle-target="#main-content h2" data-beerflight-toggle-class="extra-fancy"></button>`

### `data-beerflight-toggle-display`

- Used toggle the CSS display attribute of target elements (indicated by the `data-beerflight-toggle-target` attribute). This attribute does not have a value.

Example: `<button [...] data-beerflight-toggle-target=".extra-fancy-stuff" data-beerflight-toggle-display></button>`
