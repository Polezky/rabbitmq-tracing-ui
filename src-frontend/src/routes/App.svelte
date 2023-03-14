<script lang="ts">
	import LogItemTable from '$lib/Table.svelte';
	import { onMount } from 'svelte';
	import { LogItem } from '$lib/LogItem';
	import LogFilterComponent from '$lib/Filters/Filter.svelte';
	import type { FilterField } from '$lib/Filters/FilterField';
	import LogItemColumnsConfig from '$lib/Layout/LayoutConfig.svelte';
	import { layoutConfig } from '$lib/Layout/LayoutConfig';
	import { dev } from '$app/environment';

	interface IFileInfo {
		name: string;
		size: number;
	}

	const baseTraceFilesUrl = 'api/trace-files';

	let rootElement: HTMLDivElement;
	let files: IFileInfo[] = [];
	let file: IFileInfo | undefined;
	let allLogItems: LogItem[] = [];
	let logItems: LogItem[] = [];
	let isFilterApplied = false;
	let isFilterEditMode = false;
	let isLayoutEditMode = false;
	let errorMessage = '';

	$: hasAllLogItems = allLogItems.length > 0;

	onMount(async () => {
		files = await loadLogFileLists();
		if (dev) {
			file = files.find((f) => f.name === 'json0941.log');
			loadLogs();
		}
	});

	layoutConfig.subscribe(({ isEditMode }) => {
		isLayoutEditMode = isEditMode;
	});

	async function loadLogs(): Promise<void> {
		allLogItems = [];
		errorMessage = '';
		const url = `${baseTraceFilesUrl}/${encodeURIComponent(file!.name)}`;
		const response = await fetch(url);
		const lines = await response.text();
		try {
			allLogItems = lines.split('\n').filter(Boolean).map(LogItem.fromJson);
		} catch (error) {
			file = undefined;
			isFilterEditMode = false;
			isLayoutEditMode = false;
			errorMessage =
				'Failed to parse JSON in log file. It could be a text log file. Pick a JSON log file.';
		}
		resetFilter();
	}

	async function loadLogFileLists(): Promise<IFileInfo[]> {
		const response = await fetch(baseTraceFilesUrl);
		const json = await response.text();
		return JSON.parse(json);
	}

	function applyFilter({ detail: fields }: CustomEvent<FilterField[]>): void {
		isFilterApplied = true;
		logItems = allLogItems.filter((i) => fields.every((f) => f.filter(i)));
	}

	function resetFilter(): void {
		isFilterApplied = false;
		logItems = allLogItems.slice();
	}

	function toggleColumnEditMode(): any {
		layoutConfig.update((c) => ({ ...c, isEditMode: !c.isEditMode }));
	}
</script>

<div class="tracing-ui-root" bind:this={rootElement}>
	<div class="controls">
		<label for="fileName">File:</label>
		<select bind:value={file} id="fileName">
			{#each files as file}
				<option value={file}>
					{file.name}
				</option>
			{/each}
		</select>
		<button disabled={!file} type="button" on:click={loadLogs}> Load File </button>

		{#if hasAllLogItems}
			<button
				type="button"
				on:click={() => (isFilterEditMode = !isFilterEditMode)}
				class="btn-secondary">
				{isFilterEditMode ? 'Hide' : 'Show'} Filter
			</button>
			<button type="button" on:click={toggleColumnEditMode} class="btn-secondary">
				{isLayoutEditMode ? 'Hide' : 'Show'} Layout Config
			</button>
		{/if}
	</div>
	{#if errorMessage.length}
		<div class="error">{errorMessage}</div>
	{/if}
	{#if isFilterEditMode}
		<div>
			<LogFilterComponent
				{isFilterApplied}
				canApplyFilter={hasAllLogItems}
				on:applyFilter={applyFilter}
				on:resetFilter={resetFilter} />
		</div>
	{/if}
	{#if isLayoutEditMode}
		<div>
			<LogItemColumnsConfig />
		</div>
	{/if}
	<LogItemTable {logItems} {rootElement} />
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

	.error {
		font-weight: bold;
		color: red;
		margin: 10px 0;
	}
</style>
