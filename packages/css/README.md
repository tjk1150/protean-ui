# @protean-ui/css

Presentation-scoped design tokens and the reference stylesheet for
[Protean UI](https://github.com/tjk1150/protean-ui).

One governing principle: **values follow the presentation, never the
viewport**. A sheet rounds only its top corners and a fullscreen surface has
none because the role changed - not because a media query fired.

Two files, two levels of adoption:

```css
/* the full reference look - import and ship */
@import '@protean-ui/css/reference.css';

/* or the vocabulary alone - keep the token contract, write your own structure */
@import '@protean-ui/css/tokens.css';
```

Rebind tokens from any unlayered stylesheet (everything here sits in
`@layer protean`, so your CSS always wins):

```css
:root {
  --protean-surface: #ffffff;
  --protean-accent: #3182f6;
}

[data-presentation='modal'] {
  --protean-shape: 20px;
}
```

`@protean-ui/react/reference.css` re-exports this package's reference
stylesheet, so existing imports keep working.

Status: pre-alpha. Documentation and demos: https://github.com/tjk1150/protean-ui
