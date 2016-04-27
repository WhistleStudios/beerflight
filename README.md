# Beer Flight

## A drop-in tool for quickly presenting web design prototypes

Beer Flight is a script that generates an interactive sampler paddle for showing off custom design variations. Add some markup to describe design tasters, and Beer Flight crafts a menu for demonstrating changes live on the page.

As long as you don't spill anything, you won't get your hands any wetter than basic HTML and CSS selectors.

## Quick Start

1. Include the Beer Flight script in your HTML document: `<script src="/path/to/beerflight.js"></script>`

2. Add a Beer Flight `button` elements (just before the script) to describe each taster. Use the Beer Flight taster attribute to give each taster a label. Use other other Beer Flight attributes to specify how a taster changes the page.

If you want to add a class (`orange`) to a target element (`#beer-container`), the button markup looks like this:

```html
<button beerflight-taster="Belgian Ale"></button>
<button beerflight-taster="With Orange"
  beerflight-toggle-target="#beer-container"
  beerflight-toggle-class=".orange">
</button>
```

Pour and serve by letting Beer Flight automatically generate your flight paddle and present your brews in style.

## Examples

Put your own CSS classes on the paddle. If you'd like to swap classes for `.bolder` and `.italicized` in and out, you'll do something like this:

```html
<button beerflight-taster="Option A (default)"></button>
<button beerflight-taster="Option B (bolder H1s)"
  beerflight-toggle-target="h1"
  beerflight-toggle-class=".bolder"></button>
<button beerflight-taster="Option C (italicized H2s)"
  beerflight-toggle-target="h2"
  beerflight-toggle-class=".italicized"></button>
```

Show or hide elements as you please. Show off a design with or without a notification or modal window:

```html
<button beerflight-taster-label="bitter brew"></button>
<button beerflight-taster-label="Hops Notification"
  beerflight-toggle-target=".hops-info"
  beerflight-toggle-display></button>
```

## Customize your taster buttons

Every Beer Flight button needs a `beerflight-taster` attribute. The value is rendered on the label in the sampler paddle. `beerflight-taster="Version Alpha"`

The first Beer Flight button designates the page styles to show up by default. Add the `beerflight-default` attribute to explicitly declare any taster as the initial default. (This attribute doesn't take a value.)

```html
<button beerflight-taster="too big"
  beerflight-toggle-target="#bed-container"
  beerflight-toggle-class="king-size"></button>
<button beerflight-taster="just right" beerflight-default></button>
<button beerflight-taster="too small"
  beerflight-toggle-target="#bed-container"
  beerflight-toggle-class="twin-size"></button>
```

Use `beerflight-toggle-target` to specify which HTML elements should be affected by the taster. Any valid CSS selectors will work here, such as `.try-alpha-version` (classes), `#main-content` (IDs), `div` (HTML elements), and `#main-content h2` (child elements).

Use `beerflight-toggle-class` to indicate a class to be toggled on or off on the target element. Use `beerflight-toggle-display` to toggle the display of the target element.
