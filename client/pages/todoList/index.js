Page({
  data: {
    inputValue: '',
    todoList: []
  },

  onLoad() {
    // this.getTodoList()
  },

  handleInput(e) {
    this.setData({inputValue: e.detail.value})
  },

  getTodoList() {
    // todo: get data from cloud
  },

  addTodoItem(e) {
    let { todoList, inputValue } = this.data
    this.setData({
      todoList: [
        ...todoList,
        {
          oid: `todo${Date.now()}`,
          done: false,
          desc: inputValue
        }
      ],
      inputValue: ''
    })
  },

  handleItemDone(e) {
    let index = e.detail.index
    let key = `todoList[${index}].done`
    this.setData({
      [key]: true
    })
  },

  handleItemChange(e) {
    let { index, value } = e.detail
    let key = `todoList[${index}].desc`
    this.setData({
      [key]: value
    })
  },

  handleItemDeleted(e) {
    let index = e.detail.index
    let list = this.data.todoList
    list.splice(index, 1)
    this.setData({
      todoList: list
    })
  }

})
