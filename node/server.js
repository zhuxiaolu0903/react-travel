const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express()

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const router = express.Router()

getProductCollections()


app.use(router)

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})

function getProductCollections() {
  router.get('/api/productCollections', function(req, res) {
    fs.readFile('../')
    res.json({
      msg: 'hello world'
    })
  })
}
