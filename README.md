# Beer Flight

## Introducing a new way to quickly present web design prototypes

Beer Flight is a tool to help demonstrate variations of a web design prototype. It's perfect for UX designers familiar with HTML & CSS to show (not tell) people what an experience would be like.

## Get started

1. Add the Beer Flight script to your HTML prototype.

```html
<script src="/path/to/beerflight.js"></script>
```

2. Add taster buttons to enable variations. Each button adds or removes a CSS class to elements on the page. The markup for a Beer Flight taster button looks like this:

```html
<button beerflight-taster="TASTER LABEL"
  beerflight-selector="CSS-SELECTOR"
  beerflight-class="CSS-CLASS-NAME"></button>
```

3. Pour and serve.

## Examples

### Versions

CSS for a style variation...

```css
.container { background: red; }
.container.try-blue { background: blue; }
```

...can be triggered with markup like this:

```html
<!-- index.html (Beer Flight button HTML) -->
<button beerflight-taster="Red"></button>
<button beerflight-taster="Blue"
  beerflight-selector=".container"
  beerflight-class="try-blue"></button>
```

### Notifications

Elements hidden by default CSS...

```css
/* #alert is hidden by default */
#alert { display: none; }
#alert.show-me { display: block; }
```

...can be revealed with buttons like these:

```html
<!-- index.html (Beer Flight button HTML) -->
<button beerflight-taster="Home"></button>
<button beerflight-taster="Notification"
  beerflight-selector="#alert"
  beerflight-class="show-me"></button>
```
