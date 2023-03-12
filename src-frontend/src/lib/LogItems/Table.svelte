<script lang="ts">
	import type { IColumnConfig, IColumnsConfig } from './IColumnConfig';
	import type { LogItem } from './LogItem';
	import {
		canMoveColumnLeft,
		canMoveColumnRight,
		getVisibleColumns,
		logItemColumnConfig,
		moveColumnLeft,
		moveColumnRight
	} from './ColumnsConfig';
	import { logFilterFieldConfigs } from '$lib/LogFilters/LogFilterFieldConfigs';
	import type { LogItemFieldFormatter } from '$lib/LogFilters/ILogFilterFieldConfig';

	export let logItems: LogItem[] = [];
	export let rootElement: HTMLDivElement;

	let thStyle: string;

	const formatters = new Map<keyof LogItem, LogItemFieldFormatter>(
		logFilterFieldConfigs
			.filter((x) => typeof x.getDisplayValue === 'function')
			.map((x) => [x.logItemKey, x.getDisplayValue as LogItemFieldFormatter])
	);

	let visibleColumns: IColumnConfig[];
	let config: IColumnsConfig;

	$: if (rootElement) {
		const top = rootElement.getBoundingClientRect().top - 5;
		thStyle = `top: ${top.toFixed()}px;`;
	}

	logItemColumnConfig.subscribe((c) => {
		config = c;
		visibleColumns = getVisibleColumns();
	});

	function getLogItemValue(logItem: LogItem, column: IColumnConfig): string {
		if (formatters.has(column.logItemKey)) {
			return formatters.get(column.logItemKey)!(logItem, config);
		}
		return `${logItem[column.logItemKey]}`;
	}
</script>

{#if logItems.length}
	<table class="list">
		<thead>
			<tr>
				{#each visibleColumns as column (column.index)}
					<th class="c" style={thStyle}>
						{#if config.isEditMode}
							<div class="config-container">
								<div
									class="move-arrow"
									class:disabled={!canMoveColumnLeft(column)}
									on:click={() => moveColumnLeft(column)}>
									&larr
								</div>
								<div
									class="move-arrow"
									class:disabled={!canMoveColumnRight(column)}
									on:click={() => moveColumnRight(column)}>
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
					{#each visibleColumns as column (column.index)}
						<td>{@html getLogItemValue(logItem, column)}</td>
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
