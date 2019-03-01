<template>
     <div class="input-group">
        <input type="text" v-model="filterText" class="form-control" @keyup.enter="doFilter" :placeholder="searchPlaceHolder">
        <span class="input-group-btn">
                            <button class="btn btn-primary" @click="doFilter" v-translate>Поиск</button>
                            <button class="btn btn-primary" @click="resetFilter" v-translate>Очистить</button>
                          </span>
     </div>
</template>

<script>
    export default {
        props: {
          "searchPlaceHolder": {type: String, default: ""}
        },
        data () {
            return {
                filterText: ''
            }
        },
        methods: {
            doFilter () {
                this.$events.fire('filter-set', this.filterText)
            },
            resetFilter () {
                this.filterText = ''  // clear the text in text input
                this.$events.fire('filter-reset')
            }
        }
    }
</script>

<style scoped="" lang="scss">

    .inline-block {
        display: inline-block;
    }


</style>