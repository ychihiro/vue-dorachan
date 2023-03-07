<template>
  <Header></Header>
  <div class="wrapper">
    <h1 class="ttl">きみはだれ？</h1>
    <p class="sub-ttl">~ぼくドラえもん~</p>
    <div class="img-wrapper">
      <img src="@/assets/images/ドラえもん.gif" alt="ドラえもんアイコン" class="image">
    </div>
    <div class="diagnoses-wrapper">
      <h2>性格診断一覧</h2>
        <div class="search-wrapper">
          <div class="form-item">
            <label class="form-label">診断名</label>
            <input type="text" v-model="diagnosisKey" class="input-item">
          </div>
          <div class="form-item">
            <label class="form-label">キャラクター名</label>
            <input type="text" v-model="characterKey" class="input-item">
          </div>
          <div class="btn-wrapper">
            <button @click="search" class="search-btn">検索</button>
            <button @click="popular" class="popular-btn" :class="{ 'popular-btn-active': active}">人気順に並べる
            </button>
          </div>
        </div>
        <div class="list-wrapper">
          <ul v-for="diagnosis in diagnoses" :key="diagnosis.id">
            <div v-show="show == diagnosis.show">
              <div class="item-wrapper">
                <diagnosis-item :name="diagnosis.name" :diagnoses="diagnoses">
                </diagnosis-item>
                <like-component :diagnosisItem="diagnosis">
                </like-component>
              </div>
            </div>
          </ul>
        </div>
    </div>
  </div>
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
    // console.log(this.diagnoses)
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
.wrapper {
  padding: 10px 40px;
}
.ttl {
  font-size: 55px;
  color: #fff;
  font-weight: bold;
}
.sub-ttl {
  font-size: 30px;
  color: #fff;
}
.img-wrapper {
  width: 250px;
  height: 95px;
  margin: 0 auto;
}

.image {
  width:auto;
  height:auto;
  max-width:100%;
  max-height:100%;
}
.diagnoses-wrapper {
  width: 70%;
  padding: 40px;
  margin: 0 auto;
  border: none;
  border-radius: 10px;
  background-color: #fff;
}
.search-wrapper {
  width: 70%;
  padding: 35px 60px;
  margin: 40px auto;
  border: 2px solid #D1DA6D;
  border-radius: 10px;
}
.form-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}
.form-label {
  display: block;
  width: 130px;
  padding: 10px;
  font-weight: bold;
  text-align: left;
  border-radius: 5px;
}
.input-item {
  width: 400px;
  height: 40px;
  font-size: 20px;
  padding: 5px 10px;
  border: 1px solid #999;
  border-radius: 5px;
}
.search-btn {
  background-color: #D1DA6D;
  border: 1px solid #D1DA6D;
  margin-right: 140px;
}
.popular-btn {
  border: 1px solid #CA8A8A;
  border-radius: 5px;
  color: #CA8A8A;
  cursor: pointer;
  background-color: #fff;
}
.popular-btn-active {
  color: #fff;
  background-color: #CA8A8A;
}
.btn-wrapper {
  display: flex;
  justify-content: right;
}
.list-wrapper {
  width: 60%;
  margin: 20px auto;
  /* border: 3px solid #000; */
}
.item-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 20px;
  font-size: 20px;
  cursor: pointer;
  border: 2px solid #CA8A8A;
  border-radius: 5px;
}

ul {
  list-style: none;
}
</style>