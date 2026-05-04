fetch("http://localhost:3000/wallpaper/api/wallpapers", {
  headers: {
    "x-api-key": "awais_mobile_secure_999",
    "x-app-package": "com.example.app",
    "x-device-id": "123"
  }
}).then(res => res.text()).then(console.log).catch(console.error)
