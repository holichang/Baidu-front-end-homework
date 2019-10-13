//通过查询得到的数据渲染表格
function showTable(){
	let myData=getData();//获取对象数组
	let proLength=getCate(myData,"product");
	let regLength=getCate(myData,"region");
	clearTable(dataTable);
	setTableHead();
	setTableContent(myData,proLength,regLength);
	
	
}
//获取数据中地区和商品的种类数
function getCate(data,pro){
	let proList=[];
	for(let i=0;i<data.length;i++){
		if(proList.indexOf(data[i][pro])==-1){
			proList.push(data[i][pro]);
		}
	}
	return proList.length;
}
//reg,pro为所要查询的地区和商品数组，返回的是对象数组
function getData(){
	let myReg=[];
    let myPro=[];
	let checkedList=document.querySelectorAll("input:checked");
	for(let i=0;i<checkedList.length;i++){
		if(checkedList[i].parentElement.id=="region-radio-wrapper"){
			if(checkedList[i].id!="all-region"){
				myReg.push(checkedList[i].nextElementSibling.innerText);
			}
		}
		if(checkedList[i].parentElement.id=="product-radio-wrapper"){
			if(checkedList[i].id!="all-product"){
				myPro.push(checkedList[i].nextElementSibling.innerText);
			}
		}
	}
	function unequal(obj){
		//如果在reg数组中找不到该对象的地区或者在pro数组中找不到该对象的商品名，则被过滤掉
		if((myPro.indexOf(obj.product)==-1)||(myReg.indexOf(obj.region)==-1))
		{
			return false;
		}
		else{
			return true;
		}
	}
	//把不符合条件的过滤掉，原数组不变
	let myData=sourceData.filter(unequal);
	return myData;
}
//定义函数：渲染表头
function setTableHead(){
    let myTrHead=document.createElement("tr");
    let myThProduct=document.createElement("th");
    myThProduct.innerText="商品";
    myTrHead.appendChild(myThProduct);
    let myThRegion=document.createElement("th");
    myThRegion.innerText="地区";
    myTrHead.appendChild(myThRegion);
    for(let i=1;i<13;i++){
    	let myThMonth=document.createElement("th");
    	myThMonth.innerText=i+"月份销量";
    	myTrHead.appendChild(myThMonth);
    }
    dataTable.appendChild(myTrHead);
}
//将获取的数据渲染成表格中的内容,参数为对象数组[]，a为商品数组的长度，b为地区数组的长度
function setTableContent(data,a,b){
	//当商品和地区都只选择一个的情况下，以商品为第一列，地区为第二列
	if((a==1)&&(b==1)){
		let myTr=setTableTr(data[0]);
		let myTd=document.createElement("td");
		myTd.innerText=data[0].product;
		myTr.insertBefore(myTd,myTr.firstChild);
		dataTable.appendChild(myTr);
	}
	//当商品选择了一个，地区选择了多个的时候，商品作为第一列，地区作为第二列，并且把商品这一列的单元格做一个合并，只保留一个商品名称
	if((a==1)&&(b>1)){
		for(let i=0;i<data.length;i++){
			let myTr=setTableTr(data[i],b);
			if(i==0){
				let merTd=setMergedTd(data[i].product,b);
				//将合并的单元格插入到第一个tr的第一个子节点前面
				myTr.insertBefore(merTd,myTr.firstChild);
			}
			dataTable.appendChild(myTr);
		}
    }
	//当地区选择了一个，商品选择了多个的时候，地区作为第一列，商品作为第二列，并且把地区这一列的单元格做一个合并，只保留一个地区名称
	if((a>1)&&(b==1)){
		for(let i=0;i<data.length;i++){
			let myTr=setTableTr(data[i],b);
			if(i==0){
				let merTd=setMergedTd(data[i].region,a);
				myTr.insertBefore(merTd,myTr.firstChild);
			}
			dataTable.appendChild(myTr);
		}
	}
	//当商品和地区都选择了多于一个的情况下，以商品为第一列，地区为第二列，商品列对同样的商品单元格进行合并
	if((a>1)&&(b>1)){
		for(let i=0;i<data.length;i++){
			let myTr=setTableTr(data[i],b);
			//把合并的单元格插入到每一类商品的第一个tr中
			if(i%b==0){
				let merTd=setMergedTd(data[i].product,b);
				myTr.insertBefore(merTd,myTr.firstChild);
			}
			dataTable.appendChild(myTr);
			
		}
	}
}
//定义函数用于生成合并的单元格,name为该单元格的文本内容，n为合并的单元格个数，结果返回该单元格
function setMergedTd(name,n){
	let myTd=document.createElement("td");
	myTd.innerText=name;
	myTd.rowSpan=n;
	myTd.className="merged";
	return myTd;
}
//添加单行data为数据对象,n为地区种类数,只有当n=1的时候，才会把地区排到前面
//定义函数：用于生成tr,不包括合并的单元格
function setTableTr(data,n){
	let myTr=document.createElement("tr");
	let tdPro=document.createElement("td");
	let tdReg=document.createElement("td");
	tdPro.innerText=data.product;
	tdReg.innerText=data.region;
	if(n==1){
		//myTr.appendChild(tdReg);
		//地区名不添加进来，用于放在合并单元格中
		myTr.appendChild(tdPro);
		myTr.id=data.region+"-"+data.product;
	}
	//如果b为undefined也走向else
	else{
		//myTr.appendChild(tdPro);
		//不添加商品名
	    myTr.appendChild(tdReg);
	    myTr.id=data.product+"-"+data.region;
	}
	for(let i=1;i<13;i++){
    	let TdSale=document.createElement("td");
    	//为每一个表示销量的单元格添加类名"sale"
    	TdSale.setAttribute("class","sale");
    	TdSale.innerText=data.sale[i-1];
    	let emitSpan=document.createElement("span");
		emitSpan.innerHTML="编辑";
		emitSpan.setAttribute("class","emit");
		TdSale.appendChild(emitSpan);
		let inputSpan=document.createElement("span");
		inputSpan.setAttribute("class","emit-input");
		inputSpan.innerHTML="<input type='text' class='td-input'/><span class='confirm'>确定</span><span class='cancle'>取消</span>";
    	TdSale.appendChild(inputSpan);
    	myTr.appendChild(TdSale);
    	//此处进行下一步，单元格可添加input
    }
	return myTr;
}
//每次重新生成表格前，先把表格内容置空
function clearTable(table){
	table.innerHTML="";
}
