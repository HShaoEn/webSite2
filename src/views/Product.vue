<template>
    <div>
        <el-carousel height="calc(93vh)"
                     direction="vertical"
                     :autoplay="false"
                     v-if="looplist.length">
            <!-- 沒產品時顯示v-else -->
            <el-carousel-item v-for="item in looplist" :key="item._id">


                <div class="image" :style="{backgroundImage:`url(http://localhost:3000${item.productImg})`}">

                    <el-card class="box-card">
                        <template #header>
                            <div class="card-header">
                                <h2>{{ item.productName}}</h2>
                            </div>
                        </template>

                        <div>{{item.productIntroduction}}</div>
                        <div class="detail">{{item.productDetail}}</div>
                    </el-card>
                </div>


            </el-carousel-item>
        </el-carousel>
        <el-empty description="description"  v-else/>
    </div>
</template>

<script setup>
    import { onMounted, ref, watchEffect, onBeforeUnmount } from 'vue'
    import axios from 'axios'
    const looplist = ref([])
    onMounted(async() => {
        const res = await axios.get("/webapi/product/list")
        looplist.value = res.data.data
        
    })
</script>



<style scoped lang="scss">
    .image {
        width: 100%;
        height: 100%;
        background-size: cover;
    }
    .box-card {
        width: 50%;
        height: 100%;
        background-color:rgba(255, 255, 255, 0.4);
    }
    .detail{
        margin-top:20px;
    }

</style>