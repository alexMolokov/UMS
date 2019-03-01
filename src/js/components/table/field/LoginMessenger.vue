<template>
    <router-link :to="{name: 'messenger-profile-id', params: { id: props.rowData.login }}">{{props.rowData.login}}</router-link>
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