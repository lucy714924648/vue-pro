
//存token,过期时间2h
function setToken(token, expirs = 3600 * 1000 * 2) {
    const data = {
        token,
        expirs: new Date().getTime() + expirs
    }
    localStorage.setItem("token", JSON.stringify(data))

}
// 存refreshToken,过期时间7天
function setRefreshToken(refreshToken, expires = 3600 * 1000 * 24 * 7) {
    const data = {
        refreshToken,
        expires: new Date().getTime() + expires
    }
    localStorage.setItem('refreshToken', JSON.stringify(data))
}

// 取token
function getToken() {
    const data = localStorage.getItem("token");
    if (!data) return null
    const { token, expirs } = JSON.parse(data);
    //判断是否过期
    if (new Date().getTime() >= expirs) {
        //
        localStorage.removeItem("token");
        return null
    }
    return token
}

// 取refreshToken
function getRefreshToken() {
    const data = localStorage.getItem("refreshToken")
    if (!data) return null
    const { refreshToken, expires } = JSON.parse(data);
    //判断是否过期
    if (new Date().getTime() >= expires) {
        localStorage.removeItem("refreshToken");
        return null
    }
    return refreshToken
}