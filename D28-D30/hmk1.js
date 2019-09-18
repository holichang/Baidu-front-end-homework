// 邮箱后缀List参考
var postfixList = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];

let inputDom=document.getElementById("email-input");
let emailWrapper=document.getElementById("email-sug-wrapper");
inputDom.addEventListener("input",addHint);
//inputDom.addEventListener("keydown",addHint);
//inputDom.addEventListener("keyup",addHint);
//inputDom.addEventListener("keypress",addHint);
function addHint(){
	clearUl();
	setUl();
	console.log("event handle!");
}
function clearUl(){
	let myLen=emailWrapper.childNodes.length;
	for(let i=myLen-1;i>=0;i--){
		emailWrapper.removeChild(emailWrapper.childNodes[i]);
	}
}
//设置ul下的值
function setUl(){
	let myInput=inputDom.value.trim();
	let emailList;
	isVisiblity(myInput);
	if(myInput.indexOf("@")==-1){
		emailList=postfixList;
	}
	else{
		emailList=inter(myInput);
		myInput=myInput.split("@")[0];
	}
	for (let i=0;i<emailList.length;i++){
		let emLi=document.createElement("li");
		emLi.innerHTML=myInput+"@"+emailList[i];
		emailWrapper.appendChild(emLi);
	}
}
//根据输入框中的值trim后是否是空字符串控制ul是否可见
function isVisiblity(input){
	if(input==""){
		emailWrapper.style.display="none";
	}
	else{
		emailWrapper.style.display="block";
	}
}
//对于不合法的字符串，截取@前面的值
// 根据
function inter(str){
	let arr=[];
	bef=str.split("@");
	
	if((bef[1]!="")&&("gmail.com".indexOf(bef[1])==0)){
		arr.push("gmail.com");
	}
	if((bef[1]!="")&&("163.com".indexOf(bef[1])==0)){
		arr.push("163.com");
	}
	if((bef[1]!="")&&("126.com".indexOf(bef[1])==0)){
		arr.push("126.com");
	}	
	if((bef[1]!="")&&("qq.com".indexOf(bef[1])==0)){
		arr.push("qq.com");
	}	
	if((bef[1]!="")&&("263.com".indexOf(bef[1])==0)){
		arr.push("263.com");
	}	
	if(arr.length==0)
	{
		arr.push('163.com', 'gmail.com', '126.com', 'qq.com', '263.net');
	}
	return arr;
}
