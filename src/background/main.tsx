import { sendMessage, onMessage } from "webext-bridge";

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import("/@vite/client");
  // load latest content script
  import("./contentScriptHMR");
}

chrome.runtime.onInstalled.addListener((): void => {
  // eslint-disable-next-line no-console
  console.log("Extension installed");
});

let previousTabId = 0;

// communication example: send previous tab title from background page
// see shim.d.ts for type declaration
chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  if (!previousTabId) {
    previousTabId = tabId;
    return;
  }

  let tab: chrome.tabs.Tab | undefined;

  try {
    tab = await chrome.tabs.get(previousTabId);
    previousTabId = tabId;
  } catch {
    return;
  }

  // eslint-disable-next-line no-console
  console.log("previous tab", tab);
  sendMessage("tab-prev", { title: tab.title }, { context: "content-script", tabId });
});

onMessage("get-current-tab", async () => {
  try {
    const tab = await chrome.tabs.get(previousTabId);
    return {
      title: tab?.title
    };
  } catch {
    return {
      title: undefined
    };
  }
});
