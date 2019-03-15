<template>
  <div>
    <aside class="control-sidebar control-sidebar-dark">
      <!-- Create the tabs -->
      <ul class="nav nav-tabs nav-justified control-sidebar-tabs">
        <li><a href="#control-sidebar-settings-tab" data-toggle="tab"><i class="fa fa-wrench"></i></a></li>
      </ul>
      <!-- Tab panes -->
      <div class="tab-content">
        <!-- Home tab content -->
        <!-- /.tab-pane -->
        <!-- Settings tab content -->
        <div class="tab-pane active" id="control-sidebar-settings-tab">
          <h4 class="control-sidebar-heading">Skins</h4>

        </div>
        <!-- /.tab-pane -->
      </div>
    </aside>
    <!-- /.control-sidebar -->
    <!-- Add the sidebar's background. This div must be placed
         immediately after the control sidebar -->
    <div class="control-sidebar-bg"></div>
  </div>
</template>

<script>
  export default {
    name: 'ControlSidebar',
    mounted: function() {
         // $.AdminLTE.controlSidebar.activate({});
    }
  }
</script>
