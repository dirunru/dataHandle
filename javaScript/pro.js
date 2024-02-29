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
console.log(3);

// 1,2,3,5,4