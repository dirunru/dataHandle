const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
class MyPromise {
  // 构造方法
  constructor(executor) {
    // 初始化值
    this.initValue()
    // 执行传进来的函数
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }

  initValue () {
    // 初始化值
    this.PromiseResult = null // 终值
    this.PromiseState = PENDING// 状态
    // 解决异步请求问题
    this.onFulfilledCallBackList = [] // 存储成功的
    this.onRejectedCallBackList = [] // 存储失败的
  }

  resolve = (value) => {
    console.log('values', value)
    // state是不可变的
    if (this.PromiseState !== PENDING) return
    // 如果执行resolve，状态变为fulfilled
    this.PromiseState = FULFILLED
    // 终值为传进来的值
    this.PromiseResult = value
    while (this.onFulfilledCallBackList.length) {
      this.onFulfilledCallBackList.shift()(value)
    }
  }

  reject = (reason) => {
    // state是不可变的
    if (this.PromiseState !== PENDING) return
    // 如果执行reject，状态变为rejected
    this.PromiseState = REJECTED
    // 终值为传进来的reason
    this.PromiseResult = reason
    while (this.onRejectedCallBackList.length) {
      this.onRejectedCallBackList.shift()(reason)
    }
  }

  // 创建.then方法、解决链式调用，返回promises
  then (onFulfilled, onRejected) {
    // 将then方法的参数变为可选参数
    onFulfilled = onFulfilled ? onFulfilled : value => this.PromiseResult
    onRejected = onRejected ? onRejected : reason => { throw this.PromiseResult }
    return new MyPromise((resolve, reject) => {
      if (this.PromiseState === FULFILLED) {
        try {
          // 如果成功就返回链式调用的第二次回调
          let value = onFulfilled(this.PromiseResult)
          resolve(value)
        } catch (error) {
          reject(error)
        }
      }
      if (this.PromiseState === REJECTED) {
        try {
          let value = onRejected(this.PromiseResult)
          resolve(value)
        } catch (error) {
          reject(error)
        }
      }
      if (this.PromiseState === PENDING) { // 异步pending状态处理,无法执行回调，因此先储存起来，等待返回之后在执行。
        // this.onFulfilledCallBackList.push(onFulfilled)
        // this.onRejectedCallBackList.push(onRejected)
        // 处理链式调用的时候的pending状态
        this.onFulfilledCallBackList.push(() => {
          try {
            let value = onFulfilled(this.PromiseResult)
            resolve(value)
          } catch (error) {
            reject(error)
          }
        })
        this.onRejectedCallBackList.push(() => {
          try {
            let value = onRejected(this.PromiseResult)
            resolve(value)
          } catch (error) {
            reject(error)
          }
        })
      }
    })
  }

  // finally方法 不管成功失败都会执行一次,最后执行
  finally (callback) {
    setTimeout(() => {
      callback()
    }, 0)
  }
  // catch
  catch (failCallback) {
    return this.then(undefined, failCallback)
  }
}

let p1 = new MyPromise((resolve, reject) => {
  resolve('success')
}).then(res => {
  console.log('p1-res', res)
})
let p2 = new MyPromise((resolve, reject) => {
  reject('error')
}).then(res => {
  console.log('p2-res', res)
}, err => {
  console.log('p2-err', err)
})
// let p3 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('p3=success')
//   }, 1000)
// }).then(res => {
//   console.log('p3---res', res)
// }, err => {
//   console.log('p3-err', err)
// })
let p4 = new MyPromise((resolve) => {
  setTimeout(() => {
    resolve(5)
  }, 2000)
}).then(res => {
  console.log('p4---res', res)
  return res + 1
}, err => {
  console.log('p4-err', err)
}).then(res2 => {
  console.log('p4-res2', res2)
})
// Promise.resolve()
//   .then(function () {
//     console.log("promise0"); // 2 执行微任务1 Promise1
//   })
//   .then(function () {
//     console.log("promise5"); // 4 执行微任务3 Promise3
//   });

// setTimeout(() => {
//   console.log("timer1"); // 5 执行宏任务 setTimeout1
//   Promise.resolve().then(function () {
//     console.log("promise2"); // 6 执行宏任务中的微任务
//   });
//   Promise.resolve().then(function () {
//     console.log("promise4"); // 7 执行宏任务中的微任务
//   });
// }, 0);

// setTimeout(() => {
//   console.log("timer2"); // 8 执行宏任务 setTimeout2
//   Promise.resolve().then(function () {
//     console.log("promise3"); // 9 执行宏任务中的微任务
//   });
// }, 0);

// Promise.resolve().then(function () {
//   console.log("promise1"); // 3 执行微任务2 Promise2
// });
// console.log("start"); // 1 执行同步代码
// start promise0 promise1 promise5 timer1 promise2 promise4 timer2 promise3

// setTimeout(function () { console.log(4) }, 0);
// new Promise(function (resolve) {
//   console.log(1)
//   for (var i = 0; i < 10000; i++) {
//     i == 9999 && resolve()
//   }
//   console.log(2)
// }).then(function () {
//   console.log(5)
// });
// console.log(3);

// 1,2,3,5,4