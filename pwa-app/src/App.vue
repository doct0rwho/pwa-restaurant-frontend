<template>
  <div id="app">
    <!-- Your existing content -->
    <div v-if="isMobileDevice">
     <div>
      <Button class="transparent-button" @click="visible = true">
        <i class="pi pi-bars"></i>
      </Button>
      <div class="card flex justify-content-center">
    <Sidebar v-model:visible="visible" class="custom-sidebar" >
        <!-- <Button class="transparent-button" @click="visible = false">
          <i class="pi pi-times"></i>
        </Button> -->
    </Sidebar>
    
</div>
    
  </div>
    </div>
    <div v-else>
      <!-- Content for non-mobile devices -->
    </div>
  </div>
</template>

<script>



export default {
  name: 'App',
  
  data() {
    return {
      isMobileDevice: false,
      visible: false
    };
  },
  created() {
    this.checkDevice();
  },
  methods: {
    checkDevice() {
      this.isMobileDevice = /Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent);
      if (!this.isMobileDevice) {
        // Handle non-phone devices
        alert('This application is only available on mobile devices.');
      }
    }

  }
};
</script>

<style scoped>
#app {
  position: relative;
}

.transparent-button {
  background: none;
  border: none;
  color: black;
  position: absolute;
  top: 0;
  right: 0;
}
.transparent-button:focus {
  outline: none; /* Optional: Remove focus outline */
  box-shadow: none; /* Remove the button shadow on focus */
}
.p-sidebar .p-sidebar-header .p-sidebar-close, .p-sidebar .p-sidebar-header .p-sidebar-icon {
  display: none !important;
}
@layer primevue {
  /* Hide the close button and icon in the sidebar header */
  .p-sidebar .p-sidebar-header .p-sidebar-close,
  .p-sidebar .p-sidebar-header .p-sidebar-icon {
    display: none !important;
  }

  /* Add any additional styles you need */
  .p-sidebar {
    /* Your custom styles for the sidebar */
  }
}

</style>
