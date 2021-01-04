### canvas主要应用领域
    图表和广告，一些比较炫酷的页面，canvas支持性比较好。
    手机端支持比pc端的好


#### canvas设置：
    ie9以上才会支持canvas标签，要先判断是否支持canvas标签，不支持做提示
    设置canvas标签的宽高是通过canvas标签的属性进行设置的，不要用css去设置
    千万不要如此设置canvas.style.width/height 
    if(canvas.getContext){
      支持canvas
    }
    