<template>
  <h1 class="ttl">きみはだれ？</h1>
  <p class="sub-ttl">〜ぼくドラえもん〜</p>
  <img src="../assets/ドラえもん.gif" alt="ドラえもん">
  <label>診断名
  <input type="text" v-model="diagnosiskey">
  </label>
  <label>キャラクター名
  <input type="text" v-model="charakey">
  </label>
  <button @click="search">検索</button>
  <ul v-for="diagnosis in getList" :key="diagnosis">
    <li>{{ diagnosis.name }}</li>
  </ul>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      diagnoses: [],
      filteredKey:[],
      diagnosiskey: '',
      charakey: ''
    };
  },
  mounted() {
    axios
      .get("http://localhost:8000/api/v1/diagnosis")
      .then((response) => {
        this.diagnoses = response.data;
        this.filteredKey = response.data;
      });
  },
  computed: {
    getList() {
      return this.filteredKey;
    }
  },
  methods: {
    search() {
      // let searchdiagnosis = this.diagnosiskey.trim();
      let searchchara = this.charakey.trim();
      // if (searchdiagnosis == '' && searchchara == '') {
      //   return this.filteredKey = this.diagnoses;
      // }
      console.log(searchchara);
      this.filteredKey = this.diagnoses.filter(diagnosis => {
        return diagnosis.characters.forEach(key => { key.name.includes(searchchara)
        });
      });
      console.log(this.filteredKey);
    }
  }
}

// this.filteredKey = this.diagnoses.filter(diagnosis => {
//   return diagnosis.name.includes(searchdiagnosis) || diagnosis.characters.forEach(character => {
//     character.name.includes(searchchara)
//   });
// });


</script>

<style scoped>
.ttl {
  border: 2px solid #000;
  font-size: 50px;
  color: #fff;
  margin: 0;
}

.sub-ttl {
  border: 2px solid #000;
  font-size: 20px;
  color: #fff;
}
</style>