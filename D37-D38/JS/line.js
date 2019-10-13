let canvas=document.getElementById("line");
if(canvas.getContext){
	cvx=canvas.getContext("2d");
}
function drawLine(reg,pro){
	//先获取数据
    //获取到的是对象数组
	let myData=[];
	if(arguments.length==0){
		myData=getData();//获取到的是对象数组
	}
	if(arguments.length==2){
		sourceData.forEach(function(data){
			if((data.product==pro)&&(data.region==reg)){
				myData.push(data);
			}
		});
	}
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
	let yHeight=220;
	let prop=yHeight/yMax;
	let xStart=60;
	let yStart=270;
	let xSpace=35;
	cvx.clearRect(0,0,canvas.width,canvas.height);
	drawAxis(cvx,xStart,xSpace,yMax,prop);
	
	
	//定义一个颜色列表：
	//let lineColor=["#CD5C5C","#4169E1","#3CB371"];
	//画线
	for(let i=0;i<myData.length;i++){
		drawOneLine(myData[i].region,myData[i].product,cvx,myData[i].sale,xStart,xSpace,prop);
		drawLegend(cvx,myData[i].product,myData[i].region,530,20+i*25);
	}
	
	//画一条折线需要地区，商品，数据数组，第一月份的x值，每个月之间的距离，比例
	//颜色由地区决定，形状由商品决定
}
//先画坐标轴
function drawAxis(cvx,xStart,xSpace,yMax,prop){
	cvx.font="18px SimHei";
	cvx.beginPath();
	cvx.strokeStyle="#000000";
	cvx.fillStyle="#000000";
	cvx.moveTo(40,20);
	cvx.lineTo(40,270);
	cvx.lineTo(480,270);
	cvx.font="16px serif";
	cvx.textAlign="left";
	cvx.fillText("月份",490,275);
	cvx.fillText("销量",45,25);
	cvx.moveTo(35,30);
	cvx.lineTo(40,20);
	cvx.lineTo(45,30);
	cvx.moveTo(470,265);
	cvx.lineTo(480,270);
	cvx.lineTo(470,275);
	//画x轴刻度：
	for(let i=0;i<12;i++){
		cvx.moveTo(xStart+i*xSpace,260);
		cvx.lineTo(xStart+i*xSpace,270);
		cvx.font="14px serif";
		cvx.textAlign="left";
		cvx.fillText(i+1+"月",60+i*xSpace-10,290);
	}
	//画y轴刻度：
	if(yMax<100){
		for(let i=0;i<Math.floor(yMax/5)+2;i++){
			if(i%2==0){
				cvx.moveTo(30,270-i*5*prop);
				cvx.lineTo(40,270-i*5*prop);
				cvx.font="14px serif";
				cvx.textAlign="right";
				cvx.fillText(i*5,25,270-i*5*prop+3);
				
			}
			else{
				cvx.moveTo(35,270-i*5*prop);
				cvx.lineTo(40,270-i*5*prop);
			}
		}
		cvx.stroke();
	}
	else{
		for(let i=0;i<Math.floor(yMax/10)+2;i++){
			if(i%5==0){
				cvx.moveTo(30,270-i*10*prop);
				cvx.lineTo(40,270-i*10*prop);
				cvx.font="14px serif";
				cvx.textAlign="right";
				cvx.fillText(i*10,25,270-i*10*prop+3);
				
			}
			else{
				cvx.moveTo(35,270-i*10*prop);
				cvx.lineTo(40,270-i*10*prop);
			}
		}
		cvx.stroke();
	}
	
}
//画单条折线
function drawOneLine(region,product,cantxt,lineData,xStart,xSpace,prop){
	let color;
	switch (region){
		case "华东":
		    color="#CD5C5C";
		    break;
		case "华北":
		    color="#4169E1";
		    break;
		case "华南":
		    color="#3CB371";
		    break;
	}
	cantxt.beginPath();
	cantxt.strokeStyle=color;
	cantxt.moveTo(xStart,270-lineData[0]*prop);
	for(let i=1;i<lineData.length;i++){
		cantxt.lineTo(xStart+i*xSpace,270-lineData[i]*prop);
	}
	cantxt.stroke();
    
	cantxt.beginPath();
	cantxt.fillStyle=color;
	for(let i=0;i<lineData.length;i++){
		cantxt.moveTo(xStart+i*xSpace,270-lineData[i]*prop);
		drawShape(product,cantxt,xStart+i*xSpace,270-lineData[i]*prop);
	}
	cantxt.fill();
}
//画折线上的形状
function drawShape(product,cvx,x,y){
	switch(product){
		case "手机":
		    cvx.arc(x,y,5,0,Math.PI*2,true);
		    break;
		case "笔记本":
		    cvx.moveTo(x-5,y-5);
		    cvx.lineTo(x+5,y-5);
		    cvx.lineTo(x+5,y+5);
		    cvx.lineTo(x-5,y+5);
		    cvx.lineTo(x-5,y-5);
		    break;
		case "智能音箱":
		    cvx.moveTo(x,y-5);
		    cvx.lineTo(x+5,y+5);
		    cvx.lineTo(x-5,y+5);
		    cvx.lineTo(x,y-5);
		    break;
	}
}
//给图表添加图例
function drawLegend(cantxt,pro,reg,x,y){
	let color;
	switch (reg){
		case "华东":
		    color="#CD5C5C";
		    break;
		case "华北":
		    color="#4169E1";
		    break;
		case "华南":
		    color="#3CB371";
		    break;
	}
	cantxt.strokeStyle=color;
	cantxt.moveTo(x-30,y);
	cantxt.lineTo(x+30,y);
	cantxt.stroke();
	cantxt.fillStyle=color;
	cantxt.moveTo(x,y);
	drawShape(pro,cantxt,x,y);
	cantxt.fill();
	cantxt.fillStyle="#000000";
	cantxt.font="14px serif";
	cantxt.textAlign="left";
	cantxt.fillText(reg+"地区"+pro,x+40,y+5);
}
