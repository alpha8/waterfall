window.onload = function(){
	var beginTime = new Date().getTime();
	waterfall('waterfall', 'box');
	console.log('first load time: ' + (new Date().getTime() - beginTime) + 'ms.');

	window.onscroll = function(){
		var beginTime = new Date().getTime();
		var result = {"data":[{"src":"images/0.jpg"},{"src":"images/1.jpg"}, {"src":"images/2.jpg"}, {"src":"images/3.jpg"}, {"src":"images/4.jpg"}, {"src":"images/5.jpg"}]};

		if(scollLoadedImages()){
			var oParent = document.getElementById("waterfall");
			for(var i=0; i<result.data.length; i++){
				var box = document.createElement("div");
				box.className = "box";
				oParent.appendChild(box);
				var pic = document.createElement("div");
				pic.className = "pic";
				box.appendChild(pic);
				var img = document.createElement("img");
				img.src = result.data[i].src;
				pic.appendChild(img);
			}
			waterfall('waterfall', 'box');
		}
		console.log('scroll load time: ' + (new Date().getTime() - beginTime) + 'ms.');
	}
}

function waterfall(parent, box){
	var oParent = document.getElementById(parent);
	var oBox = getByClass(box, oParent);
	var boxW = oBox[0].offsetWidth;
	var cols = Math.floor(oParent.offsetWidth/boxW);
	//oParent.style.cssText = 'width:100%;margin:0 auto;';

	var hArr = [];
	for(var i=0; i<oBox.length; i++){
		if(i<cols){			
			hArr.push(oBox[i].offsetHeight);
		}else{
			var min = Math.min.apply(null, hArr);			
			var index = getMinIndex(hArr, min);

			oBox[i].style.position = 'absolute';
			oBox[i].style.top = min + 'px';
			//oBox[i].style.left = boxW * index + 'px';
			oBox[i].style.left = oBox[index].offsetLeft + 'px';
			hArr[index] += oBox[i].offsetHeight;
		}
	}
}

function getByClass(clsName, parent){
    var arr = [];
    var parent = parent || document;
    var children = parent.getElementsByTagName('*');
    for(var i=0; i<children.length; i++){
        var item = children[i];
        if(item.className == clsName){
            arr.push(item);
        }
    }
    return arr;
}

function getMinIndex(arr, min){
	for(var i=0; i<arr.length; i++){
		if(arr[i]==min){
			return i;
		}
	}
}

function scollLoadedImages(){
	var oParent = document.getElementById("waterfall");
	var oBox = getByClass('box', oParent);
	var boxH = oBox[oBox.length-1].offsetTop - oBox[oBox.length-1].offsetHeight;

	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	var screenHeight = document.body.clientHeight || document.documentElement.clientHeight;
	//console.log((boxH < scrollTop + screenHeight) + ' h:' + boxH + ', top:' + scrollTop + ', height: ' + screenHeight);
	return boxH < scrollTop + screenHeight;
}