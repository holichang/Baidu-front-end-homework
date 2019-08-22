window.onload=function(){
	pageClick();
	naviClick();
}
function pageClick(){
	var page=document.getElementsByClassName("page-nav")[0];
	var pageList=page.childNodes;
	for(var i=0;i<pageList.length;i++){
		pageList[i].addEventListener("click",function(){
			for (var j=0;j<pageList.length;j++){
				pageList[j].classList=null;
			}
			var myEv = window.event||ev;
			var onPage = myEv.target;
			onPage.classList.add("page-active");
		})
	}
}
function naviClick(){
	var navi=document.getElementById("navigator");
	var naviLi = navi.childNodes;
	for(var i=0;i<naviLi.length;i++){
		naviLi[i].addEventListener("click",function(){
			for (var j=0;j<naviLi.length;j++){
				naviLi[j].classList=null;
			}
			var myEv = window.event||ev;
			var onNavi = myEv.target;
			onNavi.classList.add("navi-active");
		})
	}
}
