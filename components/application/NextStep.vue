<template>
  <div class="avril-next-step notification is-info" :class="nextStep.color ? `is-${nextStep.color}` : ''" v-if="nextStep">
    <div class="columns is-mobile is-vcentered">
      <div class="column">
        <p v-if="!nextStep.isLast"><span>Prochaine étape {{nextStep.isSuggested ? 'conseillée' : ''}}</span></p>
        <h2 class="title is-2">{{nextStep.title}}</h2>
        <div class="content" v-html="description"></div>
        <div v-if="nextStep.isLast" style="margin-top: 1rem;">
          <h5 class="title is-6" style="margin: 0;">{{delegateName}}</h5>
          <Address :address="delegateAddress" />
          <p v-if="delegateEmail"><a :href="`mailto:${delegateEmail}`">{{delegateEmail}}</a></p>
          <p v-if="delegatePhone"><a :href="`tel:${delegatePhone}`">{{delegatePhone}}</a></p>
        </div>
        <ApiButton
          v-if="nextStep.api"
          v-bind="nextStep.api(application)"
          class="button is-info is-inverted is-rounded"
          :disabled="actionDisabled"
        >{{nextStep.button}}</ApiButton>
        <nuxt-link
          v-else-if="nextStep.to"
          :to="nextStep.to(application)"
          class="button is-info is-inverted is-rounded"
        >{{nextStep.button}}</nuxt-link>
        <a
          v-else-if="nextStep.href"
          :href="nextStep.href(application)"
          class="button is-info is-inverted is-rounded"
        >{{nextStep.button}}</a>
        <div class="notification is-warning" v-if="nextStep.isLast && isEducNatSummerBreak" style="margin-top: 2rem;">
          <p class="has-text-weight-bold">Pour information, certains certificateurs comme le réseau DAVA ne seront en mesure d'assurer le traitement de  votre candidature qu'à compter du 1er septembre compte tenu des congés d'été.</p>
        </div>
      </div>
      <div class="column is-narrow is-hidden-mobile">
        <img :src="`images/next-step/${nextStep.illustration}.svg`" :alt="!nextStep.isLast ? 'Illustration de la prochaine étape' : ''" class="illustration">
      </div>
    </div>
  </div>
</template>

<script>
  import get from 'lodash.get';
  import { isWithinInterval } from 'date-fns';
  import nextStepsData from '~/contents/data/applicationNextSteps';
  import ApiButton from '~/components/ApiButton';
  import Address from '~/components/Address';

  import {
    certifierName,
    delegateName,
    delegateAddress,
    delegatePhone,
    delegateEmail,
    EDUC_NAT,
    isAsp,
  } from '~/utils/application';

  export default {
    components: {
      ApiButton,
      Address,
    },
    computed: {
      nextStep: function() {
        const key = this.$store.getters.nextApplicationStep(this.application);
        const nextStep = nextStepsData[key];
        return {
          ...nextStep,
          ...(nextStep.isLast && isAsp(this.application) ? {
            title: 'Votre candidature est bien enregistrée',
            description: `L'ASP, qui gère les demandes de recevabilité pour votre diplôme,
            a mis en place un site spécifique. Conservez bien ce que vous venez de saisir
            et télécharger le afin de renseigner votre dossier directement dans leur service :
            https://vaedem.asp-public.fr/vaedems/. Vous pourrez aussi imprimer le dossier saisi
            dans leur site et l'adresser par courrier  à l'adresse ci-dessous :`,
          } : {})
        };
      },
      delegateName: function() {
        return delegateName(this.application);
      },
      delegateAddress: function() {
        return delegateAddress(this.application);
      },
      delegatePhone: function() {
        return delegatePhone(this.application);
      },
      delegateEmail: function() {
        return delegateEmail(this.application);
      },
      description: function() {
        return this.$md.render(this.nextStep.description)
      },
      isEducNatSummerBreak: function() {
        return certifierName(this.application) === EDUC_NAT && isWithinInterval(
          new Date(),
          { start: new Date(2020, 6, 13), end: new Date(2020, 7, 31) }
        );
      },
      actionDisabled: function() {
        return this.nextStep.disabledAction && this.nextStep.disabledAction(this.application);
      }
    },
    props: {
      application: {
        type: Object,
      }
    },
  }
</script>
<style scoped lang="scss">
  .avril-next-step {
    padding: 2rem;
    border-radius: 6px;
    position: relative;
  }
  .button {
    margin-top: 1rem;
  }
</style>
