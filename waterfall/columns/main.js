
// hack
var $ = function() {
	return document.querySelectorAll.apply(document, arguments);
};

var path = 'static/';
var imgArr = [{
	src: '1.jpg'
},{
	src: '2.jpg'
},{
	src: '3.jpg'
},{
	src: '4.jpg'
},{
	src: '5.jpg'
},{
	src: '6.jpg'
},{
	src: '2.jpg'
},{
	src: '1.jpg'
},{
	src: '3.jpg'
},{
	src: '4.jpg'
},{
	src: '6.jpg'
},{
	src: '4.jpg'
},{
	src: '5.jpg'
},{
	src: '6.jpg'
},{
	src: '2.jpg'
},{
	src: '3.jpg'
},{
	src: '4.jpg'
},{
	src: '5.jpg'
}];

var waterFall = (function() {
	var $wrap = $('#container')[0];
	var colW = 200;
	// var panelName = 'panel';
	// var columnName = 'column';

	// 列的高度
	var arrHeight = [];

	// 计算页面可以放多少列
	var columns = function() {
		var conW = $wrap.clientWidth;
		return Math.floor(conW / colW);
	};

	// 获得最小高度的列
	var getMinIndex = function() {
		var minHeight = Math.min.apply(null, arrHeight);
		for (var i in arrHeight) {
			if(arrHeight[i] === minHeight) {
				return i;
			}
		}
	};
	// 获得最大高度的列
	var getMaxIndex = function() {
		var minHeight = Math.max.apply(null, arrHeight);
		for (var i in arrHeight) {
			if(arrHeight[i] === minHeight) {
				return i;
			}
		}
	};

	// 图片预加载
	function preloadImg(arr) {
		var imgWrap = [];
		for(var i=0; i<arr.length; i++){
			imgWrap[i] = new Image();
			imgWrap[i].src = path + arr[i].src;
 		}
	}

	// 初始化列 & 列高
	var initCol = function() {
		var cols = columns();
		for (var i = 0; i < cols; i++) {
			var span = document.createElement('div');
			span.className = 'column';
			$wrap.appendChild(span);
			arrHeight.push(0);
		}
	};

	// 初始化图片单位panel
	var initImage = function(arr) {
		for (var i = arr.length - 1; i >= 0; i--) {
			var img = document.createElement('img'),
    	panel = document.createElement('div');
			img.src = path + arr[i].src;
   		panel.className = 'panel';
    	panel.appendChild(img);
   		$wrap.appendChild(panel);
		}
	};

	// 排列panel
	var arrangePanel = function() {
		$wrap.style.width = colW*columns() + 'px';
		var cols = $('.column'),
				panel = $('.panel');
		for (var i = panel.length - 1; i >= 0; i--) {
		    var index = getMinIndex();
		    cols[index].appendChild(panel[i]);
    		arrHeight[index] += panel[i].clientHeight;
		}
	};


	function checkscrollside(){
    var index = getMaxIndex();
    var panel = $('.column')[index].getElementsByTagName('div');
    var lastPinH = panel[panel.length-1].offsetTop + Math.floor(panel[panel.length-1].offsetHeight/2);

    // 注意解决兼容性
    var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
    // 页面高度
    var documentH = document.documentElement.clientHeight;
    //到达指定高度后，返回true，触发加载
    return (lastPinH<scrollTop+documentH)?true:false;
	}

	var onload = function() {
		// 图片预加载
		preloadImg(imgArr);

		// 初始化元素
		initCol();
		initImage(imgArr);


	};

	onload();

	// 特定事件下排列组合
	window.onload = function() {
		arrangePanel();
	}

	window.onscroll = function() {
		if(checkscrollside()){
			initImage(imgArr);
			arrangePanel();
		}
	}
	window.onresize = function() {
		var done  = true;
		if(done){
			done = false;
			// 清空高度
			arrHeight = [];
			var panel = $('.panel');
			$wrap.innerHTML = '';
			$wrap.style.width = 'auto';
			initCol();
			for (var i = panel.length - 1; i >= 0; i--) {
				$wrap.appendChild(panel[i]);
			}
			arrangePanel();


			setTimeout(function(){
				done = true;
			}, 1000);

		}

	}
})();

