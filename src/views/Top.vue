<template>
  <Header></Header>
  <label>診断名
    <input type="text" v-model="diagnosisKey">
  </label>
  <label>キャラクター名
    <input type="text" v-model="characterKey">
  </label>
  <button @click="search">検索</button>
  <button @click="popular" :class="{ 'popular_btn': active}">
  人気順</button>
  <ul v-for="diagnosis in diagnoses" :key="diagnosis.id">
  <div v-show="show == diagnosis.show">
  <diagnosis-item :name="diagnosis.name" :diagnoses="diagnoses"></diagnosis-item>
  <like-component :diagnosisItem="diagnosis"></like-component>
  </div>
  </ul>
</template>

<script>
import axios from 'axios';
import Diagnosis from '@/components/DiagnosisItem.vue';
import Like from '@/components/Like.vue';
import Header from '@/components/Header.vue';
export default {
  components: {
    'diagnosis-item': Diagnosis,
    'like-component': Like,
    Header
  },
  async mounted() {
    const response = await axios
      .get("http://localhost:8000/api/v1/diagnosis");
    this.diagnoses = response.data;

    const item = [];
    for (let i = 0; i < this.diagnoses.length; i++) {
      this.diagnosisId.push(this.diagnoses[i].id);
      this.diagnoses[i].show = true;
      item.push(this.diagnoses[i].characters);
    }
    this.characters = item.flat(2);
    console.log(this.diagnoses)
  },
  data() {
    return {
      diagnoses: [],
      characters: [],
      diagnosisId: [],
      questions: [],
      diagnosisKey: '',
      characterKey: '',
      active: null,
      show: true,
    };
  },
  methods: {
    search() {
      let searchDiagnosis = this.diagnosisKey.trim();
      let searchCharacter = this.characterKey.trim();
      let item = [];
      if (!searchDiagnosis && !searchCharacter) {
        this.diagnoses.forEach(element => {
          item.push(element);
        })
      } else {
        this.characters.forEach(element => {
          if (element.name.indexOf(searchCharacter) !== -1 && searchCharacter) {
            const diagnosisId = element.diagnosis_id;
            this.diagnoses.forEach(element => {
              if (element.id === diagnosisId) {
                item.push(element);
              } else {
                element.show = null;
              }
            })
          }
        })
      }
      this.diagnoses.forEach(element => {
        if (element.name.search(searchDiagnosis) !== -1 && searchDiagnosis) {
          item.push(element);
        } else {
          element.show = null;
        }
      })
      // console.log(item)
      item.forEach(element => {
        element.show = true
      })
    },
    popular() {
      if (!this.active) {
        this.diagnoses.sort((a, b) => b.count - a.count);
        this.active = true
      } else {
        this.diagnoses.sort((a, b) => a.id - b.id);
        this.active = false
      }
    },
  }
}
</script>
<style scoped>
.popular_btn {
  background-color: yellow;
}
</style>