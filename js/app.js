
function notification(message){
    var child = document.getElementById('clonemother');
    var clone = child.cloneNode(true);
    var node = document.getElementById("toasts").appendChild(clone);
    console.log(node.childNodes);
    setTimeout(function() {
                  if(node) {
                    node.childNodes[1].childNodes[3].childNodes[0].innerHTML = message
                  }
                },0);
    setTimeout(function() {
                  if(node) {
                    node.style.animation = "toast .5s ease-out forwards";
                    setTimeout(() => {node.remove();} ,500);
                  }
                },2000);
}
//Show cart
(function(){
    //target cart button
    const cartInfo = document.getElementById('cart-info');
    const cart = document.getElementById('cart');

    cartInfo.addEventListener('click', function(){
        cart.classList.toggle('show-cart');
    })


})();

//Add items to the cart
(function(){

const cartBtn = document.querySelectorAll('.store-item-icon');

cartBtn.forEach(function(btn){
    btn.addEventListener('click', function(event){
        //make sure event fires only if it has a parent of a certain class.
        if(event.target.parentElement.classList.contains('store-item-icon')){

            let fullPath = event.target.parentElement.previousElementSibling.src;

            let pos = fullPath.indexOf('img') + 3; //use the 3 to get rid of the 'img' string

            let partPath = fullPath.slice(pos);

            const item = {};

            item.img = `img${partPath}`;

            let name = event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;

            item.name = name;

            let price = event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;

            let finalPrice = price.slice(1).trim();

            item.price = finalPrice;

            const cartItem = document.createElement('div');

            cartItem.classList.add('cart-item', 'd-flix', 'justify-content-between', 'text-capitalize', 'my-3');

            cartItem.innerHTML = `
            <div class="cart-item d-flex justify-content-between text-capitalize my-3">
                <img src="${item.img}" width="60px" height="60px" class="mr-3" id="item-img" alt="">
                <div class="mr-auto item-text">
                    <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
                    <span>  $</span>
                    <span id="cart-item-price" class="cart-item-price font-weight-bold" class="mb-0">${item.price}</span></div>
                <a href="#" id='cart-item-remove' class="btn-link cart-item-remove"><i class="fas fa-trash"></i></a></div>`;

            notification("Item has been added to your cart");
            
            const cart = document.getElementById('cart');
            const total = document.querySelector('.cart-total-container');
            cart.insertBefore(cartItem, total);
            showTotals();
            var oldCoupon = document.querySelector('.coupon-text');
            if(typeof(oldCoupon) != 'undefined' && oldCoupon != null){
                oldCoupon.remove();
            };
        }
    });
});

// show totals
function showTotals(){

    const total = [];
    const items = document.querySelectorAll('.cart-item-price');
    items.forEach(function(item){
        total.push(parseFloat(item.textContent));
    })
    
    const totalMoney = total.reduce(function(total, item){
        total += item;
        return total;
    },0);

    const finalMoney = totalMoney.toFixed(2);
    
    document.getElementById('cart-total').textContent = finalMoney;
    document.querySelector('.item-total').textContent = finalMoney;
    document.getElementById('item-count').textContent = total.length;
}

})();

//Filter buttons
(function(){
    const buttons = document.querySelectorAll('.type-filter')
    const storeItems = document.querySelectorAll('.store-item')
    
    buttons.forEach((button)=> {
        button.addEventListener('click', (e) => {
            e.preventDefault()
            const filter = e.target.dataset.filter
            buttons.forEach((button)=> {
                button.style.backgroundColor = "transparent"
            });
            button.style.backgroundColor = "#ffc525"
            storeItems.forEach((item)=> {
                if (filter === 'all'){
                    item.style.display = 'block'
                } else {
                    if (item.classList.contains(filter)){
                        item.style.display = 'block'
                    } else {
                        item.style.display = 'none'
                    }
                }
            })
        })
    })

})();

//Filter buttons out of stock
(function(){
    document.querySelector('.oot-filter').addEventListener('click',function() {
        notification("We are currently out of stock!!!")
      })

})();



//Filter search
(function(){

    const searchBox = document.querySelector('#search-item')
    const storeItems = document.querySelectorAll('.store-item')

    searchBox.addEventListener('keyup', (e) => {
    
        const searchFilter = e.target.value.toLowerCase().trim()
        //display only items that contain filter input
        var count = 0;
        storeItems.forEach((item) => {
            if (item.textContent.includes(searchFilter)){
                item.style.display = 'block';
                count = count + 1 ;
            } else {
                item.style.display = 'none'
            }
        })
        if(count == 0){
            notification("No items match your search!!!")
        }
    })

})();

//Clear cart button
(function () {
    const removeBtn = document.querySelector('#clear-cart');
    removeBtn.addEventListener('click', function(event) {
        const cartItems = document.querySelectorAll('.cart-item');
        cartItems.forEach((item) => {
            item.innerHTML = "";
        });
        showTotals();
    });
    function showTotals(){

        const total = [];
        const items = document.querySelectorAll('.cart-item-price');
        items.forEach(function(item){
            total.push(parseFloat(item.textContent));
        })
        
        const totalMoney = total.reduce(function(total, item){
            total += item;
            return total;
        },0);
    
        const finalMoney = totalMoney.toFixed(2);
        
        document.getElementById('cart-total').textContent = finalMoney;
        document.querySelector('.item-total').textContent = finalMoney;
        document.getElementById('item-count').textContent = total.length;
        var oldCoupon = document.querySelector('.coupon-text');
                if(typeof(oldCoupon) != 'undefined' && oldCoupon != null){
                    oldCoupon.remove();
                };
    }
})();

//Remove item trashcan icon
(function () {

    document.addEventListener('click',function(e){
        if(e.target.parentElement.id == 'cart-item-remove'){
            let item = e.target.parentElement.parentElement.children[1].children[0].textContent;
            notification(item.toUpperCase()+" has been removed from your cart");
            e.target.parentElement.parentElement.parentElement.innerHTML = "";
            showTotals();
         }
    });
    function showTotals(){

        const total = [];
        const items = document.querySelectorAll('.cart-item-price');
        items.forEach(function(item){
            total.push(parseFloat(item.textContent));
        })
        
        const totalMoney = total.reduce(function(total, item){
            total += item;
            return total;
        },0);
    
        const finalMoney = totalMoney.toFixed(2);
        
        document.getElementById('cart-total').textContent = finalMoney;
        document.querySelector('.item-total').textContent = finalMoney;
        document.getElementById('item-count').textContent = total.length;
        var oldCoupon = document.querySelector('.coupon-text');
                if(typeof(oldCoupon) != 'undefined' && oldCoupon != null){
                    oldCoupon.remove();
                };
    }
    
})();

//Apply coupon
(function(){

    const validCoupon = "50off"
    
    const couponBtn = document.querySelectorAll('.coupon-box')
    couponBtn.forEach(function(btn){
        btn.addEventListener('click', function(event){
            if(document.querySelector('#couponInput').value.toLowerCase().trim() == validCoupon){
                var oldCoupon = document.querySelector('.coupon-text');
                if(typeof(oldCoupon) != 'undefined' && oldCoupon != null){
                    oldCoupon.remove();
                };
                const couponName = document.createElement('div');
                couponName.innerHTML = `<a class="coupon-text">Coupon 50OFF is applied !!!</a>`;
                const cart = document.getElementById('cart');
                const coupon = document.querySelector('.coupon-area');
                cart.insertBefore(couponName, coupon.nextSibling);
                showCouponTotals();
            }
        }
        );
    });
    
    // show totals
    function showCouponTotals(){
    
        const total = [];
        const items = document.querySelectorAll('.cart-item-price');
        items.forEach(function(item){
            total.push(parseFloat(item.textContent));
        })
        
        const totalMoney = total.reduce(function(total, item){
            total += item;
            return total;
        },0)/2;
    
        const finalMoney = totalMoney.toFixed(2);
        
        document.getElementById('cart-total').textContent = finalMoney;
        document.querySelector('.item-total').textContent = finalMoney;
        document.getElementById('item-count').textContent = total.length;
    }
    
    })();
