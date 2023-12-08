<template>
    <div>
        <div class="header">
            <Button class="back-button" @click="redirectToHomePage">
                <i class="pi pi-chevron-left"></i>
            </Button>
            <div class="header-text">
            Меню
            </div>  
        </div> 
    </div>
</template>
<script setup></script>
<style scoped>
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* Add this line to prevent horizontal scrolling */
}

.header {
    position: absolute ;
    top: 0 ;
    left: 0 ;
    margin-left: -8px;
    margin-top: -8px;
    right: 0 ;
    width: 100vw ;
    height: 45px ;
    background-color: #DAC2C2;
    font-size: 20px ;
    font-weight: 500 ;
    color: #000000 ;
    box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.3); /* Adjust values as needed */
}
.back-button {
    position: absolute ;
    top: 0 ;
    left: 0 ;
    margin-left: 0px;
    margin-top: 2px; 
    width: 40px ;
    height: 40px ;
    background-color: transparent ;
    border: none;
    outline: none ;
    font-size: 20px ;
    font-weight: 500 ;
    color: #000000 ;
}
.header-text {
    position: absolute ;
    top: 0 ;
    left: 0 ;
    margin-left: 45px;
    margin-top: 8px;    
    height: 40px ;
    background-color: transparent ;
    border: none ;
    outline: none ;
    font-size: 20px t;
    font-weight: 500 ;
    color: #000000 ;
    font-family: "Neucha"; /* Use 'Neucha' font and fall back to cursive if not available */
}
</style>
