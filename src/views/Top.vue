<template>
  <label>診断名
    <input type="text" v-model="diagnosisKey">
  </label>
  <label>キャラクター名
    <input type="text" v-model="characterKey">
  </label>
  <button @click="search">検索</button>
  <ul v-for="diagnosis in diagnoses" :key="diagnosis">
    <li v-if="show" @click="clickName(diagnosis.name)">{{ diagnosis.name }}</li>
  </ul>
  <ul v-for="item in getItem" :key="item">
    <li>{{ item }}</li>
  </ul>
</template>

<script>
import axios from 'axios';

export default {
  mounted() {
    axios
      .get("http://localhost:8000/api/v1/diagnosis")
      .then((response) => {
        this.diagnoses = response.data;
        console.log(this.diagnoses);
      });
  },
  data() {
    return {
      show: true,
      diagnoses: [],
      questions: [],
      searchResults: [],
      diagnosisKey: '',
      characterKey: '',
    };
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
    },
    clickName(diagnosisitem) {
      for (let i = 0; i < this.diagnoses.length; i++) {
        if (this.diagnoses[i].name === diagnosisitem) {
          this.$store.commit('diagnoses/setId', this.diagnoses[i].id, )
          this.$store.commit('diagnoses/setCharacters', this.diagnoses[i].characters);
          this.$store.commit('diagnoses/setQuestions', this.diagnoses[i].questions);
          console.log(this.diagnoses[i].id);
          console.log(this.diagnoses[i].characters);
          console.log(this.diagnoses[i].questions);
        }
      }
    }
  }
}

</script>