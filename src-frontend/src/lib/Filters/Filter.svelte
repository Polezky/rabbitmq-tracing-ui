<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { FilterField } from './FilterField';
	import LogFilterFieldComponent from './FilterField.svelte';
	import { filterFieldConfigs } from './FilterFieldConfigs';

	const dispatch = createEventDispatcher();
	const localStorageKey = 'logFilter';

	export let canApplyFilter = false;
	export let isFilterApplied = false;

	let fields: FilterField[] = [];

	onMount(() => {
		loadFilter();
	});

	function addField(): void {
		const nextFieldConfig =
			filterFieldConfigs.find((x) => !fields.some((xx) => xx.config.logItemKey === x.logItemKey)) ||
			filterFieldConfigs[0];
		const newField = new FilterField();
		newField.configure(nextFieldConfig);
		fields = [...fields, newField];
		saveFilter();
	}

	function removeField({ detail: field }: CustomEvent<FilterField>): void {
		fields = fields.filter((f) => f.id !== field.id);
		saveFilter();
	}

	function applyFilter(): void {
		saveFilter();
		dispatch('applyFilter', fields);
	}

	function resetFilter(): any {
		dispatch('resetFilter');
	}

	function saveFilter(): void {
		const json = JSON.stringify(fields);
		localStorage.setItem(localStorageKey, json);
	}

	function loadFilter(): void {
		var json = localStorage.getItem(localStorageKey);
		if (!json) {
			return;
		}
		const fieldObjects = JSON.parse(json) as FilterField[];
		fields = FilterField.fromObjects(fieldObjects);
	}
</script>

<div class="container">
	<div class="actions">
		<strong>Filter Conditions:</strong>
		<button type="button" on:click={addField} class="btn-secondary">Add</button>
		{#if canApplyFilter && fields.length > 0}
			<button type="button" on:click={applyFilter} class="btn-secondary">Apply</button>
		{/if}
		{#if isFilterApplied}
			<button type="button" on:click={resetFilter} class="btn-secondary">Reset</button>
		{/if}
	</div>
	{#if fields.length > 0}
		<div class="conditions">
			{#each fields as field (field.id)}
				<LogFilterFieldComponent {field} on:remove={removeField} />
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.container {
		display: inline-flex;
		flex-direction: column;
		gap: 5px;
		margin: 10px 0;
		padding: 10px 5px;
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 5px;
	}

	.conditions {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}
</style>
