import { Tabs as TabsPrimitive } from 'bits-ui'

import Content from './content.svelte'
import List from './list.svelte'
import Trigger from './trigger.svelte'

const Root = TabsPrimitive.Root

export {
  Root,
  Content,
  List,
  Trigger,
  //
  Root as Tabs,
  Content as TabsContent,
  List as TabsList,
  Trigger as TabsTrigger,
}
