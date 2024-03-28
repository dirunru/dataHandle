//手写实现new
// 1. 用new Object() 的方式新建了一个对象 obj；
// 2. 取出第一个参数，就是我们要传入的构造函数。此外因为 shift 会修改原数组，所以 arguments 会被去除第一个参数；
// 3. 将 obj 的原型指向构造函数，这样 obj 就可以访问到构造函数原型中的属性；
// 4. 使用 apply，改变构造函数 this 的指向到新建的对象，这样 obj 就可以访问到构造函数中的属性；
// 5. 返回 obj；
// 6.所以我们还需要判断返回的值是不是一个对象，如果是一个对象，我们就返回这个对象，如果没有，我们该返回什么就返回什么。
// 第一版代码
function objectFactory () {
  var obj = new Object();
  let Constructor = [].shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  let ret = Constructor.apply(obj, arguments);
  return typeof ret === 'object' ? ret : obj

};
let foo = {
  value: 1
};

function bar () {
  console.log(this.value);
}

bar.call(foo); // 1
// ====
// let foo = {
//   value: 1,
//   bar: function () {
//     console.log(this.value)
//   }
// };

// foo.bar(); // 1
// 步骤：
// 1. 将函数设为对象的属性；
// 2. 执行该函数；
// 3. 删除该函数；
// Function.prototype.call = function (context, ...args) {
//   context = context || window
//   let fn = Symbol()
//   context[fn] = this
//   let result = context[fn](...args)
//   delete context[fn]
//   return result
// }
// apply传递的参数是数组
// Function.prototype.apply = function (context, arr) {
//   context = context || window
//   let fn = Symbol()
//   context[fn] = this
//   let result = context[fn](...arr)
//   delete contxt[fn]
//   return result
// }

// 简单版
Function.prototype.myBind = function (context) {
  // 判断是否是undefined 和 null
  if (typeof context === "undefined" || context === null) {
    context = window;
  }
  self = this;
  return function (...args) {
    return self.apply(context, args);
  }
}
// 复杂版
// Function.prototype.bind2 = function (context, ...rest) {
//   if (typeof this !== "function") {
//     throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
//   }
//   var self = this;
//   var fNOP = function () { };
//   var fBound = function () {
//     var bindArgs = Array.prototype.slice.call(arguments);
//     return self.apply(this instanceof fNOP ? this : context, rest.concat(bindArgs));
//   }
//   fNOP.prototype = this.prototype;
//   fBound.prototype = new fNOP();
//   return fBound;
// }
// 手写数组map、filter方法
// 1、回调函数必须是一个函数
// 2、调用该方法的对象必须是数组。
// 3、如果数组的大小为0，则直接返回空数组
Array.prototype.myMap = function (callback) {
  let length = this.length;
  let res = [];
  if (!Array.isArray(this)) throw new TypeError("this is not an array")
  if (typeof callback !== "function") throw new TypeError(callback + "is not a function")
  if (length === 0) {
    return res
  }
  for (let i = 0; i < length; i++) {
    res.push(callback(this[i], i, this))
  }
  return res
}

// 返回满足条件的新数组
Array.prototype.myFilter = function (callback) {
  let length = this.length;
  let res = [];
  if (!Array.isArray(this)) throw new TypeError("this is not an array")
  if (typeof callback !== "function") throw new TypeError(callback + "is not a function")
  if (length === 0) {
    return res
  }
  for (let i = 0; i < length; i++) {
    if (callback(this[i], i, this)) {
      res.pus(this[i])
    }
  }
  return res
}
// 返回满足条件的元素，没有的话返回undefind
Array.prototype.myFind = function (callback) {
  let length = this.length;
  let res = []
  if (!Array.isArray(this)) throw new TypeError("this is not an array")
  if (typeof callback !== "function") throw new TypeError(callback + "is not a function")
  if (length === 0) {
    return res
  }
  for (let i = 0; i < length; i++) {
    if (callback(this[i], i, this)) {
      return this[i]
    }
  }
  return undefined
}
//对每一个元素执行callback但是没有返回值
Array.prototype.myForEach = function (callback) {
  let length = this.length;
  let res = [];
  if (!Array.isArray(this)) throw new TypeError("this is not an array")
  if (typeof callback !== "function") throw new TypeError(callback + "is not a function")
  if (length === 0) {
    return res
  }
  for (let i = 0; i < length; i++) {
    callback(this[i], i, this)
  }
}


let arr = [1, 2, 3, 4]
arr.myForEach((item, index, arr1) => {
  arr[index] = item * 2
})
console.log('arr', arr)