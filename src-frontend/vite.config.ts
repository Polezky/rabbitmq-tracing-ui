import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type PluginOption } from 'vite';
import { exec } from 'node:child_process';

const postBuildCommandsPlugin: PluginOption = {
  name: 'postbuild-commands',
  closeBundle: () => {
    if (process.env.VITE_DEV_MODE == 'rabbitmq-dev') {
      exec('../run.sh copy-front 1', (_, output, err) => {
        if (output) console.log(output);
        if (err) console.log(err);
      });
    }
  }
};

export default defineConfig({
  plugins: [
    sveltekit(),
    postBuildCommandsPlugin,
  ]
});
