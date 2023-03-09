<template>
  <h1>診断名を入力</h1>
  <label for="">診断名
  <input type="text" v-model="diagnosis_name" placeholder="ドラえもん性格診断">
  </label>
    <div v-for="(character, index) in characters" :key="character">
      <div v-if="number > index">
      <character-input 
      v-model:name="character.character_name" 
      v-model:path="character.path" 
      v-model:description="character.description"
      ></character-input>
      <input type="file" ref="upfile" @change="upload">
      <character-point
      :characters="character"
      v-model:cooperation="character.cooperation"
      v-model:extroversion="character.extroversion"
      v-model:sincerity="character.sincerity"
      v-model:openness="character.openness"
      v-model:nerve="character.nerve"
      ></character-point>
    </div>
  </div>
  <button @click="add">追加</button>
  <button @click="del">削除</button>
  <!-- <question-input
  v-model:content="questions[index]"
  ></question-input> -->
  <div v-for="(number, index) in 2" :key="number">
  <p>質問{{ number }}</p>
  <textarea v-model="questions[index]"></textarea>
  <p>選択肢</p>
  <div>
  <textarea v-model="contents[0][index]"></textarea>
  <button @click="btn(1, index, 'one')">1</button>
  <button @click="btn(2, index, 'one')">2</button>
  <button @click="btn(3, index, 'one')">3</button>
  </div>
  <div>
  <textarea v-model="contents[1][index]"></textarea>
  <button @click="btn(1, index, 'two')">1</button>
  <button @click="btn(2, index, 'two')">2</button>
  <button @click="btn(3, index, 'two')">3</button>
  </div>
  <div>
  <textarea v-model="contents[2][index]"></textarea>
  <button @click="btn(1, index, 'three')">1</button>
  <button @click="btn(2, index, 'three')">2</button>
  <button @click="btn(3, index, 'three')">3</button>
  </div>
  <p>カテゴリー</p>
  <select v-model="selected[index]">
    <option value="cooperation">協調性</option>
    <option value="extroversion">外向性</option>
    <option value="sincerity">誠実性</option>
    <option value="openness">開放性</option>
    <option value="nerve">神経症的傾向</option>
  </select>
  <!-- <p>得点</p>
  <div v-for="point in 3" :key="point">
  <label>{{ point }}
  <input v-model="score[index]" type="radio" :value="point" :name="score" >
  </label>
  </div> -->
  </div>
  <button @click="test">練習</button>
  <button @click="send">作成</button>
</template>

<script>
// import axios from 'axios';
import Character from '@/components/Character.vue';
import RadioBtn from '@/components/RadioBtn.vue';
// import Question from '@/components/QuestionItem.vue';
// import Choice from '@/components/Choice.vue';
export default {
  components: {
    'character-input': Character,
    'character-point': RadioBtn,
    // 'question-input': Question,
    // 'choice-input': Choice,
  },
  data() {
    return {
      diagnosis_name: '',
      characters: [{
        id1: 1,
        id2: 6,
        id3: 11,
        id4: 16,
        id5: 21,
        character_name: '',
        path: '',
        description: '',
        cooperation: 1,
        extroversion: 1,
        sincerity: 1,
        openness: 1,
        nerve: 1
      }],
      number: 1,
      questions: [],
      content: [],
      selected: [],
      choices: [],
      choices2: [{}, {}, {}],
      scores: [{}, {}, {}],
      contents: [{}, {}, {}],
      // contents: [
      //   { content1: [] },
      //   { content2: [] },
      //   { content3: [] }
      // ],
      category: []
    }
  },
  methods: {
    test() {
      console.log('テスト')
      console.log(this.contents.length)
      for (let j = 0; j < 2; j++) {
        for (let i = 0; i < this.contents.length; i++) {
          let obj = new Object;
          obj.content = this.contents[i][j]
          this.contents.push(obj)
        }
      }
      // console.log(this.contents)
      // console.log(this.selected)
      // for (let i = 0; i < this.selected.length; i++) {
      //   let obj = new Object;
      //   obj.category = this.selected[i]
      //   this.selected[i] = obj
      // }

      // let a = [
      //   {}, {}, {}
      // ]
      
      // console.log(a)
      // console.log(this.selected)
      console.log('score')
      console.log(this.scores)
      console.log('content')
      console.log(this.contents)
      // let box = [{}, {}, {}]
      // console.log(this.contents[0].content1[0])
      // for (let i = 0; i < 3; i++) {
      //   let obj1 = new Object;
      //   obj1.content1 = this.contents[0].content1[i]
      //   box[0][i] = obj1
      //   let obj2 = new Object;
      //   obj2.content2 = this.contents[1].content2[i]
      //   box[1][i] = obj2
      //   let obj3 = new Object;
      //   obj3.content3 = this.contents[2].content3[i]
      //   box[2][i] = obj3
      // }
      // console.log('結果')
      // console.log(box)
      
      // for (let i = 0; i < 2; i++) {
      //   this.choices2[0][i] = Object.assign(box[0][i], this.scores[0][i], this.selected[i]);
      //   this.choices2[1][i] = Object.assign(box[1][i], this.scores[1][i], this.selected[i]);
      //   this.choices2[2][i] = Object.assign(box[2][i], this.scores[2][i], this.selected[i]);
      // }
      // console.log(this.choices2)
      
    },
    btn(number, index, item) {
      console.log(number)
      // console.log(index)
      // console.log(item)
        let obj = new Object;
      if (item === 'one') {
        obj.score = number;
        this.scores[0][index] = obj;
      } else if (item === 'two') {
        obj.score = number;
        this.scores[1][index] = obj;
      } else {
        obj.score = number;
        this.scores[2][index] = obj;
      }
      // console.log(this.scores)
    },
    upload() {
      for (let i = 0; i < this.characters.length; i++) {
        this.characters[i].path = this.$refs.upfile[i].files[0]
      }
    },
    async send() {
      console.log('テスト')
      console.log(this.characters)
      const data = new FormData;
      data.append('diagnosis_name', this.diagnosis_name);
      // this.characters.filter(element => {
      //   data.append('character_name[]', element.character_name);
      //   data.append('upfile[]', element.path);
      //   data.append('description[]', element.description);
      //   data.append('cooperation[]', parseInt(element.cooperation));
      //   data.append('extroversion[]', parseInt(element.extroversion));
      //   data.append('sincerity[]', parseInt(element.sincerity));
      //   data.append('openness[]', parseInt(element.openness));
      //   data.append('nerve[]', parseInt(element.nerve));
      // });

      for (let i = 0; i < this.selected.length; i++) {
        let obj = new Object;
        obj.category = this.selected[i]
        this.selected[i] = obj
      }
      console.log(this.selected)

      let box = [{}, {}, {}]
      console.log(this.contents[0].content1[0])
      for (let i = 0; i < 3; i++) {
        let obj1 = new Object;
        obj1.content = this.contents[0].content1[i]
        box[0][i] = obj1
        let obj2 = new Object;
        obj2.content = this.contents[1].content2[i]
        box[1][i] = obj2
        let obj3 = new Object;
        obj3.content = this.contents[2].content3[i]
        box[2][i] = obj3
      }

      for (let i = 0; i < 2; i++) {
        this.choices2[0][i] = Object.assign(box[0][i], this.scores[0][i], this.selected[i]);
        this.choices2[1][i] = Object.assign(box[1][i], this.scores[1][i], this.selected[i]);
        this.choices2[2][i] = Object.assign(box[2][i], this.scores[2][i], this.selected[i]);
      }

      console.log('ちゃらんじ')
      console.log(this.choices2)

      // for (let i = 0; i < this.content.length; i++) {
      //   let obj = new Object;
      //   obj.content = this.content[i]
      //   obj.category = this.selected[i]
      //   obj.score = this.score[i]
      //   this.choices.push(obj);
      // }
      // console.log(this.choices)
      this.questions.forEach(element => {
        data.append('content[]', element);
        for (let i = 0; i < this.choices2.length; i++) {
          data.append('content2[]', this.choices2[i][0].content)
          data.append('category[]', this.choices2[i][0].category)
          data.append('score[]', this.choices2[i][0].score)
        }
      });

      this.questions.forEach(element => {
        data.append('content[]', element);
        for (let i = 0; i < this.choices.length; i++) {
          data.append('content2[]', this.choices[i].content)
          data.append('category[]', this.choices[i].category)
          data.append('score[]', this.choices[i].score)
        }
      });
      

      // this.choices.forEach(element => {
      //   data.append('content2[]', element.content)
      //   data.append('category[]', element.category)
      //   data.append('score[]', element.score)
      // })
      // await axios.post("http://localhost:8000/api/v1/diagnosis", data)
      //   .then(res => { console.log(res.data) });
    },
    add() {
      this.number++;
      const characterBox = {
        id1: this.characters[this.characters.length - 1].id1 + 1,
        id2: this.characters[this.characters.length - 1].id2 + 1,
        id3: this.characters[this.characters.length - 1].id3 + 1,
        id4: this.characters[this.characters.length - 1].id4 + 1,
        id5: this.characters[this.characters.length - 1].id5 + 1,
        character_name: '',
        path: '',
        description: '',
        cooperation: 1,
        extroversion: 1,
        sincerity: 1,
        openness: 1,
        nerve: 1
      }
      this.characters.push(characterBox)
      console.log(this.characters)
    }
    ,
    del() {
      this.number--;
      this.characters.pop()
    }
  }
}
</script>