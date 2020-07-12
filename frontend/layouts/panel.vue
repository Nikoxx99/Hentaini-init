<template>
  <v-app dark>
    <ToolBar header="Hentaini Panel" />
    <nuxt />
    <Footer />
  </v-app>
</template>

<script>
import ToolBar from '../components/Layout/ToolBar'
import Footer from '../components/Layout/Footer'
export default {
  components: {
    ToolBar,
    Footer
  },
  data () {
    return {
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  background: #f4f4f4;
}

a {
  color: #666;
  text-decoration: none;
}

ul {
  list-style: none;
}
</style>
