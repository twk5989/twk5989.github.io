import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { changeName, addCount } from "./store.js"

function Cart(){

  //useSelector - store에 있는 모든 state를 가져와주는 hook
  let aa = useSelector((state)=> { return state }) //store에 있는 모든 state를 가져와서 a에 저장
  //let a = useSelector((state)=> { return state.user }) 이렇게 적으면 user의 state만 가져옴
    return(
        <div>

  <Table>
  <thead>
    <tr>
      <th>번호</th>
      <th>상품명</th>
      <th>수량</th>
      <th>수량변경</th>
    </tr>
  </thead>
  <tbody>
   { //상품이 100개면 100개의 옵션을 만들수 없으니까 map으로 축약
    aa.cart.map((a, i) => {                 //cart의 state 갯수만큼 map안의 함수를 만들어라    aa는 위에서 state을 가져와서 담은 변수
      let dispatch = useDispatch();
      
      return(
        <tr key = {i}>
        <td>{i}</td>
        <td>{aa.cart[i].name}</td>
        <td>{aa.cart[i].count}</td>
        <td>
          <button onClick={()=>{
          dispatch(addCount(i))
          }}>+</button>
          </td>
      </tr>
    )
    })
   }
  </tbody>
  </Table> 
  </div>
    )
}

export default Cart