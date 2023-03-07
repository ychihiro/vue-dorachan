<template>
  <div class="header">
    <p>メール作成</p>
  </div>
  <div class="wrapper">
    <table class="mail-table">
      <tr>
        <td class="address-label">メールアドレス</td>
        <td class="address"><input type="email" v-model="email" class="input-address"></td>
      </tr>
      <tr>
        <td class="content-label">内容</td>
        <td class="content"><textarea v-model="content" class="input-content"></textarea></td>
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
      email: '',
      content: '',
    }
  },
  methods: {
    async send() {
      console.log(this.content);
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
  padding: 150px 40px;
  background-color: #fff;
}
.header {
  justify-content: center;
  font-size: 25px;
  color: #fff;
  font-weight: bold;
}
.mail-table {
  border-collapse: separate;
  width: 50%;
  margin: 0 auto;
}
.address-label,
.content-label {
  width: 200px;
  padding: 15px;
  vertical-align: middle;
  color: #fff;
  border-radius: 5px 0px 0px 0px;
  background-color: #3F89CD;
}
.address-label {
  border-bottom: 1px solid #999;
  border-radius: 5px 0px 0px 0px;
}
.content-label {
  border-radius: 0px 0px 0px 5px;
}
.address,
.content {
  /* padding: 0; */
  vertical-align: middle;
}
.address {
  padding: 20px 0px;
  border-radius: 0px 5px 0px 0px;
  border: 1px solid #999;
}
.content {
  padding: 23px 0px 18px;
  border-radius: 0px 0px 5px 0px;
  border-bottom: 1px solid #999;
  border-right: 1px solid #999;
  border-left: 1px solid #999;
}

.input-address,
.input-content {
  width: 80%;
  height: 25px;
  padding: 5px 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #999;
}
.input-content {
  height: 150px;
  padding: 10px;
}
.send-btn {
  border: 1px solid #D1DA6D;
  background-color: #D1DA6D;
  margin-top: 40px;
}
</style>