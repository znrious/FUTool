// keymap config example
// note: array key only support number 0-9
// note: value not support combination key;
const config =  {
  keyMap: {
      'r': {
          key: '1'
      },
      'alt+1': {
          key: ['5','6','7','8'],
      },
      'c': {
        key: 'c'
      }
  }
}

chrome.runtime.onMessage.addListener(
  async function(request, sender) {
    let {mainid} = await chrome.storage.sync.get(['mainid']);
    if(sender.tab && sender.tab.id === mainid) {
      let {secondid} = await chrome.storage.sync.get(['secondid']);
      if(secondid) {
        if(config.keyMap[request.message]) {
          chrome.tabs.sendMessage(secondid, {message: config.keyMap[request.message]})
        }
      }
    }
  }
);