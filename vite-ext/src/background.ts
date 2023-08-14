
console.log("Hello from the background!");

// A generic onclick callback function.
chrome.contextMenus.onClicked.addListener((info: chrome.contextMenus.OnClickData) => {
    if (info.menuItemId === "selection") {
        genericOnClick(info, null);
    }
});

// A generic onclick callback function.
async function genericOnClick(info: any, tab: any) {
    let word = info.selectionText;

    let setResult = await chrome.storage.sync.get([word]);
    let frequency = 1;
    if (Object.keys(setResult).length != 0) {
        frequency = setResult[word].frequency + 1;
    }

    console.log(frequency);
    var vocab = { "frequency": frequency }
    await chrome.storage.sync.set({[word]: vocab});
    let getResult = await chrome.storage.sync.get([word]);
    console.log(getResult);

    chrome.runtime.sendMessage({
        name: 'define-word',
        data: { value: word }
      });
}

chrome.runtime.onInstalled.addListener((details) => {
  console.log("Extension installed:", details);

  let title = "Add to my vocabulary";
  chrome.contextMenus.create({
    title: title,
    contexts: ["selection"],
    id: "selection"
  });
});

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

export {};