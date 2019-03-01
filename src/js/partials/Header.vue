<template>
  <header class="main-header">
    <!-- Logo -->
    <router-link to="/dashboard" class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini">GAPP</span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg"><b>Admin</b>GAPP</span>
    </router-link>
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </a>

      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
           <li class="dropdown user user-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <span>{{getLogin}}</span>
            </a>
            <ul class="dropdown-menu">
              <!-- User image -->
              <li class="user-header" style="height: auto">
                <p>
                  {{getUserHeader}}
                </p>
              </li>
              <!-- Menu Body -->
              <!-- Menu Footer-->
              <li class="user-footer">
                <div class="pull-left">
                  <router-link  :to="{name: 'profile'}" class="btn btn-default btn-flat">Профиль</router-link>
                </div>
                <div class="pull-right">
                  <a class="btn btn-default btn-flat" @click.prevent="userLogout">Выйти</a>
                </div>
              </li>
            </ul>
          </li>
          <!-- Control Sidebar Toggle Button -->
          <li>
            <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import ajaxform from '../mixins/ajax-form.vue';

  export default {
    name: 'DashboardHeader',
    mixins: [ajaxform],
    computed: {
        ... mapGetters(['getLogin', 'getUserHeader']),
    },
    methods: {
        ...mapMutations(['logout']),
        userLogout()
        {
            let url = "/auth/logout";
            this.send(url, {},
                () => {
                    this.logout()
                }
            );
        }
    }
  }
</script>
