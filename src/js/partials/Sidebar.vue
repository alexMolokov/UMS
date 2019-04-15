<template>
    <aside class="main-sidebar">
      <!-- sidebar: style can be found in sidebar.less -->
      <section class="sidebar">
        <!-- sidebar menu: : style can be found in sidebar.less -->
        <ul class="sidebar-menu">
          <li class="header">НАВИГАЦИЯ</li>
          <li class="treeview" v-if="hasAnyPermission([permissions.ADMIN_WATCH_USER, permissions.ADMIN_WATCH_ROLE])">
            <a href="#">
              <i class="fa fa-wrench"></i>
              <span>Система</span>
              <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
            </a>
            <ul class="treeview-menu">
              <li v-if="hasPermission(permissions.ADMIN_WATCH_USER)">
                <router-link :to="{name: 'admin-users'}"><i class="fa fa-circle-o"></i>Пользователи</router-link>
              </li>
              <li  v-if="hasPermission(permissions.ADMIN_WATCH_ROLE)">
                <router-link :to="{name: 'admin-roles'}"><i class="fa fa-circle-o"></i>Роли</router-link>
              </li>
            </ul>
          </li>
          <li class="treeview">
            <a href="#">
              <i class="fa fa-users"></i>
              <span>Мессенджер</span>
              <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
            </a>
            <ul class="treeview-menu">
              <li v-if="hasPermission(permissions.MESSENGER_WATCH_USER)">
                <router-link :to="{name: 'messenger-users'}">
                  <i class="fa fa-circle-o"></i> <span>Пользователи</span>
              </router-link>
              </li>

              <li v-if="hasPermission(permissions.MESSENGER_EDIT_STRUCTURE)">
                <router-link :to="{name: 'messenger-structure'}">
                  <i class="fa fa-circle-o"></i> <span>Структура</span>
                </router-link>
              </li>
            </ul>

          </li>
          <li class="treeview">
            <a href="#">
              <i class="fa fa-envelope"></i>
              <span>Заявки</span>
              <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
            </a>
            <ul class="treeview-menu">
              <li>
                <router-link :to="{name: 'order-my'}">
                  <i class="fa fa-circle-o"></i> <span>Мои заявки</span>
                </router-link>
              </li>

              <li>
                <router-link :to="{name: 'order-assigned'}">
                  <i class="fa fa-circle-o"></i> <span>На Одобрение</span>
                </router-link>
              </li>
            </ul>

          </li>

          <!--
          <li  v-if="hasPermission(permissions.LOG_WATCH)">
            <router-link to="/logs">
              <i class="fa fa-map-o"></i> <span>Логи</span>
            </router-link>
          </li>

          <li v-if="hasPermission(permissions.FEEDBACK)">
            <router-link to="/logs">
              <i class="fa fa-envelope"></i> <span>Обратная связь</span>
            </router-link>
          </li>
        -->

        </ul>
      </section>
      <!-- /.sidebar -->
    </aside>
</template>

<script>
    import {mapGetters, mapMutations } from 'vuex'
    import {PERMISSIONS} from "../mixins/permissions";
  export default {
    name: 'DashboardSidebar',
    data() {
        return {
            permissions: PERMISSIONS

        }
    },
    created(){


    },
    computed: {
        ...mapGetters(["hasPermission", "hasAnyPermission"])
    }

  }
</script>
