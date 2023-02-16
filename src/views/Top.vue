<template>
  <label>診断名
    <input type="text" v-model="diagnosisKey">
  </label>
  <label>キャラクター名
    <input type="text" v-model="characterKey">
  </label>
  <button @click="search">検索</button>
  <button @click="popular" :class="{ 'popular_btn': active}">
  人気順</button>
  <ul  v-for="diagnosis in diagnoses" :key="diagnosis" >
    <li v-show="show == diagnosis.show" @click="clickName(diagnosis.name)">{{ diagnosis.name }}
    </li>
    <span @click="goodBtn(diagnosis)">
    <i class="fa-solid fa-heart like" :class="{liked: isliked != diagnosis.isliked, unlike: isliked == diagnosis.isliked}"></i>
    {{ diagnosis.count }}
    </span>
  </ul>
</template>

<script>
import axios from 'axios';
import firebase from '../main';

export default {
  created() {
    firebase
      .auth()
      .onAuthStateChanged(u => {
        let user = u ? u : {};
        this.$store.commit('onAuthStateChanged', user);
        this.$store.commit('onUserLoginStatusChanged', user.uid ? true : false);
        this.userUid = this.$store.getters.user.uid
        this.checkedlike(this.userUid)
      })
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
  },
  data() {
    return {
      diagnoses: [],
      characters: [],
      diagnosisId: [],
      questions: [],
      diagnosisKey: '',
      characterKey: '',
      userUid: '',
      myFavorite: [],
      isliked: null,
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
    async checkedlike(id) {
      const myFavorite = await axios.get("http://localhost:8000/api/v1/like/" + id);
      const likedItem = await axios.get("http://localhost:8000/api/v1/like");

      const likedItemId = [];
      for (let i = 0; i < likedItem.data.length; i++) {
        likedItemId.push(likedItem.data[i].diagnosis_id);
      }
      likedItemId.forEach(element => {
        const result = this.diagnosisId.indexOf(element)
        if (result != -1) {
          this.diagnoses.forEach(diagnosis => {
            if (diagnosis.id === element && !diagnosis.count ) {
              diagnosis.count = 1;
            } else if (diagnosis.id === element && diagnosis.count) {
              diagnosis.count = diagnosis.count + 1;
            }
          })
        }
      })
      // いいねボタンのスタイル
      for (let i = 0; i < myFavorite.data.length; i++) {
        this.myFavorite[i] = myFavorite.data[i].diagnosis_id;
      }
      this.diagnoses.forEach(element => {
        const result = this.myFavorite.indexOf(element.id);
        if (result !== -1) {
          element.isliked = true;
        }
        if (!element.count) {
          element.count = 0;
        }
      });
    },
    goodBtn(diagnosis) {
      if (diagnosis.isliked) {
        diagnosis.isliked = null;
        this.unlike(diagnosis);
      } else if (!diagnosis.isliked) {
        diagnosis.isliked = true;
        this.like(diagnosis);
      }
    },
    async like(diagnosis) {
      diagnosis.count++
      const response = await axios.post("http://localhost:8000/api/v1/like", {
        user_id: this.userUid,
        diagnosis_id: diagnosis.id
      });
      console.log(response.data)
    },
    async unlike(diagnosis) {
      diagnosis.count--
      const response = await axios.delete("http://localhost:8000/api/v1/like/" + diagnosis.id, {
        data: { user_id: this.userUid }
      });
      console.log(response)
    },
    clickName(diagnosisitem) {
      for (let i = 0; i < this.diagnoses.length; i++) {
        if (this.diagnoses[i].name === diagnosisitem) {
          this.$store.commit('diagnoses/setId', this.diagnoses[i].id,)
          this.$store.commit('diagnoses/setCharacters', this.diagnoses[i].characters);
          this.$store.commit('diagnoses/setQuestions', this.diagnoses[i].questions);
          console.log(this.diagnoses[i].id);
          console.log(this.diagnoses[i].characters);
          console.log(this.diagnoses[i].questions);
        }
      }
      this.$router.push('/diagnosis') 
    },
  }
}

</script>
<style>
.liked {
  color: palevioletred;
}
.unlike {
  color: skyblue;
}
.popular_btn {
  background-color: yellow;
}
</style>