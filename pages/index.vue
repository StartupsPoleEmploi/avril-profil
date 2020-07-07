<script type="text/javascript">
  import {path} from '~/utils/application';

  export default {
    asyncData: async function(context) {
      context.redirect(path());
    },
  }
</script>