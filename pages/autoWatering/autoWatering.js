// page/autoWatering/autoWatering.js
Page({

  data: {
    data:[],
    isOnline:false,
    currentColor:'',
    isShow:true
  },

  onLoad: function (options) {
    //显示水位
    let animation = wx.createAnimation({
      duration: 0
    })
    animation.rotateZ(-90).step()
    this.setData({
      animation: animation.export()
    })
    //获取数据
    wx.request({
      url: "http://api.heclouds.com/devices/555652336/datastreams?datastream_ids=TEMP,HUM,Water",
      method: 'GET',
      header: {
        'api-key': '2teU=I2seWhpQ==cAOJcgAS1usM='
      },
      success:(res)=>{
        this.setData({
          data: res.data.data
        })
        console.log(this.data.data)
      }
    })
    //判断设备是否在线
    wx.request({
      url: 'http://api.heclouds.com/devices/status?devIds=555652336',
      method: 'GET',
      header: { 'api-key': '2teU=I2seWhpQ==cAOJcgAS1usM=' },
      success: (res) => {
        console.log(res)
        this.setData({
          isOnline: res.data.data.devices[0].online
        })
        if (this.data.isOnline){
          this.setData({
            currentColor:'#00b',
            isShow:false
          })
        }else{
          this.setData({
            currentColor: '#aaa',
            isShow:true
          })
        }
      }
    })
  },
  onPullDownRefresh: function () {

    //获取数据
    wx.request({
      url: "http://api.heclouds.com/devices/555652336/datastreams?datastream_ids=TEMP,HUM,Water",
      method: 'GET',
      header: {
        'api-key': '2teU=I2seWhpQ==cAOJcgAS1usM='
      },
      success:(res)=> {
        if(this.data.onLine){
          wx.showToast({
            title: '设备在线'
          })
        }else{
          wx.showToast({
            title: '设备离线',
            icon:'none'
          })
        }
      }
    })
  },
  onlaunchWatering(){
    wx.request({
      url: 'http://api.heclouds.com/cmds?device_id=555652336',
      method: 'POST',
      data: {
        startWatering: true
      },
      header: {
        'api-key': '2teU=I2seWhpQ==cAOJcgAS1usM='
      },
      success(res) {
        if (this.data.onLine) {
          wx.showToast({
            title: '设备在线'
          })
        }
      }
    })
  },
  getuserinfo(res){
    console.log(res)
  }
})