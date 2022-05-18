const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()
const jwt = require('jsonwebtoken') // 使用jwt签名

app.all('*', function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header('Access-Control-Allow-Origin', '*')
  //允许的header类型
  res.header('Access-Control-Allow-Headers', 'content-type')
  //跨域允许的请求方式
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')
  if (req.method.toLowerCase() == 'options') res.send(200)
  //让options尝试请求快速结束
  else next()
})

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// 设置superSecret 全局参数
app.set('superSecret', 'myjwttest')

const authRoutes = express.Router()

// 用户注册
register()

// 用户登录
signIn()

const apiRoutes = express.Router()

// API路由处理 拦截验证JWT
apiRoutes.use((req, res, next) => {
  // 只拦截部分接口
  const { url } = req
  // 拦截名单
  const whiteList = ['shoppingCart', 'orders']
  if (whiteList.findIndex((item) => url.includes(item)) > -1) {
    const token =
      req.body.token || req.query.token || req.headers['x-access-token']
    if (token) {
      // 解码token (验证 secret 和检查有效期（exp）)
      jwt.verify(token, app.get('superSecret'), function (err, decoded) {
        if (err) {
          return res.status(401).send({
            success: false,
            message: 'token失效',
          })
        } else {
          // 如果验证通过，在req中写入解密结果
          req.decoded = decoded
          // 继续下一步路由
          next()
        }
      })
    } else {
      // 没有拿到token 返回错误
      return res.status(403).send({
        success: false,
        message: '没有找到token',
      })
    }
  } else {
    // 继续下一步路由
    next()
  }
})

// 查询产品信息
getProductCollections()

// 获取产品详情
getProductDetail()

// 搜索产品
searchProduct()

// 获取用户购物车
getShoppingCart()

// 添加购物车
addShoppingCart()

// 删除购物车
deleteShoppingCart()

// 注册auth路由
app.use('/auth', authRoutes)
// 注册API路由
app.use('/api', apiRoutes)
const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})

function register() {
  authRoutes.post('/register', function (req, res) {
    const { username, password } = req.body
    fs.readFile('./user/data.json', function (err, data) {
      const fileData = JSON.parse(data)
      const index = fileData.findIndex((item) => item['username'] === username)
      if (index > -1) {
        res.send(false)
      } else {
        // 新增一条用户信息
        fileData.push({
          username,
          password,
        })
        fs.writeFile('./user/data.json', JSON.stringify(fileData), (err) => {
          if (!err) {
            res.send(true)
          }
        })
      }
    })
  })
}

function signIn() {
  authRoutes.post('/login', function (req, res) {
    const { username, password } = req.body
    fs.readFile('./user/data.json', function (err, data) {
      const fileData = JSON.parse(data)
      const index = fileData.findIndex((item) => item['username'] === username)
      if (index > -1) {
        const user = fileData[index]
        if (user.password === password) {
          const token = jwt.sign(user, app.get('superSecret'), {
            expiresIn: 60 * 30, // 授权时效30分钟
          })
          res.json({
            success: true,
            token: token,
          })
        } else {
          res.json({
            success: false,
            message: '用户密码错误',
          })
        }
      } else {
        res.json({
          success: false,
          message: '抱歉，此用户未注册',
        })
      }
    })
  })
}

function getProductCollections() {
  apiRoutes.get('/productCollections', function (req, res) {
    fs.readFile('./productCollections/data.json', function (err, data) {
      res.json({
        productList: JSON.parse(data),
      })
    })
  })
}

function getProductDetail() {
  apiRoutes.get('/touristRoutes/:touristRouteId', function (req, res) {
    const { touristRouteId } = req.params
    let productDetailList = []
    fs.readFile('./productDetail/data.json', function (err, data) {
      productDetailList = JSON.parse(data)
      const index = productDetailList.findIndex(
        (item) => item.id == touristRouteId
      )
      if (index > -1) {
        res.json({
          productDetail: productDetailList[index],
        })
      } else {
        res.status(404)
        res.end()
      }
    })
  })
}

function searchProduct() {
  apiRoutes.get('/touristRoutes', function (req, res) {
    const { keyword, pageNumber, pageSize } = req.query
    let productList = []
    let result = {}
    fs.readFile('./productSearch/data.json', function (err, data) {
      productList = JSON.parse(data).filter(
        (item) =>
          item['title'].indexOf(keyword) > -1 ||
          item['description'].indexOf(keyword) > -1
      )
      result.total = productList.length
      result.data = productList.slice(
        parseInt(pageSize) * (parseInt(pageNumber) - 1),
        parseInt(pageSize) * parseInt(pageNumber)
      )
      res.json(result)
    })
  })
}

function getShoppingCart() {
  apiRoutes.get('/shoppingCart', function (req, res) {
    const { username } = req.decoded
    let result = null
    fs.readFile('./shoppingCart/data.json', function (err, data) {
      const fileData = JSON.parse(data)
      const index = fileData.findIndex((item) => item['username'] === username)
      if (index > -1) {
        result = fileData[index]
      } else {
        result = {}
      }
      res.json(result)
    })
  })
}

function addShoppingCart() {
  apiRoutes.post('/shoppingCart/items', function (req, res) {
    const { username } = req.decoded
    const { touristRouteId } = req.body
    let result = {
      success: true,
      touristList: [],
    }
    // 读取对应产品信息
    fs.readFile('./productSearch/data.json', function (err, data) {
      const fileData = JSON.parse(data)
      const index = fileData.findIndex((item) => item['id'] == touristRouteId)
      if (index > -1) {
        // 读取购物车信息
        fs.readFile('./shoppingCart/data.json', function (err, data) {
          const shoppingCartData = JSON.parse(data)
          const sIndex = shoppingCartData.findIndex(
            (item) => item['username'] === username
          )
          if (sIndex > -1) {
            // 此用户购物车已有产品
            const tIndex = shoppingCartData[sIndex].shoppingCartList.findIndex(
              (item) => item['id'] == touristRouteId
            )
            // 购物车已有此产品
            if (tIndex > -1) {
              res.json({
                success: false,
                message: '此产品已加入购物车，请勿重复添加',
              })
            } else {
              // 添加对应产品
              shoppingCartData[sIndex].shoppingCartList.push(fileData[index])
            }
          } else {
            shoppingCartData.push({
              username,
              shoppingCartList: [fileData[index]],
            })
          }
          fs.writeFile(
            './shoppingCart/data.json',
            JSON.stringify(shoppingCartData),
            (err) => {
              if (!err) {
                result.touristList = shoppingCartData[sIndex]
                res.json(result)
              }
            }
          )
        })
      } else {
        res.json({
          success: false,
          message: '此产品已下架，请确认后重试',
        })
      }
    })
  })
}

function deleteShoppingCart() {
  apiRoutes.delete('/shoppingCart/items/:touristRouteId', function (req, res) {
    const { username } = req.decoded
    const { touristRouteId } = req.params
    const result = {
      success: true,
    }
    const touristRouteIdList = touristRouteId.split(',')
    fs.readFile('./shoppingCart/data.json', function (err, data) {
      const fileData = JSON.parse(data)
      const index = fileData.findIndex((item) => item['username'] === username)
      if (index > -1) {
        let shoppingCartList = fileData[index].shoppingCartList
        touristRouteIdList.forEach((id) => {
          const sIndex = fileData[index].shoppingCartList.findIndex(
            (item) => item['id'] == id
          )
          if (sIndex > -1) {
            shoppingCartList.splice(sIndex, 1)
          } else {
            res.json({
              success: false,
              message: '购物车中不存在该商品，请确认后重试',
            })
          }
        })
        fileData[index].shoppingCartList = shoppingCartList
        fs.writeFile(
          './shoppingCart/data.json',
          JSON.stringify(fileData),
          (err) => {
            if (!err) {
              res.json(result)
            }
          }
        )
      } else {
        res.json({
          success: false,
          message: '购物车为空，请先添加商品',
        })
      }
    })
  })
}
