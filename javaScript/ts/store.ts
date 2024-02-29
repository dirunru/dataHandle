// 存储器使用：希望私有属性被外界读取
class User {
  private _password: string = '' // 私有属性建议加_下划线
  //密码显示
  get password():string{
    return '******'
  }
  // 密码保存
  set password(newPass:string){
    this._password = newPass
  }
}

const u = new User()
u.password = '123456'
console.log('u.password', u.password) //  ******


