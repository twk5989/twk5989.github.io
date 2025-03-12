import './App.css';
import { useState, createContext } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useNavigate, Link, } from 'react-router-dom';
import Detail from './detail.jsx';
import data from './data.js';
import axios from 'axios' //서버의 데이터를 가져오기위한 GET요청을하는 방법 에전방식인 request도 가능 
import 카트 from './Cart.jsx'
export let Context1 = createContext()    //context를 생성.쉽게 말하자면context는 state 보관함, detail에서 사용할거면 export해야함


function App() {

  let [shoes, setShoes] = useState(data);
  let [상품재고] = useState([10, 11, 12])

  let navigate = useNavigate();

  return (
    
    <div className="App">

      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">JUST SHOP</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={ () => { navigate('/') }}>Home</Nav.Link> 
            <Nav.Link onClick={ () => { navigate('/outer') }}>Outer</Nav.Link> 
            <Nav.Link onClick={ () => { navigate('/detail') }}>Shoes</Nav.Link> 
            <Nav.Link onClick={ ()=>{navigate('/cart') }}>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      
      
      <Routes>
      <Route path='/' element = { //메인 페이지에 대한 코딩,Route 하나당 페이지 하나라고 생각을하면 됨
        <>
        <div className="main-bg"> </div>
        <div className="container">
          <div className="row">
            {/* `shoes` 배열과 이미지를 매핑하여 동적으로 렌더링
            <Item shoes={shoes[0]} i={1}></Item>
            <Item shoes={shoes[0]} i={2}></Item>
            <Item shoes={shoes[0]} i={3}></Item> */}
            { shoes.map((a, i)=>{                   //처음 이미지를 id에 맞게 로드하는 부분분
                return <Item shoes = {shoes[i]} i={i + 1} key={i}></Item> //shoes라는 state의 갯수에 맞게 Item컴포넌트 생성 
              })
            } 
          </div>
        </div>
        <div className= "justbutton">
        <button onClick={ () =>{ //ajax Get요청으로 가져옴
          axios.get("https://codingapple1.github.io/shop/data2.json") //강의 서버주소
          //여러 서버에 데이터를 요청하려면 Promise.all([ axios.get('url112'), axios.get('url119')])
          .then((서버결과) => {
           console.log(서버결과.data)
           let copy = [...shoes, ...서버결과.data];
           setShoes(copy); //기존의 shoes의 데이터와 서버에서 가져온 데이터를 합쳐서 넣음
          })
          .catch(() => {
            console.log('서버에 실패했을때 예외처리 catch')
          })//part1의 문법에서 사용한 내용
          
          axios.post('/서버url주소입력',{name:'오브젝트 자료형도 전송가능'} )
          }}> 상품 더보기 </button>
          </div> 
        </> //get말고도 fetch로 데이터를 가져올 수 있지만 자료형들 같은 경우 변환을 해야함(.then.json)
      }/>           
      <Route path="/detail/:id" element = { 
        //context로 묶고 공유하고 싶은 state값을 적어둠
        <Context1.Provider value={ { 상품재고, shoes }}>
          <Detail shoes = {shoes}/>
          </Context1.Provider>
        }/> 
        {/* :작명 - 뒤에 아무거나 입력해도 설정해놓은 페이지로 이동 */}

      <Route path="/detail" element = {  //위와 아래에 상품재고를 왜 적는지 모르겠음
        <Context1.Provider value={ { 상품재고, shoes }}> 
          <Detail shoes = {shoes}/>
          </Context1.Provider>
         }/>
      <Route path='*' element = { <div> 이 페이지는 유효한 페이지가 아닙니다.</div> }/> 
      <Route path = "/outer" element = {
        <p>아우터 페이지입니다</p>
      }/>
      <Route path = '/cart' element = { <카트/> }/>

      </Routes>

      
    </div>
  
  );
} 
 
function Item(props) {
    return (
      <div className="col-md-4">
        <img src={'https://codingapple1.github.io/shop/shoes' + props.i + '.jpg'} width="80%" />
        <h4>{ props.shoes.title }</h4>
        <p>{ props.shoes.price }원</p>
      </div>
    )
  }

export default App;

// <img src = {process.env.PUBLIC_URL + '/이미지이름'} public 폴더에 이미지를 넣고 사용하는 방식 간편함 
// link는 주소,useNavigate 페이지 이동
// css오염 방지 - css파일이름을 컴포넌트.modules.css로 설정해두면 그 파일에 종속됨
//서버로는 array, object 전수송이 안되는데 ""를 다 붙여서 사용하면 가능-편법
//context.api - props를 여러번 할거를 한번에 바로 보낼 수 있음.
//context 만들어주고, 자식 컴포넌트에서 사용할 부분을 context로 묶어줌. 그리고 value값으로 부모에서 가져와 사용할 state들을 넣어둠 다른 파일에서 import하고 작명해서 사용
//redux 라이브러리의 사용. redux란 파일하나를 만들어서 state들을 죄다 보관함. 그러면 컴포넌트들이 필요한것들만 가져다가 씀