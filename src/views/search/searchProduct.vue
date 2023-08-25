<template>
  <div class="search">
    <div>
      <div class="header"
           style="background-color: #333333; width: 100%; height: 40px; align-items: center;display: flex;justify-content: center">
        <div style="width: 80%; height: 100%; display: flex;justify-content: space-between;align-items: center">
          <div>
            <el-button type="text" style="color: gainsboro; ; font-size: 12px">小米商城 |</el-button>
            <el-button type="text" style="color: gainsboro; ; font-size: 12px; margin-left: 5px">小米官网 |</el-button>
            <el-button type="text" style="color: gainsboro; ; font-size: 12px; margin-left: 5px">MIUI |</el-button>
            <el-button type="text" style="color: gainsboro; ; font-size: 12px; margin-left: 5px">loT |</el-button>
            <el-button type="text" style="color: gainsboro; ; font-size: 12px; margin-left: 5px">云服务 |</el-button>
            <el-button type="text" style="color: gainsboro; ; font-size: 12px; margin-left: 5px">新品 |</el-button>
            <el-button type="text" style="color: gainsboro; ; font-size: 12px; margin-left: 5px">小爱开放平台 |
            </el-button>
          </div>
          <div v-if="login">
            <el-button type="text" style="color: gainsboro;  font-size: 12px; margin-left: 5px">{{user.nickName}}</el-button>
            <el-button type="text" style="color: gainsboro;  font-size: 12px; margin-left: 5px" @click="toCart()">购物车</el-button>
            <el-button type="text" style="color: gainsboro;  font-size: 12px; margin-left: 5px">消息通知</el-button>
          </div>
          <div v-if="!login">
            <el-button type="text" style="color: gainsboro;  font-size: 12px; margin-left: 5px">登录</el-button>
            <el-button type="text" style="color: gainsboro;  font-size: 12px; margin-left: 5px">注册</el-button>
            <el-button type="text" style="color: gainsboro;  font-size: 12px; margin-left: 5px">消息通知</el-button>
          </div>
        </div>
      </div>
      <div>
        <div style="display: flex; justify-content: center;align-items: center;">
          <div style="align-items: center;justify-content: center;display: flex">
            <img src="../../assets/img/img_1.png" style="width: 55px;height: 55px">
            <el-button type="text" style="color : #333333;font-size: 16px;margin-left: 300px">小米手机</el-button>
            <el-button type="text" style="color : #333333;font-size: 16px;">路由器</el-button>
            <el-button type="text" style="color : #333333;font-size: 16px">Redmi手机</el-button>
            <el-button type="text" style="color : #333333;font-size: 16px">电视</el-button>
            <el-button type="text" style="color : #333333;font-size: 16px">笔记本</el-button>
            <el-button type="text" style="color : #333333;font-size: 16px">平板</el-button>
            <el-button type="text" style="color : #333333;font-size: 16px">家电</el-button>
            <el-button type="text" style="color : #333333;font-size: 16px;">服务支持</el-button>
            <el-button type="text" style="color : #333333;font-size: 16px">社区</el-button>
          </div>
          <div style="margin-left: 10%">
            <el-form :inline="true" :model="formInline" class="user-search">
              <el-form-item>
                <el-input v-model="formInline.keyword" style="margin-top: 14px" placeholder="请输入想要查询的商品">
                  <!-- 在搜索栏中添加一个图标按钮 -->
                  <el-button slot="append" icon="el-icon-search" size="small" circle
                             @click="searchProduct()"></el-button>
                </el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <div style="width: 100%;height: 30px;background-color: #f0f0f0;display:flex;align-items: center">
      <el-breadcrumb separator="/" style="margin-left: 8%">
        <el-breadcrumb-item style="font-size: 12px;color: #888888" :to="{ path: '/mall/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item style="font-size: 12px;color: #888888"><a href="/">全部结果</a></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
<!--    分类-->
    <div style="width: 100%;height: 75px;background-color: white;display:flex;align-items: center">

    </div>
<!--    商品区-->
    <div style="width: 100%;display: flex;align-items: center;background-color: #f0f0f0;justify-content: center;flex-direction: column">
      <div style="width: 80%; display: flex; flex-wrap: wrap; justify-content: center;">
        <div
            class="product-card"
            v-for="product in productList"
            :key="product.id"
            style="background-color: white; margin: 10px; text-align: center; width: calc(25% - 20px);height: 400px">
          <div style="display: flex;align-items: center;justify-content: center">
            <div style="width: 200px;height: 230px;">
              <img :src=product.mainImage alt="" style="width: 180px; height: 180px;margin-top: 25px">
            </div>
          </div>
          <div>
            <span style="color: black;font-size: 14px">{{ product.name }}</span><br>
          </div>
          <div>
            <span style="color: #888888;font-size: 10px">{{ product.subtitle }}</span><br>
          </div>
          <div>
            <span style="color: orangered;font-size: 14px">{{ product.price }}元起</span>
          </div>
          <div style="justify-content: center;display: flex;align-items: center;margin-top: 20px">
            <div style="justify-content: center;display: flex;align-items: center">
              <div v-for="image in JSON.parse(product.subImages)" :key="image" style="width: 45px;height: 45px">
                <img :src="image" alt="Sub Image" style="width: 35px; height: 35px;" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination" v-show="showPagination">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[20, 24]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"></el-pagination>
      </div>
    </div>
    <!-- Footer -->
    <div style="display: flex;justify-content: center;align-items: center">
      <div class="footer-content" style="display: flex">
        <div class="footer-copy">
          &copy; 2023 小米公司 版权所有
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../component/Header.vue';
export default {
  components: {
    Header
  },
  name: "search",
  data() {
    return {
      showPagination:true,
      user: {},
      login: false,
      formInline: {
        keyword:''
      },
      productList:[],
      pageNum: 1, // 当前页码
      pageSize: 20, // 每页显示的博客数量
      total: 0,
    };
  },
  computed: {
  },
  methods: {
    toCart(){
      this.$router.push({path: '/mall/cart'});
    },
    getUser(){
      if(localStorage.getItem("user") != null){
        this.login = true;
        this.user = JSON.parse(localStorage.getItem("user"))
      }
    },
    searchProduct() {
      this.queryByKeyword();
    },
    // 处理每页显示数量的变化
    handleSizeChange(val) {
      this.pageSize = val
      this.queryByKeyword();
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.queryByKeyword()
    },
    queryByKeyword(){
      this.$axios.get("/product/queryProductByKeyword", {
        params : {
          keyword: this.formInline.keyword,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }}).then(res => {
          if(res.data.code === 200){
            this.productList = res.data.data.records
            this.total = res.data.data.total
          }
          else {

          }
      })
    }
  },
  created() {
    this.formInline.keyword = this.$route.query.keyword || ''; // 使用默认值为空字符串
    this.queryByKeyword()
    this.getUser()
  },
};
</script>

<style>
em {
  color: red; /* 设置<em>标签中的文本为红色 */
}

.product-card {
  background-color: white;
  margin: 10px;
  text-align: center;
  width: calc(25% - 20px);
  height: 400px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
