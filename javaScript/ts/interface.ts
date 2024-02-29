// 类实现接口,用类规范接口的行为
interface Animal {
  name:string
  get sound():string
  makeSound():void
}
interface B {
  age: number
}
// 接口实现类 implements：抽象约束
class Dog implements Animal,B {
  name:string = '小狗'
  age: number = 10
  get sound():string{
    return ''
  }
  makeSound(): void {
    
  }
}


// 类和范型结合，称为范型类
class MyClass {
  public value:string
  constructor(value:string) {
    this.value = value
  }
  do () {
    console.log('处理数据',this.value);
  }
}

class MyClassF<T>{
  public value:T
  constructor(value:T) {
    this.value = value
  }
  do (input: T):T {
    console.log('处理数据',this.value);
    return input 
  }
}

const myStr = new MyClassF<string>('hello')
myStr.do('abc')

const myNum = new MyClassF<number>(123)
console.log('myNum.do(12)', myNum.do(12))

interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}

function isFish(animal: Cat | Fish) {
  if (typeof (animal as Fish).swim === "function") {
    return true;
  }
  return false;
}
let obj = {
  name: 'zs',
  run: function () {
    console.log('aa')
  }
}
console.log(isFish(obj)); // false


interface Position {

}
interface Color {

}

interface Shape {

}

type Circle = Position & Color & Shape // 联合类型，组合
const circle: Circle = {

}

interface Queue<U,K=number> {
  map: Map<K,U>
}
const myQueue:Queue<string> = {
  map: new Map<number, string>([])
}

function aa(value?:string){
  console.log(value!.length);
   // console.log(value.length); //错误提醒:value is possibly 'undefined'.
} 
aa('ppp')
   // 注意： !.不传值, 编译JS后会报错, 建议使用?. 替代 !.