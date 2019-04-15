import Vue from 'vue'
import Vuex from 'vuex'
import  dictionary from './dictionary';
import { Validator } from 'vee-validate';
import  router from './router';
import {ROLES} from "./mixins/roles";
import RolesModule from "./modules/roles";


Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        auth: false,
        lang: "ru",
        company: "",
        user: {
            id: "",
            login: "",
            firstname: "",
            lastname: "",
            position: "",
            email: "",
            roles: {},
            permissions: {}
        }
    },
    getters: {
        hasPermission: (state) => (permission) => {
            if(typeof state.user.roles[ROLES.SUPER_ADMIN] != "undefined") return true;

             if(typeof state.user.permissions[permission] != "undefined") return true;

            return false;
        },
        hasAnyPermission: (state) => (permissions) => {
                if(typeof state.user.roles[ROLES.SUPER_ADMIN] != "undefined") return true;

            for(let i = 0; i< permissions.length; i++ ) {
               let permission = permissions[i];
               if(typeof state.user.permissions[permission] != "undefined") return true;
            }
            return false;
        },
        isSuperAdmin: state => {
            if(typeof state.user.roles[ROLES.SUPER_ADMIN] != "undefined") return true;
            return false;
        },

        isAuth: state => {
            return state.auth;
        },
        getLogin: state => {
            return state.user.login;
        },
        getLang: state => {
            return state.lang;
        },
        getUser: state => {
            return state.user;
        },

        getUserHeader: state => {
            let name =  state.user.firstname + " " + state.user.lastname;
            if(state.user.position != '') name += ((name.trim()=="")? "" : " - ") + state.user.position;
            return name;
        },


    },
    mutations: {
        updateProfile(state, obj) {
            for (let key in obj) {
               if(typeof state.user[key] !== "undefined") {
                   state.user[key] = obj[key];
               }
            }
        },
        setCompany(state, value)
        {
            state.company = value;
        },
        setLang(state, obj)
        {
            obj.translate.setLang(obj.lang);
            state.lang = obj.lang;
            Validator.localize(obj.lang,dictionary[obj.lang]);
        },
        logout(state)
        {
            for (let prop in state.user)
            {
                if(typeof state.user[prop] == "string")
                {
                    state.user[prop] = "";
                }
                else if(typeof state.user[prop] == "object")
                {
                    for (let propObject in state.user[prop])
                    {
                        state.user[prop][propObject] = "";
                    }
                }
            }
            state.auth = false;
            router.push({name: 'login'});
        },
        login(state, user)
        {
            state.user = user;
            state.auth = true;
            router.push({name: 'dashboard'});
        },
        activate(state,user)
        {
            state.user = user;
            state.auth = true;
        }
    },
    modules: {
        roles: RolesModule
    }
});

export default store;
