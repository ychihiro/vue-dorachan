<template>
  <div class="step-wrapper">
    <button class="step1">1</button>
    <div class="line"></div>
    <button class="step2">2</button>
    <div class="line"></div>
    <button class="step3">3</button>
  </div>
  <div class="guide-wrapper">
    <p class="guide1">カートの商品</p>
    <p class="guide2">お客様情報登録</p>
    <p class="guide3">ご注文内容確認</p>
  </div>
</template>

<script>
export default {
  name: 'StepItem'
}
</script>

<style scoped>
.step-wrapper,
.guide-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.step1,
.step2,
.step3 {
  width: 70px;
  height: 70px;
  font-size: 22px;
  border-radius: 50%;
  border: none;
}
.step1 {
  color: #fff;
  font-weight: bold;
  background-color: #D1DA6D;
}
.line {
  width: 120px;
  height: 3px;
  background-color: #777;
}
.guide1 { margin-right: 0px; }
.guide2 { 
  margin-left: 75px;
  /* margin-right: 10px; */
}
.guide3 { margin-left: 70px; }
</style>