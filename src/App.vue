<template>
  <div id="app">
    <b-nav justified tabs>
      <b-nav-item href="home">Home</b-nav-item>
      <b-nav-item href="chat">Chat</b-nav-item>
      <b-nav-item disabled href="chatprivado">Chat Privado</b-nav-item>
      <b-nav-item @click="logout">Salir</b-nav-item>
    </b-nav>
    <img
      alt="Vue logo"
      src="http://www.atix.me/assets/logo_atix-f68cbb243f64ef85e3089e10ae14e433bbb63c863473b553cc8c92187a70b542.svg"
      width="240px"
      height="170px"
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
          this.$router.replace("login");
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
