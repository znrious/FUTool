import { sendMessage } from './chrome'
import { pressKey } from './keyboard'

interface FUEvent {
  key?: string,
  altKey?: boolean
  ctrlKey?: boolean
  unbind?: boolean
}

export const mainFunc = function() {
  const func = function(event:FUEvent){
    if(event.unbind) {
      document.removeEventListener('keydown', func)
    }else if(event.key){
      let mainKey = event.key
      if(event.altKey) {
        mainKey = 'alt+' + mainKey
      }
      if(event.ctrlKey) {
        mainKey = 'ctrl+' + mainKey
      }
      if(!['Alt', 'Control', 'alt', 'control'].includes(mainKey)) {
        sendMessage({
          key: mainKey
        })
      }
    }
  }
  document.addEventListener('keydown', func)
}

export const secondFunc = function() {
  let fucanvas = document.querySelector('canvas') as HTMLElement
  chrome.runtime.onMessage.addListener(
    function(request) {
      if(Array.isArray(request.message.key)) {
        pressKeys(request.message.key)
      }else {
        pressKey(fucanvas, request.message.key)
      }
      function pressKeys(keys:string[]) {
        let index = 0
        let pressTask = setInterval(() => {
          if(keys[index]) {
            pressKey(fucanvas, keys[index])
            index ++
          }else {
            clearInterval(pressTask)
          }
        }, 2000)
      }
    }
  )
}