<style>
	@import url(https://fonts.googleapis.com/css?family=Lato:300);
	body {
		font-family: Lato, Helvetica, sans-serif;
	}
</style>

<template>
	<div id="app">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
		<router-view></router-view>
	</div>
</template>

<script>
  import store from 'src/vuex/store';

  export default {
    store,
  };
</script>