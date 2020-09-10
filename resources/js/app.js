const { update } = require("../../app/models/menu")
import axios from 'axios'
let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')
import Noty from 'noty'

function updateCart(pizza){
    axios.post('/update-cart',pizza).then(res=>{
        // console.log(res)
        cartCounter.innerText = res.data.totalQty

        new Noty({
            type: 'success',
            text: "Item added to cart",
            progressBar : false,
            timeout : '1000'
        }).show();
    }).catch(err=>{
        new Noty({
            type: 'error',
            text: "something went wrong !!",
            progressBar : false,
            timeout : '1000'
        }).show();
    })
}

addToCart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        let pizza = JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
        
    })
})