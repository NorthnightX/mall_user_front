<template>
  <div class="home">

    <!-- Navigation, logo, user menu, etc. -->
    <div>
      <Header></Header>
    </div>
    <div style="width: 100%;height: 60px;" class="floating-box">
      <div style="margin-left: 120px;height: 100%;align-items: center;justify-content: left;display: flex">
        <span style="font-size: 20px">{{ productMessage.name }}</span>
      </div>
    </div>
    <div style="width: 100%;height: 50px;background-color: #f7f7f7"></div>
    <div style="background-color: white; width: 100%;display: flex;align-items: center;justify-content: center">
      <div style="width: 88%;;display: flex;align-items: center;justify-content: center">
        <!--          放图片-->
        <div style="width: 45%;height: 550px;display: flex;align-items: center;justify-content: center">
          <img :src=productMessage.mainImage style="width: 93%;height: 93%">
        </div>
        <div style="width: 3%;height: 1px;">

        </div>
        <!--          数据-->
        <div style="width: 50%;height: 550px">
          <!--          商品名-->
          <div style="width: 100%;height: 15%;align-items: center;justify-content: left;display: flex;margin-top: 15px">
            <div>
              <span style="font-size: 25px">{{ productMessage.name }}</span><br>
              <div style="height: 5px"></div>
              <span style="color: #888888;font-size: 14px">{{ productMessage.subtitle }}</span>
            </div>
          </div>
          <!--          价格-->
          <div>
            <span style="color: orangered;font-size: 18px">{{ productMessage.price }} 元</span>
          </div>
          <div style="height: 1px;background-color: gainsboro;margin-top: 15px"></div>
          <!--          用户收货地址-->
          <div style="width: 100%;height: 100px;background-color: #888888">

          </div>
          <!--          结算-->
          <div style="width: 100%;height: 150px;margin-top: 35px;background-color: #f7f7f7;display: flex;justify-content: left;flex-direction: column">
            <div style="margin-top: 20px;margin-left: 30px">
              <span style="color: #888888">{{productMessage.name}}</span>
            </div>
            <div style="margin-top: 20px;margin-left: 30px">
              <span style="color:gray;">数量： </span>
              <el-input-number v-model="productCount" :min="1" :max="100" @change="updateCount"></el-input-number>
            </div>
            <div style="margin-top: 20px;margin-left: 30px">
              <span style="color: orangered;font-size: 20px"> 总计：{{totalCount}}元</span>
            </div>
          </div>
          <!--          加入购物车-->
          <div style="width: 100%; margin-top: 35px">
            <el-button style="width: 50%;height: 70px;color: white;background-color: orangered" @click="toCart()">
              加入购物车
            </el-button>
            <el-button style="width: 25%;height: 70px;color: white;background-color: gray">喜欢</el-button>
          </div>
        </div>
      </div>
    </div>
    <!--    商品介绍-->
    <div
        style="width: 100%;display: flex;justify-content: center;align-items: center;margin-top: 10px;background-color: #f7f7f7">
      <div style="width: 83%">
        <div v-html="parsedProductDetail"></div>
      </div>
    </div>
    <!-- Footer -->
    <div style="display: flex;justify-content: center;align-items: center;flex-direction: column">
      <div class="footer-content">
        <div class="footer-navigation">
          <router-link to="/home">首页</router-link>
          <router-link to="/products">产品列表</router-link>
          <router-link to="/about">关于我们</router-link>
          <!-- 添加其他导航链接 -->
        </div>
      </div>
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
import {marked} from 'marked'

export default {
  name: "",
  components: {
    Header
  },
  data() {
    /* 定义初始化变量 */
    return {
      productCount:1,
      productId: '',
      productMessage: [],
      parsedProductDetail: '',
      cartForm: {
        productId: '',
        quantity: ''
      }
    }
  },
  computed: {
    totalCount(){
      let price = this.productMessage.price
      return this.productCount * price
    }
  },
  /* 定义事件函数 */
  methods: {

    updateCount() {
      if (this.productCount < 1) {
        this.productCount = 1;
      }
    },
    toCart() {
      this.cartForm.productId = this.productId
      this.cartForm.quantity = this.productCount
      this.$axios.post("cart/addToCart", this.cartForm).then(res => {
        if(res.data.code === 200){
          this.$message.success("添加成功");
        }
      })
    },
    getProduct() {
      this.$axios.get("/product/productMessage", {params: {id: this.productId}}).then(res => {
        if (res.data.code === 200) {
          this.productMessage = res.data.data
          this.parsedProductDetail = marked(this.productMessage.detail);
        }
      })
    }
  }
  ,
  /* vue的生命周期函数
  当页面加载完毕就会执行created里面的函数
  */
  created() {
    this.productId = this.$route.query.id || ''; // 使用默认值为空字符串
    this.getProduct()
  }
}
</script>

<style scoped>
.floating-box {
  width: 100%;
  height: 60px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
  border: 1px solid #ccc; /* 添加边框效果 */
  background-color: white;
  opacity: 0.9; /* 调整透明度 */
  position: relative; /* 设置相对定位，为后面的偏移效果做准备 */

  z-index: 1; /* 设置堆叠顺序，使其位于下一个盒子之上 */
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-navigation {
  display: flex;
  gap: 20px;
}

.footer-navigation a {
  text-decoration: none;
  color: #333;
  font-weight: 600;
}

.footer-copy {
  color: #888;
}
</style>
