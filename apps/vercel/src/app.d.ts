import type { getUser } from '$lib/api/queries/user'

declare global {
  namespace App {
    interface Locals {}

    interface PageData {
      user?: Awaited<ReturnType<typeof getUser>>
    }
  }
}
