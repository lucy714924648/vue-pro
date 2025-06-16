// utils/auth.js
export const TokenKey = 'Admin-Token'

// 设置token和过期时间
export function setToken(token, expires = 7200000) { // 默认2小时过期
  const data = {
    token,
    expires: new Date().getTime() + expires // 当前时间加上过期时间
  }
  localStorage.setItem(TokenKey, JSON.stringify(data))
}

// 获取token
export function getToken() {
  const data = localStorage.getItem(TokenKey)
  if (!data) return null

  const { token, expires } = JSON.parse(data)
  // 判断是否过期
  if (new Date().getTime() >= expires) {  
    removeToken()
    return null
  }
  return token
}

// 移除token
export function removeToken() {
  localStorage.removeItem(TokenKey)
}

// utils/auth.js
export function refreshToken() {
    const data = localStorage.getItem(TokenKey)
    if (!data) return
  
    const { token, expires } = JSON.parse(data)
    const now = new Date().getTime()
    
    // 如果token即将过期（比如还有30分钟过期），则刷新
    if (expires - now < 1800000) { // 30分钟
      // 调用刷新token的API 
      axios.post('/refresh-token', { token })
        .then(response => {
          setToken(response.data.token)
        })
    }
  }