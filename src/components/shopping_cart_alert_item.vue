<script setup>
    
    import { computed } from 'vue';


    // 接收來自父元件的 item 資料

    const props = defineProps({
    item: Object, // item 來自父組件
    });
    
    // 定義自定義事件 update-quantity (更新數量)　和　remove (刪除該商品項目)

    const emit = defineEmits(['update-quantity', 'remove']);


    // 定義函數 decreaseQuantity (減少數量) 
    const decreaseQuantity = () => {
        
    if (props.item.prod_quantity > 1) {
        emit('update-quantity', props.item.prod_quantity - 1);
    }
    };

    // 定義函數 increaseQuantity (增加數量)
    const increaseQuantity = () => {
    emit('update-quantity', props.item.prod_quantity + 1);
    };
    
</script>



<template>
       <div class="item">
            <div class="product_img"><img :src="props.item.prod_ImgURL" alt=""></div> 
            <!-- <div class="product_img"><img src="../assets/images/sample.jpg" alt=""></div>  -->

            <div class="product_info">
                <div class="product_price_info">
                    <div class="product_name title2 bold">{{ props.item.prod_name }}</div>
                    <div class="product_price title2 bold">${{props.item.prod_price}}</div>
                </div>
            </div>

            <div class="product_quantity">
                <div class="sub" @click="decreaseQuantity">
                    <svg class="ic-baseline-minus" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 12.998H5V10.998H19V12.998Z" fill="black" />
                    </svg>
                </div>
                <div class="quantity title2 bold">{{ props.item.prod_quantity }}</div>
                <div class="add" @click="increaseQuantity">
                    <svg class="ic-baseline-plus" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 12.998H13V18.998H11V12.998H5V10.998H11V4.99805H13V10.998H19V12.998Z" fill="black" />
                    </svg>
                </div>
            </div>
            
            <div class="delete_item" @click="emit('remove')">
                
                <svg class="bx-trash" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 20C5 20.5304 5.21071 21.0391 5.58579 21.4142C5.96086 21.7893 6.46957 22 7 22H17C17.5304 22 18.0391 21.7893 18.4142 21.4142C18.7893 21.0391 19 20.5304 19 20V8H21V6H17V4C17 3.46957 16.7893 2.96086 16.4142 2.58579C16.0391 2.21071 15.5304 2 15 2H9C8.46957 2 7.96086 2.21071 7.58579 2.58579C7.21071 2.96086 7 3.46957 7 4V6H3V8H5V20ZM9 4H15V6H9V4ZM8 8H17V20H7V8H8Z" fill="black" />
                <path d="M9 10H11V18H9V10ZM13 10H15V18H13V10Z" fill="black" />
                </svg>
                                
            </div>
        </div>



        
</template>

<style lang="scss" scoped>

@import "@/assets/sass/mixin/_mixin.scss";

 .item {

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 46px;

    @include mobile(){
        gap: 0px;
    }
}

.item > .product_img{

    width: 80px;
    height: 80px;
    background: #d9d9d9;
}


.item > .product_img > img{

    width: 100%;
    height: 100%;
}

.item > .product_info {

    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 46px;
    flex-wrap:wrap;

    @include mobile(){
        gap: 0px;
        flex-direction: column;
        align-items: flex-start;
    }

}

.item > .product_info >.product_price_info{

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 46px;

    @include mobile(){
        gap: 0px;
        flex-direction: column;
    }

}   


.item > .product_quantity{

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
} 


.item > .product_quantity > .sub{
    display: flex;
    align-items: center;
    cursor: pointer;
}  

.item > .product_quantity > .add{
    display: flex;
    align-items: center;
    cursor: pointer;
}  

.item > .delete_item{
    cursor: pointer;
} 




</style>
