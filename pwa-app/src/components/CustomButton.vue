<template>
    <div>      
      <Button label="Click"></Button>
      <Button icon="pi pi-check" label="Accept"></Button>
      <Button icon="pi pi-times" class="p-button-rounded p-button-danger"></Button>
    </div>
  </template>
  
  <script>
  import { Button } from 'primevue/button';
  
  export default {
    components: {
      Button
    }
  }
  </script>
  