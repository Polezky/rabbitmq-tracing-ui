<script>
	import '../app.scss';

	async function checkImport() {
		if (import.meta.env.VITE_DEV_MODE === 'standalone') {
			await import('../main.css');
		}
	}

	checkImport();
</script>

<slot />
