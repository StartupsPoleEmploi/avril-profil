<template>
  <div class="avril-next-step level is-blue">
    <div class="level-left">
      <div class="level-item">
        <div>
          <p>{{next}} - {{time}}</p>
          <h2 class="title is-2">{{title}}</h2>
          <p>{{paragraphe}}</p>
          <nuxt-link to="/identite" class="button is-blue is-rounded">{{button}}</nuxt-link>
        </div>
      </div>
    </div>
    <div class="level-right">
      <div class="level-item">
        <img :src="`images/next-step/${illustration}.svg`" alt="Illustration de la prochaine étape" class="illustration">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    illustration: {
      default: 'man',
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
  mounted () {
    console.log(this.illustration)
  }
}
</script>
<style scoped lang="scss">
@import '~bulma/sass/utilities/all';
.avril-next-step {
  padding: 2rem;
  border-radius: 6px;
  position: relative;
}
.level-item {
  @include desktop {
    justify-content: flex-start;
  }
}
.button {
  margin-top: 1rem;
}
.illustration {
  position: absolute;
  @include until( $tablet + 10 ) {
    display: none;
  }
  @include desktop {
    top: -20px;
    right: 30px;
  }
  @include until( $desktop + 100 ){
    right: -30px;
  }
}
</style>
