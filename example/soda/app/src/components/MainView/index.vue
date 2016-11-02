<template>
	<div id="main-view" class="container">
		<div class="tile is-ancestor">
			<div class="tile is-vertical is-7">
				<div class="tile is-parent">
					<item-panel></item-panel>
				</div>
				<div class="tile is-parent">
					<dispense-panel></dispense-panel>
				</div>
			</div>
			<div class="tile is-parent">
				<payment-panel></payment-panel>
			</div>
		</div>
		<span class="icon"><i class="fa fa-gear"></i></span>
	</div>
</template>

<script>
  import ItemPanel from './ItemPanel/';
  import PaymentPanel from './PaymentPanel/';
  import DispensePanel from './DispensePanel/';

  export default {
    components: {
      ItemPanel,
      PaymentPanel,
      DispensePanel,
    },
    name: 'main-view',
  };
</script>

<style scoped>
	.icon {
		float: right
	}
</style>