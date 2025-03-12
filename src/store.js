import { configureStore, createSlice } from '@reduxjs/toolkit'

let 변수 = createSlice({            //usestate랑 비슷한거라고 생각
 name : 'state 이름을 작명',
 initialState : 'state의 실제 값을 넣어줌',

 reducers : {
  changeName(state){
    return 'john ' + state
  }
}
})

export let { changeName } = 변수.actions 

 
let stock = createSlice({       
 name : 'stock',
 initialState : [10, 11, 12]
})

let cart = createSlice({
  name : 'cart',
  initialState : [
    {id : 0, name : 'White and Black', count : 2},
    {id : 2, name : 'Grey Yordan', count : 1}
  ],
  reducers : {
    addCount(state, action){
      state[action.payload].count++
    }
  }
})
export let { addCount } = cart.actions



export default configureStore({          //위에 설정을 해 두고 아래에서는 등록을 해야됨. 열 잘 맞춰야함
  reducer: { 
    작명 : 변수.reducer,
    stock : stock.reducer,
    cart : cart.reducer
    
 }
}) 