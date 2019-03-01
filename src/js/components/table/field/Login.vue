<template slot="login" slot-scope="props">
    <router-link :to="{name: 'admin-profile-id', params: { id: props.rowData.id }}">{{props.rowData.login}}</router-link>
</template>

<script>
    export default {
        props: {
            rowData: {
                type: Object,
                required: true
            },
            rowIndex: {
                type: Number
            }
        }
    }
</script>