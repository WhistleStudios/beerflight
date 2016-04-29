# Beer Flight

## A drop-in tool for quickly presenting web design prototypes

Beer Flight is a script that generates an interactive sampler paddle for showing off custom web design variations live on a page. Add some markup to describe design tasters, and Beer Flight crafts a menu for you to taste each one.

As long as you don't spill anything, you won't get your hands any wetter than basic HTML and CSS selectors.

## Quick Start

1. Include the Beer Flight script in your HTML document:
  ```
  <script src="/path/to/beerflight.js"></script>
  ```

2. Add `button` elements (just before the script) to describe each taster. Use the `beerflight-taster` attribute to give each taster a label and other Beer Flight attributes to specify how the taster changes the page.

If you want to add a class (`orange`) to a specific element (`#beer-container`), the button markup looks like this:

```html
<button beerflight-taster="Belgian Ale"></button>
<button beerflight-taster="With Orange"
  beerflight-selector="#beer-container"
  beerflight-class="orange"></button>
```

Pour and serve by letting Beer Flight automatically generate your flight paddle and present your brews in style.

## An example

Put your own CSS classes on the paddle. If you'd like to swap classes for `.bolder` and `.italicized` in and out, you'll do something like this:

```html
<button beerflight-taster="Lager"></button>
<button beerflight-taster="Option B (bolder H1s)"
  beerflight-selector="h1"
  beerflight-class="bolder"></button>
<button beerflight-taster="Option C (italicized H2s)"
  beerflight-selector="h2"
  beerflight-class="italicized"></button>
```

The `beerflight-selector` attribute specifies which HTML elements are affected by a taster and the `beerflight-class` attribute indicates a class that should be applied or removed to the selected elements.

## Customize your taster buttons

Every Beer Flight button is labeled with a `beerflight-taster` attribute. The attribute's value is rendered as the label on the sampler paddle.

```html
<button beerflight-taster="Version Alpha" [...] ></button>
```

Beer Flight considers the first button to be the default taster and loads that taster's styles on startup. Use the `beerflight-default` attribute to explicitly designate any other buttton as the default:

```html
<button [...] beerflight-default></button>
```
