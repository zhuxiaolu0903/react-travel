const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express()

app.all("*",function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
    res.send(200);  //让options尝试请求快速结束
  else
    next();
})

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const router = express.Router()

getProductCollections()

getProductDetail()

app.use(router)

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})

function getProductCollections() {
  router.get('/api/productCollections', function(req, res) {
    fs.readFile('./productCollections/data.json', function (err, data) {
      res.json({
        productList: JSON.parse(data)
      })
    })
  })
}

function getProductDetail() {
  router.get('/api/touristRoutes/:touristRouteId', function(req, res) {
    const {touristRouteId} = req.params
    let productDetailList = []
    fs.readFile('./productDetail/data.json', function (err, data) {
      productDetailList = JSON.parse(data)
      const index = productDetailList.findIndex(item => item.id == touristRouteId)
      if (index > -1) {
        res.json({
          productDetail: productDetailList[index]
        })
      } else {
        res.status(404)
        res.end()
      }
    })
  })
}