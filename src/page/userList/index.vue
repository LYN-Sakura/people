<template>
    <div class="userBox">
        <div class="userItem" v-for="(val, idx) in userArr" :key="idx">{{ val.name }}</div>
    </div>
</template>
<script>
import { mapState } from "vuex";
export default {
    data() {
        return {};
    },
    computed: {
        ...mapState(["userArr"]),
    },
};
</script>
<style lang="less" scoped>
.userBox {
    .userItem {
        height: 50px;
        line-height: 50px;
        padding: 0 10px;
        border-bottom: 1px solid #ccc;
        letter-spacing: 3px;
        cursor: pointer;
        &:hover{
          background-color: #ccc;
        }
    }
}
</style>
