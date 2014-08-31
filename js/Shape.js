

/*
author:doodlesomething
version:1.0
date:2013
---------------------------------------------------

这个文件里的绘图函数都是建立在一定的全局变量下的
如mouosedown记录鼠标按下的第一个点,rubberbandRect为画图辅助矩形框
目前程序存在的一个比较大的问题时没有建立成类，且当笔触达到一定的大小时
转角处会有相当大的问题,本文件包含了一个Polygon类和对2D环境的圆角方法的扩展
*/


var mousedown={};
var rubberbandRect={};
var w,h,l,t;

//更新画图矩形辅助框
function updateRubberbandRectangle(loc)	{
	rubberbandRect.width=Math.abs(loc.x-mousedown.x);
	rubberbandRect.height=Math.abs(loc.y-mousedown.y);
	
	if(loc.x>mousedown.x)	
		rubberbandRect.left=mousedown.x;
	else
		rubberbandRect.left=loc.x;
		
	if(loc.y>mousedown.y)	
		rubberbandRect.top=mousedown.y;
	else
		rubberbandRect.top=loc.y;
}

function init()	{
	w=rubberbandRect.width;
	h=rubberbandRect.height;
	t=rubberbandRect.top;
	l=rubberbandRect.left;
}

//直线
function drawBeeline(loc)	{
	context.beginPath();
	context.moveTo(mousedown.x,mousedown.y);
	context.lineTo(loc.x,loc.y);
	context.stroke();
}



//曲线 比较特殊另外处理
//注意曲线的绘制需要在鼠标按下时就将点移动至当前点.
function drawCurve(loc)	{
	context.lineTo(loc.x,loc.y);
	context.stroke();
}


//虚线 drawDashedLine(context,第一点的横坐标，第一点的纵坐标，第二点的横坐标，第二点的纵坐标，每截虚线的长度)
function drawDashedLine(x1,y1,x2,y2,dashLength)	{
	dashLength= dashLength===undefined ? 5:dashLength;
	var deltaX=x2-x1;
	var deltaY=y2-y1;
	//Math.floor()返回小于等于x的最大整数,向下取整
	var numDashes=Math.floor(Math.sqrt(deltaX*deltaX+deltaY*deltaY)/dashLength);	
	for(var i=0;i<numDashes;i++)	{
		context[i%2===0?'moveTo':'lineTo']
			(x1+(deltaX/numDashes)*i,y1+(deltaY/numDashes)*i);
	}
	context.stroke();
}


//矩形
function drawRect(loc)	{
	var w=loc.x>mousedown.x ? rubberbandRect.width:-rubberbandRect.width,
		h=loc.y>mousedown.y ? rubberbandRect.height:-rubberbandRect.height;
	context.beginPath();
	context.rect(mousedown.x,mousedown.y,w,h);
	context.stroke();
}

//向上的箭头
function drawUpArrow()	{
	init();
	context.beginPath();
	context.moveTo(l+w/2,t+h);
	context.lineTo(l+w,t+h);
	context.lineTo(l+w,t+h*0.5);
	context.lineTo(l+w*1.5,t+h*0.5);
	context.lineTo(l+w/2,t);
	context.lineTo(l-w*0.5,t+h*0.5);
	context.lineTo(l,t+h*0.5);
	context.lineTo(l,t+h);
	context.lineTo(l+w/2,t+h);
	context.stroke();
}


//向下的箭头
function drawDownArrow()	{
	init();
	context.beginPath();
	context.moveTo(l,t);
	context.lineTo(l+w,t);
	context.lineTo(l+w,t+h*0.5);
	context.lineTo(l+w*1.5,t+h*0.5);
	context.lineTo(l+w/2,t+h);
	context.lineTo(l-w*0.5,t+h*0.5);
	context.lineTo(l,t+h*0.5);
	context.lineTo(l,t);
	context.stroke();
}


//向左的箭头
function drawLeftArrow()	{
	init();
	context.beginPath();
	context.moveTo(l,t);
	context.lineTo(l+0.5*w,t);
	context.lineTo(l+0.5*w,t-0.5*h);
	context.lineTo(l+w,t+0.5*h);
	context.lineTo(l+0.5*w,t+1.5*h);
	context.lineTo(l+0.5*w,t+h);
	context.lineTo(l,t+h);
	context.lineTo(l,t);
	context.stroke();
}


//向右的箭头
function drawRightArrow() {
	init();
	context.beginPath();
	context.moveTo(l,t+0.5*h);
	context.lineTo(l+0.5*w,t-0.5*h);
	context.lineTo(l+0.5*w,t);
	context.lineTo(l+w,t);
	context.lineTo(l+w,t+h);
	context.lineTo(l+0.5*w,t+h);
	context.lineTo(l+0.5*w,t+1.5*h);
	context.lineTo(l,t+0.5*h);
	context.stroke();
}


//笑脸
function drawFace(loc)	{
	var radius,angle;
		
	if(loc.x==mousedown.x)
		radius=Math.abs(loc.x-mousedown.x)
	else	{
		angle=Math.atan(rubberbandRect.height/rubberbandRect.width);
		radius=rubberbandRect.height/Math.sin(angle);
	}
	context.beginPath();
	context.arc(mousedown.x,mousedown.y,radius,0,Math.PI*2,false);
	context.stroke();
	context.beginPath();
	context.arc(mousedown.x,mousedown.y,radius/2,0,Math.PI,false);
	context.stroke();
	context.beginPath();
	context.arc(mousedown.x-radius/3,mousedown.y-radius/2,radius/10, 0, 2*Math.PI, false);
	context.fill();
	context.closePath();
	context.beginPath();
	context.arc(mousedown.x+radius/3,mousedown.y-radius/2,radius/10, 0, 2*Math.PI, false);
	context.fill();
	context.closePath();
}


//四角星
function drawFourStar() {
	init();
	context.beginPath();
	context.moveTo(l+w/2,t);
	context.lineTo(l+w*3/8,t+h*0.4);
	context.lineTo(l,t+h/2);
	context.lineTo(l+w*3/8,t+h*0.6);
	context.lineTo(l+w/2,t+h);
	context.lineTo(l+w*5/8,t+h*0.6);
	context.lineTo(l+w,t+h/2);
	context.lineTo(l+w*5/8,t+h*0.4);
	context.lineTo(l+w/2,t);
	context.stroke();
}


//椭圆
function drawEllipse(loc)	{
	//关键是bezierCurveTo中两个控制点的设置
	//0.5和0.6是两个关键系数（为试验而得）
	a=rubberbandRect.width/2;
	b=rubberbandRect.height/2;
	x=loc.x-a;
	y=loc.y-b;
   
    var ox = 0.5 * a,
	   oy = 0.6 * b;

    context.save();
    context.translate(x,y);
    context.beginPath();
    //从椭圆纵轴下端开始逆时针方向绘制
    context.moveTo(0, b); 
    context.bezierCurveTo(ox, b, a, oy, a, 0);
    context.bezierCurveTo(a, -oy, ox, -b, 0, -b);
    context.bezierCurveTo(-ox, -b, -a, -oy, -a, 0);
    context.bezierCurveTo(-a, oy, -ox, b, 0, b);
    context.closePath();
    context.stroke();
    context.restore();
}

//圆形
function drawCircle(loc)	{
	var radius,angle;
	if(loc.x==mousedown.x)
		radius=Math.abs(loc.x-mousedown.x)
	else	{
		angle=Math.atan(rubberbandRect.height/rubberbandRect.width);
		radius=rubberbandRect.height/Math.sin(angle);
	}
	context.beginPath();
	context.arc(mousedown.x,mousedown.y,radius,0,Math.PI*2,false);
	context.stroke();
}


//圆角矩形  这里使用的roundRect()方法是对源环境的扩展
//radius指圆角的半径,此方法只能进行左右的动态，上下无法进行
function drawRoundRect(loc,radius)	{
	var w=loc.x>mousedown.x ? rubberbandRect.width:-rubberbandRect.width,
			h=rubberbandRect.height;
		context.beginPath();
		context.roundRect(mousedown.x,mousedown.y,w,h,radius);
		context.stroke();
}



//直角三角形
function drawTriangle(loc)	{
		//建议从rubberbandRect的出处该代码
		var height=loc.y>mousedown.y ? rubberbandRect.height:-rubberbandRect.height;
		var width=loc.x>mousedown.x?rubberbandRect.width:-rubberbandRect.width;
		context.beginPath();
		context.moveTo(mousedown.x,mousedown.y);
		context.lineTo(mousedown.x,mousedown.y+height);
		context.lineTo(mousedown.x+width,mousedown.y+height);
		context.closePath();
		context.stroke();
}





//三角形和五边形的angle值0，六边形的angle值为Math.PI/6;可根据不同的边数来设置不同的值，和起始角度
function drawPolygon(side,angle)	{
	var polygon=new Polygon(mousedown.x,mousedown.y,rubberbandRect.width,side,angle);
	context.beginPath();
	polygon.createPath(context);
	polygon.stroke(context);
}

//绘制心形
function drawHeart(loc,value){
	context.moveTo(loc.x,loc.y);
    var r=0 , a=value , start = 0 , end= 0;
    context.rotate(Math.PI);
    for(var q=0; q<1000; q++){
        start +=  Math.PI * 2 /1000;
        end = start + Math.PI * 2 /1000;
        r=a*Math.sqrt(225/(17-16*Math.sin(start)*Math.sqrt(Math.cos(start)*Math.cos(start))))
        context.arc(0,0,r,start,end,false);
    }
    context.stroke();
}


		
//Polygon类用于绘制多边形	
//创建多边形对象和方法
var Point=function(x,y)	{
	this.x=x;
	this.y=y;
}
//传参说明：centerX、centerY多边形的中心坐标，radius多边形对应圆的半径,边框色，填充色，是否有填充色
var Polygon=function(centerX,centerY,radius,sides,startAngle,strokeStyle,fillStyle,filled)	{
	this.x=centerX;
	this.y=centerY;
	this.radius=radius;
	this.sides=sides;
	this.startAngle=startAngle;
	this.strokeStyle=strokeStyle;
	this.fillStyle=fillStyle;
	this.filled=filled;
}

Polygon.prototype={
	//获取各个点
	getPoints:function()	{
		var points=[];
		var angle=this.startAngle||0;
		for(var i=0;i<this.sides;i++)	{
		points.push( new Point(this.x+this.radius*Math.sin(angle),this.y-this.radius*Math.cos(angle) ) );
		angle+=Math.PI*2/this.sides;
		}
		
		return points;
	},
	//创建路径
	createPath:function(context)	{
		var points=this.getPoints();
		context.beginPath();
		context.moveTo(points[0].x,points[0].y);
		for(var i=1;i<this.sides;i++)
			context.lineTo(points[i].x,points[i].y);
		context.closePath();
	},
	//描边
	stroke:function(context)	{
		context.save();
		this.createPath(context);
		context.strokeStyle=this.strokeStyle;
		context.stroke();
		context.restore();
	},
	//填充
	fill:function(context)	{
		context.save();
		this.createPath(context);
		context.fillStyle=this.fillStyle;
		if(this.filled)
			context.fill();
		context.restore();
	},
	
	//这个方法可以在真正绘制前移动多边形
	move:function(x,y)	{
		this.x=x;
		this.y=y;
	}

};


//扩展一个画圆角矩形的方法
//参数：第一点的横坐标，第一点的纵坐标，直线的宽度，直线的高度，圆角的半径
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {	
    this.beginPath();
    if(w>0)	{
    	this.moveTo(x+r,y);
        this.lineTo(x+r+w,y);
        this.arc(x+r+w,y+r,r,3*Math.PI/2,2*Math.PI,false);
        this.lineTo(x+2*r+w,y+r+h);
        this.arc(x+r+w,y+r+h,r,0,Math.PI/2,false);
        this.lineTo(x+r,y+2*r+h);
        this.arc(x+r,y+r+h,r,Math.PI/2,Math.PI,false);
        this.lineTo(x,y+r);
        this.arc(x+r,y+r,r,Math.PI,3*Math.PI/2,false);

    }
    else {
    	this.moveTo(x,y+r);
        this.lineTo(x,y+r+h);
        this.arc(x-r,y+r+h,r,0,Math.PI/2,false);
        this.lineTo(x-r+w,y+2*r+h);
        this.arc(x-r+w,y+r+h,r,Math.PI/2,Math.PI,false);
        this.lineTo(x-2*r+w,y+r+h);
        this.arc(x-r+w,y+r,r,Math.PI,3*Math.PI/2,false);
        this.lineTo(x-r,y);
        this.arc(x-r,y+r,r,3*Math.PI/2,2*Math.PI,false);
    }
    this.closePath();
    return this;
}


