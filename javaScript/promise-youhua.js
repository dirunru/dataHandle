
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class BasicPromise {
  state = PENDING
  reason = undefined;
  value = undefined;
  onFulfilledCallbacks = [];
  onRejectedCallbacks = [];
  constructor(executor) {
    const resolve = (value) => {
      if (this.state === PENDING) {
        queueMicrotask(() => { //queueMicrotask:  主线程执行完毕之后立马执行
          this.state = FULFILLED
          this.value = value
          this.onFulfilledCallbacks.forEach(item => {
            item(this.value)
          })
        })
      }
    }
    const reject = (error) => {
      if (this.state === PENDING) {
        queueMicrotask(() => {
          this.state = REJECTED
          this.reason = error
          this.onRejectedCallbacks.forEach(item => {
            item(this.reason)
          })
        })
      }
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  then (resFun, errFun) {
    // 1.如果在then调用的时候, 状态已经确定下来,那么就可以直接调用
    if (this.state === FULFILLED && resFun) {
      resFun(this.value)
    }
    if (this.state === REJECTED && errFun) {
      errFun(this.reason)
    }

    //2. 相反 对与已经确定的状态 就不需要在push 执行了
    if (this.state === PENDING) {
      this.onFulfilledCallbacks.push(resFun)
      this.onRejectedCallbacks.push(errFun)
    }
  }
}

const p1 = new BasicPromise((resolve, reject) => {
  resolve(111)
  // reject(333333)
})
// p1.then(res => {
//   console.log("res1:", res)
// }, err => {
//   console.log("err1:", err)
// })
// // 调用then方法多次调用
// p1.then(res => {
//   console.log("res2:", res)
// }, err => {
//   console.log("err2:", err)
// })


// // 上面的代码是同步的 执行会被添加到对应的数组里面依次调用，调用完毕后，他的状态是不是就已经确定好了 */
// // 然后你再执行下面的这个异步代码 那这个时候肯定是啥都不会执行了  因为你的状态已经被改变了，此时你已经 this.onFulfilledCallbacks.push(resfn)了这个函数，但是他压根就不会执行了
// setTimeout(() => {
//   p1.then(res => {
//     console.log("res3:", res)
//   }, err => {
//     console.log("err2:", err)
//   })
// }, 2000);

p1.then(res => {
  console.log("第一次的成功回调:", res)
  return "第二次的成功回调"
}, err => {
  console.log("err1:", err)
  throw new Error("err message")
}).then(res => {
  console.log("res2:", res)
}, err => {
  console.log("err2:", err)
})

