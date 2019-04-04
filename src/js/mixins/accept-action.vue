<script>

export default {
    name: 'accept-action',
    computed: {
        hasOrderId() {
            return this.order.id != ""
        }
    },
    data() {
    return {
        order: {
            id: ""
        }
     }
    }
}
</script>


