import { ref, computed, Ref } from 'vue'

interface IList {
  box: Ref,
  list: Array<any>,
  getOffsetY: any,
  getStyle: any,
  handleMove: (e: TouchEvent) => void,
  handleStart: (e: TouchEvent) => void,
  handleEnd: (e: TouchEvent) => void,
  index: Ref<number>
}

const useList = (props: any): IList => { 
  const list = props.list
  const colors = ['gray', '#ccc', '#ddd', '#eee']
  const scales = [.96, .9, .88, .84]
  let startY: number, activeIndex = 0
  const box = ref()
  const offY = ref()
  const index = ref(0)

  const getStyle = (idx: number) => {
    let color = '#000', scale =  1, len = colors.length - 1
    if (idx > activeIndex) {
      const _idx = idx - activeIndex > len ? len : idx - activeIndex - 1
      color = colors[_idx]
      scale = scales[_idx]
    } else if (idx < activeIndex) {
      const _idx = activeIndex - idx > len ? len : activeIndex - idx - 1
      color = colors[_idx]
      scale = scales[_idx]
    }
    return { color, transform: `scale(${scale})` }
  }

  // 节流
  const throttle = function (callback: any, delay = 20) {
    let timer: number | null = null
    return function (args: any) {
      if (timer) {
        return 
      }
      timer = setTimeout(() => {
        callback(args)
        timer = null
      }, delay)
    }
  }

  // 移动的实现
  const move = throttle((e: any) => {
    offY.value = e.touches[0].clientY - startY
    if (offY.value > 36) {
      offY.value = 36
    } else if (offY.value < -box.value.offsetHeight - 36) {
      offY.value = -box.value.offsetHeight - 36
    }
    // 计算当前位置的就近下标
    index.value = Math.abs(Math.ceil(offY.value / 36))
    // 判断顶部和底部的一个界限，然后做一个位置的重置
    if (index.value <= 0 || offY.value > 0) {
      index.value = 0
    } else if (index.value > list.length - 1 || offY.value < -box.value.offsetHeight - 18) {
      index.value = list.length - 1
    }
    activeIndex = index.value
  })

  const handleStart = (e: TouchEvent) => {
    const transform = box.value.style.transform
    transform.match(/,(.*)px/)
    startY = e.touches[0].clientY - Number(RegExp.$1)
  }

  const handleMove = (e: TouchEvent) => move(e)

  const handleEnd = (e: TouchEvent) => {
    // 重置当前位置，加setTimeout避免出现Bug
    setTimeout(() => {
      offY.value = -index.value * 36 - 18
    }, 100)
  }

  const getOffsetY = computed(() => {
    if (typeof offY.value === 'number') {
      return {
        transform: `translate(-50%, ${offY.value}px)`
      }
    } else {
      return {
        transform: 'translate(-50%, -18px)'
      }
    }
  })
  
  return {
    box,
    list,
    getOffsetY,
    getStyle,
    handleMove,
    handleStart,
    handleEnd,
    index
  }
}

export default useList