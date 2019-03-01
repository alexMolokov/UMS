"use strict";

window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.$ = window.jQuery = require('jquery');

import Vue from 'vue';
import VeeValidate, { Validator } from 'vee-validate';
import VueTranslate from 'vue-translate-plugin';
import VueEvents from 'vue-events';
import {User} from './classes/User';


Vue.use(VeeValidate, {fieldsBagName: 'formFields'});
Vue.use(VueTranslate);
Vue.use(VueEvents);

import App from './components/app';
import  store from './store';
import  router from './router';



/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

//Vue.component('example', require('./components/Example.vue'));


const app = new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    beforeCreate(){
        let store = this.$store;

        window.axios.post("/auth/auto", {}).then(function({data: response})
        {
            if(response.status)
            {
                let user = new User(response.data);
                store.commit("login", user);
            }
        })
    },
    mounted(){
        let supportedLangs = ["ru"];
        let lang = navigator.language;

        if(supportedLangs.indexOf(lang) == -1) lang = "ru";
        this.$store.commit("setLang", {"lang": lang, "translate": this.$translate});
        let bodies = document.getElementsByTagName("body");
        this.$store.commit("setCompany", bodies[0].getAttribute("id"));
    }


});


require('bootstrap');
require('admin-lte');
require("select2");
