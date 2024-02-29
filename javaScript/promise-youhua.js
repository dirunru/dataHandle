
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class BasicPromise {
  state = PENDING
  reason = undefined;
  value = undefined;
  onFulfilledCallback = undefined;
  onRejectedCallback = undefined;
  constructor(executor) {
    const resolve = (value) => {
      if (this.state === PENDING) {
        this.state = FULFILLED
        queueMicrotask(() => { //queueMicrotask:  主线程执行完毕之后立马执行
          this.onFulfilledCallback && this.onFulfilledCallback(value)
        })
      }
    }
    const reject = (error) => {
      if (this.state === PENDING) {
        this.state = REJECTED
        queueMicrotask(() => {
          this.onRejectedCallback && this.onRejectedCallback(error)
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
    if (this.state === FULFILLED) {  // 执行函数为同步且执行了 resolve
      typeof resFun === 'function' && resFun(this.value);
    } else if (this.state === REJECTED) {  // 执行函数为同步且执行了 reject
      typeof errFun === 'function' && errFun(this.reason);
    } else {  // 执行函数为异步
      typeof resFun === 'function' && (this.onFulfilledCallback = resFun);
      typeof errFun === 'function' && (this.onRejectedCallback = errFun);
    };
  }
}

const p = new BasicPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(111)
  }, 1000)
})
p.then(res => {
  console.log('res', res)
}, err => {

})