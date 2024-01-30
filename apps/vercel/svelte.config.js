// @ts-check

import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import adapter from '@svelte.kit/adapter-aws'

/**
 * @type{import('@sveltejs/kit').Config}
 */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
  },
}

export default config
