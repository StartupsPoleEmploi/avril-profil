<script type="text/javascript">
  import {path} from '~/utils/application';

  export default {
    render() {
      return this.$router.push({
          path: path()
      })
    },
  }
</script>