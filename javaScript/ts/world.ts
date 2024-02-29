// 同名参数根据参数的类型和个数不同，来实现不同的功能
function hello (name:string):string
function hello (age:number):string
function hello (value:string | number):string {
  if(typeof value === 'string') {
    return '你好， 我的名字是' + value
  } else if (typeof value === 'number') {
    return '你好，我的年龄是' + value
  } else {
    return '非法格式'
  }
}
hello(18)

// 继承的操作
interface Parent {
  prop1:string,
  prop2:number,
}

interface Child extends Parent {
  prop3: string
}
const myObj:Child = {
  prop1: '1',
  prop2:1,
  prop3: '2',
}

// 类
class Artical {
  title:string // 修饰符，默认是public，可访问，无论类内部还是实例
  content:string
  aaa?:string // 可选属性
  b:number = 100 //设置默认值

  private tempData?:string //只能在类内部使用
  protected innerData?:string // 只能在当前类的内部，或者子类中进行访问

  // static author:string // 静态属性，将属性设置类本身，而不是类的实例
  // private static author:string // 私有的静态的，只能在类本身的construct里面使用。
  private static readonly author:string  = 'dirunru'// 私有的静态的，只读的，只能在类本身的construct里面使用。

  //另一种定义方式 constructor(public title: string, content:string) {
  constructor(title: string, content:string) {
    this.title = title
    this.content = content
  }
}
const b = new Artical('标题', '内容')
console.log('b', b)
class B extends Artical {
  constructor(title:string,content:string) {
    super(title, content)

  }
}


