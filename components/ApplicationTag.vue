<template>
  <span class="tag" :class="`is-${level}`">{{label}}</span>
</template>
<script type="text/javascript">
  import {parseAndFormat} from 'avril/js/utils/time.js';
  import {
    nextStep,
    isCertificationActive,
    isDelegateInactive,
    hasDelegate,
  } from '~/utils/application';

  export default {
    computed: {
      isCertificationActive: function() {
        return isCertificationActive(this.application);
      },
      isDelegateInactive: function() {
        return isDelegateInactive(this.application);
      },
      label: function() {
        if (!this.isCertificationActive) return 'Diplôme inactif';
        if (this.isDelegateInactive) return 'Certificateur inactif';
        if (this.application.raisedAt) return `Relancée le ${parseAndFormat(this.application.raisedAt)}`;
        if (this.application.submittedAt) return `Transmise le ${parseAndFormat(this.application.submittedAt)}`;
        if (nextStep(this.application) === 'submit') return 'à transmettre';
        return 'à compléter';
      },
      level: function() {
        if (!this.isCertificationActive) return 'warning';
        if (this.isDelegateInactive) return 'warning';
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