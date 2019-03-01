<template>
    <div>
        <router-view />
    </div>

</template>

<script type="text/ecmascript-6">
import { mapGetters, mapMutations } from 'vuex'
import ajaxform from '../mixins/ajax-form.vue';



export default {
    name: 'app',
    props: {
    },
    data() {
        return {
            langMenu: false,
        }
    },
    computed: {

    }
    ,
    mixins: [ajaxform],
    methods: {

    },
    locales: {
        ru: {


        }
    }
}
</script>



