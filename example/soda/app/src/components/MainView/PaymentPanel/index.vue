<template>
	<div id="payment-panel" class="tile is-child notification is-danger">
		<p class="title">Payment Panel</p>
		<coin-component></coin-component>
	</div>
</template>

<script>
  import CoinComponent from './CoinComponent';
  export default {
    components: {
      CoinComponent,
      // CardComponent,
      // NFCComponent
    },
    name: 'payment-panel',
  };
</script>

<style scoped>
	#payment-panel {}
</style>