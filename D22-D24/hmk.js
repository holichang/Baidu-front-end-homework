let show=document.getElementById("result1");
let inputA=document.getElementById("num-a");
let inputB=document.getElementById("num-b");
let inputStrA=document.getElementById("numstr-a");
let inputStrB=document.getElementById("numstr-b");
let textA=document.getElementById("str-a");
let textB=document.getElementById("str-b");
let show2=document.getElementById("result2")
/*引用类型的赋值传的是指针*/
function isNumber(number){
	if(number!=null&&number!=""){
		if(isNaN(number)){
			return false;
		}
		else{
			return true;
		}
	}
	else{
		return false;
	}
}
function isNum(){
	let myRadio=document.querySelector(".num input:checked").value;
    let num=document.getElementById("num-"+myRadio).value;
	if(isNumber(num)){
		show.innerHTML="当前输入框的内容是数字";
	}
	else{
		show.innerHTML="当前输入框的内容不是数字";
	}
}
function toChange(){
	let numA=inputA.value;
	let numB=inputB.value;
	if(isNumber(numA)&&isNumber(numB)){
		numA=Number(numA);
		numB=Number(numB).toFixed(0);
		if(0<=numB&&numB<=20){
			show.innerHTML=numA.toFixed(numB);
		}
		else{
			console.log("小数位数不能超过指定位数")
		}
	}
	else{
		console.log("输入框的内容不都为数字")
	}
}
function toAbs(){
	let myRadio=document.querySelector(".num input:checked").value;
    let num=document.getElementById("num-"+myRadio).value;
	if(isNumber(num)){
		num=Number(num);
		show.innerHTML=Math.abs(num);
	}
	else
	{
		show.innerHTML="当前输入框的内容不是数字";
	}
}
function toUpNum(){
	let myRadio=document.querySelector(".num input:checked").value;
    let num=document.getElementById("num-"+myRadio).value;
	if(isNumber(num)){
		num=Number(num);
		show.innerHTML=Math.ceil(num);
	}
	else
	{
		show.innerHTML="当前输入框的内容不是数字";
	}
}
function toDown(){
	let myRadio=document.querySelector(".num input:checked").value;
    let num=document.getElementById("num-"+myRadio).value;
	if(isNumber(num)){
		num=Number(num);
		show.innerHTML=Math.floor(num);
	}
	else
	{
		show.innerHTML="当前输入框的内容不是数字";
	}
}
function toMiddle(){
	let myRadio=document.querySelector(".num input:checked").value;
    let num=document.getElementById("num-"+myRadio).value;
	if(isNumber(num)){
		num=Number(num);
		show.innerHTML=num.toFixed(0);
	}
	else{
		show.innerHTML="当前输入框的内容不是数字";
	}
}
function toMax(){
	let numA=inputA.value;
	let numB=inputB.value;
	if(isNumber(numA)&&isNumber(numB)){
		numA=parseFloat(numA);
	    numB=parseFloat(numB);
	    show.innerHTML=Math.max(numA,numB);
	}
	else{
		show.innerHTML="输入框的内容不是数字";
	}
	
}
function toMin(){
	let numA=inputA.value;
	let numB=inputB.value;
	if(isNumber(numA)&&isNumber(numB)){
		numA=parseFloat(numA);
	    numB=parseFloat(numB);
	    show.innerHTML=Math.min(numA,numB);
	}
	else{
		show.innerHTML="输入框的内容不是数字";
	}
	
}
function showLength(){
	let myRadio=document.querySelector(".string input:checked");
	let checked=myRadio.value;
	let myText=document.getElementById("str-"+checked).value;
	show2.innerHTML=myText.length;
}
function show3rd(){
	let myRadio=document.querySelector(".string input:checked");
	let checked=myRadio.value;
	let myText=document.getElementById("str-"+checked).value;
	show2.innerHTML=myText.charAt(2);
}
function concatAB(){
	let myTextA=textA.value;
	let myTextB=textB.value;
	show2.innerHTML=myTextA.concat(myTextB);
}
function searchBinA(){
	let myTextA=textA.value;
	let myTextB=textB.value;
	show2.innerHTML=myTextA.indexOf(myTextB);
}
function searchAinB(){
	let myTextA=textA.value;
	let myTextB=textB.value;
	show2.innerHTML=myTextB.lastIndexOf(myTextA);
}
function showAtoB(){
	let numA=inputStrA.value;
	let numB=inputStrB.value;
	if(isNumber(numA)&&isNumber(numB)){
		numA=parseInt(numA);
		numB=parseInt(numB);
		let myRadio=document.querySelector(".string input:checked");
		let checked=myRadio.value;
		let myText=document.getElementById("str-"+checked).value;
		show2.innerHTML=myText.slice(numA,numB);
	}
	
}
//判断文本框中字符串的行数：用总字符数/文本框列数:取整
function countRow(){
	let myRadio=document.querySelector(".string input:checked");
	let checked=myRadio.value;
	let Text=document.getElementById("str-"+checked);
	let myText=Text.value;
	let col=Text.cols;
	let row=(myText.length/col).toFixed(0);
	show2.innerHTML=row;
}
function showChats(){
	let numA=inputStrA.value;
	let numB=inputStrB.value;
	if(isNumber(numA)&&isNumber(numB)){
		numA=parseInt(numA);
		numB=parseInt(numB);
		let myRadio=document.querySelector(".string input:checked");
		let checked=myRadio.value;
		let myText=document.getElementById("str-"+checked).value;
		show2.innerHTML=myText.substr(numA,numB);
	}
}
function toUp(){
	let Myradio=document.querySelector(".string input:checked");
	let checked=Myradio.value;
	let myText=document.getElementById("str-"+checked).value;
	show2.innerHTML=myText.toLocaleUpperCase();
}
function toLow(){
	let Myradio=document.querySelector(".string input:checked");
	let checked=Myradio.value;
	let myText=document.getElementById("str-"+checked).value;
	show2.innerHTML=myText.toLocaleLowerCase();
}
function delSpace(){
	let Myradio=document.querySelector(".string input:checked");
	let checked=Myradio.value;
	let myText=document.getElementById("str-"+checked).value;
	/*let showText="";
	for(let i=0;i<myText.length;i++){
		if(myText.charCodeAt(i)!=32){
			showText+=myText.charAt(i);
		}
	}
	show2.innerHTML=showText;*/
	show2.innerHTML= myText.replace(/\u0020/g,"");
}
function changeA(){
	let myRadio=document.querySelector(".string input:checked");
    let onText,offText;
    switch(myRadio.value){
    	case "a":
    	    onText=document.getElementById("str-a").value;
    	    offText=document.getElementById("str-b").value;
    	    break;
    	case "b":
    	    onText=document.getElementById("str-b").value;
    	    offText=document.getElementById("str-a").value;
    	    break;
    }
	show2.innerHTML=onText.replace(/a/g,offText);
}
/*
实现一个字符串头尾去除空格的函数
注意需要去除的空格，包括全角、半角空格
暂时不需要学习和使用正则表达式的方式
*/
function diyTrim(str) {
    let result = "";
    /*let left=0;
    let right=str.length-1;
    
    while(str.charCodeAt(left)==32||str.charCodeAt(left)==12288){
    	left+=1;
    }
    while(str.charCodeAt(right)==32||str.charCodeAt(right)==12288){
    	right-=1;
    }
    result=str.slice(left,right+1);*/
    // do something
    result = str.replace(/(^\s+|\s+$)/g,"");
    return result;
}

// 测试用例
console.log(diyTrim(' a f b    ')); // ->a f b
console.log(diyTrim('    ffdaf    ')); // ->ffdaf
console.log(diyTrim('1    ')); // ->1
console.log(diyTrim('　　f')); // ->f
console.log(diyTrim('  　  a f b 　　 ')); // ->a f b
console.log(diyTrim(' ')); // ->
console.log(diyTrim('　')); // ->
console.log(diyTrim('')); // ->

/*
去掉字符串str中，连续重复的地方
*/
function removeRepetition(str) {
    let result = "";
    let count=0;
    if(str==""){
    	return "";
    }
    else{
    	result+=str[count];
	    if(str.length>1){
	    	for(let i=1;i<str.length;i++){
		    	if(str[i]!=result[count]){
		    		result+=str[i];
		    		count++;
		    	}
		    }
	    }
    }
    
    
    // do something

    return result;
}

// 测试用例
console.log(removeRepetition("aaa")); // ->a
console.log(removeRepetition("abbba")); // ->aba
console.log(removeRepetition("aabbaabb")); // ->abab
console.log(removeRepetition("")); // ->
console.log(removeRepetition("abc")); // ->abc