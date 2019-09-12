var tree = {
    "id": 0,
    "name": "root",
    "left": {
        "id": 1,
        "name": "Simon",
        "left": {
            "id": 3,
            "name": "Carl",
            "left": {
                "id": 7,
                "name": "Lee",
                "left": {
                    "id": 11,
                    "name": "Fate"
                }
            },
            "right": {
                "id": 8,
                "name": "Annie",
                "left": {
                    "id": 12,
                    "name": "Saber"
                }
            }
        },
        "right": {
            "id": 4,
            "name": "Tony",
            "left": {
                "id": 9,
                "name": "Candy"
            }
        }
    },
    "right": {
        "id": 2,
        "name": "right",
        "left": {
            "id": 5,
            "name": "Carl",
        },
        "right": {
            "id": 6,
            "name": "Carl",
            "right": {
                "id": 10,
                "name": "Kai"
            }        
        }
    }
}

// 假设id和name均不会重复，根据输入name找到对应的id
function findIdByName(myName) {
    function find(obj){
        if(obj.name === myName){
            console.log(obj.id);
            //如果在此设return返回值，那么只有在Tony的分支函数返回结束了。而其他的函数还在继续
            //递归是多个函数的嵌套执行，一个函数的return不会让整体结束
        }
        else{
        	if(obj.left){
        		find(obj.left);
        	}
        	if(obj.right){
        		find(obj.right);
        	}
            
        }
            
        
    }
    find(tree);
}
findIdByName("Tony");
// 假设id和name均不会重复，根据输入id找到对应的name
function findNameById(myId) {
    function find(obj){
    	if(obj.id==myId){
    		console.log(obj.id);
    	}
    	else{
    		if(obj.left){
    			find(obj.left);
    		}
    		if(obj.right){
    			find(obj.right);
    		}
    	}
    }
    find(tree);
}
findNameById("8");
// 把这个对象中所有的名字以“前序遍历”的方式全部输出到console中
function getListWithDLR(obj) {
    console.log(obj.name);
    if(obj.left){
    	getListWithDLR(obj.left);
    }
    if(obj.right){
    	getListWithDLR(obj.right);
    }
}

// 把这个对象中所有的名字以“中序遍历”的方式全部输出到console中
function getListWithLDR(obj) {
    if(obj.left){
    	getListWithLDR(obj.left);
    }
    console.log(obj.name);
    if(obj.right){
    	getListWithLDR(obj.right);
    }
}

// 把这个对象中所有的名字以“后序遍历”的方式全部输出到console中
function getListWithLRD(obj) {
    if(obj.left){
    	getListWithLRD(obj.left);
    }
    if(obj.right){
    	getListWithLRD(obj.right);
    }
    console.log(obj.name);
}

let rqueue = ["apple", "pear"];
let lqueue = ["apple", "pear"];
let quInput=document.getElementById("queue-input");
let rShow=document.getElementById("queue-ricont");
let lShow=document.getElementById("queue-lecont");
function leUnShift(){
	let myIn=quInput.value;
	rqueue.unshift(myIn);
	rShow.innerHTML=rqueue.join("-&gt");
}
function riPop(){
	rqueue.pop();
	rShow.innerHTML=rqueue.join("-&gt");
}
function printRTop(){
	rShow.innerHTML=rqueue[rqueue.length-1];
}
function isrNull(){
	if(rqueue.length!=0){
		rShow.innerHTML="队列不为空！";
	}
	else{
		rShow.innerHTML="队列为空！";
	}
}
function riPush(){
	lqueue.push(quInput.value);
	lShow.innerHTML=lqueue.join("&lt-");
}
function leShift()
{
	lqueue.shift();
	lShow.innerHTML=lqueue.join("&lt-");
}
function printLTop(){
	lShow.innerHTML=lqueue[0];
}
function islNull(){
	if(lqueue.length!=0){
		lShow.innerHTML="队列不为空！";
	}
	else{
		lShow.innerHTML="队列为空！";
	}
}
let rStack = ["apple", "pear"];
let lStack = ["apple", "pear"];
let stInput=document.getElementById("stack-input");
let srShow=document.getElementById("stack-rcont");
let slShow=document.getElementById("stack-lcont");
function pushRight(){
	let myInput=stInput.value;
	rStack.push(myInput);
	srShow.innerHTML=rStack.join("-&gt");
}
function popRight(){
	rStack.pop();
	srShow.innerHTML=rStack.join("-&gt");
}
function printRStackTop(){
	srShow.innerHTML=rStack[rStack.length-1];
}
function isRStackNull(){
	if(rStack.length!=0){
		srShow.innerHTML="队列不为空！";
	}
	else{
		srShow.innerHTML="队列为空！";
	}
}
function pushLeft(){
	let myInput=stInput.value;
	lStack.unshift(myInput);
	slShow.innerHTML=lStack.join("&lt-");
}
function popLeft(){
	lStack.shift();
	slShow.innerHTML=lStack.join("&lt-");
}
function printLStackTop(){
	slShow.innerHTML=lStack[0];
}
function isLStackNull(){
	if(lStack.length!=0){
		slShow.innerHTML="队列不为空！";
	}
	else{
		slShow.innerHTML="队列为空！";
	}
}
let arr1 = [43, 54, 4, -4, 84, 100, 58, 27, 140];
let result1=document.getElementById("rank-1-result");
function sortStoB(){
	result1.innerHTML= arr1.sort(function(a,b){
		return a-b;
	})
	
}
function sortBtoS(){
	result1.innerHTML= arr1.sort(function(a,b){
		return b-a;
	})
}
let arr2 = ['apple', 'dog', 'cat', 'car', 'zoo', 'orange', 'airplane'];
let result2=document.getElementById("rank-2-result");
function sortatoZ(arr){
	result2.innerHTML=arr.sort();
}
function sortZtoa(arr){
	result2.innerHTML=arr.sort(function(a,b){
		return b.localeCompare(a);
	})
}
let arr3 = [[10, 14], [16, 60], [7, 44], [26, 35], [22, 63]];
let result3=document.getElementById("rank-3-result");
function sortBy2nd(){
	arr3=arr3.sort(function(a,b){
		return b[1]-a[1];
	})
	result3.innerHTML="[["+arr3.join("],[")+"]]";
}
let arr4 = [
    {
        id: 1,
        name: 'candy',
        value: 40
    }, {
        id: 2,
        name: 'Simon',
        value: 50
    }, {
        id: 3,
        name: 'Tony',
        value: 45
    }, {
        id: 4,
        name: 'Annie',
        value: 60
    }
];
let result4=document.getElementById("rank-4-result");
function sortByValue(){
	arr4=arr4.sort(function(a,b){
		
		if (!isNaN(a.value)&&(!isNaN(b.value))){
			let numA=parseInt(a.value);
			let numB=parseInt(b.value);
			return numA-numB;
		}
	})
	//console.log(arr4);控制台可以输出对象，但无法直接显示在innerHTML中
	let strArr4=arr4.map(function (item,index,arr){
		return JSON.stringify(item);
	})
	result4.innerHTML=strArr4;
}
let scoreObject = {
    "Tony": {
        "Math": 95,
        "English": 79,
        "Music": 68
    }, 
    "Simon": {
        "Math": 100,
        "English": 95,
        "Music": 98
    }, 
    "Annie": {
        "Math": 54,
        "English": 65,
        "Music": 88
    }
}
let scoreArray=[];
for (let propName in scoreObject){
	let temp=[];
	let tempObj=scoreObject[propName];
	temp.push(propName);
	for(let pro in tempObj){
		temp.push(tempObj[pro]);
	}
	scoreArray.push(temp);
}
console.log(scoreArray);
let menuArr = [
    [1, "Area1", -1],
    [2, "Area2", -1],
    [3, "Area1-1", 1],
    [4, "Area1-2", 1],
    [5, "Area2-1", 2],
    [6, "Area2-2", 2],
    [7, "Area1-2-3", 4],
    [8, "Area2-2-1", 6],
];
let menuObject=new Object();
let root={};
//定义一个对象，用来表示节点之间的关系
menuArr.forEach(function(arr){
	//先找第一层，arr[2]=-1，
	if(arr[2]==-1){
		let myKey=arr[0];
		menuObject[myKey]={};
		menuObject[myKey].name=arr[1];
		menuObject[myKey].subMenu={};
		root[arr[0]]={};
	}
	//如果不在第一层，看一下是否在第二层，不过前提是第一层的节点已经找到了，所以这个算法对数组顺序有要求
	//给定数组基本是按照层数来的，所以该算法不会出问题，但如果打乱顺序，会出现前面节点没找到后面节点都无法找到位置的情况
	if(root!=null){
		for(var prop in root){
			if(arr[2]==prop){
				let tempObj=menuObject[prop].subMenu;
				let tempName=arr[0];
				tempObj[tempName]={};
				tempObj[tempName].name=arr[1];
				tempObj[tempName].subMenu={};
				root[prop][arr[0]]={};
			}
			//如果也不在第二层，就找第三层
			if(root[prop]!=null){
				for(var subPro in root[prop]){
					if(arr[2]==subPro){
						let tempObj=menuObject[prop].subMenu;
						tempObj=tempObj[subPro].subMenu;
						tempName=arr[0];
						tempObj[tempName]={};
						tempObj[tempName].name=arr[1];
						root[prop][subPro][arr[0]]={};
					}
				}
			}
		}
		
		
	}
	
	
})
console.log(menuObject);
function showTree(){
	document.getElementById("result-7").innerHTML=JSON.stringify(root);
}

//for ...in
//arr.forEach()
