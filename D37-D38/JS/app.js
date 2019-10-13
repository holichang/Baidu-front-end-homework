let regWrapper=document.getElementById("region-radio-wrapper");
let proWrapper=document.getElementById("product-radio-wrapper");
let dataTable=document.getElementById("data-table");
//用于存储之前的数据
let tdNum;
//localStorage.clear();
//把原始数据存进localStorage,后续的操作基于存储数据
if(!localStorage.getItem("data")){
	localStorage.setItem("data",JSON.stringify(originData));
}
let sourceData=JSON.parse(localStorage.getItem("data"));
//用于生成复选框表单的对象数组
let regData=[{id:"region-1",value:"华东"},{id:"region-2",value:"华北"},{id:"region-3",value:"华南"}];
let proData=[{id:"product-1",value:"手机"},{id:"product-2",value:"笔记本"},{id:"product-3",value:"智能音箱"}];

//生成两个复选框表单，并为其添加与全选按钮之间逻辑关系的事件
setChecklist(regWrapper,regData,"地区","all-region");
setChecklist(proWrapper,proData,"商品","all-product");
showTable();

drawLine();
drawBar();
//为两个表单添加响应函数渲染表格
regWrapper.addEventListener("click",function(ev){
	let myEv=ev||window.ev;
	let myTarget=myEv.target||myEv.srcElement;
	if(myTarget.tagName.toLocaleLowerCase()=="input"){
		showTable();
		drawLine();
		drawBar();
	}
});
proWrapper.addEventListener("click",function(ev){
	let myEv=ev||window.ev;
	let myTarget=myEv.target||myEv.srcElement;
	if(myTarget.tagName.toLocaleLowerCase()=="input"){
		showTable();
		drawLine();
		drawBar();
	}
});
dataTable.addEventListener("mouseover",function(ev){
	let myEv=ev||window.event;
	let myTarget=myEv.target||myEv.srcElement;
	let pro,reg;
	let trId=[];
	if(myTarget.tagName.toLocaleLowerCase()=="span"){
		myTarget=myTarget.parentNode;
	}
	if(myTarget.tagName.toLocaleLowerCase()=="td"){
		myTarget.parentNode.style.backgroundColor="#4169E1";
		myTarget.parentNode.style.color="#FFFFFF";
		setMergedWhite();
		trId=myTarget.parentNode.id.split("-");
		if(regData.some(function(data){
			return data.value==trId[0];
		})){
			reg=trId[0];
			pro=trId[1];
		}
		else{
			reg=trId[1];
			pro=trId[0];
		}
		drawBar(reg,pro);
		drawLine(reg,pro);
		//如果是销量的单元格：
		if(myTarget.className=="sale"){
			let emitInput=myTarget.querySelector(".emit-input");
			if(emitInput.style.display!="inline-block"){
				myTarget.querySelector(".emit").style.visibility="visible";
			}
			
		}
	}
	
	
});
//点击事件放在一起判断，点击到“确定”即提交数据，点击到“取消”或本单元格之外即退回到之前的数据，点到输入框即使其获得焦点
document.addEventListener("click",function(ev){
	let myEv=ev||window.event;
	let myTarget=myEv.target||myEv.srcElement;
	if(myTarget.parentNode.className=="sale"){
		myTarget=myTarget.parentNode;
	}	
	if(myTarget.className=="cancle"){
		myTarget.parentNode.style.display="none";
		//let tdSale=myTarget.parentNode.parentNode;
		myTarget.parentNode.parentNode.childNodes[0].data=tdNum;
	}
	else if(myTarget.className=="confirm"){
		let inputValue=myTarget.parentNode.querySelector("input").value;
		if((parseFloat(inputValue).toString())=="NaN"){
			alert("请输入数字！");
		}
		else{
			myTarget.parentNode.style.display="none";
		    myTarget.parentNode.parentNode.childNodes[0].data=inputValue;
		}
	}
	else if(myTarget.className=="td-input"){
		myTarget.focus();
	}
	else if(myTarget.className!="sale"){
		let show=document.querySelector(".emit-input[style*='inline-block']");
		if(show){
			show.style.display="none";
			show.parentNode.childNodes[0].data=tdNum;
		}
		if(myTarget.id=="save-btn"){
			dataStorage();
		}
	}
	
	else if((myTarget.className=="sale")&&(myTarget.querySelector(".emit-input").style.display!="inline-block")){
		let show=document.querySelector(".emit-input[style*='inline-block']");
		if(show){
			show.style.display="none";
			show.parentNode.childNodes[0].data=tdNum;
		}
		let emitInput=myTarget.querySelector(".emit-input");
		tdNum=myTarget.childNodes[0].data;
		myTarget.childNodes[0].data="";
		emitInput.style.display="inline-block";
		
	}
});


dataTable.addEventListener("mouseout",function(ev){
	let myEv=ev||window.event;
	let myTarget=myEv.target||myEv.srcElement;
	if(myTarget.tagName.toLocaleLowerCase()=="span"){
		myTarget=myTarget.parentNode;
	}
	if(myTarget.tagName.toLocaleLowerCase()=="td"){
		myTarget.parentNode.style.backgroundColor="#FFFFFF";
		myTarget.parentNode.style.color="#000000";
		if(myTarget.className=="sale"){
			myTarget.querySelector(".emit").style.visibility="hidden";
		}
	}
	setMergedWhite();
});

//把合并的单元格背景置为白色
function setMergedWhite(){
	let mergeList=document.getElementsByClassName("merged");
	for(let i=0;i<mergeList.length;i++){
		mergeList[i].style.backgroundColor="#FFFFFF";
		mergeList[i].style.color="#000000";
	}
}

/*document.body.onload=function(){
	drawBar();
}*/
