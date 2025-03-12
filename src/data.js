//다른 파일을 하나 만들어서 export를 한다. export default 변수명;
//array안에 오브젝트 자료가 3개가 들어있는 구조 하나의 상품의 4개의 정보가 들어있음
//시작이 [] - array자료 {} - object자료

let data = [
    {
      id : 0,
      title : "Just Black",
      content : "Born in France",
      price : 120000
    },
  
    {
      id : 1,
      title : "Pink(Not my style)",
      content : "Born in Seoul", 
      price : 110000
    },
  
    {
      id : 2,
      title : "Air Jodan Replica",
      content : "Born in the States",
      price : 130000
    }
  ] 

  export default data;