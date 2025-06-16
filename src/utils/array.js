

(function () {
    const arr = [1, 2, 3, 4, 5, 2, 3];
    const newArr = [...arr];
    console.log(newArr);
    //冒泡排序去重
    for (let i = 0; i < newArr.length; i++) {
        for (let j = i + 1; j < newArr.length; j++) {
            if (newArr[j] === newArr[i]) {
                //去除该项
                newArr.splice(j, 1);
                j--;
            }

        }
    }
    console.log(newArr);
})()

/**
 * 
 * @param {Object} val 对象
 * @returns {boolean} 判断是不是一个对象
 */
const isObject = (val) => typeof val === "object" && val !== null;

const arrObj = [
    { a: 1, b: 2 },
    { a: 2, b: 3 },
    { a: 1, b: 2 },
    { a: 3, b: 3 },
]
const newArrObj = arrObj.slice();
console.log(newArrObj);
//冒泡排序去重
for (let i = 0; i < newArrObj.length; i++) {
    for (let j = i + 1; j < newArrObj.length; j++) {
        if (equalsArr(newArrObj[i], newArrObj[j])) {
            //去除该项
            newArrObj.splice(j, 1);
            j--;
        }

    }
}

/**
 * 对象数组去重
 * @param {Array} val1 对象数组
 * @param {Array} val2 对象数组
 */
function equalsArr(val1, val2) {
    if (isObject(val1) && isObject(val2)) {
        const keys1 = Object.keys(val1),
            keys2 = Object.keys(val2);
        if (keys1.length !== keys2.length) {
            return false;
        }
        for (const k of keys1) {
            if (!keys2.includes(k)) {
                return false;
            }
            //递归比较属性值
            if (!equalsArr(val1[k], val2[k])) {
                return false;
            }
        }
        return true;
    } else {
        //不是对象，用===
        return val1 === val2;
    }
}


console.log(newArrObj);

(
    function () {
        const objArray = Array.from({ length: 30 }, (_, i) => ({
            id: i + 1,
            pid: i > 0 ? Math.floor((i - 1) / 2) + 1 : null, // 简单的树结构

            name: `Name${i + 1}`,
            age: Math.floor(Math.random() * 50) + 20
        }))
        console.log(objArray);
        function objToTree(data) {
            let result = [];
            let map = {}
            data.forEach(item => {
                map[item.id] = item
            });
            data.forEach(item => {
                let parent = map[item.pid];
                if (parent) {
                    (parent.children = parent.children || []).push(item)
                } else {
                    result.push(item)
                }
            })
            console.log(result);
            return result;


        }
        const res = objToTree(objArray);

        // console.log(res);
    }
)()