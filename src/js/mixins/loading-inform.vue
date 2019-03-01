<template>
    <div>
        <div class="loading-info" v-if="state == STATES.LOADING">
            <div class="window-center">
                <div><div class="processing_text" v-translate>Loading...</div></div>
            </div>
        </div>
        <div class="ok-message" v-if="state == STATES.ANSWER">
            <div class="window-center">
                <div class="complete-body">
                    <div class="complete-body_text">
                        <slot name="ok-message"></slot>
                    </div>
                </div>
            </div>
            <slot name="buttons"><div class="button-close"><button type="button" class="btn btn-green" v-translate @click="close">Ok</button></div></slot>
        </div>

        <div class="ok-message" v-if="state == STATES.REDIRECT">
            <div class="window-center">
                <div class="complete-body">
                    <div class="complete-body_text">
                        <slot name="ok-message-redirect"></slot>
                    </div>
                </div>
            </div>
        </div>

        <div class="ok-message" v-if="state == STATES.RELOAD">
            <div class="window-center">
                <div class="complete-body">
                    <div class="complete-body_text">
                        <slot name="ok-message-reload"></slot>
                    </div>
                </div>
            </div>
            <slot name="buttons-reload"></slot>
        </div>
    </div>
</template>



<script>
import {STATES} from "./states";

export default {
  name: 'loading-inform',
  props: {
        state: {type: Number, default: STATES.START},
  },
  data(){
      return {
          STATES: STATES
      }
  },
  locales: {
    	ru: {
                'Loading...': 'Отправляем запрос...',
        }
  },
  methods: {
      close: function() {
          this.$emit('close');
      }
  }
}
</script>
<style lang="scss">
    .loading-info, .ok-message {
        position:absolute;
        top:0;
        right:0;
        bottom:0;
        left: 0;
        background-color: #fff;
        z-index: 5000;
        opacity: 0.98;


        > div.window-center {

            display: table;
            width: 100%;
            height: 100%;

            > div {
                display: table-cell;
                vertical-align: middle;
                padding: 20px;
                text-align: center;

                .complete-body_text {
                    &:before {
                        content: url("/static/img/ok-message.svg");
                        display: block;
                        margin: 0 0 20px 0;
                    }
                }

                .processing_text {
                    font-size: 20px;
                    &:before {
                        content: url("/static/img/loading-eclipse.svg");
                        display: block;
                        margin: 0 0 20px 0;
                    }
                }
            }

        }

        > div.window-center-top {
            //color: @brand-primary;
            font-size: 10px;
            font-weight: 900;
            text-transform: uppercase;
            text-align: center;
            padding: 15px;

        }
    }
    .ok-message {
        > div.window-center, > div.window-center-top {
            color: #000;
            font-size: 14px;
            line-height: 1.3;
        }
        .complete-header {
            font-size: 16px;
            font-weight: 900;
        }
        .complete-body {
            font-size: 20px;
            font-style: normal;
            line-height: 1.3;
            font-weight: 500;
            text-transform: none;
        }

        .complete-header ~ .complete-body {
            font-size: 16px;
        }

        .button-close {
            position: absolute;
            bottom: 20px;
            left: 50%;
            margin-left: -60px;
            > button {
                min-width: 120px;
            }


        }

        .button-close-ok {
            margin-top: 10px;
            > button {
                min-width: 120px;
            }
        }
    }
</style>


