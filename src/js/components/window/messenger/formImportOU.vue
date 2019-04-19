<template>
    <modal-window :id="id"  @close="close" class="in"  style="display: block" :show="true">
        <div slot="title" v-translate>Импорт подразделений</div>
        <form @submit.prevent.stop class="form-horizontal">
            <div style="position: relative">
                <div class="modal-body">
                    <div>
                        <div class="row">
                            <div class="col-md-12" style="margin-top: 20px; text-align: center">

                                <div class="file-wrapper">
                                    <input type="file"  id="files" ref="files" accept=".xml" class="inputfile" @change="handleFileUploads()">
                                    <label for="files"><img src="/img/icons/icon-download.svg"><span>{{labelForFiles()}}</span></label>
                                </div>

                                <div v-if="isFileErrors()" class="alert alert-danger fade in alert-dismissible">
                                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true" @click.prevent="closeErrors">×</button>
                                    <div class="top-10">
                                        Ошибка
                                    </div>
                                </div>

                                <div>
                                    <div>Файл в формате xml</div>
                                    <div><a href="/examples/importStructure.xml" target="_blank">Пример файла</a></div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </modal-window>
</template>


<script>

    import modalWindow from '../modalWindow.vue';
    import ajax from '../../../mixins/ajax-form.vue';
    import OkActionInform  from '../../../mixins/ok-action-inform.vue';
    import errorInform from '../../../mixins/error-inform.vue';
    import {STATES} from "../../../mixins/states";
    import parser from  "xml2js";



    export default {
        name: 'form-import-ou',
        mixins: [ajax],
        components: {
            modalWindow,
            errorInform,
            OkActionInform
        },
        data() {
                return {
                    id: "import-ou",
                    files: [],
                    error: {
                        reason: ""
                    }
                }
            },
            locales: {
                uz: {}
            },
            methods: {
                isFileErrors(){
                    return  this.error.reason.trim() != ""
                },
                labelForFiles() {
                    if (this.files.length > 1) {
                        return this.files.length + " " + this.$translate.text("файл выбран");
                    } else if (this.files.length == 0) {
                        return this.$translate.text("Выберите файл со структурой");
                    } else {
                        return this.files[0].name
                    }
                },
                handleFileUploads(){
                    let self = this;
                    let file = document.getElementById('files').files[0];
                    let reader = new FileReader();

                    reader.readAsText(file);
                    reader.onload = function(event) {
                        let xml = event.target.result;
                        self.parseXmlToJson(xml);
                    };

                    reader.onerror = function(event) {
                        self.error.reason = "Файл не может быть прочитан! Kод " + event.target.error.code;
                    };
              },
              parseXmlToJson(xml){
                  let self = this;
                  parser.parseString(xml, function (err, result) {
                      self.handleJson(result);
                  });
              },
              handleJson(json) {
                  console.log(json);
              }

            }

    }
</script>
<style lang="scss">
    .file-wrapper {
        margin-bottom: 20px;
        position: relative;
        display: inline-block;

        .inputfile {
            width: 100%;
            height: 100%;
            opacity: 0;
            overflow: hidden;
            position: absolute;
            z-index: 2;
            cursor: pointer;
        }

        .inputfile + label {
            font-size: 11px;
            text-transform: uppercase;
            font-weight: 500;
            color: white;

            display: inline-block;
            padding: 7px 20px;
            border-radius: 3px;
            cursor: pointer;
            background-color: #00a0c8;

            span {
                cursor: pointer;
            }
        }

        .inputfile + label > img {
            display: inline-block;
            margin: 0 5px 5px 5px;
            width: 20px;
            height: 20px;
            color: #fff;
            cursor: pointer;
        }
    }
</style>

