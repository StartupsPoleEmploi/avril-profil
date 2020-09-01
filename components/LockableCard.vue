<template>
  <div class="lockable-card" :class="{ 'is-filled': isActuallyFilled, 'has-multiple-layer': hasMultipleLayer }">
    <h4 class="title is-5"><span class="icon" v-if="isLocked"><IconLocked/></span> {{title}}</h4>
    <slot v-if="isActuallyFilled"></slot>
    <component v-if="!isLocked" :is="href ? 'a' : 'nuxt-link'" :href="href" :to="to" class="button" :class="buttonClass" :target="target">
      <span v-if="isFilled">
        <span class="icon is-small">
          <IconPencil/>
        </span>
        <span>Modifier</span>
      </span>
      <span v-else>{{button}}</span>
    </component>
    <div class="help" v-if="hasHelpSlot">
      <slot name="help"></slot>
    </div>
  </div>
</template>

<script>
  import IconLocked from 'avril/images/icons/locked.svg';
  import IconPencil from 'avril/images/icons/pencil.svg';

  import {hasBookletFinished} from '~/utils/application';

  export default {
    components: {
      IconLocked,
      IconPencil,
    },
    computed: {
      hasHelpSlot: function() {
        return this.$slots['help'] && this.isLocked;
      },
      hasDefaultSlot: function() {
        return this.$slots['default'];
      },
      isLockable: function() {
        return typeof this.isLocked === `boolean`;
      },
      isActuallyFilled: function() {
        if (this.isFilled) return true;
        if (this.isLockable) return !this.isLocked;
      },
      buttonClass: function() {
        if (this.isFilled) return `is-rounded is-small is-edit ${this.hasDefaultSlot ? 'is-bottom-right' : ''}`;
        if (this.isLockable) return 'is-text is-rounded';
        return 'is-rounded is-avril';
      },
    },
    props: {
      title: {
        type: String,
        required: true,
      },
      href: {},
      to: {},
      isFilled: {
        type: Boolean,
      },
      isLocked: {},
      hasMultipleLayer: {
        type: Boolean,
        default: false,
      },
      button: {
        type: String,
        required: true,
      },
      help: {
        type: String,
      },
      target: {
        type: String,
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import '~avril/scss/variables';

  .lockable-card {
    height: 100%;
    border: dashed 3px #E5E5E5;
    border-radius: 6px;
    background: #fff;
    padding: 1rem;
    display: block;
    flex-direction: column;
    position: relative;
    z-index: 2;

    &:first-child {
      margin-bottom: 1rem;
    }

    .icon {
      color: rgba(#383838, 0.14);
    }

    @include tablet {
      align-items: flex-start;
      margin-bottom: 1rem;
    }
    @include desktop {
      align-items: flex-start;
    }

    &.is-filled {
      border: 1px solid #E1E1E1;
      position: relative;
      box-shadow: 6px 6px 6px rgba(#333, 0.14);
      transition: all .2s ease-in-out;
      &:hover {
        box-shadow: 10px 10px 16px rgba(#333, 0.08);
        transform: translate(-5px, -5px);
      }
      // > * {
      //   z-index: 99
      // }

      &.has-multiple-layer {
        margin-left: 7px;
        &:after, &:before {
          content: '';
          display: block;
          position: absolute;
          border: 1px solid #E1E1E1;
          background: #fff;
          width: 100%;
          height: 100%;
          top: -7px;
          left: -7px;
          z-index: -1;
          border-radius: 6px;
        }
        &:before {
          left: -3px;
          top: -3px;
          border: 1px solid #E1E1E1;
        }
      }
    }

    .is-edit {
      &.is-bottom-right {
        float: right;
        margin-top: 1rem;
        margin-left: auto;
      }
    }

    .help {
      a {
        color: palette(default, text);
        font-weight: bold;
      }
    }
  }
</style>