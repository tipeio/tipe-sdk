# node-tipe
Tipe client for Node.js


```js
import { createClient } from 'node-tipe'


const tipe = createClient({
  apiKey: '...',
  orgKey: '...'
})


const folder = await tipe.getFolder('ID')


const doc = await tipe.getDocument('ID')
```
