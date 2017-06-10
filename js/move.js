//该函数实现同时运动，并改进了，只要又一个属性到达目标，就
//停止运动，用flag控制，必须当所有属性到达目标，才能停止运动
function getStyle(obj,attr){
			if(obj.currentStyle){
				//在ie下
				return obj.currentStyle[attr];
				}
			else{
				//在火狐下
				return getComputedStyle(obj,false)[attr];
				}
			}
		//var timer=null;
		//fn是新的回调
		//attr和itarget可以看成键值对，用json形式，实现多属性同时运动改变
		//function startMove(obj,attr,itarget,fn){
		//function startMove(obj,{attr1:itarget1,attr2:itarget2},fn)
		function startMove(obj,json,fn){
				
				clearInterval(obj.timer);
			    obj.timer=setInterval(function(){
			    //1.获取当前的值
			    //假设所有的运动都到达了终点
			    var flag=true;
			    for(var attr in json){
				var icur=0;
				if(attr=="opacity"){
					icur=Math.round(parseFloat(getStyle(obj,attr))*100);
					}else{
					var icur=parseInt(getStyle(obj,attr));
					}
				//2.算速度
				var speed=(json[attr]-icur)/8;
				speed=speed>0?Math.ceil(speed):Math.floor(speed);
				//随着要加padding或者border，offset去看宽或者高，就有点不适用，因为会加上边框的宽度或者高度，运动时候不能达到想要的效果，所以改用getstyle
				//3.检测停止,这里控制所有的属性到达目标值
				//如果一个属性没到到目标值，则flag标杆定位false
				if(icur!=json[attr]){
					
					{
						//不是所有的属性都到达了终点，则继续执行
						flag=false;
					}
						//obj.style.width=icur+speed+"px";
						if(attr=="opacity"){
							obj.style.filter="alpha(opacity:'+(icur+speed)+')";//ie
							 obj.style.opacity=(icur+speed)/100;//chrome,火狐
							}
						else{
						obj.style[attr]=icur+speed+"px";
						}
				}
			if(flag){
				clearInterval(obj.timer);
				if(fn){
					fn();
				}
			}
		}
		},30)//通过改变时间值，可以实现动画的快慢
			
	}	