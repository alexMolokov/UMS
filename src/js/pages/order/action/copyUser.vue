<template>
    <div class="col-sm-10 col-lg-6 col-xs-12">
        <form class="form-horizontal">
           <div class="form-group">
                <label  class="col-sm-3 control-label">Подразделение:</label>
                <div class="col-sm-9 control-info">
                    <div>
                        <span  v-for="item in info.ou_path">\{{item}}</span>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <vuetable :fields="table.fields"
                              :css="table.css"
                              :api-mode="false"
                              :data-total="info.users.length"
                              :has-filters="false"
                              tableHeight="300px"
                              ref="moveUsersTable"
                    >
                    </vuetable>
                </div>
            </div>


        </form>
    </div>
</template>

<script>
    import Vuetable from "vuetable-2/src/components/Vuetable.vue";

    export default {
        components: {
            Vuetable
        },
        name: 'move-user-action',
        data(){
            return {
                table: {
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
                    fields: [
                        {
                            name: '__sequence',
                            title: '#',
                            titleClass: 'text-center',
                            dataClass: 'text-center',
                            width: "30px"
                        },
                        {
                            name: 'login',
                            title: "Login",
                            titleClass: 'text-center',
                            dataClass: 'text-right',
                            sortField: 'login',
                            filtered: true,
                            filtername: "login"

                        }
                    ]
                },
            }
        },
        mounted: function () {
            let users =  {
                current_page: 1,
                links: {pagination: {total: 1, from: 1}},
                data: []
            };
            this.info.users.forEach(function (user) {
                users.data.push({"login": user});
            })
            this.getTableReference().setData(users);
        },
        props: {
            info: {
                type: Object,
                default () {
                    return {
                        "ou_path": [],
                        "users": []
                    }
                }
            },
        },
        methods: {
            getTableReference() {
                return this.$refs["moveUsersTable"];
            }
        }

    }
</script>
<style lang="scss">

    .control-info {
        padding-top: 7px;
    }

    .selected-users {
        table {
            table-layout: fixed;
        }
    }

    .vuetable-body-wrapper, .vuetable-head-wrapper {
        &::-webkit-scrollbar {
            width: 3px;
            background-color: #F5F5F5;
        }


        table {
            margin-bottom: 0px;
            tr {
                td {
                    border: 0px !important;
                }
            }
        }

    }

</style>
