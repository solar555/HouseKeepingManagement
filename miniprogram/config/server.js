const host = "http://housekeeping.nodepointech.com";

module.exports = {
  port: 85,
  app_name: "housekeeping",
  refund: "C",
  mysql: {
    host: "192.168.1.220",
    port: "36306",
    user: "root",
    password: "root123",
    database: "housekeeping",
    connectionLimit: 50
  },
  redis: {
    host: "192.168.1.220",
    port: "6380",
    db: 3,
    password: "wf_110"
  },
  webapi: {
    host: "192.168.1.220",
    port: 85
  },
  token: {
    secret: "secret:housekeeping"
  },

  // 极光推送
  jpush: {
    AppKey: "0ee4cafb7265523345a82574",
    MasterSecret: "4807b43ce2d5ed6afa110287",
    apns_production: false
  },

  // 腾讯短信
  qcloudsms: {
    appId: 1400053104,
    appKey: "a0a27151eecbc584d72f0a6bcbcf14be",
    templateId: 62911
  },
  ping: {
    AppId: "app_zPazbPD8q9OSTmL4",
    SecretKey: "sk_test_yXf5mLfTW9m1H8yjPGPunHKG"
  },
  rtc: {
    appid: "71012",
    appKey: "71007b1c-6b75-4d6f-85aa-40c1f3b842ef"
  },
  youxin: {
    appid: "jiedian",
    appkey: "bc9cc94c9a51282387528e33c92a0589ad4dd2ba"
  },
  saifeimu: {
    SecretKey: "D9857414",
    host: "www.168parking.com",
    port: 80
  },
  //lanka:{
  //    appKey:"e667b044ab254dac8d67f87e38979963",
  //    host:"101.132.25.45",
  //    port:8080
  //},
  hengzhongxin: {
    key: "wb_appID",
    host: 'www.edaoj.com',
    prefix: 'nt_'
  },
  password: {
    web: false,
    app: false
  },
  lift: true,
  thirdparty: {
    name: "skyworth",
    appkey: "8d4a3664e2ef422e978f4dd044cebb81",
    salt: "97ab372042864e8e8dbed22e00d229e4",
    host: "passportsb.app.doubimeizhi.com",
    port: 443
  },
  WEPAY_NOTIFY_URL: host + "/app/payment/wepay_done"
};
