<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import type { IFilterFieldConfig } from './IFilterFieldConfig';

	import type { FilterField } from './FilterField';
	import { filterFieldConfigs } from './FilterFieldConfigs';
	import { FilterFieldType } from './FilterFieldType';
	import { filterOperatorsMap } from './FilterOperator';

	const dispatch = createEventDispatcher();

	export let field: FilterField;

	let fieldConfig: IFilterFieldConfig;

	onMount(async () => {
		fieldConfig = field.config;
	});

	function updateFieldConfig(): any {
		field.configure(fieldConfig);
		field = field;
	}

	function remove(): void {
		dispatch('remove', field);
	}
</script>

<div class="container">
	<div class="btn-remove" on:click={remove}>x</div>
	<select bind:value={fieldConfig} on:change={updateFieldConfig} class="field-display-name">
		{#each filterFieldConfigs as config}
			<option value={config}>
				{config.displayName}
			</option>
		{/each}
	</select>
	<select bind:value={field.operator}>
		{#each field.operators as o}
			<option value={o}>
				{filterOperatorsMap.get(o)}
			</option>
		{/each}
	</select>
	{#if field.config.type === FilterFieldType.Text}
		<input bind:value={field.targetText} type="text" />
	{:else if field.config.type === FilterFieldType.TextArray}
		<input bind:value={field.targetText} type="text" />
	{:else if field.config.type === FilterFieldType.Number}
		<input bind:value={field.targetNumber} type="number" />
	{:else if field.config.type === FilterFieldType.DateTime}
		<input bind:value={field.targetDateTime} type="datetime-local" />
	{/if}
</div>

<style lang="scss">
	$borderColor: rgb(204, 204, 204);

	.container {
		display: flex;
		align-items: center;
	}

	.btn-remove {
		padding: 3px;
		color: $borderColor;
		font-weight: bold;
		cursor: pointer;
	}

	select {
		width: 117px;
		border-color: $borderColor;

		&:not(:first-of-type) {
			border-left: 0 none;
		}
	}

	input {
		border: 1px solid $borderColor;
		border-left: 0 none;
		padding: 0.26em;

		&[type='number'] {
			padding: 0.31em;
		}

		&[type='datetime-local'] {
			width: 145px;
			padding: 0.22em;
		}

		&[type='text'],
		&[type='number'] {
			width: 145px;
		}
	}

	.field-display-name {
		width: 124px;
	}
</style>
