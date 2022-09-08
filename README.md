# parcel-optimizer-nohtmlsuffix

Simple parcel plugin to remove .html suffixes from internal links in generated HTML pages.

Adapted from https://github.com/vseventer/parcel-optimizer-friendly-urls -- thanks!

Minmial use:
```
yarn add https://github.com/phfaist/parcel-optimizer-nohtmlsuffix.git
```

Create or modify `.parcelrc` to include:
```
{
  "extends": "@parcel/config-default",
  "optimizers": {
    "*.html": ["parcel-optimizer-nohtmlsuffix", "..."]
  }
}
```

That's it!
