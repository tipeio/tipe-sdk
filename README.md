# tipe.js
Tipe client for JavaScript and Node.js



GraphQL
```js
import { createClient } from 'tipe.js'


const tipe = createClient({
  type: 'graphql',
  apiKey: '...',
  orgKey: '...'
})


const folder = await tipe.query(`
  query API {
    Folder() {
      id
      name
    }
  }
`)
```

REST
```js
import { createClient } from 'tipe.js'


const tipe = createClient({
  type: 'rest',
  apiKey: '...',
  orgKey: '...'
})


const homeFolderId = 'f1aa3515-8078-445c-a497-50aff28523ef'
const folder = await tipe.folder(homeFolderId)
```
