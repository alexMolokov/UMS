<template>
     <div class="input-group">
         <button class="btn btn-primary" @click="doSearch" v-translate>Поиск</button>
         <button class="btn btn-primary" @click="resetFilter" v-translate>Очистить</button>
     </div>
</template>

<script>
    export default {
        data () {
            return {

            }
        },
        methods: {
            doSearch(){
                this.$events.fire('search-start');
            },
            resetFilter () {
                this.$events.fire('filter-reset')
            }
        }
    }
</script>

<style scoped="" lang="scss">

    .inline-block {
        display: inline-block;
    }

    .filter-bar {
        button {
            margin-right: 15px;
        }
    }


</style>