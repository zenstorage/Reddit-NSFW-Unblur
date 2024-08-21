// ==UserScript==
// @name            Reddit NSFW Unblur Alt
// @namespace       https://greasyfork.org/users/821661
// @match           https://www.reddit.com/*
// @match           https://sh.reddit.com/*
// @grant           none
// @run-at          document-start
// @noframes
// @version         0.1
// @author          hdyzen
// @description     Unblur nsfw in Shreddit
// @license         MIT
// @homepage        https://github.com/zenstorage/Reddit-NSFW-Unblur
// ==/UserScript==
'use strict';

let communityIcon = '';

const start = () => {
    const mutationsHandler = mutations => {
        if (!window.location.pathname.startsWith('/user/')) return;
        const svgUserProfile = document.querySelector('svg.text-category-nsfw');
        if (svgUserProfile) {
            const iconUrl = JSON.parse(document.querySelector('reddit-page-data').getAttribute('data')).profile.icon;
            svgUserProfile.outerHTML = `<img src="${iconUrl}" alt="Avatar" class="block m-0 rounded-full border-2 border-solid border-neutral-border-weak overflow-hidden w-3xl h-3xl" data-testid="profile-icon" title="" style="">`;
        }
    };
    const observer = new MutationObserver(mutationsHandler);
    observer.observe(document, { childList: true, subtree: true, attributes: true });
};

// start();

const originalDefine = customElements.define;

customElements.define = function (name, constructor, options) {
    // ( User / Community ) icon
    if (name === 'icon-nsfw') {
        const originalConnectedCallback = constructor.prototype.connectedCallback;

        constructor.prototype.connectedCallback = function () {
            if (this.className.includes('nsfw-avatar')) {
                this.outerHTML = `<faceplate-img src="${this.closest('shreddit-post').getAttribute('icon')}" class="avatar nd:visible nd:block nd:animate-pulse nd:bg-neutral-background-selected overflow-hidden rounded-full shrink-0 h-lg w-lg" loading="lazy"></faceplate-img>`;
            }
            if (this.className.includes('community-icon')) {
                const clone = document.querySelector('reddit-breadcrumbs[slot="breadcrumbs"] > faceplate-img').cloneNode();
                clone.className = 'shreddit-subreddit-icon__icon rounded-full overflow-hidden nd:visible nd:bg-secondary-background bg-neutral-background border-neutral-background border-lg border-solid mb-md flexitems-center justify-center xs:w-[80px] xs:h-[80px] w-[40px] h-[40px] shadow-xsxs:shadow-none community-icon';

                this.replaceWith(clone);
            }
            if (this.className.includes('text-category-nsfw') && window.location.pathname.includes('/comments/')) {
                // console.log(this);
                const clone = document.querySelector('reddit-breadcrumbs[slot="breadcrumbs"] > faceplate-img').cloneNode();
                clone.className = 'shreddit-subreddit-icon__icon rounded-full overflow-hidden nd:visible nd:bg-secondary-background mb-md h-full w-full';

                this.replaceWith(clone);
            }
            if (this.className.includes('text-category-nsfw') && window.location.pathname.startsWith('/user/') && this.parentNode.parentNode.href) {
                console.log(this);
                fetch(this.parentNode.parentNode.href)
                    .then(response => response.text())
                    .then(responseText => {
                        const matchSrc = responseText.match(/<reddit-page-data.+?(https:.+?communityIcon_.+?)&quot/)?.[1];

                        if (matchSrc) {
                            this.parentNode.parentNode.nextElementSibling.firstElementChild.firstElementChild.firstElementChild.innerHTML = `<faceplate-img src="${matchSrc}" class="rounded-full border-2 border-solid border-neutral-border-weak overflow-hidden" width="48" height="48" loading="eager"></faceplate-img>`;
                            this.outerHTML = `<faceplate-img src="${matchSrc}" alt="Avatar" class="avatar nd:visible nd:block nd:animate-pulse nd:bg-neutral-background-selected overflow-hidden rounded-full shrink-0 h-lg w-lg" loading="lazy" title="" style=""></faceplate-img>`;
                        }
                    });
            }

            originalConnectedCallback.call(this);
        };
    }

    // User icon hovercard
    if (name === 'faceplate-tracker') {
        const originalConnectedCallback = constructor.prototype.connectedCallback;

        constructor.prototype.connectedCallback = function () {
            if (this.getAttribute('noun') === 'user_avatar') {
                this.innerHTML = `<faceplate-img src="${this.closest('shreddit-post').getAttribute('icon')}" class="rounded-full border-2 border-solid border-neutral-border-weak overflow-hidden" width="48" height="48" loading="eager"></faceplate-img>`;
            }

            originalConnectedCallback.call(this);
        };
    }

    // Right sidebar
    if (name === 'faceplate-img') {
        const originalConnectedCallback = constructor.prototype.connectedCallback;

        constructor.prototype.connectedCallback = function () {
            if (this.getAttribute('style')?.includes('blur')) {
                this.removeAttribute('style');
                this.closest('shreddit-pubsub-publisher')?.nextElementSibling.remove();
            }

            originalConnectedCallback.call(this);
        };
    }

    // Subreddit card
    if (name === 'community-highlight-card') {
        const originalConnectedCallback = constructor.prototype.connectedCallback;

        constructor.prototype.connectedCallback = function () {
            this.isBlurred = false;

            originalConnectedCallback.call(this);
        };
    }

    // Posts
    // if (name === 'shreddit-blurred-container') {
    //     const originalConnectedCallback = constructor.prototype.connectedCallback;

    //     constructor.prototype.connectedCallback = function () {
    //         this.blurred = false;

    //         originalConnectedCallback.call(this);
    //     };
    // }

    // Modal
    if (name === 'shreddit-async-loader') {
        const originalConnectedCallback = constructor.prototype.connectedCallback;

        constructor.prototype.connectedCallback = function () {
            if (this.bundleName === 'nsfw_blocking_modal') {
                return;
            }

            originalConnectedCallback.call(this);
        };
    }

    // Chama o método original para registrar o elemento
    originalDefine.call(customElements, name, constructor, options);
};

document.addEventListener('readystatechange', e => {
    console.log(document.readyState, document.querySelector('svg.text-category-nsfw[icon-name="nsfw-fill"]'));
});

window.addEventListener('navigate', e => {
    console.log('e ,', e);
});
