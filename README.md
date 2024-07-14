<div align="center">
    <a align="center" width="100%">
        <img width="100px" src="https://raw.githubusercontent.com/zenstorage/Reddit-NSFW-Unblur/main/assets/icon.png">
    </a>
    <h1 align="center">Reddit NSFW Unblur</h1>
    <img width="50%" src="https://raw.githubusercontent.com/zenstorage/Reddit-NSFW-Unblur/main/assets/before-addon.png"><img width="50%" src="https://raw.githubusercontent.com/zenstorage/Reddit-NSFW-Unblur/main/assets/after-addon.png">
</div>
<h2>Installation</h2>
<h2>Browser Extension</h2>
<p>Only for Firefox</p>
<p>
    <a href="https://addons.mozilla.org/pt-BR/firefox/addon/reddit-nsfw-spoiler-unblur/">
    Firefox Addon
    </a>
</p>
<h2>Userscript</h2>
<p>First install a userscript manager:</p>
<h4>Firefox:</h4>
<blockquote>
    <a href="https://addons.mozilla.org/pt-BR/firefox/addon/tampermonkey/" >
    Tampermonkey
    </a>
    <br>
    <a href="https://addons.mozilla.org/pt-BR/firefox/addon/violentmonkey/" >
    Violentmonkey
    </a>
    <br>
    <a href="https://addons.mozilla.org/pt-BR/firefox/addon/firemonkey/" >
    Firemonkey
    </a>
</blockquote>
<h4>Chrome:</h4>
<blockquote>
    <a href="https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo" >
    Tampermonkey
    </a>
    <br>
    <a href="https://chromewebstore.google.com/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag" >
    Violentmonkey
    </a>
</blockquote>
<p>Then install userscript:</p>
<a href="https://greasyfork.org/scripts/485608">Reddit NSFW Unblur</a>
<h2>Alternative Methods</h2>
<h4>Adblock filters (ABP syntax does not have a snippet to autoblur)</h4>
<blockquote>
    <a href="https://raw.githubusercontent.com/zenstorage/Reddit-NSFW-Unblur/main/filters/ublock.txt">uBlock Origin syntax</a> (<a href="https://raw.githubusercontent.com/zenstorage/Reddit-NSFW-Unblur/main/filters/brave.txt">for Brave</a>)
    <br>
    <a href="https://raw.githubusercontent.com/zenstorage/Reddit-NSFW-Unblur/main/filters/abp.txt">Adguard syntax</a>
    <br>
    <a href="https://raw.githubusercontent.com/zenstorage/Reddit-NSFW-Unblur/main/filters/abp.txt">Adblock Plus(ABP) syntax (Adblock Plus, Vivaldi, etc...)</a>
</blockquote>
<h4>uBlock Origin</h4>
<p>Add to tab <b>My Filters:</b></p>
<pre>
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
</pre>
<hr>
<h4>Request Control</h4>
<img src="https://i.imgur.com/2oVX1dD.png">
<h4>Redirector</h4>
<p>Add to you rules:</p>
<img src="https://i.imgur.com/DYRQ2cj.png">
<h4>ModHeader</h4>
<p>Add to you rules:</p>
<img src="https://i.imgur.com/RptYic2.png">
<h4>Any other extension that can block the URL:</h4>
<p>Match patterns:</p>
<code>https://www.redditstatic.com/*xpromo-nsfw-blocking-modal-desktop*.js</code>
<p>Regex:</p>
<code>https:\/\/www\.redditstatic\.com\/.*xpromo-nsfw-blocking-modal-desktop.*\.js</code>
