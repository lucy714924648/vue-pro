/**
 * 跨标签页通信
 * 发送消息
 * @author jiajia <712@QQ..com>
 * @param {string} type 类型
 * @param {Object} payload 传的值
 */
export function sendMsg(type, payload) {
    localStorage.setItem("@@" + type, JSON.stringify(
        {
            payload,
            temp: Date.now()
        }
    ))
}
/**
 * 跨标签页通信
 * 监听消息  
 * @param {Function} handler 监听消息回调函数
 * @returns {Function} 取消监听函数
 */
export function listenMsg(handler) {
    const storageHandler = (e) => {
        const data = JSON.parse(e.newValue);
        //substring(2)  字符串去除前面2项
        handler(e.key.substring(2), data.payload);
    }
    window.addEventListener("message", storageHandler);
    return () => {
        window.removeEventListener("message", storageHandler);
    }
}