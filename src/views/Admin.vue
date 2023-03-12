<template>
  <div class="header">
    <p class="ttl">メール作成</p>
    <router-link to="/" class="head-btn" @click="move">ホーム</router-link>
  </div>
  <div class="wrapper">
    <table class="mail-table">
      <tr>
        <td class="content-label">内容</td>
        <td class="content">
          <textarea v-model="content" class="input-content"></textarea>
        </td>
      </tr>
    </table>
    <div class="btn-wrapper">
      <button @click="send" class="send-btn">メール送信</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      content: '',
    }
  },
  methods: {
    async send() {
      await axios.post("http://localhost:8000/api/v1/mail", {
        content: this.content,
      }).then(res => {
        console.log(res.data)
      });
    }
  },
}
</script>

<style scoped>
.wrapper {
  padding: 100px 40px;
  background-color: #fff;
}
.header {
  display: flex;
  justify-content: right;
  align-items: center;
  font-size: 25px;
  color: #fff;
  font-weight: bold;
}
.ttl {
  margin-right: 450px;
}
.mail-table {
  border-collapse: separate;
  width: 60%;
  margin: 0 auto;
}
.content-label {
  width: 200px;
  padding: 15px;
  vertical-align: middle;
  color: #fff;
  border-radius: 5px;
  background-color: #3F89CD;
}
.content-label {
  border-radius: 5px 0px 0px 5px;
}
.content {
  vertical-align: middle;
}
.content {
  padding: 23px 0px 18px;
  border-radius: 0px 5px 5px 0px;
  border: 1px solid #999;
}
.input-content {
  width: 80%;
  padding: 5px 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #999;
}
.input-content {
  height: 300px;
  padding: 10px;
}
.send-btn {
  border: 1px solid #D1DA6D;
  background-color: #D1DA6D;
  width: 200px;
  margin-top: 50px;
}

@media screen and (max-width:768px) {
  .wrapper {
    padding: 420px 0px;
  }
  .mail-table {
    width: 80%;
  }
}
</style>