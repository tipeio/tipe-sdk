# @tipe/client
Tipe client for JavaScript and Node.js


```js
import { createClient } from '@tipe/client'


const tipe = createClient({
  project: '...',
  key: '...'
})

tipe.document({
  id: '78979898'
})
.then(data => {
  console.log(data)
})
```
