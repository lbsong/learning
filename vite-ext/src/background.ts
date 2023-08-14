console.log("Hello from the background!");

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

