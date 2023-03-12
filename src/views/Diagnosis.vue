<template>
  <div class="wrapper">
    <div class="question-wrapper">
      <div v-for="question in filteredQuestions" :key="question">
        <p class="question">
        Q{{ currentQuestion }}.{{ question.content }}
        </p>
        <p v-for="choice in filteredChoices" :key="choice.id" @click="choiceBtn(choice, question)" class="choice" :class="{choice_item: choice.isChoiced}">
        {{ choice.content }}
        </p>
        <div class="btn-wrapper">
          <a @click="prevPage" v-show="prevBtn" class="back-btn">
          前へ
          </a>
          <a @click="resultBtn" v-show="showResult" class="result-btn">
          診断結果をみる
          </a>
          <a @click="nextPage" v-show="nextBtn" class="next-btn">
          次へ
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import firebase from '../main';

export default {
  mounted() {
    const choices = [];
    for (let i = 0; i < this.questions.length; i++) {
      choices.push(this.questions[i].choices);
    }
    this.choices = choices.flat(2);
    this.choices.forEach(element => {
      element.isChoiced = false;
    });
  },
  data() {
    return {
      diagnosisId: this.$store.state.diagnoses.id,
      questions: this.$store.state.diagnoses.questions,
      characters: this.$store.state.diagnoses.characters,
      choices: [],
      choiceItem: [],
      userScore: [],
      result: [],
      showResult: false,
      currentQuestion: 1,
      prevBtn: true,
      nextBtn: true,
    }
  },
  computed: {
    filteredQuestions() {
      return this.questions.filter(question => {
        return question.number === this.currentQuestion;
      });
    },
    filteredChoices() {
      return this.choices.filter(choice => {
        return choice.question_id === this.currentQuestion;
      });
    }
  },
  methods: {
    choiceBtn(choice, question) {
      this.choices.forEach(element => {
        if (element.question_id == question.id) {
          element.isChoiced = false;
        }
      });
      this.choiceItem[choice.question_id] = choice
      choice.isChoiced = true;
      if (this.choiceItem.length === 11) {
        this.showResult = true;
      }
    },
    prevPage() {
      if (this.currentQuestion !== 1) {
        this.currentQuestion--;
      }
    },
    nextPage() {
      if (this.currentQuestion !== 10) {
        this.currentQuestion++;
      }
    },
    resultBtn() {
      this.userScore = [...
        this.choiceItem.reduce(
          (m, value) => m.set(value.category, (m.get(value.category) || 3) + value.score), new Map()
        )].map(([category, score]) => ({ category, score }));
      for (let i = 0; i < this.characters.length; i++) {
        this.characters[i]['average'] = 0;
        this.userScore.forEach(element => {
          switch (element.category) {
            case 'cooperation':
              if (element.score >= this.characters[i].cooperation) {
                this.characters[i]['average'] += Math.floor(100 - (element.score - this.characters[i].cooperation) / element.score * 100);
              } else {
                this.characters[i]['average'] += Math.floor(100 - (this.characters[i].cooperation - element.score) / this.characters[i].cooperation * 100);
              }
              break;
            case 'extroversion':
              if (element.score >= this.characters[i].extroversion) {
                this.characters[i]['average'] += Math.floor(100 - (element.score - this.characters[i].extroversion) / element.score * 100);
              } else {
                this.characters[i]['average'] += Math.floor(100 - (this.characters[i].extroversion - element.score) / this.characters[i].extroversion * 100);
              }
              break;
            case 'openness':
              if (element.score >= this.characters[i].openness) {
                this.characters[i]['average'] += Math.floor(100 - (element.score - this.characters[i].openness) / element.score * 100);
              } else {
                this.characters[i]['average'] += Math.floor(100 - (this.characters[i].openness - element.score) / this.characters[i].openness * 100);
              }
              break;
            case 'nerve':
              if (element.score >= this.characters[i].nerve) {
                this.characters[i]['average'] += Math.floor(100 - (element.score - this.characters[i].nerve) / element.score * 100);
              } else {
                this.characters[i]['average'] += Math.floor(100 - (this.characters[i].nerve - element.score) / this.characters[i].nerve * 100);
              }
              break;
            case 'sincerity':
              if (element.score >= this.characters[i].sincerity) {
                this.characters[i]['average'] += Math.floor(100 - (element.score - this.characters[i].sincerity) / element.score * 100);
              } else {
                this.characters[i]['average'] += Math.floor(100 - (this.characters[i].sincerity - element.score) / this.characters[i].sincerity * 100);
              }
              break;
          }
        });
        this.characters[i]['average'] = this.characters[i]['average'] /= 5
      }
      const max = Math.max.apply(null, this.characters.map(function (o) { return o.average }));
      this.result = this.characters.filter(character => {
        return character.average === max;
      });
      if (this.$store.state.isLogin) {
        const random = Math.floor(Math.random() * 2);
        if (random === 0) {
          this.result[0].result = true;
        } else {
          this.result[0].result = false;
        }
        this.store(this.result);
      }
      this.$store.commit('diagnoses/setResults', this.result);
      this.$router.push('/result'); 
    },
    store(result) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          axios.post("http://localhost:8000/api/v1/result", {
            user_id: user.uid,
            diagnosis_id: result[0].diagnosis_id,
            character_id: result[0].id,
          });
        }
      });
    },
  }
}
</script> 

<style scoped>
.wrapper {
  padding: 140px 0px;
}
.question-wrapper {
  width: 60%;
  margin: 0 auto;
  padding: 60px 20px;
  border-radius: 10px;
  background-color: #fff;
}
.question {
  margin-bottom: 30px;
  font-size: 25px;
}
.choice {
  width: 350px;
  margin: 10px auto;
  padding: 15px 5px;
  border: 1px solid #D1DA6D;
  border-radius: 10px;
  background-color: #fff;
}
.choice_item {
  color: #fff;
  font-weight: bold;
  background-color: #D1DA6D;
}
.btn-wrapper {
  display: flex;
  justify-content: space-between;
  width: 550px;
  margin: 40px auto 0px;
}

.next-btn,
.back-btn,
.result-btn {
  color: #3F89CD;
}
.result-btn {
  border-bottom: 1px solid #3F89CD;
}

.next-btn:hover,
.back-btn:hover,
.result-btn:hover {
  color: #CA8A8A;
}
.result-btn:hover {
  border-bottom: 1px solid #CA8A8A;
}

@media screen and (max-width:768px) {
  .wrapper {
    padding: 55% 0px;
  }
  .question-wrapper {
    width: 72%;
    padding: 70px 30px;
  }
}
</style>
