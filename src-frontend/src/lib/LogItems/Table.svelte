<script lang="ts">
	import type { IColumnConfig } from './IColumnConfig';
	import type { LogItem } from './LogItem';
	import { logItemColumnConfig, LogItemColumnList } from './ColumnList';
	import { logFilterFieldConfigs } from '$lib/LogFilters/LogFilterFieldConfigs';
	import type { LogItemFieldFormatter } from '$lib/LogFilters/ILogFilterFieldConfig';

	export let logItems: LogItem[] = [];

	const columnList = LogItemColumnList.instance;

	const formatters = new Map<keyof LogItem, LogItemFieldFormatter>(
		logFilterFieldConfigs
			.filter((x) => typeof x.getDisplayValue === 'function')
			.map((x) => [x.logItemKey, x.getDisplayValue as LogItemFieldFormatter])
	);

	let columns: IColumnConfig[];
	let isEditMode = false;

	logItemColumnConfig.subscribe(({ isEditMode: isEdit }) => {
		columns = columnList.getVisibleColumns();
		isEditMode = isEdit;
	});

	function getLogItemValue(logItem: LogItem, column: IColumnConfig): string {
		if (formatters.has(column.logItemKey)) {
			return formatters.get(column.logItemKey)!(logItem);
		}
		return `${logItem[column.logItemKey]}`;
	}
</script>

{#if logItems.length}
	<table class="list">
		<thead>
			<tr>
				{#each columns as column (column.index)}
					<th class="c">
						{#if isEditMode}
							<div class="config-container">
								<div
									class="move-arrow"
									class:disabled={!columnList.canMoveColumnLeft(column)}
									on:click={() => columnList.moveColumnLeft(column)}>
									&larr
								</div>
								<div
									class="move-arrow"
									class:disabled={!columnList.canMoveColumnRight(column)}
									on:click={() => columnList.moveColumnRight(column)}>
									&rarr
								</div>
							</div>
						{/if}
						<strong>{column.displayName}</strong>
					</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each logItems as logItem, i}
				<tr class={i % 2 === 0 ? 'alt2' : 'alt1'}>
					{#each columns as column (column.index)}
						<td>{getLogItemValue(logItem, column)}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
{/if}

<style lang="scss">
	.list {
		position: relative;
		margin-top: 10px;

		th {
			position: sticky;
			top: -1px;
			background: white;
			border-top: 1px solid rgb(204, 204, 204);
		}
	}

	.config-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.move-arrow {
		cursor: pointer;

		&.disabled {
			visibility: hidden;
		}
	}
</style>
