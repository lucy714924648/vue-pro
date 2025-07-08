/**
 * 
 * @param {Array} arr 数组格式的含有pid,id关系的数据
 * @param {Number} rootValue 根节点
 * @returns 
 */
export function arrayToTree(arr, rootValue) {
    const result = []
    arr.forEach(item => {
        //找到根节点，pid=0的
        if (item.pid === rootValue) {
            result.push(item)
            //接着找pid为根节点id的节点(根节点的子节点)
            const children = arrayToTree(arr, item.id)
            //有子节点才加children
            if (children.length > 0) {
                item.children = children
            }
        }
    });
    return result

}

function getTree(arrList, rootId) {
    const result = []
    arrList.forEach((item) => {
        if (item.pid === rootId) {
            result.push(item)
            const children = getTree(arrList, item.id)
            if (children.length > 0) item.children = children
        }

    })
}