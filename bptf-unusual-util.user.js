// ==UserScript==
// @name         Backpack.tf - Unusual Utilities
// @author       Bon
// @namespace    https://github.com/Bonfire
// @version      1.0.0
// @description  A script to provide various unusual trading utilities on backpack.tf
// @include      /^https?:\/\/backpack\.tf\/unusual\/*
// @require      https://code.jquery.com/jquery-3.5.1.slim.min.js
// @run-at       document-end
// ==/UserScript==

if (document.readyState === "complete") {
  onLoad();
} else {
  window.addEventListener("load", onLoad);
}

function onLoad() {
  var badEffects = [
    "Mega Strike",
    "Silver Cyclone",
    "Showstopper",
    "Midnight Whirlwind",
    "Skill Gotten Gains",
    "Toxic Terrors",
    "Arachnid Assault",
    "Creepy Crawlies",
    "Delightful Star",
    "Frosted Star",
    "Apotheosis",
    "Ascension",
    "Reindoonicorn Rancher",
    "Twinkling Lights",
    "Shimmering Lights",
  ];

  var itemContainers = $(".item-list, .unusual-pricelist");

  for (var itemContainer of itemContainers) {
    Array.from(itemContainer.children).forEach((itemElement) => {
      var item = $(itemElement);

      var itemEffect = item.data("effect_name");

      if (badEffects.includes(itemEffect)) {
        itemElement.style.backgroundColor = "red";
      }
    });
  }
}
