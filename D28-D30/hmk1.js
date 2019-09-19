// 邮箱后缀List参考
var postfixList = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];

let inputDom=document.getElementById("email-input");
let emailWrapper=document.getElementById("email-sug-wrapper");
inputDom.addEventListener("input",addHint);
let liList=document.querySelectorAll("#email-sug-wrapper li");
liClick();
//inputDom.addEventListener("keydown",addHint);
//inputDom.addEventListener("keyup",addHint);
//inputDom.addEventListener("keypress",addHint);

function addHint(){
	clearUl();
	setUl();
	console.log("event handle!");
}
//定义li的点击事件，使用事件代理，减少与dom的操作
function liClick(){
	emailWrapper.addEventListener("click",function(ev){
		ev=event||window.event;
		myTarget=ev.target||ev.srcElement;
		if(myTarget.nodeName.toLowerCase()=="li"){
			//inputDom.value=myTarget.innerText;
			inputDom.value=encoding(myTarget.innerHTML);
			emailWrapper.style.display="none";
		}
	});
}
//该函数用于每次事件中先清除ul中的内容
function clearUl(){
	let myLen=emailWrapper.childNodes.length;
	for(let i=myLen-1;i>=0;i--){
		emailWrapper.removeChild(emailWrapper.childNodes[i]);
	}
}
//设置ul下的值
function setUl(){
	let myInput=inputDom.value.trim();
	myInput=coding(myInput);
	console.log(myInput);
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
	emailWrapper.childNodes[0].className="active";
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
// 根据输入的值判断提示邮箱的格式
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
function coding(arr){
	arr=arr.replace("<","&lt;");
	arr=arr.replace(">","&gt;");
	//arr=arr.replace("&","&amp;");
	return arr;
}
function encoding(arr){
	arr=arr.replace("&lt;","<");
	arr=arr.replace("&gt;",">");
	//arr=arr.replace("&amp;","&");
	return arr;
}
