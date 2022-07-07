<template>
    <i :class="'fl-icon-' + name"></i>
</template>

<script>
export default {
    name: 'FlIcon',

    props: {
        name: String
    }
};
</script>

<style>


@font-face {
    font-family: flement-icons;
    src: url(fonts/flement-icons.woff) format("woff"), url(fonts/flement-icons.ttf) format("truetype");
    font-weight: 400;
    font-display: "auto";
    font-style: normal
}

[class*=" fl-icon-"],
[class^=fl-icon-] {
    font-family: flement-icons !important;
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: baseline;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale
}

.fl-icon-ice-cream-round:before {
    content: "\e6a0"
}

.fl-icon-ice-cream-square:before {
    content: "\e6a3"
}

.fl-icon-lollipop:before {
    content: "\e6a4"
}

.fl-icon-potato-strips:before {
    content: "\e6a5"
}

.fl-icon-milk-tea:before {
    content: "\e6a6"
}

.fl-icon-ice-drink:before {
    content: "\e6a7"
}

.fl-icon-ice-tea:before {
    content: "\e6a9"
}

.fl-icon-coffee:before {
    content: "\e6aa"
}

.fl-icon-orange:before {
    content: "\e6ab"
}

.fl-icon-pear:before {
    content: "\e6ac"
}

.fl-icon-apple:before {
    content: "\e6ad"
}

.fl-icon-cherry:before {
    content: "\e6ae"
}

.fl-icon-watermflon:before {
    content: "\e6af"
}

.fl-icon-grape:before {
    content: "\e6b0"
}

.fl-icon-refrigerator:before {
    content: "\e6b1"
}

.fl-icon-goblet-square-full:before {
    content: "\e6b2"
}

.fl-icon-goblet-square:before {
    content: "\e6b3"
}

.fl-icon-goblet-full:before {
    content: "\e6b4"
}

.fl-icon-goblet:before {
    content: "\e6b5"
}

.fl-icon-cold-drink:before {
    content: "\e6b6"
}

.fl-icon-coffee-cup:before {
    content: "\e6b8"
}

.fl-icon-water-cup:before {
    content: "\e6b9"
}

.fl-icon-hot-water:before {
    content: "\e6ba"
}

.fl-icon-ice-cream:before {
    content: "\e6bb"
}

.fl-icon-dessert:before {
    content: "\e6bc"
}

.fl-icon-sugar:before {
    content: "\e6bd"
}

.fl-icon-tableware:before {
    content: "\e6be"
}

.fl-icon-burger:before {
    content: "\e6bf"
}

.fl-icon-knife-fork:before {
    content: "\e6c1"
}

.fl-icon-fork-spoon:before {
    content: "\e6c2"
}

.fl-icon-chicken:before {
    content: "\e6c3"
}

.fl-icon-food:before {
    content: "\e6c4"
}

.fl-icon-dish-1:before {
    content: "\e6c5"
}

.fl-icon-dish:before {
    content: "\e6c6"
}

.fl-icon-moon-night:before {
    content: "\e6ee"
}

.fl-icon-moon:before {
    content: "\e6f0"
}

.fl-icon-cloudy-and-sunny:before {
    content: "\e6f1"
}

.fl-icon-partly-cloudy:before {
    content: "\e6f2"
}

.fl-icon-cloudy:before {
    content: "\e6f3"
}

.fl-icon-sunny:before {
    content: "\e6f6"
}

.fl-icon-sunset:before {
    content: "\e6f7"
}

.fl-icon-sunrise-1:before {
    content: "\e6f8"
}

.fl-icon-sunrise:before {
    content: "\e6f9"
}

.fl-icon-heavy-rain:before {
    content: "\e6fa"
}

.fl-icon-lightning:before {
    content: "\e6fb"
}

.fl-icon-light-rain:before {
    content: "\e6fc"
}

.fl-icon-wind-power:before {
    content: "\e6fd"
}

.fl-icon-baseball:before {
    content: "\e712"
}

.fl-icon-soccer:before {
    content: "\e713"
}

.fl-icon-football:before {
    content: "\e715"
}

.fl-icon-basketball:before {
    content: "\e716"
}

.fl-icon-ship:before {
    content: "\e73f"
}

.fl-icon-truck:before {
    content: "\e740"
}

.fl-icon-bicycle:before {
    content: "\e741"
}

.fl-icon-mobile-phone:before {
    content: "\e6d3"
}

.fl-icon-service:before {
    content: "\e6d4"
}

.fl-icon-key:before {
    content: "\e6e2"
}

.fl-icon-unlock:before {
    content: "\e6e4"
}

.fl-icon-lock:before {
    content: "\e6e5"
}

.fl-icon-watch:before {
    content: "\e6fe"
}

.fl-icon-watch-1:before {
    content: "\e6ff"
}

.fl-icon-timer:before {
    content: "\e702"
}

.fl-icon-alarm-clock:before {
    content: "\e703"
}

.fl-icon-map-location:before {
    content: "\e704"
}

.fl-icon-dflete-location:before {
    content: "\e705"
}

.fl-icon-add-location:before {
    content: "\e706"
}

.fl-icon-location-information:before {
    content: "\e707"
}

.fl-icon-location-outline:before {
    content: "\e708"
}

.fl-icon-location:before {
    content: "\e79e"
}

.fl-icon-place:before {
    content: "\e709"
}

.fl-icon-discover:before {
    content: "\e70a"
}

.fl-icon-first-aid-kit:before {
    content: "\e70b"
}

.fl-icon-trophy-1:before {
    content: "\e70c"
}

.fl-icon-trophy:before {
    content: "\e70d"
}

.fl-icon-medal:before {
    content: "\e70e"
}

.fl-icon-medal-1:before {
    content: "\e70f"
}

.fl-icon-stopwatch:before {
    content: "\e710"
}

.fl-icon-mic:before {
    content: "\e711"
}

.fl-icon-copy-document:before {
    content: "\e718"
}

.fl-icon-full-screen:before {
    content: "\e719"
}

.fl-icon-switch-button:before {
    content: "\e71b"
}

.fl-icon-aim:before {
    content: "\e71c"
}

.fl-icon-crop:before {
    content: "\e71d"
}

.fl-icon-odometer:before {
    content: "\e71e"
}

.fl-icon-time:before {
    content: "\e71f"
}

.fl-icon-bangzhu:before {
    content: "\e724"
}

.fl-icon-close-notification:before {
    content: "\e726"
}

.fl-icon-microphone:before {
    content: "\e727"
}

.fl-icon-turn-off-microphone:before {
    content: "\e728"
}

.fl-icon-position:before {
    content: "\e729"
}

.fl-icon-postcard:before {
    content: "\e72a"
}

.fl-icon-message:before {
    content: "\e72b"
}

.fl-icon-chat-line-square:before {
    content: "\e72d"
}

.fl-icon-chat-dot-square:before {
    content: "\e72e"
}

.fl-icon-chat-dot-round:before {
    content: "\e72f"
}

.fl-icon-chat-square:before {
    content: "\e730"
}

.fl-icon-chat-line-round:before {
    content: "\e731"
}

.fl-icon-chat-round:before {
    content: "\e732"
}

.fl-icon-set-up:before {
    content: "\e733"
}

.fl-icon-turn-off:before {
    content: "\e734"
}

.fl-icon-open:before {
    content: "\e735"
}

.fl-icon-connection:before {
    content: "\e736"
}

.fl-icon-link:before {
    content: "\e737"
}

.fl-icon-cpu:before {
    content: "\e738"
}

.fl-icon-thumb:before {
    content: "\e739"
}

.fl-icon-female:before {
    content: "\e73a"
}

.fl-icon-male:before {
    content: "\e73b"
}

.fl-icon-guide:before {
    content: "\e73c"
}

.fl-icon-news:before {
    content: "\e73e"
}

.fl-icon-price-tag:before {
    content: "\e744"
}

.fl-icon-discount:before {
    content: "\e745"
}

.fl-icon-wallet:before {
    content: "\e747"
}

.fl-icon-coin:before {
    content: "\e748"
}

.fl-icon-money:before {
    content: "\e749"
}

.fl-icon-bank-card:before {
    content: "\e74a"
}

.fl-icon-box:before {
    content: "\e74b"
}

.fl-icon-present:before {
    content: "\e74c"
}

.fl-icon-sfll:before {
    content: "\e6d5"
}

.fl-icon-sold-out:before {
    content: "\e6d6"
}

.fl-icon-shopping-bag-2:before {
    content: "\e74d"
}

.fl-icon-shopping-bag-1:before {
    content: "\e74e"
}

.fl-icon-shopping-cart-2:before {
    content: "\e74f"
}

.fl-icon-shopping-cart-1:before {
    content: "\e750"
}

.fl-icon-shopping-cart-full:before {
    content: "\e751"
}

.fl-icon-smoking:before {
    content: "\e752"
}

.fl-icon-no-smoking:before {
    content: "\e753"
}

.fl-icon-house:before {
    content: "\e754"
}

.fl-icon-table-lamp:before {
    content: "\e755"
}

.fl-icon-school:before {
    content: "\e756"
}

.fl-icon-office-building:before {
    content: "\e757"
}

.fl-icon-toilet-paper:before {
    content: "\e758"
}

.fl-icon-notebook-2:before {
    content: "\e759"
}

.fl-icon-notebook-1:before {
    content: "\e75a"
}

.fl-icon-files:before {
    content: "\e75b"
}

.fl-icon-collection:before {
    content: "\e75c"
}

.fl-icon-receiving:before {
    content: "\e75d"
}

.fl-icon-suitcase-1:before {
    content: "\e760"
}

.fl-icon-suitcase:before {
    content: "\e761"
}

.fl-icon-film:before {
    content: "\e763"
}

.fl-icon-collection-tag:before {
    content: "\e765"
}

.fl-icon-data-analysis:before {
    content: "\e766"
}

.fl-icon-pie-chart:before {
    content: "\e767"
}

.fl-icon-data-board:before {
    content: "\e768"
}

.fl-icon-data-line:before {
    content: "\e76d"
}

.fl-icon-reading:before {
    content: "\e769"
}

.fl-icon-magic-stick:before {
    content: "\e76a"
}

.fl-icon-coordinate:before {
    content: "\e76b"
}

.fl-icon-mouse:before {
    content: "\e76c"
}

.fl-icon-brush:before {
    content: "\e76e"
}

.fl-icon-headset:before {
    content: "\e76f"
}

.fl-icon-umbrflla:before {
    content: "\e770"
}

.fl-icon-scissors:before {
    content: "\e771"
}

.fl-icon-mobile:before {
    content: "\e773"
}

.fl-icon-attract:before {
    content: "\e774"
}

.fl-icon-monitor:before {
    content: "\e775"
}

.fl-icon-search:before {
    content: "\e778"
}

.fl-icon-takeaway-box:before {
    content: "\e77a"
}

.fl-icon-paperclip:before {
    content: "\e77d"
}

.fl-icon-printer:before {
    content: "\e77e"
}

.fl-icon-document-add:before {
    content: "\e782"
}

.fl-icon-document:before {
    content: "\e785"
}

.fl-icon-document-checked:before {
    content: "\e786"
}

.fl-icon-document-copy:before {
    content: "\e787"
}

.fl-icon-document-dflete:before {
    content: "\e788"
}

.fl-icon-document-remove:before {
    content: "\e789"
}

.fl-icon-tickets:before {
    content: "\e78b"
}

.fl-icon-folder-checked:before {
    content: "\e77f"
}

.fl-icon-folder-dflete:before {
    content: "\e780"
}

.fl-icon-folder-remove:before {
    content: "\e781"
}

.fl-icon-folder-add:before {
    content: "\e783"
}

.fl-icon-folder-opened:before {
    content: "\e784"
}

.fl-icon-folder:before {
    content: "\e78a"
}

.fl-icon-edit-outline:before {
    content: "\e764"
}

.fl-icon-edit:before {
    content: "\e78c"
}

.fl-icon-date:before {
    content: "\e78e"
}

.fl-icon-c-scale-to-original:before {
    content: "\e7c6"
}

.fl-icon-view:before {
    content: "\e6ce"
}

.fl-icon-loading:before {
    content: "\e6cf"
}

.fl-icon-rank:before {
    content: "\e6d1"
}

.fl-icon-sort-down:before {
    content: "\e7c4"
}

.fl-icon-sort-up:before {
    content: "\e7c5"
}

.fl-icon-sort:before {
    content: "\e6d2"
}

.fl-icon-finished:before {
    content: "\e6cd"
}

.fl-icon-refresh-left:before {
    content: "\e6c7"
}

.fl-icon-refresh-right:before {
    content: "\e6c8"
}

.fl-icon-refresh:before {
    content: "\e6d0"
}

.fl-icon-video-play:before {
    content: "\e7c0"
}

.fl-icon-video-pause:before {
    content: "\e7c1"
}

.fl-icon-d-arrow-right:before {
    content: "\e6dc"
}

.fl-icon-d-arrow-left:before {
    content: "\e6dd"
}

.fl-icon-arrow-up:before {
    content: "\e6e1"
}

.fl-icon-arrow-down:before {
    content: "\e6df"
}

.fl-icon-arrow-right:before {
    content: "\e6e0"
}

.fl-icon-arrow-left:before {
    content: "\e6de"
}

.fl-icon-top-right:before {
    content: "\e6e7"
}

.fl-icon-top-left:before {
    content: "\e6e8"
}

.fl-icon-top:before {
    content: "\e6e6"
}

.fl-icon-bottom:before {
    content: "\e6eb"
}

.fl-icon-right:before {
    content: "\e6e9"
}

.fl-icon-back:before {
    content: "\e6ea"
}

.fl-icon-bottom-right:before {
    content: "\e6ec"
}

.fl-icon-bottom-left:before {
    content: "\e6ed"
}

.fl-icon-caret-top:before {
    content: "\e78f"
}

.fl-icon-caret-bottom:before {
    content: "\e790"
}

.fl-icon-caret-right:before {
    content: "\e791"
}

.fl-icon-caret-left:before {
    content: "\e792"
}

.fl-icon-d-caret:before {
    content: "\e79a"
}

.fl-icon-share:before {
    content: "\e793"
}

.fl-icon-menu:before {
    content: "\e798"
}

.fl-icon-s-grid:before {
    content: "\e7a6"
}

.fl-icon-s-check:before {
    content: "\e7a7"
}

.fl-icon-s-data:before {
    content: "\e7a8"
}

.fl-icon-s-opportunity:before {
    content: "\e7aa"
}

.fl-icon-s-custom:before {
    content: "\e7ab"
}

.fl-icon-s-claim:before {
    content: "\e7ad"
}

.fl-icon-s-finance:before {
    content: "\e7ae"
}

.fl-icon-s-comment:before {
    content: "\e7af"
}

.fl-icon-s-flag:before {
    content: "\e7b0"
}

.fl-icon-s-marketing:before {
    content: "\e7b1"
}

.fl-icon-s-shop:before {
    content: "\e7b4"
}

.fl-icon-s-open:before {
    content: "\e7b5"
}

.fl-icon-s-management:before {
    content: "\e7b6"
}

.fl-icon-s-ticket:before {
    content: "\e7b7"
}

.fl-icon-s-rflease:before {
    content: "\e7b8"
}

.fl-icon-s-home:before {
    content: "\e7b9"
}

.fl-icon-s-promotion:before {
    content: "\e7ba"
}

.fl-icon-s-operation:before {
    content: "\e7bb"
}

.fl-icon-s-unfold:before {
    content: "\e7bc"
}

.fl-icon-s-fold:before {
    content: "\e7a9"
}

.fl-icon-s-platform:before {
    content: "\e7bd"
}

.fl-icon-s-order:before {
    content: "\e7be"
}

.fl-icon-s-cooperation:before {
    content: "\e7bf"
}

.fl-icon-bfll:before {
    content: "\e725"
}

.fl-icon-message-solid:before {
    content: "\e799"
}

.fl-icon-video-camera:before {
    content: "\e772"
}

.fl-icon-video-camera-solid:before {
    content: "\e796"
}

.fl-icon-camera:before {
    content: "\e779"
}

.fl-icon-camera-solid:before {
    content: "\e79b"
}

.fl-icon-download:before {
    content: "\e77c"
}

.fl-icon-upload2:before {
    content: "\e77b"
}

.fl-icon-upload:before {
    content: "\e7c3"
}

.fl-icon-picture-outline-round:before {
    content: "\e75f"
}

.fl-icon-picture-outline:before {
    content: "\e75e"
}

.fl-icon-picture:before {
    content: "\e79f"
}

.fl-icon-close:before {
    content: "\e6db"
}

.fl-icon-check:before {
    content: "\e6da"
}

.fl-icon-plus:before {
    content: "\e6d9"
}

.fl-icon-minus:before {
    content: "\e6d8"
}

.fl-icon-hflp:before {
    content: "\e73d"
}

.fl-icon-s-hflp:before {
    content: "\e7b3"
}

.fl-icon-circle-close:before {
    content: "\e78d"
}

.fl-icon-circle-check:before {
    content: "\e720"
}

.fl-icon-circle-plus-outline:before {
    content: "\e723"
}

.fl-icon-remove-outline:before {
    content: "\e722"
}

.fl-icon-zoom-out:before {
    content: "\e776"
}

.fl-icon-zoom-in:before {
    content: "\e777"
}

.fl-icon-error:before {
    content: "\e79d"
}

.fl-icon-success:before {
    content: "\e79c"
}

.fl-icon-circle-plus:before {
    content: "\e7a0"
}

.fl-icon-remove:before {
    content: "\e7a2"
}

.fl-icon-info:before {
    content: "\e7a1"
}

.fl-icon-question:before {
    content: "\e7a4"
}

.fl-icon-warning-outline:before {
    content: "\e6c9"
}

.fl-icon-warning:before {
    content: "\e7a3"
}

.fl-icon-goods:before {
    content: "\e7c2"
}

.fl-icon-s-goods:before {
    content: "\e7b2"
}

.fl-icon-star-off:before {
    content: "\e717"
}

.fl-icon-star-on:before {
    content: "\e797"
}

.fl-icon-more-outline:before {
    content: "\e6cc"
}

.fl-icon-more:before {
    content: "\e794"
}

.fl-icon-phone-outline:before {
    content: "\e6cb"
}

.fl-icon-phone:before {
    content: "\e795"
}

.fl-icon-user:before {
    content: "\e6e3"
}

.fl-icon-user-solid:before {
    content: "\e7a5"
}

.fl-icon-setting:before {
    content: "\e6ca"
}

.fl-icon-s-tools:before {
    content: "\e7ac"
}

.fl-icon-delete:before {
    content: "\e6d7"
}

.fl-icon-delete-solid:before {
    content: "\e7c9"
}

.fl-icon-eleme:before {
    content: "\e7c7"
}

.fl-icon-platform-eleme:before {
    content: "\e7ca"
}

.fl-icon-loading {
    -webkit-animation: rotating 2s linear infinite;
    animation: rotating 2s linear infinite
}

.fl-icon--right {
    margin-left: 5px
}

.fl-icon--left {
    margin-right: 5px
}

@-webkit-keyframes rotating {
    0% {
        -webkit-transform: rotateZ(0);
        transform: rotateZ(0)
    }

    100% {
        -webkit-transform: rotateZ(360deg);
        transform: rotateZ(360deg)
    }
}

@keyframes rotating {
    0% {
        -webkit-transform: rotateZ(0);
        transform: rotateZ(0)
    }

    100% {
        -webkit-transform: rotateZ(360deg);
        transform: rotateZ(360deg)
    }
}
</style>