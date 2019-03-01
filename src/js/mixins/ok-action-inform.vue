<template>
    <div class="alert alert-success alert-dismissible" v-if="state == STATES.ANSWER">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
        <slot name="ok-message"></slot>
    </div>
</template>



<script>
import {STATES} from "./states";

export default {
  name: 'ok-action-inform',
  props: {
        state: {type: Number, default: STATES.START},
  },
  data(){
      return {
          STATES: STATES
      }
  },
  methods: {
      close: function() {
          this.$emit('close');
      }
  }
}
</script>   


