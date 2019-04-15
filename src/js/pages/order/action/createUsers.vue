<template>
    <div class="col-xs-12">
        <form class="form-horizontal">
            <div class="form-group">
                <div class="col-xs-12">
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
        name: 'create-user-action',
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
                        },
                        {
                            name: 'lastName',
                            title: "Фамилия",
                            titleClass: 'text-center',
                            dataClass: 'text-right',
                            sortField: 'lastName',
                            filtered: false,
                            filtername: "lastName"

                        },
                        {
                            name: 'firstName',
                            titleClass: 'text-center',
                            dataClass: 'text-right',
                            title: "Имя",
                            sortField: 'firstName',
                            filtered: false,
                            filtername: "firstName"

                        },
                        {
                            name: 'middleName',
                            titleClass: 'text-center',
                            dataClass: 'text-right',
                            title: "Отчество",
                            sortField: 'middleName',
                            filtered: false,
                        },
                        {
                            name: 'email',
                            titleClass: 'text-center',
                            dataClass: 'text-right',
                            title: "Email",
                            sortField: 'email',
                            filtered: false,
                            filtername: "email"
                        },
                        {
                            name: 'ouname',
                            titleClass: 'text-center',
                            dataClass: 'text-right',
                            title: "Подразделение",
                            filtered: false
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

            console.log(this.info);


            this.info.users.forEach(function (user) {
                users.data.push({
                    "login": user.login,
                    "lastName": user.lastName,
                    "firstName": user.firstName,
                    "middleName": user.middleName,
                    "email": user.email,
                    "ouname": user.ouname || ""
                });
            })
            this.getTableReference().setData(users);
        },
        props: {
            info: {
                type: Object,
                default () {
                    return {
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
            table-layout: fixed;
            margin-bottom: 0px;
            tr {
                td {
                    border: 0px !important;
                }
            }
        }

    }

</style>
