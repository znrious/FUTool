import { ref, reactive } from 'vue'
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