<template>
    <modal-window :id="id"  @close="close" class="in"  style="display: block" :show="true">
        <div slot="title" v-translate>Подразделения</div>
        <form @submit.prevent.stop class="form-horizontal">
            <div style="position: relative">
                <div class="modal-body">
                    <div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="box-body">

                                    <v-jstree :data="tree.data" :async="loadTree"allow-batch whole-row  ref="jsTree"  @item-click="itemClick"></v-jstree>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary" v-translate @click="validate">Выбрать</button>
                </div>
            </div>
        </form>
    </modal-window>
</template>


<script>

    import modalWindow from '../modalWindow.vue';
    import ajax from '../../../mixins/ajax-form.vue';
    import VJstree from 'vue-jstree'


    export default {
        name: 'form-choose-ou',
        mixins: [ajax],
        components: {
            modalWindow,
            VJstree
        },
        data() {
                return {
                    id: "choose-ou",
                    tree: {
                        data: [],
                        loaded: false,
                        allItems: new Map(),
                        selectedNode: {}
                    }
                }
            },
            locales: {
                uz: {}
            },
            methods: {
                itemClick (node) {
                    let model =  node.model;
                    let value = model.value
                    this.tree.selectedNode = value;
                },
                loadTree: function (oriNode, resolve) {
                    let id = null;

                    if(typeof oriNode !== "undefined"){
                        id = oriNode.data.value ? oriNode.data.value : null;
                    }

                    this.uploadInfo('/admin/tree/children', {"id": id}, (data) => {
                        let result = [];

                        let self = this;

                        data.forEach(function(item, index){

                            item.added = false;
                            item.nowAdded = false;

                            self.tree.allItems.set(item.id, item);

                            let isLeaf = !item.hasChild;

                            let obj = {
                                "text": item.name,
                                "value": item,
                                "isLeaf": isLeaf,
                                "icon": (isLeaf)? "fa fa-sticky-note-o": "fa fa-folder"
                            };

                            result.push(obj)


                        });
                        resolve(result);
                        this.tree.loaded = true;

                    }, {}, (data) => { });
                },
                close: function()
                {
                    this.$emit('close');
                },
                validate: function () {
                    this.$emit('ou:selected-node', this.tree.selectedNode);
                    this.close();

                }
            }

    }
</script>
<style lang="scss">
    .tree-wholerow-ul {
        .tree-wholerow {
            z-index: 0;
        }
    }

    .tree-selected {
        background: #e1e1e1 !important;
    }
</style>

