<template>
  <el-container>
      <div class="blog-app" v-if="loading" style="width: 100%">
        <!-- 主要内容区域 -->
        <main class="mainHome" style="width: 100%;">
          <!-- 搜索栏 -->
          <div class="search-bar" style=" margin-top: -2px">
            <div class="search-bar-container" style="margin-top: -15px">
              <img src="../../assets/img/logo.svg" alt="logo" style="height: 36px;display: block">
              <el-button style="margin-left: 90px;font-size: 16px" type="text">首页</el-button>
              <el-button style="margin-left: 30px;font-size: 16px" type="text">新闻</el-button>
              <el-button style="margin-left: 30px;font-size: 16px" type="text">博文</el-button>
              <el-button style="margin-left: 30px;font-size: 16px" type="text">会员</el-button>
              <el-button style="margin-left: 30px;font-size: 16px" type="text">直播</el-button>
              <el-button style="margin-left: 30px;font-size: 16px" type="text">发现</el-button>
            </div>
            <div style="margin-left: 500px; padding-top: 25px">
              <el-form :inline="true" :model="formInline" class="user-search">
                <el-form-item>
                  <el-input size="small" v-model="formInline.keyword" placeholder="代码改变世界">
                    <!-- 在搜索栏中添加一个图标按钮 -->
                    <el-button slot="append" icon="el-icon-search" size="small" circle
                               @click="searchBlog()"></el-button>
                  </el-input>
                </el-form-item>
              </el-form>
            </div>
            <div style="; display: flex; align-items: center;">
              <el-button type="text" style="margin-left: 10px;margin-right: 20px" class="iconfont icon-bianji" @click="editorBlog()">
              </el-button>
              <el-button type="text" style="margin-left: 10px ;margin-right: 20px" class="iconfont icon-bokeyuan">
              </el-button>
              <el-button type="text" style="margin-left: 10px; margin-right: 20px" class="iconfont icon-xiaoxi">
              </el-button>
              <div style="margin-bottom: 6px">
                <el-avatar :src=userImage></el-avatar>
              </div>
            </div>
          </div>
          <!--      主要区域-->
          <div class="main-body" style="margin-top: -30px">
            <!--        右边栏-->
            <div style="width: 15%; background-color: whitesmoke">
              <div style="display: flex; flex-direction: column; align-items: center; justify-content: center">
                <a type="text" style="margin-top: 20px" class="iconfont icon-fenlei">&nbsp 分类</a>
                <a type="text" style="margin-top: 20px" class="iconfont icon-dingyuehao">&nbsp  订阅</a>
                <a type="text" style="margin-top: 20px" class="iconfont icon-guanzhu">&nbsp  关注</a>
                <a type="text" style="margin-top: 20px" class="iconfont icon-dianzan">&nbsp  点赞</a>
                <a type="text" style="margin-top: 20px" class="iconfont icon-pinglun">&nbsp  评论</a>
                <a type="text" style="margin-top: 20px" class="iconfont icon-gengduo">&nbsp  更多</a>
                <a type="text" style="margin-top: 20px" class="iconfont icon-wentifankui">&nbsp  反馈</a>
              </div>
            </div>
            <!--        中间博客区域-->
            <div>
              <!-- 博客列表 -->
              <div class="blog-list">
                <!-- 使用循环显示博客列表 -->
                <div v-for="blog in blogs" :key="blog.id" class="blog-item" style="width: 100%">
                  <!-- 博客条目内容 -->
                  <el-button type="text"
                             style="color: #3366cc; font-size: 13px; text-decoration: underline; font-weight: bold"
                             class="blog-title" @click="lookBlog(blog.id)">{{ blog.title }}
                  </el-button>
                  <div style="display: flex">
                    <div>
                      <el-avatar shape="square" :size="50" :src=blog.bloggerImage></el-avatar>
                    </div>
                    <p style="font-size: 11px">{{ getBlogSummary(blog.content) }}</p>
                  </div>
                  <!--              每条博客下方的基本数据-->
                  <div style="display: flex; font-size: 13px">
                    <el-button type="text" style="text-decoration: underline; color: #3a8ee6; margin-left: 10px">
                      {{ blog.bloggerName }}
                    </el-button>
                    <span style="margin-left: 10px;margin-top: 12px">{{ blog.gmtModified }}</span>
                    <el-button type="text" style="margin-left: 10px;" class="iconfont icon-dianzan1"
                               v-show="userLike.includes(blog.id.toString())"
                               @click="likeBlog(blog.id)">{{ blog.likeCount }}
                    </el-button>
                    <el-button type="text" style="margin-left: 10px;color: #888888" class="iconfont icon-dianzan1"
                               v-show="!userLike.includes(blog.id.toString())"
                               @click="likeBlog(blog.id)">{{ blog.likeCount }}
                    </el-button>
                    <el-button type="text" style="margin-left: 10px;color: #888888" class="iconfont icon-pinglun1">{{
                        blog.comment
                      }}
                    </el-button>
                    <el-button type="text" style="margin-left: 10px;color: #888888" class="iconfont icon-chakan">{{
                        blog.clickCount
                      }}
                    </el-button>
                  </div>
                </div>
              </div>

              <!-- 分页 -->
              <div class="pagination">
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

            <!--        左边栏-->
            <div style="width: 20%; background-color: #F4F3F2">
              <div style="height: 300px; background-color: #3a8ee6">
                48小时阅读排行
              </div>
              <div style="height: 300px; background-color: gold">
                十天阅读排行
              </div>
              <div style="height: 300px; background-color: darkorange">
                推荐阅读
              </div>
            </div>
          </div>

          <!-- 页脚 -->
          <div class="footer" style="background-color: gainsboro;display: flex;align-items: center;justify-content: center">
            <div class="footer-content">
              <p>© 2023 Your Blog. All rights reserved.</p>
              <ul class="footer-links">
                <a href="#" >关于我们</a>
                <a href="#" style="margin-left: 10px">隐私政策</a>
                <a href="#" style="margin-left: 10px">使用条款</a>
              </ul>
            </div>
          </div>
        </main>
      </div>
  </el-container>
</template>

<script>
export default {
  name: "BlogApp",
  data() {
    return {
      loading:false,
      userImage: JSON.parse(sessionStorage.getItem("token")).image,
      formInline: {
        keyword: ""
      },
      editBlogForm: {
        userId: "",
        isLike: 1,
        blogId:''
      },
      userLike: [],
      blogs: [],
      pageNum: 1, // 当前页码
      pageSize: 10, // 每页显示的博客数量
      total: 0, // 博客总数
    };
  },
  computed: {
    // 计算属性用于处理blog.content并生成摘要
    getBlogSummary() {
      return (content) => {
        // 去除内容中的HTML标签
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = content;
        // 去除内容中的HTML标签，并将多个连续空格替换为单个空格
        const summaryWithoutTags = tempDiv.textContent.replace(/\s+/g, " ").trim();
        // 如果内容长度小于等于30，则直接返回摘要
        if (summaryWithoutTags.length <= 100) {
          return summaryWithoutTags;
        }
        // 截取前30个字符作为摘要，并在末尾加上省略号
        return summaryWithoutTags.substring(0, 100) + "...";
      };
    },
  },
  methods: {
    editorBlog(){
      this.$router.push({path:'/blog/blogEditor'})
    },
    lookBlog(id){
      this.$router.push({ path: '/blog/lookBLog', query: { id : id } } );
    },

    likeBlog(id) {
      this.editBlogForm.blogId = id
      let user = JSON.parse(sessionStorage.getItem("token"))
      this.editBlogForm.userId = user.id;
      this.$axios.post("isLike/likeBlog", this.editBlogForm).then(res => {
        if (res.data.code === 200) {
          this.pageNum = 1
          this.queryAll()
          this.queryUserLikeBlog()
          this.$message.success("修改成功");
        } else {
          this.$message.warning("网络异常")
        }
      })
    },
    // 处理每页显示数量的变化
    handleSizeChange(val) {
      this.pageSize = val
      this.queryAll();
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.queryAll()
    },
    searchBlog() {
      this.$router.push({ path: '/blog/search', query: { keyword: this.formInline.keyword } });
    },
    queryUserLikeBlog(){
      let user = JSON.parse(sessionStorage.getItem("token"))
      this.$axios.get("isLike/queryLikeByUser", {
        params: {
          userId: user.id
        }}).then(res => {
          if(res.data.code === 200){
            this.userLike = res.data.data
          }
          else {
            this.$message.warning("网络异常")
          }
      })
    },
    queryAll() {
      this.$axios.get("blog/getBlogPage", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          typeId: this.formInline.typeId,
          title: this.formInline.title
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.blogs = res.data.data.records
          this.total = res.data.data.total
          this.loading = true
        } else {
          this.$message.warning(res.data.message)
        }
      })
    },
  },
  created() {
    // 当组件创建时，调用获取博客列表的函数
    this.queryAll()
    this.queryUserLikeBlog()

  },
};
</script>

<style scoped>

.search-bar {
  display: flex;
  justify-content: space-between;
  margin: 15px;
}

.search-bar-container {
  display: flex;
  align-items: center;
}

.blog-item {
  width: 65%;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.main-body {
  display: flex;
}
[v-cloak] {
  display: none;
}
.red-like {
  color: red; /* 或者其他您想要的红色样式 */
}

</style>
