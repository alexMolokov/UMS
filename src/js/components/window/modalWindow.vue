<template>
<div class="modal fade modal-default" tabindex="-1" role="dialog" :id="id" @click="close">
    <div class="modal-dialog" :class="{'modal-dialog-wide': wide}"   role="document" @click="clickInside">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="bclose"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title"><slot name="title">Modal Title</slot></h4>
            </div>
            <slot></slot>
        </div>
    </div>
</div>
</template>
<script>
export default {
  name: 'modal-window',
  props: {
        id: {type: String, required: true},
        show: {type: Boolean, required: false},
        wide: {type: Boolean, default: false}
    },
  watch: {
      show: function() {
          if(this.show)
          {
            $('body').addClass('dialog-open');
            $('body').addClass('modal-open');
          } else  {
            $('body').removeClass('dialog-open');
            $('body').removeClass('modal-open');
          }
      }
  },   
  methods: {
      close: function(e){
          let el = (typeof e.srcElement != "undefined")?  e.srcElement: e.target;
          if(el == "input" && el.type == "radio") return;
              e.stopPropagation();

          this.$emit('close')
      },
      clickInside(e){

          let el = (typeof e.srcElement != "undefined")?  e.srcElement: e.target;
          if(el != "input" || el.type != "radio")
                  e.stopPropagation();
      },
      bclose: function()
      {
         $("#" + this.id).trigger('click');
      }
      
  }
}

</script>
<style scoped="" lang="scss">
    .modal {
        overflow: auto;
        overflow-y: scroll;

    }

    .modal-default {
        .modal-header {
            background-color: #3c8dbc;
            border-bottom: none;
            color: #fff;

            .close {
                color: #fff;
                opacity: 0.8;
            }
        }

        .modal-footer {
            text-align: center;
        }


    }


</style>


