<template>
    <div>
        <SiderBar></SiderBar>
        <div class="right-main">
            <Nav></Nav>
            <AppMain></AppMain>
        </div>
           <!-- <router-view></router-view> -->
    </div>
</template>
<script>
import SiderBar from "./components/SiderBar.vue"
import AppMain from "./components/AppMain.vue"
import Nav from "./components/Nav.vue"
export default {
    components: {
        SiderBar,
        AppMain,
        Nav
    }
}

</script>