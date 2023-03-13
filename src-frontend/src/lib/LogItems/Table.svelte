<script lang="ts">
	import type { IColumnConfig, IColumnsConfig } from './IColumnConfig';
	import type { LogItem } from './LogItem';
	import {
		canMoveColumnLeft,
		canMoveColumnRight,
		getVisibleColumns,
		logItemColumnConfig,
		moveColumnLeft,
		moveColumnRight,
		updateState as updateColumnsConfigState
	} from './ColumnsConfig';
	import { logFilterFieldConfigs } from '$lib/LogFilters/LogFilterFieldConfigs';
	import type { LogItemFieldFormatter } from '$lib/LogFilters/ILogFilterFieldConfig';

	interface IColumnResizeInfo {
		initialX: number;
		initialWidth: number;
		columnConfig: IColumnConfig;
	}

	export let logItems: LogItem[] = [];
	export let rootElement: HTMLDivElement;

	let thTopStyle: string;
	let resizeInfo: IColumnResizeInfo | undefined;

	const formatters = new Map<keyof LogItem, LogItemFieldFormatter>(
		logFilterFieldConfigs
			.filter((x) => typeof x.getDisplayValue === 'function')
			.map((x) => [x.logItemKey, x.getDisplayValue as LogItemFieldFormatter])
	);

	let visibleColumns: IColumnConfig[];
	let config: IColumnsConfig;

	$: if (rootElement) {
		const top = rootElement.getBoundingClientRect().top - 5;
		thTopStyle = `top:${top.toFixed()}px;`;
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

	function startColumnResize(
		event: MouseEvent & { currentTarget: EventTarget & HTMLDivElement },
		columnConfig: IColumnConfig
	): void {
		document.body.style.cursor = 'col-resize';

		columnConfig.width = event.currentTarget.parentElement!.getBoundingClientRect().width;
		resizeInfo = {
			initialX: event.pageX,
			initialWidth: columnConfig.width,
			columnConfig
		};
		document.addEventListener('mousemove', resizeColumn);
		document.addEventListener('mouseup', stopColumnResize);
	}

	function resizeColumn(event: MouseEvent): void {
		if (!resizeInfo) {
			return;
		}

		const width = resizeInfo.initialWidth + event.pageX - resizeInfo.initialX;
		resizeInfo.columnConfig.width = Math.round((width + Number.EPSILON) * 100) / 100;
		updateColumnsConfigState({});
	}

	function stopColumnResize(): void {
		document.body.style.cursor = '';
		resizeInfo = undefined;
		document.removeEventListener('mousemove', resizeColumn);
		document.removeEventListener('mouseup', stopColumnResize);
	}

	function getColumnWidthStyle(column: IColumnConfig): string {
		if (!config.canAdjustColumnWidths || !column.width) {
			return '';
		}

		const width = Math.max(10, column.width);
		return `width:${width}px;`;
	}
</script>

{#if logItems.length}
	<table class="list" class:adjustable={config.canAdjustColumnWidths}>
		<thead>
			<tr>
				{#each visibleColumns as column (column.index)}
					<th class="c" style={thTopStyle + getColumnWidthStyle(column)}>
						{#if config.isEditMode}
							<div class="arrows-container">
								<div
									class="move-arrow"
									class:disabled={!canMoveColumnLeft(column)}
									on:click={() => moveColumnLeft(column)}>
									&larr
								</div>
								<div
									class="move-arrow right"
									class:disabled={!canMoveColumnRight(column)}
									on:click={() => moveColumnRight(column)}>
									&rarr
								</div>
							</div>
						{/if}
						{#if config.isEditMode && config.canAdjustColumnWidths}
							<div class="th-drag" on:mousedown|self={(e) => startColumnResize(e, column)} />
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
						<td style={getColumnWidthStyle(column)}>{@html getLogItemValue(logItem, column)}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
{/if}

<style lang="scss">
	.th-drag {
		width: 5px;
		height: 100%;
		position: absolute;
		right: 0;
		top: 0;
		background-color: lightgrey;
		cursor: col-resize;
	}

	.list {
		table-layout: auto;
		position: relative;
		margin-top: 10px;

		th {
			position: sticky;
			background: white;
			border-top: 1px solid rgb(204, 204, 204);
		}

		&.adjustable {
			table-layout: fixed;
			width: 100%;

			th {
				user-select: none;
			}

			td {
				line-break: anywhere;
			}
		}
	}

	.arrows-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.move-arrow {
		cursor: pointer;

		&.right {
			margin-right: 5px;
		}

		&.disabled {
			visibility: hidden;
		}
	}
</style>
