// Routes
import {PERMISSIONS} from "./mixins/permissions";
const routes = [
    {   path: '/login',
        component: (resolve) => { require(['./pages/Login'], resolve) },
        name: "login",
        meta: {requiresNoAuth: true}
    },
    { path: '/',
        component: (resolve) => { require(['./pages/Dashboard'], resolve)},
        name: "dashboard",
        meta: {requiresAuth: true},
        children: [
            {
                path: '',
                redirect: '/dashboard'
            },
           {
                path: '/dashboard',
                name: 'dashboard',
                component: (resolve) => { require(['./components/modules/dashboard/Index'], resolve)}
            },
            {
                path: '/forbidden',
                name: 'forbidden',
                component: (resolve) => { require(['./pages/Forbidden'], resolve)}
            },

            {
                path: '/profile',
                name: 'profile',
                component: (resolve) => { require(['./pages/Profile'], resolve)}
            },
            {
                path: '/admin/users',
                name: 'admin-users',
                component: (resolve) => { require(['./pages/admin/Users'], resolve)},
                meta: {permission: PERMISSIONS.ADMIN_WATCH_USER}
            },
            {
                path: '/admin/profile/:id',
                name: 'admin-profile-id',
                component: (resolve) => { require(['./pages/admin/Profile'], resolve)},
                meta: {permission: PERMISSIONS.ADMIN_WATCH_USER}
            },
            {
                path: '/admin/roles',
                name: 'admin-roles',
                component: (resolve) => { require(['./pages/admin/Roles'], resolve)},
                meta: {permission: PERMISSIONS.ADMIN_WATCH_ROLE}
            },
            {
                path: '/admin/role/:id',
                name: 'admin-role-id',
                component: (resolve) => { require(['./pages/admin/Role'], resolve)},
                meta: {permission: PERMISSIONS.ADMIN_WATCH_ROLE}
            },
            {
                path: '/messenger/users',
                name: 'messenger-users',
                component: (resolve) => { require(['./pages/messenger/Users'], resolve)},
                meta: {permission: PERMISSIONS.MESSENGER_WATCH_USER}
            },
            {
                path: '/messenger/structure',
                name: 'messenger-structure',
                component: (resolve) => { require(['./pages/messenger/Structure'], resolve)},
                meta: {permission: PERMISSIONS.MESSENGER_EDIT_STRUCTURE}
            },

            {
                path: '/messenger/profile/:id',
                name: 'messenger-profile-id',
                component: (resolve) => { require(['./pages/messenger/Profile'], resolve)},
                meta: {permission: PERMISSIONS.MESSENGER_WATCH_USER}
            },
            {
                path: '/messenger/load-users-file/:ou',
                name: 'messenger-load-users-file',
                component: (resolve) => { require(['./pages/messenger/LoadUsersFile'], resolve)},
                meta: {permission: PERMISSIONS.MESSENGER_EDIT_USER}
            },
            {
                path: '/order/my',
                name: 'order-my',
                component: (resolve) => { require(['./pages/order/My'], resolve)},
            },
            {
                path: '/order/assigned',
                name: 'order-assigned',
                component: (resolve) => { require(['./pages/order/Assigned'], resolve)},
            },

            {
                path: '/order/assigned/:id',
                name: 'order-assigned-id',
                component: (resolve) => { require(['./pages/order/AssignedOrder'], resolve)},
            },

            {
                path: '/order/my/:id',
                name: 'order-my-id',
                component: (resolve) => { require(['./pages/order/MyOrder'], resolve)},
            }
        ]
    }
]

export default routes
