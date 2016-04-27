# Beer Flight

## A drop-in tool for quickly presenting web design prototypes

Beer Flight is a script that generates an interactive sampler paddle for showing off custom design variations. Add some markup to describe each variation (what we're calling a taster) and the script does all the work. Click on a taster to have its styles applied live to the page.

As long as you don’t spill anything, you won’t get your hands any wetter than basic HTML and CSS selectors.

## Quick Start

1. Include the Beer Flight JavaScript file in your HTML document: `<script src=”/path/to/beerflight.js”></script>`

2. Identify the HTML elements and CSS styles you want to present, such as toggling a `try-blue` class or displaying a `notification` class.

3. Describe each sample for your Beer Flight paddle by adding a `button` in your design's HTML. It'll look like this: `<button beerflight-taster-label="More Blue" beerflight-toggle-target="#container" beerflight-toggle-class="try-blue"></button>`


Pour and serve by letting Beer Flight automatically generate a menu on the page

## Examples

Say you have an assortment of coloring and style options, and you want a sampler paddle that will let you browse the page with each one applied on demand. You'll put a series of HTML buttons like this at the end of your HTML document (just inside the the `body`, i.e. just before the `</body>` tag but before the Beer Flight `script` tag.) and it'll look like this:

```html
<button beerflight-taster-label="Pilsener" beerflight-toggle-target="#beer-main" beerflight-toggle-class="try-pilsener"></button>
<button beerflight-taster-label="Pale Ale" beerflight-taster-default></button>
<button beerflight-taster-label="Saison" beerflight-toggle-target="#beer-main" beerflight-toggle-class="try-saison"></button>
<button beerflight-taster-label="Lager" beerflight-toggle-target="#beer-main" beerflight-toggle-class="try-lager"></button>
<button beerflight-taster-label="Stout" beerflight-toggle-target="#beer-main" beerflight-toggle-class="try-stout"></button>
```

Or this:

```html
<button beerflight-taster-label="bitter brew"></button>
<button beerflight-taster-label="less hops please" beerflight-toggle-target=".extra-hops" beerflight-toggle-display></script>
```

Each `button` describes a "taster" and tells Beer Flight how to implement the taster when the button is pressed.

## Describe each taster in the Beer Flight with `beerflight` attributes

### `beerflight-taster-label`

- Used to specify the name to appear on the paddle

Example: `beerflight-taster-label="layout with larger sidebar"`

### `beerflight-taster-default`

- Used to indicate a default taster that should be enabled on page load. If not specified, the first taster is treated as the default.

Example: `<button beerflight-taster-label="default taster" beerflight-taster-default></button>`

### `beerflight-toggle-target`

- Used to designate target elements for the style changes. Any valid CSS selectors should work here, such as `.try-alpha-version` (classes), `#main-content` (IDs), `div` (HTML elements), and `#main-content h2` (specific child elements).

Example: `<button [...] beerflight-toggle-target="#main-content h2" [...]></button>`

### `beerflight-toggle-class`

- Used to toggle a given class on target elements (indicated by the `beerflight-toggle-target` attribute). Don't precede the class name with a period (as is done with selectors).

Example: `<button [...] beerflight-toggle-target="#main-content h2" beerflight-toggle-class="extra-fancy"></button>`

### `beerflight-toggle-display`

- Used toggle the CSS display attribute of target elements (indicated by the `beerflight-toggle-target` attribute). This attribute does not have a value.

Example: `<button [...] beerflight-toggle-target=".extra-fancy-stuff" beerflight-toggle-display></button>`
