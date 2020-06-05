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

  // Copy the selection to the clipboard as a link

  chrome.tabs.executeScript(tab.id, {
    code: `
      var toCopy = window.location.href.replace(/#.*/, '') + '#:~:text=' +
        encodeURIComponent(String(getSelection()).trim());
      navigator.clipboard.writeText(toCopy);
    `
  });

});
