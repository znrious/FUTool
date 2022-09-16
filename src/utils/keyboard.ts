function genKeyBoardEvent(type:string, key:string) {
  return new KeyboardEvent(type, { key })
}

export const pressKey = function(ele:HTMLElement, key:string) {
  ele.focus()
  ele.dispatchEvent(genKeyBoardEvent('keydown', key))
  ele.dispatchEvent(genKeyBoardEvent('keypress', key))
  ele.dispatchEvent(genKeyBoardEvent('keyup', key))
}