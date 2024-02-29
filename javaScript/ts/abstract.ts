// 抽象类：用来作为子类去使用的
// 抽象类不能被实例化，更多多是作为规定格式使用，抽象类可以有抽象属性、抽象方法
// 也可以有普通属性和方法，抽象的方法和属性是之类必须要有的
abstract class Animal {
  abstract name:string
  abstract maskSound():void
  move():void{
    console.log('移动')
  }
}

class Cat extends Animal {
  name:string = '小猫'
  maskSound(): void {
    
  }
}
console.log('Cat', Cat)