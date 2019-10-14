function dataStorage(){
	let trList=dataTable.childNodes;
	let reg,pro;
	for(let i=1;i<trList.length;i++){
		let tempSale=[];
		let tempId=trList[i].id.split("-");
		if(regData.some(function(item){
			if(item==tempId[0]){
				return true;
			}
		})){
			reg=tempId[0];
			pro=tempId[1];
		}
		else{
			reg=tempId[1];
			pro=tempId[0];
		}
		let tdList=trList[i].querySelectorAll(".sale");
		for(let j=0;j<tdList.length;j++){
			tempSale.push(parseFloat(tdList[j].innerText));
		}
		updateSale(reg,pro,tempSale);
	}
	localStorage.setItem("data",JSON.stringify(sourceData));
	//sourceData=JSON.parse(localStorage.getItem("data")); 
	drawLine();
	drawBar();
}
function updateSale(reg,pro,tempSale){
	for(let i=0;i<sourceData.length;i++){
		if((sourceData[i].region==reg)&&(sourceData[i].product==pro)){
			sourceData[i].sale=tempSale;
		}
	}
}
