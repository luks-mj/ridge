// 提交 mutations是更改Vuex状态的唯一合法方法
export const menuNames = (state, name) => { // A组件
  console.log(name)
  state.menuName = name // 把方法传递过来的参数，赋值给state中的menuName
}
