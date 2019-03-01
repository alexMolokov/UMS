import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: routes,
    scrollBehavior: function (to, from, savedPosition) {
        return savedPosition || { x: 0, y: 0 }
    }
})

router.beforeEach((to, from, next) => {

    const store = router.app.$options.store;
    const auth = store.state.auth;

    if (to.matched.some(record => record.meta.requiresAuth))
    {
        if(!auth)
        {
            next( {name: 'login'});
        }
    }

    if (to.matched.some(record => record.meta.requiresNoAuth))
    {
        if(auth)
        {
            next( {name: 'dashboard'});
        }
    }

    if (to.matched.some(
        (record) => {
            return typeof record.meta["permission"] != "undefined"
        }
    ))
    {
        console.log(to.meta.permission);



        if(!store.getters.hasPermission(to.meta.permission))
        {
            next( {name: 'forbidden'});
        }

    }




    next();
})

export default router;
