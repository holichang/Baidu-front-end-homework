function drawBar(){
	let myCharts=document.getElementById("charts");
	let myBar=document.getElementById("bar");
	//先获取数据
	let myData=getData();//获取到的是对象数组
	//获取数据中sale的最大值
	let yMax=myData[0].sale[0];
	for(let i=0;i<myData.length;i++){
		let sale=myData[i].sale;
		for(let j=0;j<sale.length;j++){
			if(sale[j]>yMax){
				yMax=sale[j];
			}
		}
	}
	let xmlns="http://www.w3.org/2000/svg";
	let axis=document.getElementById("axis");
	let myTxt=document.getElementById("axis-text");
	let xAxis=document.getElementById("x-axis");
   // let barData=getBarData("华东","手机");
	let prop=220/yMax;
	let xInit=60;//第一个bar的x
	let width=20;
	let xSpace=15;//两个bar之间的间距
	//画y轴刻度
	for(let i=0;i<Math.floor(yMax/10)+3;i++){
		if(i%5==0){
			svgRuler(xmlns,270-prop*i*10,10,xAxis,axis);
			svgText(xmlns,i*10+"",0,270-prop*i*10+5,myTxt);
		}
		else{
			svgRuler(xmlns,270-prop*i*10,5,xAxis,axis);
		}
	}
	//画柱子，每个地区颜色不同
	//let lineColor=["#CD5C5C","#4169E1","#3CB371"];//对应手机，笔记本和音箱
	let color;
	for(let i=0;i<myData.length;i++){
		let myPro=myData[i].product;
		let myReg=myData[i].region;
		let barData=myData[i].sale;
		switch (myPro){
			case "手机":
			    color="#CD5C5C";
			    break;
			case "笔记本":
			    color="#4169E1";
			    break;
			case "智能音箱":
			    color="#3CB371";
			    break;
		}
		for(let j=0;j<barData.length;j++){
			svgRectNode(xmlns,width,barData[j]*prop,xInit,270-barData[j]*prop,color,myBar,axis);
			svgText(xmlns,(j+1)+"月",xInit,290,myTxt);
			xInit=xInit+xSpace+width;
		}
		
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


