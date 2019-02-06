# @tipe/client
Tipe client for JavaScript and Node.js


```js
import { createClient } from '@tipe/client'


const tipe = createClient({
  project: '1feeed2f-823a-4382-808f-a04ed533c915',
  key: '60cfbce5-0728-4ff2-884b-37ef8d8dde18'
})

tipe.getDocumentsByType('Author')
.then(data => {
  // data = []
  console.log(data)
})

tipe.getDocumentById('b2d1e408aafd574a')
.then(data => {
  // data = {}
  console.log(data)
})

tipe.getDocumentsByType('Asset')
.then(data => {
  console.log(data)
})
```
