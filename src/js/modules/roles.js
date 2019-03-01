const state =  {
    "loaded": false,
    "roles": [],
};
const getters =  {
    isLoaded: (state) => {
        return state.loaded;
    },
    getRoles: (state) => {
        return state.roles;
    }
};
const actions =  {
    setRoles(context){

        if(!context.state.loaded)
        {
            window.axios.post("/role/list", {}).then((response) => {
                context.commit("setRoles", response.data.data);
            });


        }

    }
};
const mutations =  {
    setRoles: (state, roles) => {

        state.roles = roles
        state.loaded = true;


    }
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
