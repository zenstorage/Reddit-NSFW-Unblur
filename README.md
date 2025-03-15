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

### Adblock filters (ABP is instable)

> 1. [uBlock Origin or Brave](https://raw.githubusercontent.com/zenstorage/Reddit-NSFW-Unblur/main/filters/ublock.txt)  
> 2. [Adguard](https://raw.githubusercontent.com/zenstorage/Reddit-NSFW-Unblur/main/filters/adguard.txt)  
> 3. [Adblock Plus (Instable)](https://raw.githubusercontent.com/zenstorage/Reddit-NSFW-Unblur/main/filters/abp.txt)

### uBlock Origin

Add to ***My Filters:*** 
```adb
! Reddit - Set revealed
www.reddit.com##+js(trusted-set, HTMLElement.prototype.__blurred, { value: "false" })
! Reddit - Prevent remove revealed
www.reddit.com##+js(trusted-suppress-native-method, Element.prototype.querySelector, '"div[slot="revealed"]"', prevent)
! Reddit - Hide prompt in single post, backdrop overlay, etc...
www.reddit.com##.prompt, .bg-scrim, .overlay, .viewInApp, #blocking-modal, #nsfw-qr-dialog, body > [style*="blur(4px)"]
! Reddit - Remove scroll/click block
www.reddit.com##body:style(pointer-events: auto !important; overflow: auto !important;)
```