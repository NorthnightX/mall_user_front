<template>
  <div class="history">

    <!-- Navigation, logo, user menu, etc. -->
    <div>
      <Header></Header>
    </div>
    <div style="width: 100%;height: 60px;margin-top: 5px" class="historyLabor">
      <div style="margin-left: 120px;height: 100%;align-items: center;justify-content: left;display: flex">
        <span style="font-size: 20px">我的足迹</span>
      </div>
    </div>
    <div style="width: 100%;height: 50px;background-color: #f7f7f7"></div>
    <div style="height: 800px;display: flex;align-items: center;justify-content: center; background: white">
      <div style="width: 85%;height: 100%;margin-top: 30px;display: flex;flex-direction: column">
        <div v-for="item in history" :key="item.id" style="margin-top: 10px">
          <div style="display: flex;align-items: center">
            <div style="width: 60px">
              <img :src="item.productImage" style="width: 60px;height: 60px">
            </div>
            <div style="margin-left: 10px;width: 150px">
              <span style="color: #888888">{{ item.productName }}</span>
            </div>
            <div  style="margin-left: 100px;width: 150px">
              <span style="color: orangered">{{ item.productPrice }}元</span>
            </div>
            <div  style="margin-left: 100px;width: 150px">
              <span style="color: #888888">{{ item.gmtCreate }}</span>
            </div>
          </div>

        </div>
        <!-- 分页 -->
        <div class="pagination" style="margin-top: 20px">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageNum"
              :page-sizes="[10, 15, 20, 25]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
          ></el-pagination>
        </div>
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
  name: "",
  components: {
    Header
  },
  data() {
    /* 定义初始化变量 */

    return {
      history: [],
      pageNum: 1, // 当前页码
      pageSize: 10, // 每页显示的数量
      total: 0, // 总数

    }
  },
  computed: {},
  /* 定义事件函数 */
  methods: {
    userHistory() {
      this.$axios.get("/active/history", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.history = res.data.data.records;
          this.total = res.data.data.total;
        }
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.userHistory();
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.userHistory()
    },
  }
  ,
  /* vue的生命周期函数
  当页面加载完毕就会执行created里面的函数
  */
  created() {
    this.userHistory()
  }
}
</script>

<style scoped>
.historyLabor {
  width: 100%;
  height: 60px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
  border: 1px solid #ccc; /* 添加边框效果 */
  background-color: white;
  opacity: 0.9; /* 调整透明度 */
  position: relative; /* 设置相对定位，为后面的偏移效果做准备 */
  z-index: 1; /* 设置堆叠顺序，使其位于下一个盒子之上 */
}
</style>
