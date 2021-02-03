// ==UserScript==
// @name         Backpack.tf - Misc Utils
// @author       Bon
// @namespace    https://github.com/Bonfire
// @version      1.0.3
// @description  A script to provide various backpack.tf miscellaneous utilities
// @include      /^https?:\/\/backpack\.tf\/.*
// @downloadURL  https://github.com/Bonfire/bptf-misc-utils/raw/master/bptf-misc-utils.user.js
// @updateURL    https://github.com/Bonfire/bptf-misc-utils/raw/master/bptf-misc-utils.meta.js
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
    const pageURL = window.location.pathname;

    // Lazy switch statement (I know...)
    if (pageURL) {
      switch (true) {
        case pageURL.includes("/stats/"):
          addMarketplaceButton();
          summarizeKS();
          break;
        case pageURL.includes("/classifieds"):
          summarizeKS();
      }
    }
  }

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

  const sheenColors = {
    "Team Shine": "#FF1D15",
    "Hot Rod": "#FF79FF",
    Manndarin: "#FF6F01",
    "Deadly Daffodil": "#B89A2C",
    "Agonizing Emerald": "#49B657",
    "Mean Green": "#85B027",
    "Villainous Violet": "#690CFF",
  };

  // Fetch an item's SKU given the item's attributes
  function itemLookup(itemElement) {
    let item = $(itemElement);

    let tempDefIndex = item.attr("data-defindex");
    let itemDefIndex = stockMap.has(tempDefIndex)
      ? stockMap.get(tempDefIndex)
      : tempDefIndex;

    let itemQuality = item.attr("data-quality");
    let isUncraftable = item.attr("data-craftable") !== "1";
    let itemEffectID = item.attr("data-effect_id");

    let itemSkinInfo = item.find(".item-icon");
    let itemWear, itemSkin;
    if (itemSkinInfo.length > 0) {
      itemSkinInfo = itemSkinInfo
        .css("background-image")
        .match(/warpaint\/[(?!_)\S]+_[0-9]+_[0-9]+_[0-9]+\.png/g);
      if (itemSkinInfo !== null) {
        itemSkin = itemSkinInfo[0].split("_")[1];
        itemWear = itemSkinInfo[0].split("_")[2];
      }
    }

    let isStrange = item.attr("data-quality_elevated") === "11";
    let itemKillstreak = item.attr("data-ks_tier");
    let isFestivized =
      item.attr("title")?.toLowerCase().indexOf("festivized") !== -1;
    let isAustralium = item.attr("data-australium") === "1";

    // Other item attributes
    let crateSeries = item.attr("data-crate");
    let itemTarget = item.attr("data-priceindex")?.split("-")[1];

    // Get the full item SKU, and be sure to remove any pesky whitespaces
    let itemSKU = `${itemDefIndex};\
    ${itemQuality}\
    ${itemEffectID ? `;u${itemEffectID}` : ""}\
    ${isAustralium ? ";australium" : ""}\
    ${isUncraftable ? ";uncraftable" : ""}\
    ${itemSkinInfo ? `;w${itemWear};pk${itemSkin}` : ""}\
    ${isStrange ? ";strange" : ""}\
    ${itemKillstreak ? `;kt-${itemKillstreak}` : ""}\
    ${itemTarget ? `;td-${itemTarget}` : ""}\
    ${isFestivized ? ";festive" : ""}\
    ${crateSeries ? `;c${crateSeries}` : ""}`;

    return itemSKU.replace(/\s/g, "");
  }

  // Adds a link to the marketplace.tf page for an item if it does not already have one
  function addMarketplaceButton() {
    var itemElement = $(".item")[0];

    var mptfElement = $('a[href*="marketplace.tf"]')[0];

    if ($(mptfElement).attr("class") !== "price-box") {
      $(".price-boxes").append(
        `<a class="price-box" href="https://marketplace.tf/items/tf2/${itemLookup(
          itemElement
        )}" target="_blank" data-tip="top" data-original-title="mptf">
                <img src="/images/marketplace-medium.png?v=2" alt="marketplace">
                <div class="text" style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin-top: 0;">
                    <div class="value" style="font-size: 14px;">MP.TF</div>
                </div>
            </a>`
      );
    }
  }

  // Provides a summary showing sheen and/or killstreaker for killstreak items
  function summarizeKS() {
    var listedItems = $(".listing");

    for (var listedItem of listedItems) {
      var itemTitle = $(listedItem).find("h5");

      // Add the component containing killstreaker/sheen information
      var listingItem = $(listedItem).find(".item");

      var itemSheen = $(listingItem).data("sheen");
      var itemStreaker = $(listingItem).data("killstreaker");

      // Not very proud of any code below this
      if (itemSheen || itemStreaker) {
        itemTitle.append(document.createElement("br"));
      }

      // Account for the three cases a buy listing can be in
      if (itemSheen && !itemStreaker) {
        // 1. Sheen but no streaker
        var sheenElement = document.createElement("small");
        sheenElement.className = "text-muted";
        sheenElement.innerHTML = `${itemSheen}`;
        sheenElement.style.color = sheenColors[itemSheen];
        itemTitle.append(sheenElement);
      } else if (!itemSheen && itemStreaker) {
        // 2. Streaker but no sheen
        var streakerElement = document.createElement("small");
        streakerElement.className = "text-muted";
        streakerElement.innerHTML = `${itemStreaker}`;
        itemTitle.append(streakerElement);
      } else if (itemSheen && itemStreaker) {
        // 3. Both sheen and streaker
        var sheenElement = document.createElement("small");
        sheenElement.className = "text-muted";
        sheenElement.innerHTML = `${itemSheen}`;
        sheenElement.style.color = sheenColors[itemSheen];
        itemTitle.append(sheenElement);

        var streakerElement = document.createElement("small");
        streakerElement.className = "text-muted";
        streakerElement.innerHTML = ` / ${itemStreaker}`;
        itemTitle.append(streakerElement);
      }
    }
  }
})();
