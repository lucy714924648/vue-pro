import http from "../utils/http";
import axios from "axios"
function refreshToken() {
    // 刷新token接口
    return http.get('/refreshToken',
        {
            headers: {
                Authorization: "111"
            }
        }
    );

}


function login(obj) {
    return http({
        method: 'post',
        url: 'http://127.0.0.1:4523/m1/5734819-5417475-default/login',
        data: {
            name: obj.name
        }
    })
}

function getUser(id) {
    // 刷新token接口
    return http.get(`/user/${id}`);

}
export {
    login, refreshToken, getUser
}
