<template>
<div v-for="question in filteredDiagnoses" :key="question">
Q{{ currentQuestion }}.{{ question.content }}
<p @click="choiceBtn1(question.choices[0])" v-bind:style="{ background: question.choices[0].color }">
  {{ question.choices[0].content }}
</p>
<p @click="choiceBtn2(question.choices[1])" v-bind:style="{ background: question.choices[1].color }">
  {{ question.choices[1].content }}
</p>
<p @click="choiceBtn3(question.choices[2])" v-bind:style="{ background: question.choices[2].color }">
  {{ question.choices[2].content }}
</p>
</div>
<button @click="prevPage" v-show="prevBtn">前へ</button>
<button @click="nextPage" v-show="nextBtn">次へ</button>
<button @click="resultBtn" v-show="showResult">診断結果をみる</button>
<!-- <button @click="test">テスト</button> -->
</template>

<script>

export default {
  mounted() {
    console.log(this.id)
    console.log(this.questions)
    console.log(this.characters)
  },
  data() {
    return {
      id: this.$store.state.diagnoses.id,
      questions: this.$store.state.diagnoses.questions,
      characters: this.$store.state.diagnoses.characters,
      temporary: [],
      userScore: [],
      result: [],
      showResult: false,
      currentQuestion: 1,
      prevBtn: false,
      nextBtn: true,
      item: [
        { 'box': [] }, { 'box': [] }, { 'box': [] }, { 'box': [] }, { 'box': [] }, { 'box': [] }, { 'box': [] }, { 'box': [] }, { 'box': [] }, { 'box': [] },
      ],
    }
  },
  watch: {
    computedResults: {
      handler: function (val, oldval) {
        console.log(this.temporary)
        const oldLength = Object.keys(oldval).length
        const valLength = Object.keys(val).length
        if (oldLength !== 0) {
          for (let i = 1; i < valLength; i++) {
            if (val[i].question_id === oldval[i - 1].question_id) {
              const valId = val[i].question_id;
              const searchIndex = this.temporary.findIndex(({ question_id }) => question_id == valId)
              this.temporary.splice(searchIndex, 1)
            }
          }
        }
        if (this.temporary.length === 10) {
          this.showResult = true;
        }
      },
      deep: true
    },
  },
  computed: {
    computedResults() {
      return Object.assign({}, this.temporary)
    },
    filteredDiagnoses() {
      return this.questions.filter(question => {
        return question.number === this.currentQuestion;
      });
    },
  },
  methods: {
    choiceBtn1(choice) {
      this.temporary.push(choice)
      for (let i = 0; i < this.questions.length; i++) {
        if (choice.question_id === i + 1) {
          if (this.item[i].box.length === 1) {
            this.item[i].box[0].color = null
            choice['color'] = '#D1DA6D'
            this.item[i].box.shift();
            this.item[i].box.push(choice)
          } else if (this.item[i].box.length === 0) {
            choice['color'] = '#D1DA6D'
            this.item[i].box.push(choice)
          }
          console.log(this.item)
        }
      }
    },
    choiceBtn2(choice) {
      this.temporary.push(choice)
      for (let i = 0; i < this.questions.length; i++) {
        if (choice.question_id === i + 1) {
          if (this.item[i].box.length === 1) {
            this.item[i].box[0].color = null
            choice['color'] = '#D1DA6D'
            this.item[i].box.shift();
            this.item[i].box.push(choice)
          } else if (this.item[i].box.length === 0) {
            choice['color'] = '#D1DA6D'
            this.item[i].box.push(choice)
          }
          console.log(this.item)
        }
      }
    },
    choiceBtn3(choice) {
      this.temporary.push(choice)
      for (let i = 0; i < this.questions.length; i++) {
        if (choice.question_id === i + 1) {
          if (this.item[i].box.length === 1) {
            this.item[i].box[0].color = null
            choice['color'] = '#D1DA6D'
            this.item[i].box.shift();
            this.item[i].box.push(choice)
          } else if (this.item[i].box.length === 0) {
            choice['color'] = '#D1DA6D'
            this.item[i].box.push(choice)
          }
          console.log(this.item)
        }
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
      // console.log(this.temporary);
      this.userScore = [...
        this.temporary.reduce(
          (m, value) => m.set(value.item, (m.get(value.item) || 0) + value.score)
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
                // console.log(this.characters[i]['average'])
              } else {
                this.characters[i]['average'] += Math.floor(100 - (this.characters[i].sincerity - element.score) / this.characters[i].sincerity * 100)
                // console.log(this.characters[i]['average'])
              }
              break;
          }
        });
        this.characters[i]['average'] = Math.floor(this.characters[i]['average'] /= 5)
      }
      // console.log(this.characters)
      const max = Math.max.apply(null, this.characters.map(function (o) { return o.average })
      );
      // console.log('最大:' + max)
      this.characters.forEach(element => {
        console.log(element.average)
      })
      this.result = this.characters.filter(character => {
        return character.average === max
      })
      console.log(this.result)
    },
    // test() {
    //   console.log(this.id)
    //   console.log(this.$store.state.questions)
    //   console.log(this.characters)
    //   console.log(this.choices)
    // },
  }
}

</script> 

<style>
</style>
