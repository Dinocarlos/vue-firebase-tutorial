<template>
  <div id="app">
    <b-nav justified tabs>
      <b-nav-item href="/home">Home</b-nav-item>
      <b-nav-item href="/chat">Chat Global</b-nav-item>
      <b-nav-item disabled href="chatprivado">Chat Privado</b-nav-item>
      <b-nav-item @click="logout">Salir</b-nav-item>
    </b-nav>
    <img
      alt="Vue logo"
      src="https://tuckersoft.net/ealing20541/img/anim-bandersnatch.gif"
      width="250px"
      height="180px"
    >
    <router-view/>
  </div>
</template>
<script>
import firebase from "firebase";
// @ is an alias to /src
export default {
  name: "app",
  components: {},
  computed: {
    currentUser: function() {
      return firebase.auth().currentUser;
    }
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("/login");
        });
    }
  }
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
