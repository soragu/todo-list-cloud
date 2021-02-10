import { debounce } from '../../lib/util'

Page({
  data: {
    inputValue: '',
    todoList: []
  },

  onLoad() {
    this.fetchData()
  },

  handleInput: debounce((e) => {
    // this.setData({inputValue: e.detail.value})
  }, 1000),

  fetchData() {
    wx.showLoading({title: '加载中...'})
    wx.cloud.callFunction({name: 'getTodoList'}).then(({result}) => {
      wx.hideLoading()
      if (result) {
        this.setData({
          todoList: result.data || []
        })
      }
    })
  },

  addTodoItem(e) {
    let { todoList, inputValue } = this.data
    wx.showLoading({title: '加载中...'})
    wx.cloud.callFunction({
      name: 'saveTodoItem',
      data: {
        action: 'add',
        data: {
          done: false,
          desc: inputValue,
        }
      }
    }).then(({result}) => {
      wx.hideLoading()
      this.setData({
        inputValue: ''
      }, () => {
        this.fetchData()
      })
    })
  },

  handleItemDone(e) {
    let index = e.detail.index
    let updateItem = this.data.todoList[index]

    if (updateItem.done) return

    wx.showLoading({title: '加载中...'})
    wx.cloud.callFunction({
      name: 'saveTodoItem',
      data: {
        action: 'update',
        data: {
          _id: updateItem._id,
          done: true
        }
      }
    }).then(({result}) => {
      wx.hideLoading()
      let key = `todoList[${index}].done`
      this.setData({
        [key]: true
      })
    })
  },

  handleItemChange(e) {
    let { index, value } = e.detail
    let updateItem = this.data.todoList[index]

    if (updateItem.desc == value) return

    let key = `todoList[${index}].desc`
    this.setData({
      [key]: value
    }, () => {
      wx.showLoading({title: '加载中...'})
      wx.cloud.callFunction({
        name: 'saveTodoItem',
        data: {
          action: 'update',
          data: {
            _id: updateItem._id,
            desc: value
          }
        }
      }).then(({result}) => {
        wx.hideLoading()
      })
    })
  },

  handleItemDeleted(e) {
    let index = e.detail.index
    let deleteItem = this.data.todoList[index]
    wx.showLoading({title: '加载中...'})
    wx.cloud.callFunction({
      name: 'deleteTodoItem',
      data: {
        _id: deleteItem._id
      }
    }).then(({result}) => {
      this.fetchData()
    })
  }

})
