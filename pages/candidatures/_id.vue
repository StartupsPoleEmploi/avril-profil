<template>
  <div class="container">
    <div class="avril-container">
      <CandidatureHeader/>
      <CandidatureDetail/>
    </div>
  </div>
</template>

<script>
  import { apiPath } from '../../utils/url';

  export default {

    async asyncData ({ route, params, error }) {
      // try {
        console.log(params)
        console.log(apiPath('application', {id: params.id, isServer: process.server}))
        const result = fetch(apiPath('application', {id: params.id, isServer: process.server}))
        if (result.ok) {
          const data = await result.json();
          console.log(data)
          return data;
        } else {
          console.error('Could not fetch data')
          // route.push('/');
        }
        // const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${+params.id}`)
        // return data
      // } catch (e) {
      //   error({ message: 'Application not found', statusCode: 404 })
      // }
    }
  }
</script>