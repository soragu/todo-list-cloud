import { getTouchData } from '../../lib/util.js'

Component({
  properties: {
    index: Number,
    _id: String,
    desc: String,
    done: Boolean,
  },
  data: {
    touch: {
      x: 0,
      y: 0,
    },
    slideButtons: [{
      text: '编辑',
      data: 'edit'
    }, {
      type: 'warn',
      text: '删除',
      data: 'delete'
    }],
    editting: false,
  },
  methods: {
    touchStart(e) {
      this.setData({
        "touch.x": e.changedTouches[0].clientX,
        "touch.y": e.changedTouches[0].clientY
      })
    },
    touchEnd(e) {
      let startX = this.data.touch.x
      let startY = this.data.touch.y
      let endX = e.changedTouches[0].clientX
      let endY = e.changedTouches[0].clientY

      let result = getTouchData(endX, endY, startX, startY, 150)

      if (result == 'right') {
        this.triggerEvent('done', {index: this.properties.index})
      }
    },
    slideButtonTap(e) {
      let op = e.detail.data
      switch (op) {
        case 'edit': 
          this.editItem()
          break
        case 'delete':
          this.deleteItem()
          break
        default:
          break
      }
    },
    editItem() {
      if (this.properties.done) {
        return
      }
      this.setData({editting: true})
    },
    deleteItem() {
      this.triggerEvent('deleted', {index: this.properties.index})
    },
    handleCofirm(e) {
      this.setData({editting: false})
      this.triggerEvent('change', {index: this.properties.index, value: e.detail.value})
    }
  }
})
