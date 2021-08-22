<template>
  <div>
  <transition name="slide-picker">
    <div class="x-picker" v-show="modelValue">
      <div class="x-picker__header">
        <p
          class="x-picker__header-left"
          @touchstart="handleCancel"
        >取消</p>
        <p class="x-picker__header-center">请选择</p>
        <p
          class="x-picker__header-right"
          @touchstart="handleConfirm"
        >确定</p>
      </div>
      <div class="x-picker__content">
        <div class="x-picker__content-wrapper"></div>
        <ul
          class="x-picker__content-box"
          ref="box"
          :style="getOffsetY"
          @touchstart="handleStart"
          @touchend="handleEnd"
          @touchmove="handleMove"
        >
          <li
            class="x-picker__content-item"
            v-for="(item, idx) in list"
            :key="idx"
            :style="getStyle(Number(idx))"
          >{{ item }}</li>
        </ul>
      </div>
    </div>
  </transition>
</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, nextTick, toRefs, getCurrentInstance } from 'vue'
import useList from './list'
import useEvent from './event'

export default defineComponent({
  props: {
    list: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const { ctx }: any = getCurrentInstance()
    const $useList = useList(props)
    const $useEvent = useEvent({ emit, ctx })
    return {
      ...$useList,
      ...$useEvent
    }
  }
})
</script>

<style scoped>
.x-picker {
  width: 100%;
  position: fixed;
  left: 0; bottom: 0;
  background-color: #fff;
  border-radius: 10px 10px 0 0;
  z-index: 99;
}
.x-picker__header {
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  border-bottom: 1px solid #ddd;
}
.x-picker__header > p {
  margin: 0;
}
.x-picker__header-left {
  color: #ccc;
}
.x-picker__header-center {
  color: gray;
}
.x-picker__header-right {
  color: #007fff;
}
.x-picker__content {
  height: 230px;
  padding: 15px 0;
  display: flex;
  position: relative;
  overflow: hidden;
}
.x-picker__content-box {
  flex: 1;
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transition: all .2s;
  font-size: 20px;
  transition-timing-function: cubic-bezier(0.23, 1, 0.68, 1);
  transform: translate(-50%, -20px);
}
.x-picker__content-wrapper {
  position: absolute;
  top: 50%;
  transform: translateY(-18px);
  width: 100%;
  height: 36px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 0 5px #ddd;
}
.x-picker__content-item {
  height: 36px;
  line-height: 36px;
  transition: color .5s;
}

.slide-picker-enter-active, .slide-picker-leave-active {
  transition: all .5s;
}
.slide-picker-enter-from, .slide-picker-leave-to {
  transform: translateY(100%);
}
</style>