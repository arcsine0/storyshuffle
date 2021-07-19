<template>
  <div id="app">
    <lobby/>
    {{ roomID }}
    <router-view/>
  </div>
</template>

<script>
/* eslint-disable */
	import io from 'socket.io-client';
  	import lobby from './components/lobby.vue';
  	var socket = io('http://localhost:3000', {
    	withCredentials: true,
    	extraHeaders: {
      	'customHeader': '123'
    	}
  	});
  	var roomID;
  	socket.on('roomID', (data) => {
    	roomID = data.id;
    	socket.emit('test', { data: 'test' });
  	})

  	export default {
    	name: 'App',
    	components: {
      	lobby
    	},
    	data() {
      		return {
				roomID: ''
			}
    	},
		mounted() {
			this.roomID = roomID;
			var joinID = this.$route.query.id;
			if (joinID !== undefined) {
				socket.emit('joinRoom', { joinID: joinID });
				console.log(joinID, this.roomID);
			}
			else {
				console.log('no id in params');
			}
		}
	}
  
</script>

<style>

</style>
