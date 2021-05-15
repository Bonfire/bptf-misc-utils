# backpack.tf - Misc Utils

This user script provides miscellaneous [backpack.tf](https://backpack.tf/) utilities.

If you have any suggestions or bug reports, please create an [Issue](https://github.com/Bonfire/bptf-misc-utils/issues).

If this script helped you out, please feel free to support me by doing the any of the following: 
* Become a [⭐Stargazer⭐](https://github.com/Bonfire/bptf-misc-utils/stargazers)

* <a href="https://www.buymeacoffee.com/bonf" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

## Features

- Provide a killstreak summary for listed items with killstreakers, showing the sheen and/or streaker
- Provide a button with the marketplace.tf link on _all_ item stats pages

## Installation

To use user scripts you need to first install a user script manager. Here are managers for various browsers:

- [Greasemonkey](http://www.greasespot.net/) - Firefox
- [Tampermonkey](https://tampermonkey.net/) - Chrome, Microsoft Edge, Safari, Opera, Firefox (also with support for mobile Dolphin Browser and UC Browser)
- [Violentmonkey](https://violentmonkey.github.io/) - Chrome, Firefox, Maxthon, Opera

To install this user script, simply navigate to [this link](https://github.com/Bonfire/bptf-misc-utils/raw/master/bptf-misc-utils.user.js) and click "Install".

You can also install this script by manually pasting the code found in the above link into a new user script.

**Note: To receive automatic updates when this script updates, please be sure to enable automatic update checking for this script on your preferred User Script Manager.**

## Examples

![Killstreak summary](https://i.imgur.com/lnty6VI.png)

_Killstreak summary showing the sheen and/or killstreaker for listed items_

![Marketplace.tf link](https://i.imgur.com/UoZB5rx.png)

_Links to the marketplace.tf page for all items_

## Changelog

**1.0.5**

Added:

- SKU generation for Unusualifiers - [@Preport](https://github.com/Preport)
- SKU generation for War Paints - [@Preport](https://github.com/Preport)
- Add SKU generation support for Strangifiers - [@Preport](https://github.com/Preport)
- Add SKU generation support for Kit Fabricators - [@Preport](https://github.com/Preport)

**1.0.4**

Fixed:

- Stock item mapping for the "Construction PDA" and "Sapper"

**1.0.3**

Improved:

- Killstreak summary for non-killstreak items

**1.0.2**

Improved:

- Killstreak summary formatting for buy orders with a killstreaker but no sheen

**1.0.1**

Removed:

- Unwanted unusual item effect marking (niche use case)

**1.0.0**

Added:

- Unwanted unusual item effect marking
- Marketplace.tf link to all items on their stats page
- Killstreak summary for killstreak items (showing sheen and/or streaker)

## Credits

- Thank you to [@NetroScript](https://github.com/NetroScript) for their [similar project](https://github.com/NetroScript/backpack.tf-miscellaneous-extensions/) of which I used as a great reference for interacting with the backpack.tf UI.
