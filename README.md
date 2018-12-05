# @tipe/client
Tipe client for JavaScript and Node.js


```js
import { createClient } from '@tipe/client'


const tipe = createClient({
  project: '1feeed2f-823a-4382-808f-a04ed533c915',
  key: '60cfbce5-0728-4ff2-884b-37ef8d8dde18'
})

tipe.document({
  id: 'da340b78-9eed-4505-b545-c13266cf2899'
})
.then(data => {
  console.log(data)
})

tipe.page({
  id: 'b2d1e408-7f57-4146-8471-23dfaafd574a'
})
.then(data => {
  console.log(data)
})

tipe.asset({
  id: '5712c7e2-df2f-43b3-94b2-f5c999d7ddd6'
})
.then(data => {
  console.log(data)
})
```
