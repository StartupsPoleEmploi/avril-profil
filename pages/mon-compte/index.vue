<template>
  <div class="form">
    <h3 class="title is-6">Informations obligatoires</h3>
    <div class="columns">
      <div class="column is-4">
        <IdentityField
          type="text"
          field="lastName"
          label="Nom" />
      </div>
      <div class="column is-8">
        <IdentityField
          type="text"
          field="firstName"
          label="Prénoms" />
      </div>
    </div>
    <div class="columns">
      <div class="column is-4">
        <IdentityField
          type="date"
          field="birthday"
          label="Date de naissance" />
      </div>
      <div class="column is-8">
        <IdentityField
          type="geo"
          geotype="city"
          field="birthPlace"
          label="Ville de naissance" />
      </div>
    </div>
    <div class="columns">
      <div class="column is-4">
        <IdentityField
          type="select"
          field="gender"
          label="Genre"
          :options="{m: 'Masculin', f: 'Féminin'}" />
      </div>
      <div class="column is-8">
        <IdentityField
          type="geo"
          geotype="country"
          field="nationality"
          label="Nationalité" />
      </div>
    </div>
    <h3 class="title is-6">Informations optionnelles</h3>
    <div class="columns">
      <div class="column is-12">
        <IdentityField
          type="text"
          field="usageName"
          label="Nom d'usage" />
      </div>
    </div>
    <IdentitySaveButtons to="/mon-compte/situation-professionnelle" />
  </div>
</template>

<script>
  import IdentitySaveButtons from '~/components/IdentitySaveButtons.vue';
  import IdentityField from '~/components/IdentityField.vue';

  export default {
    components: {
      IdentityField,
      IdentitySaveButtons,
    },
  }
</script>