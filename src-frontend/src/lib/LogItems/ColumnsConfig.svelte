<script lang="ts">
	import type { IColumnsConfig } from './IColumnConfig';
	import {
		logItemColumnConfig,
		toggleCanAdjustColumnWidths,
		toggleColumnVisibility,
		toggleShouldFormatPayload,
		updateDateTimeFormat
	} from './ColumnsConfig';
	import { dateTimeFormatItems } from './DateTimeFormatItem';
	const dateTimeFormats = dateTimeFormatItems;

	let config: IColumnsConfig;

	logItemColumnConfig.subscribe((c) => (config = c));
</script>

<div class="container">
	<div class="items-container">
		<strong>Columns Visibility:</strong>
		{#each config.columns as column (column.index)}
			<label class="lbl-checkbox">
				<input
					type="checkbox"
					class="checkbox"
					on:change={() => toggleColumnVisibility(column)}
					bind:checked={column.isVisible} />
				{column.displayName}
			</label>
		{/each}
	</div>
	<div class="items-container">
		<strong>Layout and Formatting:</strong>
		<label class="lbl-checkbox lbl-formatting">
			<input
				type="checkbox"
				class="checkbox"
				on:change={() => toggleCanAdjustColumnWidths()}
				bind:checked={config.canAdjustColumnWidths} />
			Adjust column widths
		</label>
		<label class="lbl-checkbox lbl-formatting">
			<input
				type="checkbox"
				class="checkbox"
				on:change={() => toggleShouldFormatPayload()}
				bind:checked={config.shouldFormatPayload} />
			Format Payload
		</label>
		<label for="dateTimeFormat" class="lbl-formatting">Date & Time Format</label>
		<select
			id="dateTimeFormat"
			bind:value={config.dateTimeFormat}
			on:change={() => updateDateTimeFormat(config.dateTimeFormat)}>
			{#each dateTimeFormats as item}
				<option value={item.format}>
					{item.example}
				</option>
			{/each}
		</select>
	</div>
</div>

<style lang="scss">
	.container {
		display: inline-flex;
		flex-direction: column;
		gap: 10px;
		border: 1px solid gray;
		margin: 10px 0;
		padding: 10px 5px;
	}

	.items-container {
		display: inline-flex;
		flex-wrap: wrap;
		align-items: center;
	}

	.lbl-checkbox {
		display: flex;
		align-items: center;
		margin-left: 5px;
		margin-right: 5px;
	}

	.lbl-formatting {
		margin: 0 5px 0 10px;
	}

	.checkbox {
		accent-color: rgb(245, 245, 245);
	}
</style>
