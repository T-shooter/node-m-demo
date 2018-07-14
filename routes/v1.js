import express from 'express'
import axios from 'axios'
const router = express.Router()

router.post('/test', function (req, res, next) {
    axios.post('http://yingyan.baidu.com/api/v3/track/addpoint', req.body).then(response => {
        res.send(response.data)
    })
})


router.get('/ip', function (req, res) {
    axios.get('http://apis.map.qq.com/ws/location/v1/ip', {
        params: req.query
    }).then(response => {
        res.send(response.data)
    })
})

router.get('/taskConfig/pageQuery', (req, res, next) => {
  axios.get('http://o2otask.jd.care/taskConfig/pageQuery', {
    params: req
  }).then(response => {
      res.send(response.data)
  })
})

export default router