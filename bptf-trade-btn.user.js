// ==UserScript==
// @name         Backpack.tf - Trade Button
// @author       Bon
// @namespace    https://github.com/Bonfire
// @version      1.0.0
// @description  This user script adds a "trade" button on listing item hover. This script was specially made for Aethez
// @include      /^https?:\/\/backpack\.tf\/.*
// @grant        GM_setClipboard
// @require      https://code.jquery.com/jquery-3.5.1.slim.min.js
// @run-at       document-end
// ==/UserScript==

(function () {
  "use strict";

  // Modify popover
  $(document).on("mouseover", ".item", function () {
    let hoveredItem = this;
    let itemElement = $(hoveredItem)[0];

    let popoverLoad = setInterval(function () {
      // Add the "bot utility elements row"
      if ($(hoveredItem).next().hasClass("popover")) {
        if (!$("#bot-utility-elements").length) {
          let botUtilityElements = document.createElement("dd");
          botUtilityElements.className = "popover-btns";
          botUtilityElements.id = "bot-utility-elements";
          $("#popover-search-links")[0].before(botUtilityElements);
        }

        let addUtilitiesLoad = setInterval(function () {
          // Add the "Trade" button
          if (!$("#trade-button").length) {
            let tradeButton = document.createElement("a");
            tradeButton.id = "trade-button";
            tradeButton.className = "btn btn-default btn-xs";
            tradeButton.textContent = " Trade";

            let tradeIcon = document.createElement("i");
            tradeIcon.className = "fa fa-exchange";

            let listingIntent = $(itemElement)?.data("listing_intent");
            let listingItem = $(".popover-title")?.text();
            let listingOwner = $(".item-popover-listing > dd > a")
              ?.attr("href")
              ?.replace("/u/", "");
            let tradeCommand = `!trade ${listingIntent} ${listingOwner} ${listingItem}`;

            $(tradeButton).data("tradeCommand", tradeCommand);
            $(tradeIcon).data("tradeCommand", tradeCommand);
            tradeButton.prepend(tradeIcon);
            $("#bot-utility-elements").append(tradeButton);
          }

          $("#trade-button").on("click", (event) => {
            GM_setClipboard($(event.target).data("tradeCommand"), "text/plain");
          });

          clearInterval(addUtilitiesLoad);
        }, 50);

        setTimeout(function () {
          clearInterval(addUtilitiesLoad);
        }, 1000);

        clearInterval(popoverLoad);
      }
    }, 50);

    setTimeout(function () {
      clearInterval(popoverLoad);
    }, 750);
  });
})();
