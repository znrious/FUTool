let mainwindow = document.getElementById("mainwindow");
let secondwindow = document.getElementById("secondwindow")
let mainid,secondid
mainwindow.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  if(mainid === tab.id) {
    return false
  }
  mainid = tab.id
  chrome.storage.sync.set({mainid: tab.id})
  chrome.scripting.executeScript(
    {
      target: {tabId: tab.id},
      func: mainWindowScript,
    })
})

function mainWindowScript() {
  document.addEventListener('keyup', function(event){
    let mainKey = event.key
    if(event.altKey) {
      mainKey = 'alt+' + mainKey
    }
    if(event.ctrlKey) {
      mainKey = 'ctrl+' + mainKey
    }
    if(!['Alt', 'Control', 'alt', 'control'].includes(mainKey)) {
      chrome.runtime.sendMessage({message: mainKey});
    }
  })
}


secondwindow.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if(secondid === tab.id) {
    return false
  }
  secondid = tab.id
  chrome.storage.sync.set({secondid: tab.id});
  chrome.scripting.executeScript(
    {
      target: {tabId: tab.id},
      func: secondWindowScript,
    })
})

function secondWindowScript() {
  let fucanvas = document.querySelector('canvas')
  chrome.runtime.onMessage.addListener(
    function(request) {
      if(Array.isArray(request.message.key)) {
        pressKeys(request.message.key)
      }else {
        fucanvas.dispatchEvent(genKeyBoardEvent('keydown', request.message.key))
        setTimeout(() => {
          fucanvas.dispatchEvent(genKeyBoardEvent('keyup', request.message.key))
        }, 50)
      }
      function genKeyBoardEvent(type, data) {
        return new KeyboardEvent(type, { key: data })
      }
      function pressKeys(keys) {
        let index = 0
        let pressTask = setInterval(() => {
          if(keys[index]) {
            fucanvas.dispatchEvent(genKeyBoardEvent('keydown', keys[index]))
            setTimeout(() => {
              fucanvas.dispatchEvent(genKeyBoardEvent('keyup', keys[index]))
            }, 50)
            index ++
          }else {
            clearInterval(pressTask)
          }
        }, 2000)
      }
    }
  );
}

