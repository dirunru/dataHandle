let v1:string = 'abc' // string
let v2:number = 10 //number
let v3:null= null // null
let v4:boolean=true //boolean
let v5:undefined=undefined // undefind

let vDate: Date = new Date() // object - Date




let v6:string | null = null // v6 是字符串或者null都可以
let v7: 1|2|3 = 2
v6 = '11'

let color: 'red' | 'balck' | 'yellow'
let num: 1 | 2 | 3
// TODO: 数组
// 第一种写法：
let arr:number[] = [1,2,3] //[1,2,'a'] 报错
// 第二种写法：
let arr1:Array <string> =['1','2']
let arr2:Array <string | number> =['1','2', 3]

// TODO: 元组：类似于数组，但是限定了数据个数，数据类型
let t1:[number, string, number] = [1, '1', 1]
t1[0] = 2 // 其他类型就会报错
let t2:[number, string, number?] // 第三个值是可选的

// TODO: 枚举类型：enum
enum MyEnum {
  A,
  B,
  C,
}
let  c : MyEnum = MyEnum.C
console.log('MyEnum.A', MyEnum.A,'MyEnum[0]', MyEnum[0], 'c', c)



// TODO: void:代表空值 一个函数没有返回值
// 没有返回值
function MyFunNotReturn (a:number,b:string):void{
  
}
// 有返回值
function MyFunHasReturn (a:number,b:string):number{
  return 1
}
// 参数可选
function MyFunHasReturnSelectArgs (a:number,b:string,c?:boolean):number{
  return 1
}
// 参数不确定，剩余参数
// 参数可选
function MyFunHasReturnSelectArgsReset (a:number,b:string,c?:boolean, ...reset:number[]):number{
  return 1
}
const f = MyFunHasReturnSelectArgsReset(1,'abc',false,10)


// TODO: 接口 interface
interface Obj {
  name:string,
  age:number,
}
const obj:Obj = {
  name:'a',
  age:18,
}

// TODO: type 类型的别名
type MyUserName = string | number
let a: MyUserName = 10

type User = {name: string,age:number}
const ObjectArr: User[] = [{
  name:'anny',
  age:18,
  }]

// TODO: 范型 
function myFun<T>(a:T,b:T):T[] {
  return [a,b]
} 
myFun<number>(1,2)
myFun<string>('1','2')

// TODO: never表示函数永远不会有返回结果，多用于抛出错误
function error (message : string):never{
  throw new Error (message)
}



console.log('v1,v2,v3,v4,v5', v1,v2,v3,v4,v5,v6,v7)