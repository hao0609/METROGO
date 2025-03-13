<script setup>

    import shopping_cart_alert_item from './shopping_cart_alert_item.vue';
    
    const props = defineProps({     // 提供 兩個 props 給父祖件
    show: Boolean,    // 1.是否顯示購物車
    itemList: Array,  // 2.購物車目前商品清單
    });


    // 建立自定義事件 

    // update:show : 顯示/隱藏購物車
    // update:itemList : 更新購物車商品清單
    // remove-item : 刪除購物車商品項目

    const emit = defineEmits(['update:show', 'update:itemList', 'remove-item']);


    // 關閉購物車彈窗
    const closeCart = () => {
    emit('update:show', false);
    };

    // 更新數量
    const updateQuantity = (index, quantity) => {
    const updatedList = [...props.itemList];           // Vue 不允許直接修改 props（父組件傳來的 itemList）
                                                 // 所以建立 updatedList 陣列複製 父祖件的 itemList 陣列來修改資料
                                                 // 展開運算子 (...)，來建立一個新陣列，而不是修改原本的 itemList
                                                 
    updatedList[index] = { ...updatedList[index], prod_quantity: quantity };
    emit('update:itemList', updatedList);
    };

    // 刪除商品
    const removeItem = (index) => {
    emit('remove-item', index);
    };


</script>



<template>
    <div v-if="show" class="shopping_cart_alert">
       <div class="tittle_box">
                <div class="title2 bold">購物車</div>
                <div class="close_btn" @click="closeCart">
                    <svg class="gridicons-cross" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.3588 19.78L11.9988 13.41L5.63875 19.78L4.21875 18.36L10.5888 12L4.21875 5.63997L5.63875 4.21997L11.9988 10.59L18.3588 4.22997L19.7688 5.63997L13.4088 12L19.7688 18.36L18.3588 19.78Z" fill="black" />
                    </svg>
                </div>
       
       </div>

       <shopping_cart_alert_item
        v-for="(item, index) in itemList"
        :key="index"
        :item="item"
        @update-quantity="(quantity) => updateQuantity(index, quantity)"
        @remove="() => removeItem(index)" />

       <div class="goShoppingCart_box" v-if="itemList.length > 0">
            <router-link class="goShoppingCart" to="/shoppingCart">前往購物車</router-link>
       </div>

        

        <!-- 購物車為空時顯示 -->

        <div class="cart_empty" v-if="itemList.length === 0">
            <div class="cart_empty_text title2 bold">您目前購物車是空的!</div>
        </div>

    </div>
</template>

<style lang="scss" scoped>

@import "@/assets/sass/mixin/_mixin.scss";

.shopping_cart_alert{
    background: #ffffff;
    border-radius: 20px;
    border: 1px solid #000000;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    justify-content: center;
    width: 100%;
    align-content: space-between;
    color: black;
}


.shopping_cart_alert > .tittle_box {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
}


.shopping_cart_alert > .tittle_box > .close_btn {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.shopping_cart_alert > .cart_empty {
    text-align: center;
    width: 100%;
}

.shopping_cart_alert > .goShoppingCart_box{

    display: flex;
    justify-content: flex-end;
}


.shopping_cart_alert > .goShoppingCart_box > .goShoppingCart {
    color: #ffffff;
    display: flex;
    width: 120px;
    height: 48px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 4px;
    background: #000;
}


 // 取消 router-link 的預設樣式
 a:-webkit-any-link {
    text-decoration: none;
    color: inherit;
}
</style>
