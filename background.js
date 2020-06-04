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
      var copyFrom = document.createElement("input");
      copyFrom.value = window.location.href.replace(/#.*/, '') + '#:~:text=' + encodeURIComponent(getSelection());
      document.body.appendChild(copyFrom);
      copyFrom.select();
      document.execCommand('copy');
      document.body.removeChild(copyFrom);
    `
  });

});
