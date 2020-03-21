<template>
  <div class="layout">
    <Navbar />
    <slot />
  </div>
</template>

<script>
import Navbar from "@/components/NavBar";

export default {
  components: {
    Navbar
  }
};
</script>

<style></style>
