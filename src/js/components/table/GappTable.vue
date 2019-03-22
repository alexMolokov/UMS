<template>
    <div class="box-body">
       <div class="row" style="margin-bottom: 20px">
                                    <div class="col-xs-12">
                                        <div class="pull-left filter-bar">
                                            <filter-bar></filter-bar>
                                        </div>

                                        <div class="pull-right create-button" v-if="table.buttons.create">
                                            <button type="button" class="btn btn-block btn-primary" @click="onCreate">Создать</button>
                                        </div>

                                        <slot name="add-buttons"></slot>


                                    </div>
                                </div>
       <div class="row">
                                    <div class="col-xs-12">
                                        <vuetable ref="vuetable" http-method="post"
                                                  :api-url="table.apiUrl"
                                                  :fields="table.fields"
                                                  :css="table.css"
                                                  :row-class="table.rowClass"
                                                  pagination-path=""
                                                  :track-by="table.trackBy"
                                                  :http-method="'post'"
                                                  :sort-order="table.sortOrder"
                                                  :append-params="table.moreParams"
                                                  @vuetable:pagination-data="onPaginationData"
                                                  @vuetable:checkbox-toggled="checkboxToggled"
                                                  @vuetable:checkbox-toggled-all="checkboxToggledAll"
                                        >
                                            <template slot="login" slot-scope="props" v-if="isRender('login')">
                                                <router-link :to="{name: 'admin-profile-id', params: { id: props.rowData.id }}">{{props.rowData.login}}</router-link>
                                            </template>

                                            <template slot="role" slot-scope="props" v-if="isRender('role')">
                                                <router-link :to="{name: 'admin-role-id', params: { id: props.rowData.id }}">{{props.rowData.name}}</router-link>
                                            </template>

                                            <template slot="loginMessenger" slot-scope="props" v-if="isRender('loginMessenger')">
                                                <router-link :to="{name: 'messenger-profile-id', params: { id: props.rowData.login }}">{{props.rowData.login}}</router-link>
                                            </template>

                                        </vuetable>
                                    </div>
                                </div>
       <div class="row">
                                    <div class="col-xs-12">
                                        <div class="pull-left pagination">
                                            <vuetable-pagination-info ref="paginationInfo" :info-template="infoTemplate"></vuetable-pagination-info>
                                        </div>
                                        <div class="pull-right">
                                            <vuetable-pagination :css="cssPagination.pagination" ref="pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination>
                                        </div>
                                    </div>
                                </div>
   </div>
</template>

<script type="text/ecmascript-6">
    import { mapState, mapGetters, mapMutations } from 'vuex'
    import Vuetable from "vuetable-2/src/components/Vuetable.vue";
    import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'
    import VuetablePagination from './VuetablePagination'
    import FilterBar from './FilterBar.vue'
    import CssConfig from './VuetableCssConfig.js'
    import Vue from 'vue';
    import LoginMessenger from "../../components/table/field/LoginMessenger.vue";

    export default {
        name: 'gapp-table',
        props: {
            tableProperties: {
                type: Object,
                default () {
                    return {}
                }
            },
            tableDataAdd: { type: Array, default: function(){return []} },

        },
        watch: {
            tableDataAdd: {
                handler: function() {
                    let len = this.tableDataAdd.length;
                    let vuetable  = this.$refs.vuetable;

                    for(let i=0; i< len; i++)
                    {
                        vuetable.tableData.unshift(this.tableDataAdd[i]);
                    }



                },
                deep: true
            }
        },
        data() {
            return {
                table: Object.assign({
                    trackBy: 'id',
                    sortOrder: [{}],
                    rowClass: function(dataItem, index){ return ""},
                    fields: [],
                    css: {
                        tableClass: "table table-bordered table-striped dataTable",
                        loadingClass: 'loading',
                        ascendingIcon: 'fa fa-sort-amount-asc',
                        descendingIcon: 'fa fa-sort-amount-desc',
                        detailRowClass: 'vuetable-detail-row',
                        handleIcon: 'grey sidebar icon',
                        sortableIcon: 'sortable-hidden',
                        tableFilterClass: "form-control"
                    },
                    apiUrl: "",
                    moreParams: {},
                    searchPlaceHolder: "",
                    buttons: {
                        create: true
                    }
                },this.tableProperties),
                infoTemplate: 'Показано с {from} по {to} из {total}',
                cssPagination: CssConfig


            }
        },
        components: {
            Vuetable,
            VuetablePagination,
            VuetablePaginationInfo,
            FilterBar,
            LoginMessenger
          },
        mounted() {
            this.$events.$on('filter-reset', e => this.onFilterReset());
            this.$events.$on('search-start', e => this.onStartSearch());
        },
        methods: {
            checkboxToggled: function(isChecked, dataItem) {
                this.$emit("gapptable:checkbox-toggled", {"isChecked": isChecked, "item": dataItem});
            },
            checkboxToggledAll: function(isChecked, selectedTo) {
                this.$emit("gapptable:checkbox-toggled-all", {"isChecked": isChecked, "items": selectedTo});
            },
            reload: function() {
                this.$refs["vuetable"].reload();
            },
            checkboxUnSelect: function() {
                this.$refs["vuetable"].unselectAll();
            },
            onCreate: function() {
                this.$emit("gapptable:create", {});
            },
            isRender: function(type) {

                if(typeof this.table.slots[type] != "undefined") return true;

                return false;
            },
            onPaginationData (paginationData) {
                this.$refs.pagination.setPaginationData(paginationData);
                this.$refs.paginationInfo.setPaginationData(paginationData);
            },
            onChangePage (page) {
                this.$refs.vuetable.changePage(page)
            },
            onFilterReset () {
                this.$refs.vuetable.clearAllFilter();
                Vue.nextTick( () => this.$refs.vuetable.refresh())
            },
            onStartSearch(){
                Vue.nextTick( () => this.$refs.vuetable.refresh())
            }
        },
        locales: {
            ru: {

            }
        }

    }
</script>

<style lang="scss" scoped="">
    .filter-bar {
        max-width: 400px;
    }


    @media (max-width: 600px) {
        .filter-bar {
            float: none !important;
            max-width: none;
        }

        .create-button {
            margin-top: 20px;
        }
    }


</style>
