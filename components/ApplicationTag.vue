<template>
  <span class="tag" :class="`is-${level}`">{{label}}</span>
</template>
<script type="text/javascript">
  import {parseAndFormat} from 'avril/js/utils/time.js';
  import {
    nextStep,
    isCertificationActive,
  } from '~/utils/application';

  export default {
    computed: {
      isCertificationActive: function() {
        return isCertificationActive(this.application);
      },
      label: function() {
        if (!this.isCertificationActive) return 'diplôme inactif';
        if (this.application.submittedAt) return `Transmise le ${parseAndFormat(this.application.submittedAt)}`;
        if (nextStep(this.application) === 'submit') return 'à transmettre';
        return 'à compléter';
      },
      level: function() {
        if (!this.isCertificationActive) return 'warning';
        if (this.application.submittedAt) return 'success';
        return 'info';
      },
    },
    props: {
      application: {
        type: Object,
        isRequired: true,
      },
    }
  }
</script>

<style lang="scss" scoped>
  .tag {
    float: right;
    margin-left: 1rem;
  }
</style>