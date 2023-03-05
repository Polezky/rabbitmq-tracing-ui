<script lang="ts">
	import LogItemTable from '$lib/LogItems/Table.svelte';
	import { onMount } from 'svelte';
	import { LogItem } from '$lib/LogItems/LogItem';
	import LogFilterComponent from '$lib/LogFilters/LogFilter.svelte';
	import type { LogFilterField } from '$lib/LogFilters/LogFilterField';
	import LogItemColumnsConfig from '$lib/LogItems/ColumnsVisibility.svelte';
	import { logItemColumnConfig } from '$lib/LogItems/ColumnList';

	interface IFileInfo {
		name: string;
		size: number;
	}

	const baseTraceFilesUrl = 'api/trace-files';

	let files: IFileInfo[] = [];
	let file: IFileInfo;
	let allLogItems: LogItem[] = [];
	let logItems: LogItem[] = [];
	let isFilterApplied = false;
	let isFilterEditMode = false;
	let isColumnEditMode = false;

	$: hasAllLogItems = allLogItems.length > 0;

	onMount(async () => {
		files = await loadLogFileLists();
	});

	logItemColumnConfig.subscribe(({ isEditMode }) => {
		isColumnEditMode = isEditMode;
	});

	async function loadLogs(): Promise<void> {
		const url = `${baseTraceFilesUrl}/${encodeURIComponent(file.name)}`;
		const response = await fetch(url);
		const lines = await response.text();
		allLogItems = lines.split('\n').filter(Boolean).map(LogItem.fromJson);
		resetFilter();
	}

	async function loadLogFileLists(): Promise<IFileInfo[]> {
		const response = await fetch(baseTraceFilesUrl);
		const json = await response.text();
		return JSON.parse(json);
	}

	function applyFilter({ detail: fields }: CustomEvent<LogFilterField[]>): void {
		isFilterApplied = true;
		logItems = allLogItems.filter((i) => fields.every((f) => f.filter(i)));
	}

	function resetFilter(): void {
		isFilterApplied = false;
		logItems = allLogItems.slice();
	}

	function toggleColumnEditMode(): any {
		logItemColumnConfig.update((c) => ({ ...c, isEditMode: !c.isEditMode }));
	}
</script>

<div class="tracing-ui-root">
	<div class="controls">
		<button type="button" on:click={loadLogFileLists} class="btn-secondary">
			Update Files List</button>
		<label for="fileName">File:</label>
		<select bind:value={file} id="fileName">
			{#each files as file}
				<option value={file}>
					{file.name}
				</option>
			{/each}
		</select>
		<button disabled={!file} type="button" on:click={loadLogs}> Load Logs </button>

		{#if hasAllLogItems}
			<button
				type="button"
				on:click={() => (isFilterEditMode = !isFilterEditMode)}
				class="btn-secondary">
				{isFilterEditMode ? 'Complete' : ''} Edit Filter
			</button>
		{/if}

		{#if hasAllLogItems}
			<button type="button" on:click={toggleColumnEditMode} class="btn-secondary">
				{isColumnEditMode ? 'Complete' : ''} Edit Columns
			</button>
		{/if}
	</div>
	{#if isFilterEditMode}
		<div>
			<LogFilterComponent
				{isFilterApplied}
				canApplyFilter={hasAllLogItems}
				on:applyFilter={applyFilter}
				on:resetFilter={resetFilter} />
		</div>
	{/if}
	{#if isColumnEditMode}
		<div>
			<LogItemColumnsConfig />
		</div>
	{/if}
	<LogItemTable {logItems} />
</div>

<style lang="scss">
	.tracing-ui-root {
		padding: 5px;
	}

	.controls {
		display: flex;
		align-items: center;
		gap: 5px;
	}
</style>
