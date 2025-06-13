let title = document.getElementById('title')
let salary = document.getElementById('salary');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
 let sub = document.getElementById('sub'); 
 let mood = 'Create';
 let tmp;
 function gettotal(){
    if (salary.value !=''){
        let result = (+salary.value + +taxes.value + +ads.value) 
        - +discount.value;
        total.innerHTML = result;
        total.style.background = 'green';
        total.style.color = 'white';

     }
     else {
    total.style.background = 'rgb(185, 10, 10)'
    total.style.color = 'white'
    total.innerHTML = ''

     }
    }
    let datapro;

    if(localStorage.product != null){
      datapro = JSON.parse(localStorage.product);
    }
    else{
      datapro = [];
    }
    sub.onclick = function(){
      let newpro = {
         Title:title.value.toLowerCase(),
         Salary:salary.value,
         Taxes:taxes.value,
         Ads:ads.value,
         Discount:discount.value,
         Total:total.innerHTML,
         Count:count.value,
         Category:category.value.toLowerCase(),
      };
      if(mood === 'Create'){
  if (newpro.Count>1){
        for(let i = 0 ; i<newpro.Count;i++){
          datapro.push(newpro);
          cleardata()

        }
      }else{
        datapro.push(newpro);
        cleardata()

      }
      }
      else{
        datapro[tmp] = newpro;
        mood = 'Create';
        sub.innerHTML = 'Create';
        count.style.display = 'block';
      }
    
      
      localStorage.setItem('product',   JSON.stringify(datapro)      );
  
    readdata()
    }
function cleardata(){
  title.value = '';
  salary.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  total.innerHTML = '';
  count.value = '';
  category.value = '';

}
function readdata(){
  gettotal();
  let table = '';
  for (let i = 0 ; i<datapro.length;i++){
    table += `<tr>
        <td>${i+1}</td>
    <td>${datapro[i].Title}</td>
    <td>${datapro[i].Salary}</td>
    <td>${datapro[i].Taxes}</td>
    <td>${datapro[i].Ads}</td>
    <td>${datapro[i].Discount}</td>
    <td>${datapro[i].Total}</td>
    <td>${datapro[i].Category}</td>
    <td><button onclick = "deletedata(${i})" id="delete">delete</button></td>
    <td><button onclick = "updatedata(${i})" id="update">update</button></td> 
    </tr>`;
  } 
  let newpro = document.getElementById('newpro')
  newpro.innerHTML = table;
  let btndelete =document.getElementById('deleteall');
if (datapro.length>0){
btndelete.innerHTML = ` 
<button onclick = "deleteAll()">delete all (${datapro.length})</button>
`
}
else{
  btndelete.innerHTML= '';
}
  
}
readdata()
function deletedata(i){
datapro.splice(i,1)
localStorage.product =JSON.stringify(datapro);
readdata()

}
function deleteAll(){
  localStorage.clear();
  datapro.splice(0);
  readdata();
}
function updatedata(i){
  title.value = datapro[i].Title;
  salary.value = datapro[i].Salary;
  taxes.value = datapro[i].Taxes;
  ads.value =  datapro[i].Ads ;
  discount.value = datapro[i].Discount;
   total.innerHTML= datapro[i].Total;
   category.value = datapro[i].Category ;
   count.style.display = 'none';
   sub.innerHTML = 'Update';
   mood = 'Update';
tmp = i;
scroll({top:0,
  behavior:'smooth'});
  
  localStorage.product =JSON.stringify(datapro);


  
  readdata()

}
function getsearch(value){
  let table =''
  for(let i = 0 ;i<datapro.length;i++){
    if(datapro[i].Title.includes(value.toLowerCase()) || datapro[i].Category.includes(value.toLowerCase())){
      table += `<tr>
      <td>${i+1}</td>
  <td>${datapro[i].Title}</td>
  <td>${datapro[i].Salary}</td>
  <td>${datapro[i].Taxes}</td>
  <td>${datapro[i].Ads}</td>
  <td>${datapro[i].Discount}</td>
  <td>${datapro[i].Total}</td>
  <td>${datapro[i].Category}</td>
  <td><button onclick = "deletedata(${i})" id="delete">delete</button></td>
  <td><button onclick = "updatedata(${i})" id="update">update</button></td> 
  </tr>`;

    }
    }
  let new_pro = document.getElementById('newpro').innerHTML = table;

}