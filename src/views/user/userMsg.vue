<template>
    <div>
      aaa
    </div>
</template>
<script>


export default {
  data() {
    return {
    }
  },
  computed: {

  },
  methods: {
    goToHome() {
      this.$router.push('/blog/home');
    },
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"))
  },

  created() {
  },

  beforeDestroy() {

  },
};
</script>

<style>

/* 添加过渡效果 */
.blog-content > * {
  transition: opacity 0.3s ease-in-out;
}

/* 隐藏浏览器默认的滚动条样式 */
body::-webkit-scrollbar {
  width: 0.2rem; /* 设置滚动条宽度 */
}

/* 设置滚动条轨道的背景色 */
body::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

/* 设置滚动条滑块的背景色 */
body::-webkit-scrollbar-thumb {
  background-color: #888;
}

/* 当滚动条处于hover状态时，设置滚动条滑块的背景色 */
body::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

.footer p {
  margin: 10px 0;
  color: #666;
}

.footer-links li {
  display: inline-block;
  margin-right: 15px;
}

.footer-links li:last-child {
  margin-right: 0;
}

.footer-links a {
  color: #666;
  text-decoration: none;
}

.footer-links a:hover {
  color: #3a8ee6;
}
.arrow svg {
  width: 48px;
  height: 48px;
  fill: steelblue;
}

.arrow.arrow-up svg {
  transform: rotate(180deg);
}
</style>