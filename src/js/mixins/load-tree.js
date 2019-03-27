export default {
    data() {
        return {
            tree: {
                data: [],
                loaded: false,
                allItems: new Map(),
                selectedNode: {
                    "name": "",
                    "model": {},
                    "node": {}
                    },
                selectedItems: new Map()
            }
        }
    },
    methods: {
        setEmptySelectedNode(){
          let sNode = this.tree.selectedNode;
          sNode.name = "";
          sNode.model = {};
          sNode.node = {};

        },
        loadTree: function (oriNode, resolve) {

            let getId = function(oriNode) {
                let id = null;
                if(typeof oriNode !== "undefined"){
                    id = (typeof oriNode.data.value != "undefined") ? oriNode.data.value.id : null;
                }
                return id;
            }
            let setIcon = function (obj, isLeaf){
                obj.icon = (isLeaf)? "fa fa-sticky-note-o": "fa fa-folder";
                obj.isLeaf = isLeaf;
            }


            let id = getId(oriNode);

            this.uploadInfo('/admin/tree/children', {"id": id}, (data) => {

                if(data.length == 0)  setIcon(oriNode.data, true);

                let result = [];
                let self = this;

                data.forEach(function(item, index){

                    let obj = {
                        "id": item.id,
                        "text": item.name,
                        "value": item,
                    };
                    setIcon(obj,  !item.hasChild);
                    self.tree.allItems.set(item.id, item);

                    if(id === null && index == 0) {
                        if(typeof  self.table != "undefined")
                        {
                            if(typeof  self.table.moreParams != "undefined")
                            {
                                obj.selected = true;
                                self.table.moreParams.ou_id = item.id;
                            }

                        }

                    }


                    result.push(obj)


                });
                resolve(result);
                this.tree.loaded = true;

            }, {}, (data) => { });
        },
    }
}