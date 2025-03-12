import './App.css';
import { useState, useEffect, useContext } from 'react';
import {  useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components' //간편한 스타일 컴포넌트
import Nav from 'react-bootstrap/Nav';
import { Context1 } from './App.jsx';



let Btn = styled.button` 
background : ${props => props.bg };
color : ${ props => props.bg =='black' ? 'white' : 'black' };
padding : 10px; 
`
function Detail(props) { //app에서 shoes를 받아오기위해서 props를 사용

  let {상품재고} = useContext(Context1) //보관함(context)을 해체-보관함에 있던 state를 상품재고에 넣음

  let { id } = useParams();  // 유저가 URL 파라미터에 입력한(id) 것을 가져오기 위해
  let navigate = useNavigate();
  let [alert, setAlert] = useState(true)
  let [탭, 탭변경] = useState(0);

  useEffect(() =>{
    setTimeout(() => { setAlert(false) }, 6000) //시간이 지나면 false = 즉 보여주지말라고
    }) //보통 어렵고 복잡한 내용들은 effect안에 적는다. hook 갈고리리

  

  
  let 원하는상품 = props.shoes.find(function(x){ //shoes에서 id와 일치하는 상품을찾는다
    return x.id == id});//find매서드는 배열에서 조건을만족하는 첫번재 요소를 반환
  
    if (!id) {     //id가 없는 경우(/detail)는 전체 상품을 보여준다
      return (
        <div className="container">
          <h4>Product List</h4>
          <div className="row">
            {props.shoes.map((item, index) => (
              <div className="col-md-4" key={index}>
                <img src={`https://codingapple1.github.io/shop/shoes${index + 1}.jpg`} width="80%" />
                <h4>{item.title}</h4>
                <p>{item.content}</p>
                <p>{item.price}원</p>
                <button className="btn btn-primary" onClick={() => navigate(`/detail/${item.id}`)}>
                  상세보기
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (!원하는상품) {
      return <div>해당 상품을 찾을 수 없습니다.</div>;
    }
  //본문 return
  return (
    <div className="container">
      {
        alert == true
       ? <div className= "alert alert-warning">6초이내 구매시 할인</div>
       : null
       }

      <div className="row">
        <div className="col-md-6">
          <img src={`https://codingapple1.github.io/shop/shoes${Number(id) + 1}.jpg`} width="100%" />
        </div>
        <div className="col-md-6 mt-4">
        <h4 className="pt-5">{원하는상품.title}</h4>
          <p>{원하는상품.content}</p>
          <p>{원하는상품.price}원</p>
        <button className="btn btn-danger" onClick={() => navigate('/cart')}>주문하기</button>
      </div>
    </div>

    <Nav fill variant="tabs" defaultActiveKey="/home"> {/*처음들어갔을때 눌려있을 버튼 */}
      <Nav.Item>
        <Nav.Link href="/home">리뷰</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={ ()=> { 탭변경(1) }}>상세설명</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={ ()=> { 탭변경(2) }}>포토 룩북</Nav.Link>
      </Nav.Item>
    </Nav>
    
    <TabContent shoes = {props.shoes} 탭 = {탭}/>
  </div> 
  );
}//부모 끝

function TabContent({탭, shoes}){  //props대신 이렇게 사용을 해도 됨, props두개 사용
 
  let [엔드애니메이션, 엔드애니메이션변경] = useState('')
  let {상품재고} = useContext(Context1) //detail의 자식도 이것만 적고 사용가능

  useEffect( () => {
    setTimeout(() => { 엔드애니메이션변경('end') }, 1000) //1초 있다가 이 코드를 실행
    
    return () =>{ //cleanup fuction = useEffect 실행하기전에 실행하는 것    
     엔드애니메이션변경('' )//end를 처음부터 start랑 붙여서 같이 나오는게 아닌 조금 나중에 end가 붙어져야함
    }
     
  }, [탭])//탭이라는 state가 변경 될때마다 특정코드(useEffect)를 사용해주세요
  
  if (탭 == 0){
    return <div className = {'start' + 엔드애니메이션}>
      버퍼링이 아닌 애니메이션
      </div>
  }
  else if (탭 == 1){
    return [<div className = {"start" + 엔드애니메이션}>
      { shoes[0].title }=====이중 props 잘 나오는지 확인<br/>
      {상품재고} ===이건 context문법출력 확인
      </div>]
  }
  else if (탭 ==2){
    return <div className = {"start" + 엔드애니메이션}>
      <Btn bg = "black">연습용 버튼</Btn>
      <Btn bg = "white"> 연습용 버튼</Btn>
      </div>
  } // 컴포넌트를 사용할때에는 return을 사용해야함
}

export default Detail;

{/* <Route path="/about" element={<About/>}>
      <Route path="member" element={<div>멤버임</div>} />
      <Route path="location" element={<div>위치정보임</div>} />
      </Route>  이렇게 묶어두면 뒤에 주소에 따라 about의 내용안에 주소의 페이지를 하나더 보여줌
      UseEffect() =>{재랜더링마다 코드 실행}, [mount시 1회 코드실행])
      app-detail-탭 구조에서 props를 두번사용하면 app에서 정의된 내용을 탭에서 사용 할 수 있음
      */} 
      