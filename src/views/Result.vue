<template>
  <p>あなたにそっくりなキャラクターは・・・</p>
  <h1>{{ characters[0].name }}</h1>
  <dir>
  <!-- <img :src="blobUrl" alt="">
  <img :src="'http://localhost:8080/14f3ef5c-555f-400a-a920-995a01854806'" alt=""> -->
  <img :src="res">
  <img :src="'ドラミちゃん.jp'">
  <p>{{ res }}</p>
  <img :src="'./../assets/images/' + res"/>
  <!-- <img :src="'20191208160132-ddc2df3c7a829cf370643cf474d65bfb70abe28d'" alt=""> -->
  <!-- <img v-bind:src="'@/assets/images/' + 'ドラミちゃん.jpg'" alt="">
  <img v-bind:src="'@/assets/images/' + 'ドラミちゃん.jpg'" alt=""> -->
  <!-- <img src="./../assets/images/ドラミちゃん.jpg" alt=""> -->
  </dir>
  <p>{{ characters[0].path }}</p>
  <p>{{ characters[0].description }}</p>
  <p>マッチ度{{ characters[0].average }}％</p>
  <div v-if="!characters[0].results">
  おめでとうございます！<br>抽選が当たりました！ステッカーをプレゼントします！<br>
  <button>住所を入力する</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    this.chance()
  },
  mounted() {
    // console.log(this.characters)
    // console.log(this.imagePath)
    axios
      .get("http://localhost:8000/api/v1/user")
      .then(res => {
        console.log('テスト')
        console.log(res.data)
        this.tes = res.data
      })
    // axios
    //   .get("http://localhost:8000/api/v1/user", {
    //     responseType: 'arraybuffer'
    //   })
    //   .then(res => {
    //     const base64 = new Buffer(res.data, "binary").toString("base64")
    //     const prefix = `data:${res.headers["content-type"]};base64,`
    //     res.send(`<img src=${prefix}${base64} />`)
    //     console.log(base64)
    //     console.log(prefix)
    //   })
      
    axios
      .get("http://localhost:8000/api/v1/user", {
        responseType: "blob"
      })
      .then(response => {
        this.blobUrl = URL.createObjectURL(response.data);
        console.log('テスト')
        console.log(response.data)
        console.log(this.blobUrl)
      })
    
  },
  data() {
    return {
      characters: this.$store.state.diagnoses.results,
      imagePath: 'ドラミちゃん.jpg',
      test1: '',
      res: ''
    }
  },
  methods: {
    chance() {
      axios
        .get("http://localhost:8000/api/v1/user")
        .then(res => {
          console.log('テスト')
          console.log(res.data)
          this.res = res.data
        })
    }
  },
  
}
</script>