<template>
  <div class="avril-next-step level is-blue">
    <div class="level-left">
      <div class="level-item">
        <div>
          <p>{{next}} - {{time}}</p>
          <h2 class="title is-2">{{title}}</h2>
          <p>{{paragraphe}}</p>
        </div>
      </div>
    </div>
    <div class="level-right">
      <div class="level-item">
        <div>
          <a href="#" class="button is-blue is-rounded">{{button}}</a>
          <img :src="`images/next-step/${illustration}.svg`" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    illustration: {
      default: 'test',
      type: String
    },
    next: {
      default: 'Prochaine étape',
      type: String
    } ,
    time: {
      default: '20 - 30 minutes',
      type: String
    } ,
    title: {
      default: 'Prochaine étape',
      type: String
    } ,
    paragraphe: {
      default: 'lorem ipsum',
      type: String
    } ,
    button: {
      default: 'Renseigner la prochaine étape',
      type: String
    } ,
  },
  data() {
    return {
    }
  },
  mounted () {
    console.log(this.illustration)
  }
}
</script>
<style scoped lang="scss">
.avril-next-step {
  padding: 2rem;
  border-radius: 6px;
}
</style>
