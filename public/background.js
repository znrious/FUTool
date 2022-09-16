// keymap config example
// note: array key only support number 0-9
// note: value not support combination key;
let mainid, secondid, altOpen
let config = chrome.storage.local.get('fuconfig') || {}

chrome.runtime.onMessage.addListener(
  async function(request, sender) {
    let {mainid} = await chrome.storage.sync.get(['mainid']);
    let id = sender.tab.id
    if(request.keyMap) {
      config.keyMap = request.keyMap
      storeConfig()
    }
    if(request.autoKey) {
      config.autoKey = request.autoKey
      storeConfig()
    }
    if(request.mainid) {
      mainid = id
    }
    if(request.secondid) {
      secondid = id
    }
    if(request.unbind){
      chrome.tabs.sendMessage(id, {unbind: true})
    }
    if(request.altOpen) {
      altOpen = request.altOpen
    }
    if(request.message && altOpen === 2) {
      if(sender.tab.id === mainid) {
        if(secondid) {
          if(config.keyMap[request.message]) {
            chrome.tabs.sendMessage(secondid, {message: config.keyMap[request.message]})
          }
        }
      }
    }
  }
)

function storeConfig() {
  chrome.storage.local.set('fuconfig', config)
}