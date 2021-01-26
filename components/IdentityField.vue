<template>
  <div class="field">
    <label :class="`label ${isMissingAndRequired ? 'is-required' : ''}`">{{label}}</label>
    <div class="control">

      <div v-if="isClient && type === types.date">
        <client-only placeholder="Chargement du calendrier ...">
          <date-picker :input-class="`input is-large ${isMissingAndRequired ? 'is-danger' : ''}`" :value="value" @input="editField" :format="datePickerFormat" :placeholder="label" default-panel="year"/>
        </client-only>
      </div>

      <CountrySelect v-else-if="type === types.country" :input="editField" :value="value" :placeholder="label" />
      <BanGeoInput v-else-if="type === types.geo" :input="editField" :value="value" :type="geotype" :placeholder="label" :inputclass="`input is-large ${isMissingAndRequired ? 'is-danger' : ''}`" />

      <PhoneInput v-else-if="type === types.phone" class="input is-large" :class="isMissingAndRequired ? 'is-danger' : ''" :placeholder="label" :value="value" @input="editField" />

      <div v-else-if="type === types.select" class="select is-large is-fullwidth" :class="isMissingAndRequired ? 'is-danger' : ''">
        <select @change="editField" :value="value">
          <option :value="null">{{label}}</option>
          <option v-for="(v, k) in options" :value="k">{{v}}</option>
        </select>
      </div>

      <input v-else class="input is-large" :class="isMissingAndRequired ? 'is-danger' : ''" :type="inputTextType" :placeholder="label" :value="value" @input="editField">
    </div>
  </div>
</template>
<script type="text/javascript">
  import { parseISODate, formatISODate } from 'avril/js/utils/time';
  import {isBlank} from 'avril/js/utils/boolean';
  import {include} from 'avril/js/utils/array';
  import withDatePickerMixin from 'avril/js/mixins/withDatePicker.js';
  import CountrySelect from 'avril/js/components/CountrySelect.vue';
  import BanGeoInput from 'avril/js/components/BanGeoInput.vue';
  import PhoneInput from 'avril/js/components/PhoneInput.vue';

  const INPUT_TYPES = {
    text: 'text',
    select: 'select',
    date: 'date',
    geo: 'geo',
    country: 'country',
    phone: 'phone',
    email: 'email',
  }

  const valueMapper = type => {
    switch(type) {
      case INPUT_TYPES.date:
        return parseISODate;
      case INPUT_TYPES.select:
        return s => s && s[0];
      default:
        return v => v;
    }
  }

  const inputMapper = type => {
    switch(type) {
      case INPUT_TYPES.date:
        return formatISODate;
      case INPUT_TYPES.geo:
        return v => Object.fromEntries(Object.entries(v).filter(([k, v]) => k !== 'administrative' ));
      case INPUT_TYPES.phone:
      case INPUT_TYPES.country:
        return v => v;
      default:
        return e => e.target.value;
    }
  }

  export default {
    mixins: [
      withDatePickerMixin,
    ],
    components: {
      BanGeoInput,
      CountrySelect,
      PhoneInput,
    },
    computed: {
      isClient() {
        return !!process.client;
      },
      isMissingAndRequired: function() {
        const mandatoryState = this.$store.getters['identity/mandatoryState'];
        return include(Object.keys(mandatoryState), this.field) && isBlank(mandatoryState[this.field]);
      },
      value: function() {
        return valueMapper(this.type)(this.$store.state.identity[this.field]);
      },
      inputTextType: function() {
        return this.type === INPUT_TYPES.email ? 'email' : 'text';
      },
    },
    data: function() {
      return {
        credentials: process.env.algoliaCredentials,
        types: INPUT_TYPES,
      }
    },
    methods: {
      editField: function(value) {
        this.$store.commit('identity/updateState', {[this.field]: inputMapper(this.type)(value)})
      },
    },
    props: {
      geotype: {
        type: String,
      },
      type: {
        type: String,
        isRequired: true,
        validator: p => include(Object.values(INPUT_TYPES), p),
      },
      field: {
        type: String,
        isRequired: true,
      },
      label: {
        type: String,
        isRequired: true,
      },
      options: {
        type: Object,
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '~avril/scss/variables';

  .label {
    &.is-required {
      &:after {
        content: ' (requis)';
        color: $danger;
      }
    }
  }
</style>