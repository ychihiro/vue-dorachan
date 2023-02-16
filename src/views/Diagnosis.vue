<template>
<div v-for="question in filteredQuestions" :key="question">
Q{{ currentQuestion }}.{{ question.content }}
<p v-for="choice in filteredChoices" :key="choice.id" @click="choiceBtn(choice)" :class="{choice: choice.isChoiced}">
{{ choice.content }}
</p>
</div>
<button @click="prevPage" v-show="prevBtn">前へ</button>
<button @click="nextPage" v-show="nextBtn">次へ</button>
<button @click="resultBtn" v-show="showResult">診断結果をみる</button>
</template>

<script>
export default {
  mounted() {
    console.log(this.questions)
    const choices = [];
    for (let i = 0; i < this.questions.length; i++) {
      choices.push(this.questions[i].choices);
    }
    this.choices = choices.flat(2);
    console.log(this.choices)
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
      prevBtn: false,
      nextBtn: true,
    }
  },
  watch: {
    computedResults: {
      // 選択ボタンを押した時のスタイル切り替え
      handler: function (val, oldval) {
        const oldLength = Object.keys(oldval).length
        const valLength = Object.keys(val).length
        for (let i = 1; i <= valLength; i++) {
          val[i].isChoiced = true
          if (oldLength === valLength) {
            oldval[oldLength].isChoiced = null
          }
        }
      }
    },
  },
  computed: {
    computedResults() {
      return Object.assign({}, this.choiceItem)
    },
    filteredQuestions() {
      return this.questions.filter(question => {
        return question.number === this.currentQuestion;
      });
    },
    filteredChoices() {
      return this.choices.filter(choice => {
        return choice.question_id === this.currentQuestion;
      });
    },
  },
  methods: {
    choiceBtn(choice) {
      this.choiceItem[choice.question_id] = choice
      console.log('choiceItem')
      console.log(this.choiceItem)
      if (this.choiceItem.length === 11) {
        this.showResult = true
      }
    },
    prevPage() {
      if (this.currentQuestion === 2) {
        this.prevBtn = false;
        this.currentQuestion--;
      } else {
        this.prevBtn = true;
        this.nextBtn = true;
        this.currentQuestion--;
      }
    },
    nextPage() {
      if (this.currentQuestion == 9) {
        this.nextBtn = false;
        this.currentQuestion++;
      } else {
        this.prevBtn = true;
        this.nextBtn = true;
        this.currentQuestion++;
      }
    },
    resultBtn() {
      // console.log(this.choiceItem)
      this.userScore = [...
        this.choiceItem.reduce(
          (m, value) => m.set(value.item, (m.get(value.item) || 3) + value.score)
          , new Map()
        )].map(([item, score]) => ({ item, score }));
      // console.log(this.userScore);
      for (let i = 0; i < this.characters.length; i++) {
        this.characters[i]['average'] = 0
        this.userScore.forEach(element => {
          switch (element.item) {
            case 'cooperation':
              if (element.score >= this.characters[i].cooperation) {
                this.characters[i]['average'] += Math.floor(100 - (element.score - this.characters[i].cooperation) / element.score * 100)
              } else {
                this.characters[i]['average'] += Math.floor(100 - (this.characters[i].cooperation - element.score) / this.characters[i].cooperation * 100)
              }
              break;
            case 'extroversion':
              if (element.score >= this.characters[i].extroversion) {
                this.characters[i]['average'] += Math.floor(100 - (element.score - this.characters[i].extroversion) / element.score * 100)
              } else {
                this.characters[i]['average'] += Math.floor(100 - (this.characters[i].extroversion - element.score) / this.characters[i].extroversion * 100)
              }
              break;
            case 'openness':
              if (element.score >= this.characters[i].openness) {
                this.characters[i]['average'] += Math.floor(100 - (element.score - this.characters[i].openness) / element.score * 100)
              } else {
                this.characters[i]['average'] += Math.floor(100 - (this.characters[i].openness - element.score) / this.characters[i].openness * 100)
              }
              break;
            case 'nerve':
              if (element.score >= this.characters[i].nerve) {
                this.characters[i]['average'] += Math.floor(100 - (element.score - this.characters[i].nerve) / element.score * 100)
              } else {
                this.characters[i]['average'] += Math.floor(100 - (this.characters[i].nerve - element.score) / this.characters[i].nerve * 100)
              }
              break;
            case 'sincerity':
              if (element.score >= this.characters[i].sincerity) {
                this.characters[i]['average'] += Math.floor(100 - (element.score - this.characters[i].sincerity) / element.score * 100)
                console.log(this.characters[i]['average'])
              } else {
                this.characters[i]['average'] += Math.floor(100 - (this.characters[i].sincerity - element.score) / this.characters[i].sincerity * 100)
                console.log(this.characters[i]['average'])
              }
              break;
          }
        });
        this.characters[i]['average'] = this.characters[i]['average'] /= 5
          // Math.floor(this.characters[i]['average'] /= 5)
      }
      console.log(this.characters)
      const max = Math.max.apply(null, this.characters.map(function (o) { return o.average })
      );
      // console.log('最大:' + max)
      // this.characters.forEach(element => {
      //   console.log(element.average)
      // })
      this.result = this.characters.filter(character => {
        return character.average === max
      })
      // const random = Math.floor(Math.random() * 11);
      const random = Math.floor(Math.random() * 2);
      if (random === 0) {
        this.result[0].result = false
      } else {
        this.result[0].result = true
      }
      console.log('結果')
      console.log(this.result)
      console.log(random)
      // this.$store.commit('diagnoses/setResults', this.result)
      // this.$router.push('/result') 
    },
  }
}

</script> 

<style>
.choice {
  background-color: #D1DA6D;
}
</style>
