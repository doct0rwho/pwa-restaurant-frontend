<template>
  <div id="nav">
    <div class="burger-button" @click="toggleMenu">
      <div class="burger-line"></div>
      <div class="burger-line"></div>
      <div class="burger-line"></div>
    </div>
    <div class="menu" :class="{ 'menu-open': isMenuOpen }">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
  </div>
  <router-view />
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }
  }
};
</script>

<style>
.burger-button {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 20px;
  cursor: pointer;
}

.burger-line {
  width: 100%;
  height: 2px;
  background-color: #000;
}

.menu {
  display: none;
}

.menu-open {
  display: block;
}
</style>
