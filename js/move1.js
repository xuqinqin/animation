//该函数只做到链式动画的效果，还没有做到同时运动
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
		function startMove(obj,attr,itarget,fn){
			   clearInterval(obj.timer);
			    obj.timer=setInterval(function(){
			    //1.获取当前的值
				var icur=0;
				if(attr=="opacity"){
					icur=Math.round(parseFloat(getStyle(obj,attr))*100);
					}else{
					var icur=parseInt(getStyle(obj,attr));
					}
				//2.算速度
				var speed=(itarget-icur)/8;
				speed=speed>0?Math.ceil(speed):Math.floor(speed);
				//随着要加padding或者border，offset去看宽或者高，就有点不适用，因为会加上边框的宽度或者高度，运动时候不能达到想要的效果，所以改用getstyle
				//3.检测停止
				if(icur==itarget){
					clearInterval(obj.timer);
					if(fn){
						fn();
					}
					}else{
						//obj.style.width=icur+speed+"px";
						if(attr=="opacity"){
							obj.style.filter="alpha(opacity:'+(icur+speed)+')";//ie
							 obj.style.opacity=(icur+speed)/100;//chrome,火狐
							}
						else{}
						obj.style[attr]=icur+speed+"px";
						}
				},30)
			}	