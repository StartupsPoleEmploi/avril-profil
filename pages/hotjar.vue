<template>
  <div class="has-text-centered">
    <h1 class="title">Page test d'Hotjar</h1>
    <DatePicker
      :class="`input is-large`"
      v-model="date"
      :placeholder="label"
      default-panel="year"
      format="datePickerFormat"
    />
    <p>{{date}}</p>
  </div>
</template>

<script type="text/javascript">
  import DatePicker from 'avril/js/components/DatePicker.vue';

  export default {
    components: {
      DatePicker,
    },
    data(){
      return {
        date: '',
        label: 'Birthday',
      }
    },
  }
</script>