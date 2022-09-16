import { ref, reactive } from 'vue'
import { sendMessage } from './chrome'
interface altConfig {
  altKeys: string[]
  altValues: string[]
}
export default function useKeymap() {
  const altStatus = ref(false)
  const altShow = ref(false)
  const bindStatus = ref(0)
  const altConfig:altConfig = reactive({
    altKeys: [],
    altValues: []
  })
  function addKey() {
    altConfig.altKeys.push('')
    altConfig.altValues.push('')
  }
  function deleteKey(index:number) {
    altConfig.altKeys.splice(index, 1)
    altConfig.altValues.splice(index, 1)
  }
  function changeAltStatus() {
    if(altStatus.value) {
      if(altConfig.altKeys.length) {
        let data:any = {}
        altConfig.altKeys.forEach((val, index) => {
          data[val] = altConfig.altValues[index]
        })
        sendMessage({
          keyMap: data,
          altOpen: 2
        })
      }
    }else {
      sendMessage({
        altOpen: 1
      })
    }
    altStatus.value = !altStatus.value
  }
  function showAlt() {
    altShow.value = !altShow.value
  }
  function changeBindStatus(status:number) {
    if(bindStatus.value === status) {
      bindStatus.value = 0
    }else {
      bindStatus.value = status
    }
  }
  return {
    altStatus,
    altShow,
    bindStatus,
    altConfig,
    addKey,
    deleteKey,
    changeAltStatus,
    showAlt,
    changeBindStatus
  }
}