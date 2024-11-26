import adapter from '@sveltejs/adapter-node'
import { sveltePreprocess } from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // compilerOptions: { runes: true },
    kit: {
        adapter: adapter({ out: 'build' }),
        paths: {
            base: '/datatables'
        },
        alias: {
			$site: 'src/site',
			$site: 'src/site/*'
		}
    },
	vitePlugin: {
        inspector: {
            toggleKeyCombo: 'meta-shift',
            holdMode: true,
            showToggleButton: 'always',
            toggleButtonPos: 'bottom-right',
        }
	}
}

export default config
