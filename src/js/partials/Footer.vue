<template>
  <footer class="main-footer">
    <div class="pull-right hidden-xs">
      <b>Version</b> 1.0.0
    </div>
    <strong>Copyright &copy; {{currentYear}} </strong> OOO Kibernika, All rights reserved.
  </footer>
</template>

<script>
  export default {
    name: 'DashboardFooter',
    computed: {
    currentYear(){
          let d = new Date()
          return d.getFullYear();
    }
  }
  }
</script>
