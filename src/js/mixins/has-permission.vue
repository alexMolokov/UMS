
<script>
import {PERMISSIONS} from './permissions';
import {mapGetters, mapMutations } from 'vuex'

export default {
  name: 'has-permission',
  data () {
    return {
        permissions: PERMISSIONS
     }
  },
  computed: {
      ...mapGetters(["hasPermission"])
  }
}
</script>   


