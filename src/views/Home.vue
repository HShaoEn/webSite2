<template>

    <div class="container">
        <el-carousel height="calc(100vh - 80px)">
            <el-carousel-item :key="1">

                <div :style="{backgroundImage:`url(${require('@/assets/home1.jpg')})`}">

                </div>


            </el-carousel-item>

            <el-carousel-item :key="1">

                <div :style="{backgroundImage:`url(${require('@/assets/home4.jpg')})`}">

                </div>


            </el-carousel-item>

            <el-carousel-item :key="1">

                <div :style="{backgroundImage:`url(${require('@/assets/home3.jpg')})`}">

                </div>


            </el-carousel-item>

            <div class="center">
                First
            </div>


        </el-carousel>
    </div>

</template>

<style lang="scss" scoped>
    .el-carousel div{
        width: 100%;
        height:100%;
        background-size:cover;
    }
    .container{
        position:relative;

    }
    .center {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%);
        height: 100px;
        line-height: 100px;
        font-size: 60px;
        color: white;
        text-align: center;
    }
</style>



