let regWrapper=document.getElementById("region-radio-wrapper");
let proWrapper=document.getElementById("product-radio-wrapper");
let dataTable=document.getElementById("data-table");
//用于生成复选框表单的对象数组
let regData=[{id:"region-1",value:"华东"},{id:"region-2",value:"华北"},{id:"region-3",value:"华南"}];
let proData=[{id:"product-1",value:"手机"},{id:"product-2",value:"笔记本"},{id:"product-3",value:"智能音箱"}];
let canvas=document.getElementById("line");
//生成两个复选框表单，并为其添加与全选按钮之间逻辑关系的事件
setChecklist(regWrapper,regData,"地区","all-region");
setChecklist(proWrapper,proData,"商品","all-product");
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
		drawBar()
	}
});
dataTable.addEventListener("mouseover",function(ev){
	let myEv=ev||window.event;
	let myTarget=myEv.target||myEv.srcElement;
	if(myTarget.tagName.toLocaleLowerCase()=="td"){
		myTarget.style.backgroundColor="#4169E1";
		myTarget.style.color="#FFFFFF";
	}
});
dataTable.addEventListener("mouseout",function(ev){
	let myEv=ev||window.event;
	let myTarget=myEv.target||myEv.srcElement;
	if(myTarget.tagName.toLocaleLowerCase()=="td"){
		myTarget.style.backgroundColor="#FFFFFF";
		myTarget.style.color="#000000";
	}
});

/*document.body.onload=function(){
	drawBar();
}*/
