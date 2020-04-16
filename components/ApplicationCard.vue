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
  @import '~assets/scss/variables';

  .candidatures-card {
    height: 100%;
    border-radius: 6px;
    background: #fff;
    padding: 3rem;
    flex-direction: column;
    z-index: 2;
    border: 1px solid #E1E1E1;
    position: relative;
    box-shadow: 6px 6px 6px rgba(#333, 0.14);
    transition: all .2s ease-in-out;
    .level-item {
      display: block
    }
    &:hover {
      box-shadow: 10px 10px 16px rgba(#333, 0.08);
      transform: translate(-5px, -5px);
    }
    > * {
      z-index: 99
    }

    @include tablet {
      // align-items: flex-start;
      margin-bottom: 1rem;
    }
    @include desktop {
      // align-items: flex-start;
    }
    &.is-small {
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
