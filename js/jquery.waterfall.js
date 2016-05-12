$(window).on('load', waterfall());
$(window).on('scroll', function(){
	scrollLoading();
});

function scrollLoading(){
	var beginTime = new Date().getTime();
	var result = {"data":[{"src":"images/0.jpg"},{"src":"images/1.jpg"}, {"src":"images/2.jpg"}, {"src":"images/3.jpg"}, {"src":"images/4.jpg"}, {"src":"images/5.jpg"}]};

	if(scollLoadedImages()){
		var target = $("#waterfall");
		$.each(result.data, function(key, value){
			var boxHtml = '<div class="box"><div class="pic"><img src="'+value.src+'" /></div></div>';
			target.append(boxHtml);				
		});
		waterfall();
	}
	console.log('scroll load time: ' + (new Date().getTime() - beginTime) + 'ms.');
}

function waterfall(){
	var boxes = $("#waterfall>.box");
	var boxW = boxes.eq(0).outerWidth();
	var cols = Math.floor($("#waterfall").width()/boxW);
	$("#waterfall").css({
		"width" : boxW*cols,
		"margin" : "0px auto"
	});

	var hArr = [];
	boxes.each(function(i, item){
		var boxH = $(item).outerHeight();
		if(i<cols){			
			hArr.push(boxH);
		}else{
			var min = Math.min.apply(null, hArr);	
			var minIndex = $.inArray(min, hArr);

			$(item).css({
				position : 'absolute',
				top : min+'px',
				left : boxW * minIndex + 'px'
			});
			hArr[minIndex] += boxH;
		}
	});
}

function scollLoadedImages(){
	var lastBox = $("#waterfall>.box").last();
	var boxH = lastBox.offset().top - lastBox.outerHeight();
	var offsetTop = $(window).scrollTop();
	var height = $(window).height();
	return boxH < offsetTop + height;
}