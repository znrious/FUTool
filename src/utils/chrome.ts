export const getTabId = async function () {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  return tab.id
}

export const getStorage = function (keys:string[]) {
  return chrome.storage.local.get(keys)
}

export const setStorage = function (data:object) {
  chrome.storage.local.set(data)
}

export const addMessageListener = function(func:() => void) {
  chrome.runtime.onMessage.addListener(func)
}

export const sendMessage = function(data:object) {
  chrome.runtime.sendMessage(data)
}

export const executeScript = function(id:number, func:()=>any) {
  chrome.scripting.executeScript(
    {
      target: {tabId: id},
      func
    }
  )
}