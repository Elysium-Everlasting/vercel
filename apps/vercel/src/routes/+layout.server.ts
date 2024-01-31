import type { LayoutServerLoad } from './$types'

import { getUser } from '$lib/api/queries/user'

export const load: LayoutServerLoad = async () => {
  const login = 'ap0nia'

  const user = await getUser(login)

  return {
    user,
  }
}
