import { app } from './app'

let PORT = process.env.PORT || 5002

app.listen(PORT, () => {
  console.log('api is listening on port:', PORT)
})
