# Beer Flight

## A drop-in tool for quickly presenting web design prototypes

Beer Flight is a script that generates an interactive sampler paddle for showing off custom web design variations live on a page. Add markup to describe design tasters, and Beer Flight crafts a menu for tasting each one.

As long as you don't spill anything, you won't get your hands any wetter than basic HTML and CSS selectors.

## Get started

1. Include the Beer Flight script in your HTML document:

  ```html
  <script src="/path/to/beerflight.js"></script>
  ```

2. Add `button` elements (just before the script) to describe each taster. Use the `beerflight-taster` attribute to label each taster and other Beer Flight attributes to specify how the taster changes the page.

For a taster to select an element (`#container`) and apply a class (`fancy`), its button markup should look like this:

```html
<button beerflight-taster="Normal"></button>
<button beerflight-taster="Fancy"
  beerflight-selector="#container"
  beerflight-class="fancy"></button>
```

Pour and serve by letting Beer Flight automatically generate your flight paddle and present your brews in style.

## Label your tasters

Don't forget to label each taster by giving its button a `beerflight-taster` attribute.

```html
<button beerflight-taster="Well-Labeled Version A"></button>
```

## Set a default taster

Beer Flight serves the first taster on startup by default. If you'd rather specify another taster to load initially, give its button the `beerflight-default` attribute. This attribute is _optional_.

```html
<button [...] beerflight-default></button>
```

## Use CSS classes to show design variations

### Swap different styles in and out

In CSS, use a class to trigger a style change.

```css
/* default red background */
.container { background: red; }
/* try with blue background */
.try-blue .container { background: blue; }
```

In the button markup, tell Beer Flight which element is affected and which class triggers the change.

```html
<button beerflight-taster="Red"></button>
<button beerflight-taster="Blue"
  beerflight-selector="#main"
  beerflight-class="try-blue"></button>
```

### Show or hide notifications or modal elements

In the CSS, some elements can be hidden by default and Beer Flight display them on demand.

```css
#alert { display: none; }
.show-notification #alert { display: block; }
```

In the button markup, a class can be used to trigger the display of hidden elements.

```html
<button beerflight-taster="Home"></button>
<button beerflight-taster="Notification"
  beerflight-selector="#main"
  beerflight-class="show-notification"></button>
```

### Maybe a third example
