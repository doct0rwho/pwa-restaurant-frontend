<template>
  <div id="app">
    <!-- Your existing content -->
    <div v-if="isMobileDevice">
     <div>
    <Button label="Click"></Button>
    <Button icon="pi pi-check" label="Accept"></Button>
    <Button icon="pi pi-times" class="p-button-rounded p-button-danger"></Button>
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
      isMobileDevice: false
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

