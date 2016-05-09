# Beer Flight

## Introducing a new way to quickly present web design prototypes

Beer Flight is a tool to help demonstrate variations of a web design prototype. It's perfect for UX designers familiar with HTML & CSS to show (not tell) people what an experience would be like.

## Get started

Add the Beer Flight script to your HTML prototype.

```html
<script src="/path/to/beerflight.js"></script>
```

Add taster buttons to enable variations. Each button adds or removes a CSS class to elements on the page. The markup for a Beer Flight taster button looks like this:

```html
<button beerflight-taster="TASTER LABEL"
  beerflight-selector="CSS-SELECTOR"
  beerflight-class="CSS-CLASS-NAME"></button>
```

Pour and serve.

## Examples

### Blue Version, Red Version

```css
/* style.css (Beer Flight-ready CSS) */
/* background of container is red by default */
.container { background: red; }
/* try container with blue background */
.container.try-blue { background: blue; }
```

```html
<!-- index.html (Beer Flight button HTML) -->
<button beerflight-taster="Red"></button>
<button beerflight-taster="Blue"
  beerflight-selector=".container"
  beerflight-class="try-blue"></button>
```

### Show a Notification

```css
/* style.css (Beer Flight-ready CSS) */
/* alert is hidden by default */
#alert { display: none; }
/* make alert visible */
#alert.show-me { display: block; }
```

```html
<!-- index.html (Beer Flight button HTML) -->
<button beerflight-taster="Home"></button>
<button beerflight-taster="Notification"
  beerflight-selector="#alert"
  beerflight-class="show-me"></button>
```
