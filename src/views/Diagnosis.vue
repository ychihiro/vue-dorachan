<template>
<div v-for="question in filteredItems" :key="question">
Q{{ currentQuestion }}.{{ question.content }}
<p @click="btn1([question.choices[0].item, question.choices[0].score, question.choices[0].question_id])" :class="classA" >
{{ question.choices[0].content }}
</p>
<p @click="btn2([question.choices[1].item, question.choices[1].score])" :class="classB">
{{ question.choices[1].content }}
</p>
<p @click="btn3([question.choices[2].item, question.choices[2].score])" v-bind:class="{ buttoncolor: buttonState3 }">
{{ question.choices[2].content }}
</p>
</div>

<button @click="prevPage" v-show="prevBtn">前へ</button>
<button @click="nextPage" v-show="nextBtn">次へ</button>
<router-link to="/" v-show="currentQuestion == 10">診断結果をみる</router-link>
<button @click="test">テスト</button>
</template>

<script>
import axios from 'axios';

export default {
  mounted() {
    axios
      .get("http://localhost:8000/api/v1/diagnosis")
      .then((response) => {
        this.diagnoses = response.data
        console.log(this.diagnoses);
        this.doraemon = response.data[0].characters[0]
        this.nobita = response.data[0].characters[1]
        this.doramichan = response.data[0].characters[2]
        this.sizukachan = response.data[0].characters[3]
        this.jaian = response.data[0].characters[4]
        this.suneo = response.data[0].characters[5]
      })
  },
  data() {
    return {
      id: this.$store.state.id,
      questions: this.$store.state.questions,
      characters: this.$store.state.characters,
      currentQuestion: 1,
      prevBtn: false,
      nextBtn: true,
      show: true,
      users: [],
      items: ['cooperation', 'extroversion', 'sincerity', 'openness', 'nerve'],
      page1: {},
      page2: {},
      page3: {},
      page4: {},
      page5: {},
      page6: {},
      page7: {},
      page8: {},
      page9: {},
      page10: {},
      classA: 'classA',
      classB: 'classB',
      isActiveA: false,
      isActiveB: false,
      buttonState1: false,
      buttonState2: false,
      buttonState3: false,
      results: [],
    }
  },
  computed: {
    filteredItems() {
      return this.questions.filter(question => {
        return question.number === this.currentQuestion;
      });
    }
  },
  methods: {
    prevPage() {
      console.log(this.currentQuestion);
      if (this.currentQuestion === 2) {
        this.prevBtn = false;
        this.currentQuestion--;
      } else {
        this.prevBtn = true;
        this.currentQuestion--;
      }
    },
    nextPage() {
      if (this.currentQuestion == 9) {
        this.nextBtn = false;
        this.currentQuestion++;
        console.log(this.user)
      } else if (this.currentQuestion == 10) {
        this.show = true;
      } else {
        this.prevBtn = true;
        this.currentQuestion++;
      }

    },
    btn1(choiceitem) {
      console.log(choiceitem[0]);
      console.log(choiceitem[1]);
      console.log(choiceitem[3])
      if (this.currentQuestion == 1) {
        this.isActiveA = true
      }
        
       
      // if (id == 2) {
      //   this.isActiveB = true
      // }
      // else {
      //   this.buttonState1 = true
      // } 
      // if (this.buttonState1 === ) {
        
      //   this.buttonState1 = true;
      // } else {
      //   this.buttonState1 = false
      // }
      // this.practice(choiceitem[0], choiceitem[1])

    },
    btn2(choiceitem) {
      console.log(choiceitem[0]);
      console.log(choiceitem[1]);
      this.practice(choiceitem[0], choiceitem[1])
    },
    btn3(choiceitem) {
      console.log(choiceitem[0]);
      console.log(choiceitem[1]);
      this.practice(choiceitem[0], choiceitem[1])
    },
    practice(item, score) {
      this.items.forEach(element => {
        if (element == item) {
          switch (this.currentQuestion) {
            case 1:
              this.page1 = { name: element, score: score };
              console.log(this.page1);
              break;
            case 2:
              this.page2 = { name: element, score: score };
              console.log(this.page2);
              break;
            case 3:
              this.page3 = { name: element, score: score };
              console.log(this.page3);
              break;
            case 4:
              this.page4 = { name: element, score: score };
              console.log(this.page4);
              break;
            case 5:
              this.page5 = { name: element, score: score };
              console.log(this.page5);
              break;
            case 6:
              this.page6 = { name: element, score: score };
              console.log(this.page6);
              break;
            case 7:
              this.page7 = { name: element, score: score };
              console.log(this.page7);
              break;
            case 8:
              this.page8 = { name: element, score: score };
              console.log(this.page8);
              break;
            case 9:
              this.page9 = { name: element, score: score };
              console.log(this.page9);
              break;
            case 10:
              this.page10 = { name: element, score: score };
              console.log(this.page10);
              break;
          }
        }
      })
    },

    test() {
      console.log(this.page1);
      console.log(this.page2);
      this.users.push(this.page1, this.page2, this.page3, this.page4, this.page5, this.page6, this.page7, this.page8, this.page9, this.page10);
      console.log('あああ');
      let result = [...
        this.users.reduce(
          (m, user) => m.set(user.name, (m.get(user.name) || 0) + user.score)
          , new Map()
        )].map(([name, score]) => ({ name, score }));

      console.log(result);

      // for (変数名 in 連想配列名) { 処理 }
    },
  }
}
  

  

</script>

<style>
/* .buttoncolor {
  background-color: palevioletred;
} */
.classA {
  background-color: palevioletred;
}
.classB {
  background-color: skyblue;
}
</style>

