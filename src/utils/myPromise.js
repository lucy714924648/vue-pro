import { duration } from "moment/moment";

const FULFILLED = 'fulfilled';
const PENDING = 'pending';
const REJECTED = 'rejected';

class MyPromise {
    constructor(executor) {
        this._state = PENDING;
        this._value = undefined;
        try {
            executor(this._resolve.bind(this), this._reject.bind(this));
        } catch (error) {
            this._reject(error);
        }
    }
    _changeState(newState, value) {
        if (this._state !== PENDING) {
            return
        }
        this._state = newState;
        this._value = value;
    }

    _resolve(data) {
        this._changeState(FULFILLED, data)
    }

    _reject(reason) {
        this._changeState(REJECTED, reason)

    }
}
const pro = new Promise((resolve, reject) => {
    // throw 123
});
const myPro = new MyPromise((resolve, reject) => {
    // throw 122223
    resolve(1111)
    reject(222)
    resolve(444)
});
// console.log(pro);
// console.log(myPro);

const proAll = Promise.all([Promise.resolve(1), Promise.reject(2), Promise.resolve(3)]);
const proAny = Promise.any([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]);
const proAllSettled = Promise.allSettled([Promise.reject(1), Promise.resolve(2), Promise.resolve(3)]);
const proRace = Promise.race([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]);
setTimeout(() => {
    console.log('proAll', proAll);
    console.log('proAny', proAny);
    console.log('proAllSettled', proAllSettled);
    console.log('proRace', proRace);

}, 1000);
const arr = new Array(10).fill(0).map((it, i) => i + 1)
console.log("arr", arr);
function delay(duration) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, duration);
    })
}
(
    async () => {
        for (let i = 0; i < 3; i++) {
            await delay(1000);
            console.log('ok');
        }
    }
)()
//迭代器能用for of循环，但是不能用for循环，迭代器没有下标；
//数组是迭代器的一种，数组有下标，index,所有可以用for循环
/**
 * 得到一个新的promise
 * 该promsie的状态取决于promise的执行；
 * proms是一个迭代器，包含多promise；
 * 全部promise成功，则返回的promise成功，
 * 数据为所有的promise成功的数据，并且顺序是按照传入的顺序排列的；
 * 只要有一个promise失败，则返回的promise失败，
 * 原因是第一个promise失败的原因;
 * @param {iterator} proms 
 */
Promise.all = function (proms) {
    return new Promise((resolve, reject) => {
        try {
            const result = [];
            let count = 0;//记录promise总数
            let fulfilledCount = 0//记录已完成的promise数量
            for (const pro of proms) {
                let i = count;//保证 顺序
                count++;
                //不是promise时,用Promise.resolve包装成promise
                Promise.resolve(pro).then((data) => {
                    fulfilledCount++;
                    //保证输出的顺序
                    result[i] = data;
                    //微任务
                    if (fulfilledCount === count) {
                        //全部成功
                        resolve(result);
                    }

                }, reject)
            }
            //传的空数组，返回空数组
            if (count = 0) {
                resolve(result)
            }
        } catch (error) {
            reject(error)
        }

    })

}