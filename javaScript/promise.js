
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class BasicPromise {
  state = PENDING
  constructor(executor) {
    const resolve = (value) => {
      console.log('12', 12)
      if (this.state === PENDING) {
        this.state = FULFILLED
        queueMicrotask(() => { //queueMicrotask:  主线程执行完毕之后立马执行
          this.resFun(value)
        })
      }
    }
    const reject = (error) => {
      if (this.state === PENDING) {
        this.state = REJECTED
        queueMicrotask(() => {
          this.errFun(error)
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
    console.log('13', 13)
    this.resFun = resFun
    this.errFun = errFun
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