<template>
  <div class="candidatures-card" :class="`is-${size}`">
    <div class="level">
      <div class="level-left has-text-left">
        <div class="level-item">
          <nuxt-link :to="applicationPath">
            <h3 class="title" :class="`is-${size === 'small' ? 5 : 3}`">{{certificationName}}</h3>
          </nuxt-link>
          <div class="label-avril">Équivalence {{certificationLevel}}</div>
        </div>
      </div>
      <div class="level-right" v-if="!isFilled">
        <span class="tag is-info">à compléter</span>
      </div>
    </div>
    <p>Candidature démarrée le {{applicationStarted}}</p>

    <nuxt-link :to="applicationPath" class="button is-text is-edit is-rounded">
      {{isFilled ? 'Voir ma candidature' : 'Compléter ...'}}
    </nuxt-link>
  </div>
</template>
<script type="text/javascript">
  import {path} from '~/utils/application';
  import {name, levelToLevelLabel} from '~/utils/certification';
  import {isFilled} from '~/utils/application';
  import {parseAndFormat} from 'avril/js/utils/time.js';

  export default {
    computed: {
      certificationName: function() {
        return name(this.application.certification)
      },
      certificationLevel: function() {
        return levelToLevelLabel(this.application.certification.level)
      },
      applicationStarted: function() {
        return parseAndFormat(this.application.insertedAt);
      },
      applicationPath: function() {
        return path(this.application);
      },
      isFilled: function() {
        return isFilled(this.application);
      },
    },
    props: {
      application: {
        type: Object,
        required: true,
      },
      size: {
        type: String,
        default: 'normal',
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '~avril/scss/variables';

  .candidatures-card.is-small {
    padding-bottom: 1rem;
    .level{
      display: block;
      &-left, &-right {
        display: block;
      }
    }
    .tag {
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
  }
  .button.is-edit {
    margin-top: 1rem;
    margin-left: auto;
    font-weight: normal;
    color: palette(default, title);
    padding: 0;
    &:hover {
      background: none;
    }
  }
</style>
