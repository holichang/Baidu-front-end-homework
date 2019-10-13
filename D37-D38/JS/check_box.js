//封装一个函数，wrapper为要添加的容器，checkdata为要渲染为复选框的数据，
//name为数据的字段名（商品、地区），str为该容器中全选按钮的id
function setChecklist(wrapper,checkdata,name,str){
	//显示复选框题目，如商品和地区
    let title=document.createElement("span");
    title.innerText=name+":";
    wrapper.appendChild(title);
    for(let i=0;i<checkdata.length;i++){
    	addCheckBox(wrapper,checkdata[i].id,checkdata[i].value);
    }
    addCheckBox(wrapper,str,"全选");
    wrapper.childNodes[1].checked=true;
    //添加点击响应函数,实现各复选框与全选按钮之间的联系
    wrapper.addEventListener("click",function(ev){
    	let myEv=ev||window.event;
    	let myTarget=myEv.target||myEv.srcElement;
    	if(myTarget.tagName.toLocaleLowerCase()=="input"){
    		//把用于存储查询地区和商品的数组置为空
    		if(myTarget.id==str){
    			for(let i=0;i<wrapper.childNodes.length;i++){
    				if(wrapper.childNodes[i].tagName.toLocaleLowerCase()=="input"){
    					wrapper.childNodes[i].checked=true;
    				}
	    		}
    			
    		}
    		else{
    			//先假设全选，如果有没有选的，则改为false
    			let isAll=true;
    			let isNone=true;
			    for(let i=0;i<wrapper.childNodes.length;i++){
			    	if(wrapper.childNodes[i].tagName.toLocaleLowerCase()=="input"){
			    		if(wrapper.childNodes[i].id!=str){
			    			if(wrapper.childNodes[i].checked==false){
				    			isAll=false;
				    		}
			    			else{
			    				isNone=false;
			    			}
			    		}
			    	}
			    }
			    //如果全选了，则把全选按钮checked置为true
    			if(isAll){
    				document.getElementById(str).checked=true;
    			}
    			//如果没有全选，则把全选按钮checked置为false
    			else{
    				document.getElementById(str).checked=false;
    			}
    			//如果一个都没有选，要把目标按钮置为true,即所选按钮不能为空
    			if(isNone){
    				myTarget.checked=true;
    			}
    		}
    	}
    	
    });
    
}

//添加单个复选框的函数
function addCheckBox(wrap,id,value){
	let myCheck=document.createElement("input");
	let myLabel=document.createElement("label");
	myCheck.type="checkbox";
	myCheck.id=id;
	myLabel.innerHTML=value;
	myLabel.setAttribute("for",myCheck.id);
	wrap.appendChild(myCheck);
	wrap.appendChild(myLabel);
}