<template>
    <ul v-show="tablePagination && tablePagination.last_page > 1" :class="css.wrapperClass">
        <li :class="[isOnFirstPage ? css.disabledClass : '']">
            <a @click.stop.prevent="loadPage(1)"  href="#">
            <i v-if="css.icons.first != ''" :class="[css.icons.first]"></i>
            <span v-else>&laquo;</span>
        </a></li>
        <li :class="[isOnFirstPage ? css.disabledClass : '']"><a @click.stop.prevent="loadPage('prev')" href="#">
            <i v-if="css.icons.next != ''" :class="[css.icons.prev]"></i>
            <span v-else>&nbsp;&lsaquo;</span>
        </a></li>
        <template v-if="notEnoughPages">
            <template v-for="n in totalPage">
                <li :class="[css.pageClass, isCurrentPage(n) ? css.activeClass : '']">
                    <a @click.stop.prevent="loadPage(n)" href="#" v-html="n"></a>
                </li>
            </template>
        </template>
        <template v-else>
            <template v-for="n in windowSize">
                <li :class="[css.pageClass, isCurrentPage(windowStart+n-1) ? css.activeClass : '']">
                    <a href="#" @click.stop.prevent="loadPage(windowStart+n-1)"v-html="windowStart+n-1"></a>
                </li>
            </template>
        </template>
        <li :class="[isOnLastPage ? css.disabledClass : '']">
            <a @click.stop.prevent="loadPage('next')"  href="#">
            <i v-if="css.icons.next != ''" :class="[css.icons.next]"></i>
            <span v-else>&rsaquo;&nbsp;</span>
        </a></li>
        <li :class="[isOnLastPage ? css.disabledClass : '']">
            <a @click.stop.prevent="loadPage(totalPage)"  href="#">
            <i v-if="css.icons.last != ''" :class="[css.icons.last]"></i>
            <span v-else>&raquo;</span>
        </a></li>
    </ul>
</template>

<script>
    import PaginationMixin from 'vuetable-2/src/components/VuetablePaginationMixin.vue'

    export default {
        mixins: [PaginationMixin],
    }
</script>
