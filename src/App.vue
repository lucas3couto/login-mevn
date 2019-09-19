<template>
  <div id="app" :class="{'hide-menu': !isMenuVisible || !user}" >
    <Header v-if="user"/>
    <Loading v-if="validatingToken"/>
    <Main v-else />
  </div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl, userKey } from '@/global'
import { mapState } from 'vuex'
import Header from '@/components/template/Header.vue'
import Main from '@/components/template/Main.vue'
import Loading from '@/components/template/Loading'

export default {
	name: "App",
	components: { Header, Main, Loading },
	computed: mapState(['isMenuVisible', 'user']),
	data: function() {
		return {
			validatingToken: true
		}
	},
	methods: {
		async validateToken() {
			this.validatingToken = true
			const json = localStorage.getItem(userKey)
			const userData = JSON.parse(json)
			this.$store.commit('setUser', null)
			if(!userData) {
				this.validatingToken = false
				this.$router.push({ name: 'auth' })
				return
			}
			const res = await axios.post(`${baseApiUrl}/validateToken`, userData)
			if (res.data) {
				this.$store.commit('setUser', userData)
				
			} else {
				localStorage.removeItem(userKey)
				this.$router.push({ name: 'auth' })
			}
			this.validatingToken = false
		}
	},
	created() {
		this.validateToken()
	}
}
</script>


<style>
* {
  margin: 0;
  padding: 0;
}
#app{
  font-family: 'Roboto', sans-serif;
  height: 100vh;
  display: grid;
  grid-template-rows: 70px 1fr;
  grid-template-areas:
  "header"
  "main"
}

</style>
