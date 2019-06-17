# Web Extension Shim

This repository contains a JavaScript shim (polyfill) for some [Chrome Extension API](https://developer.chrome.com/extensions) calls.

## Background

Online and mobile news consumption leaves digital traces that are used to personalize news supply, possibly creating filter bubbles where people are exposed to a low diversity of issues and perspectives that match their preferences. The [JEDS Filter Bubble](http://ccs.amsterdam/projects/jeds/) project aims to understand the filter bubble effect by performing deep semantic analyses on mobile news consumption traces. This project is a collaboration between the [VU](https://www.vu.nl/nl/index.aspx), the [UvA](http://www.uva.nl/) and [NLeSC](https://www.esciencecenter.nl/), lead by [Wouter van Atteveldt](http://vanatteveldt.com/).

Part of this project makes use of the [Web Historian](http://www.webhistorian.org/) browser extension, developed by [Ericka Menchen-Trevino](http://www.ericka.cc/). To use this extension, or any other extension which follows the [WebExtensions API](https://developer.chrome.com/extensions), as a standalone website, all `chrome.*` API calls must be intercepted and re-implemented. In general, this will not be possible for all API calls. The shim in this project implement a few of them.

## Installation

### Prerequisites

- Download the source code of the extension.
- Download `WebExtensionShim.js` into the same directory.

### Setup the shim

- Add the shim to the main page of the extension by adding `<script type="application/javascript" src="WebExtensionShim.js"></script>` to the HEAD of the HTML page.

### Setup JSON files

- If the extension uses the `chrome.runtime.getManifest()` function, the shim requires a JSON variable named `manifestJson` which contains the manifest data. Add this JSON variable to the file `Manifest.js` and add `<script type="application/javascript" src="Manifest.js"></script>` to the HEAD of the extension's main page.
- If the extension uses the `chrome.i18n.getMessage()` function, the shim requires a JSON variable named `messagesJson` which contains the messages data. Add this JSON variable to the file `Messages.js` and add `<script type="application/javascript" src="Messages.js"></script>` to the HEAD of the extension's main page.
- If the extension uses any of the `chrome.history.*` functions, the shim requires two JSON variables named `historyItemsJson` and `visitItemsJson` which contain the browser history data. Add these JSON variables to the file `HistoryItems.js` and `VisitItems.js` and add `<script type="application/javascript" src="HistoryItems.js"></script>` and `<script type="application/javascript" src="VisitItems.js"></script>` to the HEAD of the extension's main page.

## Repository content

### WebExtensionShim.js

The Javascript file `WebExtensionShim.js` contains the shim.
