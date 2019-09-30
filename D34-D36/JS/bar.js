function drawBar(){
	let xmlns="http://www.w3.org/2000/svg";
	let myCharts=document.getElementById("charts");
	let myBar=document.getElementById("bar");
	initBar(myBar,xmlns);
	let axis=document.getElementById("axis");
	let myTxt=document.getElementById("axisTxt");
	let xAxis=document.getElementById("xAxis");
	//获取数据
	let myData=getData();//获取到的是对象数组
	//将每个地区构造为对象，data属性存放该地区的数据，color存放该地区的颜色，分别是手机、笔记本、音箱的颜色
	let regGroup=[];
	let east=new Object();
	east.color=["#FFB6C1","#98FB98","#87CEFA"];
	east.data=[];
	east.name="华东";
	let north=new Object();
	north.color=["#F08080","#3CB371","#6495ED"];
	north.data=[];
	north.name="华北";
    let south=new Object();
	south.color=["#CD5C5C","#2E8B57","#4682B4"];
	south.data=[];
	south.name="华南";
	for(let i=0;i<myData.length;i++){
		let sale=myData[i].sale;
		if(myData[i].region=="华东"){
			east.data.push(myData[i]);
		}
		else if(myData[i].region=="华北"){
			north.data.push(myData[i]);
		}
		else{
			south.data.push(myData[i]);
		}
	}
	//获取地区种类数，以确定柱子的宽度
	if(east.data.length!=0){
		regGroup.push(east);
	}
	if(north.data.length!=0){
		regGroup.push(north);
	}
	if(south.data.length!=0){
		regGroup.push(south);
	}
	let regGroupCount=regGroup.length;
	//初始定义：
	//获取数据中sale的最大值
	let yMax;
	let sumList=[]
	for(let i=0;i<regGroup.length;i++){
		let proList=regGroup[i].data;
		for(let j=0;j<12;j++){
			sum=0;
			for(let k=0;k<proList.length;k++){
			    sum=sum+proList[k].sale[j]
			}
			sumList.push(sum);
		}
	}
	yMax=sumList[0];
	for(let i=0;i<sumList.length;i++){
		if(sumList[i]>yMax){
			yMax=sumList[i];
		}
	}
   // let barData=getBarData("华东","手机");
	let prop=220/yMax;
	let xInit=60;//第一个bar的x
	let width=39/regGroupCount;//根据地区的数量确定每个柱子宽度
	let xSpace=11;//两个bar之间的间距
	//画y轴刻度,根据yMax的大小调节y轴刻度
	if(yMax>500){
		for(let i=0;i<Math.floor(yMax/20)+2;i++){
			if(i%5==0){
				svgRuler(xmlns,270-prop*i*20,10,xAxis,axis);
				svgText(xmlns,i*20+"",0,270-prop*i*20+5,myTxt);
			}
			else{
				svgRuler(xmlns,270-prop*i*20,5,xAxis,axis);
			}
		}
	}
	else if(yMax<100){
		for(let i=0;i<Math.floor(yMax/5)+2;i++){
			if(i%2==0){
				svgRuler(xmlns,270-prop*i*5,10,xAxis,axis);
				svgText(xmlns,i*5+"",0,270-prop*i*5+5,myTxt);
			}
			else{
				svgRuler(xmlns,270-prop*i*5,5,xAxis,axis);
			}
		}
	}
	else{
		for(let i=0;i<Math.floor(yMax/10)+2;i++){
			if(i%5==0){
				svgRuler(xmlns,270-prop*i*10,10,xAxis,axis);
				svgText(xmlns,i*10+"",0,270-prop*i*10+5,myTxt);
			}
			else{
				svgRuler(xmlns,270-prop*i*10,5,xAxis,axis);
			}
		}
	}
	//添加x轴文本
	for(let i=0;i<12;i++){
		svgText(xmlns,i+1+"月",xInit+i*50+4,290,myTxt);
	}
	let yLeg=-15;
	//画柱子，先循环区域
	for(let i=0;i<regGroupCount;i++){
		let proCount=regGroup[i].data.length;//该地区商品种类个数
		drawRegionBar(regGroup[i],xmlns,width,prop,xInit,myBar,axis,xSpace,myTxt,yLeg);
		xInit=xInit+width;
		yLeg+=25
	}
	//添加图例
	
	
	
}
//画不同地区的柱子,参数为区域数据对象
function drawRegionBar(regBarData,xmlns,width,prop,xInit,myBar,axis,xSpace,axisText,yLegend){
	if(regBarData.data.length==0){
		return;
	}
	let lastHeight=[0,0,0,0,0,0,0,0,0,0,0,0];
	let xCopy=xInit;
	//画该地区不同商品的柱子
	for(let i=0;i<regBarData.data.length;i++){
		let barData=regBarData.data[i].sale;
		let myPro=regBarData.data[i].product;
		let proColor;
		xInit=xCopy;
		switch (myPro){
			case "手机":
			    proColor=regBarData.color[0];
			    break;
			case "笔记本":
			    proColor=regBarData.color[1];
			    break;
			case "智能音箱":
			    proColor=regBarData.color[2];
			    break;
		}
		for(let j=0;j<barData.length;j++){
			lastHeight[j]=lastHeight[j]+barData[j];
			svgRectNode(xmlns,width,barData[j]*prop,xInit,270-lastHeight[j]*prop,proColor,myBar,axis);
			xInit=xInit+xSpace+39;
		}
		//添加图例
		let myLegend=document.createElementNS(xmlns,"rect");
		myLegend.setAttribute("width","30");
	    myLegend.setAttribute("height","20");
	    myLegend.setAttribute("x",120+i*200);
	    myLegend.setAttribute("y",yLegend);
	    myLegend.setAttribute("style","fill:"+proColor+";stroke-width:0");
	    myBar.appendChild(myLegend);
	    let legendText=document.createElementNS(xmlns,"text");
	    legendText.setAttribute("fill","black");
		legendText.setAttribute("x",155+i*200);
		legendText.setAttribute("y",yLegend+15);
		legendText.innerHTML=regBarData.name+"地区"+myPro;
		myBar.appendChild(legendText);
	}

}

function svgText(xmlns,text,x,y,axisText){
	let myText=document.createElementNS(xmlns,"tspan");
	myText.textContent=text;
	myText.setAttribute("fill","black");
	myText.setAttribute("x",x);
	myText.setAttribute("y",y);
	axisText.appendChild(myText);
}
//画y轴的刻度
function svgRuler(xmlns,y,width,xAxis,axis){
	let myRuler=document.createElementNS(xmlns,"line");
	myRuler.setAttribute("x1","40");
	myRuler.setAttribute("y1",y);
	myRuler.setAttribute("x2",40-width);
	myRuler.setAttribute("y2",y);
	myRuler.setAttribute("style","stroke:black;stroke-width:2");
	axis.insertBefore(myRuler,xAxis);
}
function svgRectNode(xmlns,width,height,x,y,color,barChart,axis){
	let myRect=document.createElementNS(xmlns,"rect");
    myRect.setAttribute("width",width);
    myRect.setAttribute("height",height);
    myRect.setAttribute("x",x);
    myRect.setAttribute("y",y);
    myRect.setAttribute("style","fill:"+color+";stroke-width:0");
    barChart.insertBefore(myRect,axis);
}

function initBar(myBar,xmlns){
	myBar.innerHTML="";
	//给SVG添加x,y轴以及横纵轴的名称
	let axis=document.createElementNS(xmlns,"g");
	axis.setAttribute("id","axis");
	let yArrow=document.createElementNS(xmlns,"polyline");
	yArrow.setAttribute("points","35,30 40,20 45,30");
	yArrow.setAttribute("style","stroke:black;stroke-width:2;fill:transparent ");
	let xArrow=document.createElementNS(xmlns,"polyline");
	xArrow.setAttribute("points","670,265 680,270 670,275");
	xArrow.setAttribute("style","stroke:black;stroke-width:2;fill:transparent ");
	let xAxis=document.createElementNS(xmlns,"polyline");
	let yAxis=document.createElementNS(xmlns,"polyline");
	xAxis.setAttribute("points","40,270 40,20");
	xAxis.setAttribute("style","stroke:black;stroke-width:2;fill:transparent ");
	xAxis.setAttribute("id","xAxis");
	yAxis.setAttribute("points","40,270 680,270");
	yAxis.setAttribute("style","stroke:black;stroke-width:2;fill:transparent ");
	axis.appendChild(yArrow);
	axis.appendChild(xArrow);
	axis.appendChild(yAxis);
	axis.appendChild(xAxis);
	let myTxt=document.createElementNS(xmlns,"text");
	myTxt.setAttribute("id","axisTxt");
	let yTxt=document.createElementNS(xmlns,"tspan");
	yTxt.setAttribute("fill","black");
	yTxt.setAttribute("x","45");
	yTxt.setAttribute("y","25");
	yTxt.innerHTML="销量";
	let xTxt=document.createElementNS(xmlns,"tspan");
	xTxt.setAttribute("fill","black");
	xTxt.setAttribute("x","680");
	xTxt.setAttribute("y","275");
	xTxt.innerHTML="月份";
	myTxt.appendChild(yTxt);
	myTxt.appendChild(xTxt);
	myBar.appendChild(axis);
	myBar.appendChild(myTxt);
}

