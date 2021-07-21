<template>
  <div id="nav">
    <Navbar />
  </div>
  <router-view/>
</template>

<script>
import Navbar from "@/components/navbar/Navbar"
export default {
  components: {
    Navbar
  }
}
</script>


<style lang="scss">

</style>
