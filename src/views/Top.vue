<template>
  <h1 class="ttl">きみはだれ？</h1>
  <p class="sub-ttl">〜ぼくドラえもん〜</p>
  <img src="../assets/ドラえもん.gif" alt="ドラえもん">
  <label>診断名
  <input type="text" v-model="diagnosisKey">
  </label>
  <label>キャラクター名
  <input type="text" v-model="characterKey">
  </label>
  <button @click="search">検索</button>
  <ul v-for="diagnosis in diagnoses" :key="diagnosis">
    <li v-if="show">{{ diagnosis.name }}</li>
  </ul>
  <ul v-for="item in getItem" :key="item">
    <li>{{ item }}</li>
  </ul>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      show: true,
      diagnoses: [],
      searchResults: [],
      diagnosisKey: '',
      characterKey: '',
      
    };
  },
  mounted() {
    axios
      .get("http://localhost:8000/api/v1/diagnosis")
      .then((response) => {
        this.diagnoses = response.data;
      });
  },
  computed: {
    getItem() {
      return this.searchResults.filter((element, index, self) => self.indexOf(element) === index);
    }
  },
  methods: {
    search() {
      this.show = false;
      let data = this.diagnoses
      let charaNameKey = Object.keys(data[0])[5];
      let searchDiagnosis = this.diagnosisKey.trim();
      let searchCharacter = this.characterKey.trim();

      this.searchResults = [];

      if (searchDiagnosis == '' && searchCharacter == '') {
        for (let i = 0; i < data.length; i++) {
          let diagnosesName = this.diagnoses[i];
          this.searchResults.push(diagnosesName.name);
        }
      }
      if (searchDiagnosis != '') {
        for (let i = 0; i < data.length; i++) {
          let diagnosisName = this.diagnoses[i].name;
          let diagnosisResult = diagnosisName.includes(searchDiagnosis);
          if (diagnosisResult) {
            this.searchResults.push(diagnosisName);
          }
        }
      }
      if (searchCharacter != '') {
        for (let i = 0; i < data.length; i++) {
          let diagnosesName = this.diagnoses[i];
          let characterArray = diagnosesName[charaNameKey];
          for (let j = 0; j < characterArray.length; j++) {
            let character = characterArray[j].name.indexOf(searchCharacter);
            if (character === 0) {
              this.searchResults.push(diagnosesName.name);
            }
          }
        }
      }
    }
  }
}





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