
import axios from 'axios'
let addToCart=document.querySelectorAll(".add-to-cart") //arry of all btns with same class ! 
let cartCounter=document.querySelector("#cartCounter");

function updateCart(pizza){
// 
axios.post('/update-cart',pizza).then(res=>{
    console.log(res);
     cartCounter.innerText=res.data.totalQty;
    
})

}



addToCart.forEach((btn) => {
    btn.addEventListener("click",(e)=>{
        
        // let pizza = btn.dataset.pizza   // string 
         let pizza = JSON.parse(btn.dataset.pizza) // json string cnverted to JSON object
        updateCart(pizza)
         console.log(pizza);
         //console.log(cartCounter) //test

    })
})