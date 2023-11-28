<template>
    <el-row>

        <el-col :span="17" :offset="1">
            <h2>{{currentNews.title}}</h2>
            <div class="time">
                {{ getTime(currentNews.editTime) }}
            </div>
            <el-divider>
                <el-icon><star-filled /></el-icon>
            </el-divider>

            <div v-html="currentNews.content" class="htmlcontent">

            </div>
        </el-col>
        <el-col :span="4" :offset="1" :pull="1">
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span>Recent News</span>
                    </div>
                </template>
                <div v-for="item in topNews" 
                     :key="item._id" 
                     class="text item" 
                     style="padding:14px;"
                     @click="handleChangepage(item._id)">

                    <span>{{item.title}}</span>
                    <div class="bottom">
                        <time class="time">{{ getTime(item.editTime) }}</time>

                    </div>

                </div>
                <template #footer>
                    Footer content
                </template>
            </el-card>
        </el-col>

    </el-row>
</template>



<script setup>
    import { onMounted, ref, watchEffect, onBeforeUnmount } from 'vue'
    import { StarFilled } from '@element-plus/icons-vue'
    import axios from 'axios'
    import moment from 'moment'
    import { useRouter, useRoute } from 'vue-router';
    const route = useRoute()
    const router = useRouter()
    moment.locale("zh-tw")
    const currentNews = ref({})
    const topNews = ref([])
    const getTime = (date) => {
        return moment(date).format('YYYY/MM/DD, a  h:mm:ss');
    }
    // 只要裡面依賴的值發生改變就會重新執行 route.params.id
    // 但有可能在route.params.id變成 undefine 時報錯 需要監聽銷毀
    const stop = watchEffect(async () => {
        // 拿到ID
        // console.log(route.params.id)
        // console.log("step2")
        if (!route.params.id) return;
        const res = await axios.get(`/webapi/news/list/${route.params.id}`)
        // console.log(res.data.data)
        // 找前四條數據
        const res2 = await axios.get(`/webapi/news/toplist?limit=4`)

        currentNews.value = res.data.data[0]
        topNews.value = res2.data.data
        //console.log("123",res2)
    })
    // 停止監聽
    onBeforeUnmount(() => {
        // console.log("step1")
        stop()
    })
    const handleChangepage = (id) => {
        // console.log("id", id)
        // 帶著id跳轉到詳情頁面
        // console.log("id", id)
        router.push(`/newspage/${id}`)
        // 組件不會銷毀問題 監聽當前路由參數改變 vue中的副作用函數 watchEffect
    }


</script>


<style lang="scss" scoped>
    .el-row {
        margin-top: 30px;
    }
    .time {
        font-size: 13px;
        color: gray;
    }
</style>