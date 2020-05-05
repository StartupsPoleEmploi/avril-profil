<script type="text/javascript">
  import {first} from 'avril/js/utils/array';
  import {path} from '~/utils/application';

  export default {
    render() {
      return this.$router.push({
          path: path()
      })
    },
  }
</script>