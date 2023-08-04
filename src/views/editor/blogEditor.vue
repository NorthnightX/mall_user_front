<template>
  <el-container style="height: 100%; width: 100%;">
    <!-- 页头 -->
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%;">
      <div class="editorHeader" style="width: 100%;">
        <div style="display: flex; justify-content: space-between; align-items: center; height: 30px; margin: 0 10px;">
          <div>
            <el-button style="font-size: 13.5px; font-weight: bold" type="text">首页</el-button>
            <el-button style="margin-left: 18px; font-size: 13.5px; font-weight: bold" type="text">新闻</el-button>
            <el-button style="margin-left: 18px; font-size: 13.5px; font-weight: bold" type="text">博文</el-button>
            <el-button style="margin-left: 18px; font-size: 13.5px; font-weight: bold" type="text">会员</el-button>
            <el-button style="margin-left: 18px; font-size: 13.5px; font-weight: bold" type="text">直播</el-button>
            <el-button style="margin-left: 18px; font-size: 13.5px; font-weight: bold" type="text">发现</el-button>
          </div>
          <div>
            <el-button style="font-size: 13.5px; font-weight: bold" type="text">名字</el-button>
            <el-button style="margin-left: 10px; font-size: 13.5px; font-weight: bold" type="text">博客</el-button>
            <el-button style="margin-left: 10px; font-size: 13.5px; font-weight: bold" type="text">消息</el-button>
            <el-button style="margin-left: 10px; font-size: 13.5px; font-weight: bold" type="text">设置</el-button>
            <el-button style="margin-left: 10px; font-size: 13.5px; font-weight: bold" type="text">退出</el-button>
          </div>
        </div>
      </div>
      <div style="height: 20%; width: 100%; background-color: blue"></div>
      <div style="width: 100%">
        <!-- 中间过渡 -->
        <div style="display: flex; justify-content: space-between;">
          <!-- 编辑区的右侧工具栏 -->
          <div style="width: 20%; background-color: gold; margin: 0 1%">

          </div>
          <!-- 编辑区 -->
          <div style="width: 80%; margin: 0 3%">
            <div style="margin-top: 1%">
              <el-form>
                <el-form-item label="标题" prop="title">
                  <el-input></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div style="margin-top: 10px;">
              <el-form>
                <el-form-item prop="content">
                  <mavon-editor v-model="guideDetail.content"></mavon-editor>
                </el-form-item>
              </el-form>
            </div>
            <div style="justify-content: left; display: flex; align-items: center; height: 50px">
              <div>
                <el-button type="primary" style="background-color: #3366cc;" size="medium">提交</el-button>
                <el-button type="primary" style="background-color: #3366cc;" size="medium">草稿</el-button>
                <el-button type="primary" style="background-color: #3366cc;" size="medium">取消</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 页面底部 -->
      <div style="height: 5%;width: 100%; background-color: #3a8ee6">
      </div>
    </div>
  </el-container>
</template>

<script>
export default {
  name: "BlogApp",
  data() {
    return {
      guideDetail: {
        content: ''
      },
    };
  },
  computed: {},
  methods: {},
  created() {
  }
};
</script>


<style scoped>
/* Your styles here */
</style>

