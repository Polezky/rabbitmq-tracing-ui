<script lang="ts">
	import type { IColumnConfig } from './IColumnConfig';
	import { logItemColumnConfig, LogItemColumnList } from './ColumnList';

	const columnList = LogItemColumnList.instance;

	let columns: IColumnConfig[];

	logItemColumnConfig.subscribe(({ columns: cols }) => {
		columns = cols;
	});
</script>

<div class="container">
	<strong>Columns Visibility:</strong>
	{#each columns as column (column.index)}
		<label class="column-visibility-label">
			<input
				type="checkbox"
				class="checkbox"
				on:change={() => columnList.toggleColumnVisibility(column)}
				bind:checked={column.isVisible} />
			{column.displayName}
		</label>
	{/each}
</div>

<style lang="scss">
	.container {
		display: inline-flex;
		flex-wrap: wrap;
		align-items: center;
		border: 1px solid gray;
		margin: 10px 0;
		padding: 10px 5px;
	}

	.column-visibility-label {
		display: flex;
		align-items: center;
		margin-left: 5px;
		margin-right: 5px;
	}
	.checkbox {
		accent-color: rgb(245, 245, 245);
	}
</style>
