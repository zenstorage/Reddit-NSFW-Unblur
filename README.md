<div align="center">
    <a align="center" width="100%">
        <img width="100px" src="https://raw.githubusercontent.com/zenstorage/Reddit-NSFW-Unblur/main/assets/icon.png">
    </a>
    <h1 align="center">Reddit NSFW Unblur</h1>
    <img width="50%" src="https://raw.githubusercontent.com/zenstorage/Reddit-NSFW-Unblur/main/assets/before-addon.png"><img width="50%" src="https://raw.githubusercontent.com/zenstorage/Reddit-NSFW-Unblur/main/assets/after-addon.png">
</div>

# Installation

## Browser Extension

Only for Firefox

[Firefox Addon](https://addons.mozilla.org/pt-BR/firefox/addon/reddit-nsfw-spoiler-unblur/)

## Userscript

First install a userscript manager:

### Firefox:

> [Tampermonkey](https://addons.mozilla.org/pt-BR/firefox/addon/tampermonkey/)  
> [Violentmonkey](https://addons.mozilla.org/pt-BR/firefox/addon/violentmonkey/)  
> [Firemonkey](https://addons.mozilla.org/pt-BR/firefox/addon/firemonkey/)

### Chrome:

> [Tampermonkey](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)  
> [Violentmonkey](https://chromewebstore.google.com/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag)

Then install userscript:

[Reddit NSFW Unblur](https://greasyfork.org/scripts/485608)

Alternative Methods
-------------------

### Adblock filters (ABP syntax does not have a snippet to autoblur)

> [uBlock Origin syntax](https://raw.githubusercontent.com/zenstorage/Reddit-NSFW-Unblur/main/filters/ublock.txt) ([for Brave](https://raw.githubusercontent.com/zenstorage/Reddit-NSFW-Unblur/main/filters/adguard.txt))  
> [Adguard syntax](https://raw.githubusercontent.com/zenstorage/Reddit-NSFW-Unblur/main/filters/abp.txt)  
> [Adblock Plus(ABP) syntax (Adblock Plus, Vivaldi, etc...)](https://raw.githubusercontent.com/zenstorage/Reddit-NSFW-Unblur/main/filters/abp.txt)

### uBlock Origin

Add to tab ***My Filters:*** 
```adb
! Reddit - Block loader of nsfw modal
||www.redditstatic.com/shreddit/*/xpromo-nsfw-blocking-modal*.js$script,domain=reddit.com
! Reddit - Hide prompt in single post, backdrop overlay
reddit.com##.prompt
reddit.com##.bg-scrim
reddit.com##.overlay
! Reddit - Set revealed removing mode attr
reddit.com##shreddit-blurred-container[mode]:has([slot="revealed"]):remove-attr(mode)
! Reddit - Remove blur, backdrop...
reddit.com##.blurred:style(filter: unset !important; background: unset !important; pointer-events: unset !important; display: unset !important;)
```

* * *

### Request Control

![](https://i.imgur.com/2oVX1dD.png)

### Redirector

![](https://i.imgur.com/DYRQ2cj.png)

### ModHeader

![](https://i.imgur.com/RptYic2.png)

### Any other extension that can block the URL:

Match patterns:

`https://www.redditstatic.com/*xpromo-nsfw-blocking-modal-desktop*.js`

Regex:

`https:\/\/www\.redditstatic\.com\/.*xpromo-nsfw-blocking-modal-desktop.*\.js`
