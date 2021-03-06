/*jshint esversion: 6 */
"use strict";

export default {
    data() {
        return {
            tree: {
                data: [],
                rootElement: null,
                loaded: false,
                empty: false,
                allItems: new Map(),
                selectedNode: {
                    "name": "",
                    "model": {
                    },
                    "node": {}
                    },
                selectedItems: new Map()
            }
        };
    },
    computed: {

    },
    methods: {
        setEmptySelectedNode(){
          let sNode = this.tree.selectedNode;
          sNode.name = "";
          sNode.model = {};
          sNode.node = {};

        },
        initRootElement(rootElement) {
            if(this.tree.rootElement === null) {
                this.tree.rootElement = rootElement;
                this.tree.rootElement.loading = true;
            }
        },
        loadTree: function (oriNode, resolve) {
            this.initRootElement(oriNode);

            let getId = function(oriNode) {
                let id = null;
                if(typeof oriNode !== "undefined"){
                    id = (typeof oriNode.data.value !== "undefined") ? oriNode.data.value.id : null;
                }
                return id;
            };

            let setIcon = function (obj, isLeaf){
                obj.icon = (isLeaf)? "fa fa-sticky-note-o": "fa fa-folder";
                obj.isLeaf = isLeaf;
            };


            let id = getId(oriNode);

            this.uploadInfo('/admin/tree/children', {"id": id}, (data) => {

                if(data.length === 0)  {
                    setIcon(oriNode.data, true);
                }

                let result = [];
                let self = this;

                data.forEach(function(item, index){
                    let obj = {
                        "id": item.id,
                        "text": item.name,
                        "value": item
                    };
                    setIcon(obj, !item.hasChild);
                    //self.tree.allItems.set(item.id, item);

                    if(id === null && index === 0) {
                        if(typeof  self.table !== "undefined")
                        {
                            if(typeof  self.table.moreParams !== "undefined")
                            {
                                obj.selected = true;
                                self.table.moreParams.ou_id = item.id;
                            }
                        }
                    }
                    result.push(obj);
                });

                if(id === null && result.length === 0) {
                    this.tree.empty = true;
                    this.tree.loaded = true;
                    return;
                }

                resolve(result);
                this.tree.loaded = true;

            }, {}, (data) => { });
        },
    }
};