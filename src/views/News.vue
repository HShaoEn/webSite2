<template>
    <div class="container">
        <div class="news-header"
             :style="{backgroundImage:`url(${require('@/assets/home4.jpg')})`}">
        </div>
        <div class="search">
            <el-popover placement="bottom"
                        title="search result"
                        width="50%"
                        :visible="visible">
                <template #reference>

                    <el-input v-model="searchText"
                              class="w-50 m-2"
                              placeholder="Type something"
                              :prefix-icon="Search"
                              clearable="true"
                              @input="visible=true"
                              @blur="visible=false" />

                </template>
                <!-- 搜尋結果 -->
                <div v-if="searchnewslist.length && searchnewslist.length > 0">
                    <div v-for="data in searchnewslist" :key="data._id" class="search-item"
                         @click="handleChangepage(data._id)">
                        {{data.title}}
                    </div>
                </div>
                <div v-else>
                    <el-empty description="empty" />
                </div>
            </el-popover>
        </div>
        <!--  前四個新聞 -->
        <div class="topnews">
            <el-row :gutter="20">
                <el-col :span="6" v-for="item in topnewsList" :key="item._id">
                    <div>
                        <el-card :body-style="{ padding: '0px' }" shadow="hover"
                                 @click="handleChangepage(item._id)">

                            <div class="image" :style="{backgroundImage:`url(http://localhost:3000${item.cover})`}">

                            </div>


                            <div style="padding: 14px">
                                <span>{{item.title}}</span>
                                <div class="bottom">
                                    <time class="time">{{ getTime(item.editTime) }}</time>

                                </div>
                            </div>
                        </el-card>
                    </div>
                </el-col>

            </el-row>

        </div>
        <el-tabs v-model="whichTab"
                 class="demo-tabs"
                 style="margin:20px">


            <el-tab-pane v-for="item in tablist"
                         :key="item.name"
                         :label="item.label"
                         :name="item.name">
                <el-row :gutter="20">

                    <el-col :span="18">
                        <!-- vue中的嵌套循環 用item.name是因為設計為number通用-->
                        <div v-for="data in tabnews[item.name]" :key="data._id" style="padding:10px;">


                            <el-card :body-style="{ padding: '0px' }" shadow="hover"
                                      @click="handleChangepage(data._id)">

                                <div class="tab-image" :style="{backgroundImage:`url(http://localhost:3000${data.cover})`}">

                                </div>


                                <div style="padding: 14px; float:left;">
                                    <span>{{data.title}}</span>
                                    <div class="bottom">
                                        <time class="tab-time">{{ getTime(data.editTime) }}</time>

                                    </div>
                                </div>
                            </el-card>
                        </div>
                    </el-col>

                    <el-col :span="6">

                        <el-timeline>
                            <el-timeline-item v-for="(data, index) in tabnews[item.name]"
                                              :key="index"
                                              :timestamp="getTime(data.editTime)">
                                {{ data.title }}
                            </el-timeline-item>
                        </el-timeline>

                    </el-col>

                </el-row>

            </el-tab-pane>



        </el-tabs>
        <el-backtop :right="100" :bottom="100" />
    </div>

    

</template>


<script setup>
    import { Search } from '@element-plus/icons-vue'

    import { onMounted, ref, computed } from 'vue'
    import axios from 'axios'
    import moment from 'moment'
    import _ from 'lodash'
    import { useRouter } from 'vue-router';
    moment.locale("zh-tw")

    const getTime =  (date) => {
        return moment(date).format('YYYY/MM/DD, a  h:mm:ss');

    }


    const searchText = ref("")
    const visible = ref(false)


    const newslist = ref([])

    onMounted(async () => {
 
        const res = await axios.get("/webapi/news/list")

        newslist.value = res.data.data
        //console.log("newslist", newslist.value)
        // 用lodash的groupBy依照category分組
        // console.log(_.groupBy(newslist.value, item=>item.category))
    })
    // 搜索 計算屬性 如果搜尋框有值才有值否則是[]空
    const searchnewslist = computed(() => 
        searchText.value?newslist.value.filter(item=>item.title.includes(searchText.value)):[]
    )

    // 拿出前四個新聞
    const topnewsList = computed(() => newslist.value.slice(0,4))

    // 列表
    const whichTab = ref(1)
    const tablist = [
        {
            label: "First",
            name: 1
        },
        {
            label: "two",
            name: 2
        },
        {
            label: "three",
            name: 3
        }
    ]
    // 分組
    const tabnews = computed(() =>
        _.groupBy(newslist.value, item => item.category)
    )

    const router = useRouter()
    const handleChangepage = (id) => {
        // console.log("id", id)
        // 帶著id跳轉到詳情頁面
        router.push(`/newspage/${id}`)
    }
</script>


<style lang="scss" scoped>

    .container {
        position: relative;
    }

    .news-header {
        width:100%;
        height: 400px;
        background-size:cover;
    }
    .search {
        position: absolute;
        top: 360px;
        width: 100%;
        text-align:center;
        .el-input{
            width:50%;
        }
    }
    .search-item{
        height:50px;
        line-height:50px;
        &:hover{
            background:whitesmoke;
            color:red;
        }
    }
    .topnews {
        margin: 20px;

        .image {
            width: 100%;
            height: 300px;
            background-size: cover;
        }

        .time{
            font-size:13px;
            color:gray;
        }
    }
    .tab-image{
        width:150px;
        height:100px;
        background-size:cover;
        float:left;
    }
    .tab-time {
        font-size: 13px;
        color: gray;
    }

</style>



