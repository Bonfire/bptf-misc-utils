// ==UserScript==
// @name         Backpack.tf - Misc Utils
// @author       Bon
// @namespace    https://github.com/Bonfire
// @version      1.0.0
// @description  A script to provide various backpack.tf miscellaneous utilities
// @include      /^https?:\/\/backpack\.tf\/.*
// @require      https://code.jquery.com/jquery-3.5.1.slim.min.js
// @run-at       document-end
// ==/UserScript==

(function () {
  "use strict";

  // Always make sure that the page is fully loaded
  if (document.readyState === "complete") {
    onLoad();
  } else {
    window.addEventListener("load", onLoad);
  }

  // Handle our control flow for different pages here
  function onLoad() {
    const pageTitle = document.querySelector("title").textContent;
    const pageURL = window.location.pathname;

    if (pageURL && pageURL.includes("/unusual/")) {
      markUnusuals();
    }
  }

  var unwantedEffects = [
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

  // Stock item def index mappings
  const stockMap = new Map();
  stockMap
    .set("0", "190") // Bat
    .set("1", "191") // Bottle
    .set("2", "192") // Fireaxe
    .set("3", "193") // Club
    .set("4", "194") // Knife
    .set("5", "195") // Fists
    .set("6", "196") // Shovel
    .set("7", "197") // Wrench
    .set("8", "198") // Bonesaw
    .set("9", "199") // Shotgun - Engineer (Primary)
    .set("10", "199") // Shotgun - Soldier
    .set("11", "199") // Shotgun - Heavy
    .set("12", "199") // Shotgun - Pyro
    .set("13", "200") // Scattergun
    .set("14", "201") // Sniper Rifle
    .set("15", "202") // Minigun
    .set("16", "203") // SMG
    .set("17", "204") // Syringe Gun
    .set("18", "205") // Rocket Launcher
    .set("19", "206") // Grenade Launcher
    .set("20", "207") // Stickybomb Launcher
    .set("21", "208") // Flamethrower
    .set("22", "209") // Pistol - Engineer
    .set("23", "209") // Pistol - Scout
    .set("24", "210") // Revolver
    .set("29", "211") // Medigun
    .set("30", "212"); // Invis Watch

  // Marks unwanted unusual effects in red when viewing the generic unusual items page
  function markUnusuals() {
    var itemContainers = $(".item-list, .unusual-pricelist");

    for (var itemContainer of itemContainers) {
      Array.from(itemContainer.children).forEach((itemElement) => {
        var item = $(itemElement);

        var itemEffect = item.data("effect_name");

        if (unwantedEffects.includes(itemEffect)) {
          itemElement.style.backgroundColor = "red";
        }
      });
    }
  }
})();
