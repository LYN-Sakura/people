<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    created() {
        // 刷新 关闭 浏览器，载入本地缓存
        this.$store.commit("getUser");
    },
};
</script>

<style lang="less"></style>
