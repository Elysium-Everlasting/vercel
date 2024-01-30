// @ts-check

import fs from 'node:fs'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import adapter from '@svelte.kit/adapter-aws'

/**
 * @type{import('@sveltejs/kit').Config}
 */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      lambdaUpload: async (directory) => {
        fs.copyFileSync(
          'node_modules/prisma/libquery_engine-rhel-openssl-1.0.x.so.node',
          `${directory}/libquery_engine-rhel-openssl-1.0.x.so.node`,
        )

        fs.copyFileSync('prisma/schema.prisma', `${directory}/schema.prisma`)
      },
    }),
    env: {
      dir: '../../',
    },
  },
}

export default config
