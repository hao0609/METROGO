<script setup>

    import shopping_cart_alert_item from './shopping_cart_alert_item.vue';
    
    defineProps({
    show: Boolean, // 是否顯示購物車
    itemList: Array, // 購物車商品列表
    });

    const emit = defineEmits(['update:show', 'update:itemList', 'remove-item']);


    // 關閉購物車
    const closeCart = () => {
    emit('update:show', false);
    };

    // 更新數量
    const updateQuantity = (index, quantity) => {
    const updatedList = [...itemList];
    updatedList[index].prod_quantity = quantity;
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

       <ShoppingCartItem
        v-for="(item, index) in itemList"
        :key="index"
        :item="item"
        @update-quantity="(quantity) => updateQuantity(index, quantity)"
        @remove="() => removeItem(index)" />

    </div>
</template>

<style lang="scss" scoped>

@import "@/assets/sass/mixin/_mixin.scss";

.shopping_cart_alert{
    background: #ffffff;
    border-radius: 20px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    justify-content: center;
    width: 100%;
    align-content: space-between;
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
}


</style>
