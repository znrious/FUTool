<script setup lang="ts">
  import useKeymap from './utils/keymap'
  import useAutoKey from './utils/autokey'
  import { onBeforeMount } from 'vue'
  import { getStorage, getTabId } from './utils/chrome'
  const {
    altStatus,
    altShow,
    bindStatus,
    altConfig,
    addKey,
    deleteKey,
    changeAltStatus,
    showAlt,
    changeBindStatus
  } = useKeymap()
  onBeforeMount(async function(){
    let data = await getStorage(['mainid', 'secondid', 'fuconfig'])
    let id = await getTabId()
    if(data.mainid === id) {
      bindStatus.value = 1
    }else if(data.secondid === id) {
      bindStatus.value = 2
    }
    if(data.fuconfig && data.fuconfig.keyMap) {
      let keys = []
      let values = []
      for(let key in data.fuconfig.keyMap) {
        keys.push(key)
        if(Array.isArray(data.fuconfig.keyMap[key])) {
          values.push(data.fuconfig.keyMap[key].join(','))
        }else {
          values.push(data.fuconfig.keyMap[key])
        }
      }
      altConfig.altKeys = keys
      altConfig.altValues = values
    }
  })
</script>

<template>
  <div class="futool-wrapper">
    <div class="futool-wrapper-header">
      <button @click="changeBindStatus(1)" v-if="[0, 1].includes(bindStatus)">{{bindStatus === 1 ?  '解绑主控端' : '绑定主控端'}}</button>
      <button @click="changeBindStatus(2)" v-if="[0, 2].includes(bindStatus)">{{bindStatus === 2 ?  '解绑辅助端' : '绑定辅助端'}}</button>
    </div>
    <div class="fu-table">
      <div class="fu-table-header">
        <div>按键控制</div>
        <div>
          <button @click="showAlt">{{altShow ? '收起' : '展开'}}</button>
          <button @click="addKey">添加控制组</button>
          <button @click="changeAltStatus">{{altStatus ? '关闭' : '开启'}}</button>
        </div>
      </div>
      <div v-show="altShow">
        <div class="fu-table-row">
          <div class="fu-table-col">主控按键</div>
          <div class="fu-table-col">被控按键</div>
          <div class="fu-table-col"></div>
        </div>
        <div class="fu-table-row" v-for="(item, index) in altConfig.altKeys" :key="index">
          <div class="fu-table-col"><input type="text" v-model="altConfig.altKeys[index]"></div>
          <div class="fu-table-col"><input type="text" v-model="altConfig.altValues[index]"></div>
          <div class="fu-table-col"><button @click="deleteKey(index)">删除</button></div>
        </div>
      </div>
    </div>
    <!-- <div class="fu-table" style="margin-top: 30px;padding-top: 30px;border-top: 2px solid #fff">
      <div class="fu-table-header">
        <div>自动按键</div>
        <div>
          <button @click="showAlt">{{altShow ? '收起' : '展开'}}</button>
          <button @click="addKey">添加控制组</button>
          <button @click="changeAltStatus">{{altStatus ? '关闭' : '开启'}}</button>
        </div>
      </div>
      <div v-show="altShow">
        <div class="fu-table-row small">
          <div class="fu-table-col">触发键</div>
          <div class="fu-table-col">执行键</div>
          <div class="fu-table-col">间隔(ms)</div>
          <div class="fu-table-col"></div>
        </div>
        <div class="fu-table-row small" v-for="(item, index) in altKeys" :key="index">
          <div class="fu-table-col"><input type="text" v-model="altKeys[index]"></div>
          <div class="fu-table-col"><input type="text" v-model="altValues[index]"></div>
          <div class="fu-table-col"><input type="text" v-model="altValues[index]"></div>
          <div class="fu-table-col"><button @click="deleteKey(index)">删除</button></div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
  .futool {
    &-wrapper {
      box-sizing: border-box;
      width: 500px;
      padding: 20px;
      background-color: #4b87f7;
      color: #fff;
      font-size: 14px;
      &-header {
        margin-bottom: 20px;
        button {
          padding: 5px
        }
      }
      button {
        border-radius: 4px;
        background-color: #fdb930;
        border: 0;
        appearance: none;
        outline: none;
        font-size: 12px;
        color: #fff;
        font-weight: 700;
        &+button {
          margin-left: 5px
        }
      }
      .fu-table {
        &-header {
          display: flex;
          justify-content: space-between;
          div {
            color: #fff;
            font-size: 16px;
            font-weight: 700;
          }
        }
        &-row {
          display: flex;
          &.small {
            .fu-table-col {
              input {
                width: 80px;
                margin-right: 20px
              }
              &:nth-child(1) {
                text-align: left;
                flex: 0 0 108px;
              }
              &:nth-child(2) {
                text-align: left;
                flex: 0 0 108px;
              }
              &:nth-child(3) {
                text-align: left;
                flex: 0 0 108px;
              }
              &:nth-child(4) {
                flex: 1;
                text-align: right;
              }
            }
          }
        }
        &-col {
          flex: 0 0 auto;
          margin-top: 20px;
          &:nth-child(1) {
            flex: 0 0 200px;
          }
          &:nth-child(2) {
            flex: 0 0 200px;
          }
          &:nth-child(3) {
            flex: 1;
            text-align: right;
          }
          input {
            width: 150px
          } 
        }
      }
    }
  }
</style>
