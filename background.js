'use strict';

// Set up context menu tree at install time.

chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    title: "Copy Link to Here",
    id: 'test',
    contexts: ['selection']
  });
});


// Menu click handler

chrome.contextMenus.onClicked.addListener(function(info, tab){

  // Copy the selection to the clipboard as a link.
  // We use a text input and execCommand because this is the
  // only solution that works on http websites.

  chrome.tabs.executeScript(tab.id, {
    code: `
      var copyFrom = document.createElement("input");
      copyFrom.value = window.location.href.replace(/#.*/, '') + '#:~:text=' +
        encodeURIComponent(String(getSelection()).trim());
      document.body.appendChild(copyFrom);
      copyFrom.select();
      document.execCommand('copy');
      document.body.removeChild(copyFrom);
    `
  });

});
