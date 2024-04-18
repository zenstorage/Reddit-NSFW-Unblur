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
<blockquote>Only uBlock Origin removes the overlay prompt to open in the app and removes the blur</i></blockquote>
<h4>uBlock Origin</h4>
<p>Add to tab <b>My Filters:</b></p>
<pre>
! Reddit - Block loader of nsfw modal
||www.redditstatic.com/shreddit/*/xpromo-nsfw-blocking-modal*.js$script,domain=reddit.com
! Reddit - Hide prompt in single post, backdrop overlay
reddit.com##.prompt, .bg-scrim, .overlay
! Reddit - Set revealed removing mode
reddit.com##shreddit-blurred-container[mode]:has([slot="revealed"]):remove-attr(mode)
! Reddit - Remove blur, backdrop...
reddit.com##.blurred:style(filter: unset !important; background: unset !important;pointer-events: unset !important;display: unset !important;)
</pre>
<hr>
<blockquote>The methods below do not block the prompt that appears on the single post page and do not remove the blur</blockquote>
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
<h2>Related to Reddit</h2>
<h3>Show original images on Reddit</h3>
<h4>Using Request Control, create a rule e use this config:</h4>
<img src="https://i.imgur.com/88YYMgW.png">
<h4>Using Redirector, create a rule e use this config:</h4>
<img src="https://i.imgur.com/36MNlQg.png">
<h4>Using ModHeader, create a rule e use this config:</h4>
<img src="https://i.imgur.com/AwCucFq.png">
<h3>Reditect to new.reddit</h3>
<h4>Using Request Control</h4>
<img src="https://i.imgur.com/iIYMbM3.png">
<h4>Using Redirector</h4>
<img src="https://i.imgur.com/8o71Qai.png">
<h4>Using ModHeader</h4>
<img src="https://i.imgur.com/UAtNEZO.png">
<h3>Others</h3>
<h4>Userstyle</h4>
<blockquote>    
    <a href="https://userstyles.world/style/9384/minimal-reddit">Minimal Reddit</a>
</blockquote>
<h4>Userscript</h4>
<blockquote><a href="https://greasyfork.org/pt-BR/scripts/478969-reddit-replace-player-with-videojs">Reddit Replace Player with VideoJS</a></blockquote>
<link rel="stylesheet" href="userscript/style.css" >
