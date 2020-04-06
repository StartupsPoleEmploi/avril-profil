<template>
  <div class="candidature-card card-recevabilite" v-bind:class="{ 'card-filled': isFilled }">
    <h4 class="title is-5">Ma recevabilité</h4>
    <a :href="application.bookletPath" class="button is-rounded" :class="isFilled ? 'edit-button is-small' : 'is-avril'">
      <span v-if="isFilled">
        <span class="icon is-small">
          <IconPencil/>
        </span>
        <span>Éditer</span>
      </span>
      <span v-else>Compléter ma recevabilité</span>
    </a>
  </div>
</template>

<script>
  import IconLocked from '~/components/icons/locked.svg';
  import IconPencil from '~/components/icons/pencil.svg';

  import {hasBookletFinished} from '~/utils/application';

  export default {
    components: {
      IconLocked,
      IconPencil,
    },
    props: {
      application: {},
      isFilled: {},
    },
  }
</script>