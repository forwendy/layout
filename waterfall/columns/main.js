
// hack
var $ = function() {
	return document.querySelectorAll.apply(document, arguments);
};

var path = '../static/';
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
	var colW = $('#container > .panel')[0].clientWidth;

	// todo
	// 1、.panel模板解析
	// 2、ajax获取图片数据
	//

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

	// 初始化元素 panel
	var addPanel = function(arr) {
		for (var i = arr.length - 1; i >= 0; i--) {
			var img = document.createElement('img'),
    	panel = document.createElement('div');
			img.src = path + arr[i].src;
   		panel.className = 'panel';
    	panel.appendChild(img);

    	// 新增元素直接放置在容器中
   		$wrap.appendChild(panel);
		}
	};

	// 排列元素panel
	var setPanel = function() {
		$wrap.style.width = colW*columns() + 'px';
		var cols = $('.column'),
				panel = $('#container > .panel');
		// 为容器中的元素分配column
		for (var i = panel.length - 1; i >= 0; i--) {
		    var index = getMinIndex();
		    cols[index].appendChild(panel[i]);
    		arrHeight[index] += panel[i].clientHeight;
		}
	};

	// 检查是否滚动到加载位置
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

	var init = function() {
		// 初始化
		arrHeight = [];
		$wrap.innerHTML = '';
		$wrap.style.width = 'auto';

		// 计算列数
		initCol();
	};

	var reload = function() {
	  // 储存元素
		var panel = $('.panel');
		init();
		for (var i = panel.length - 1; i >= 0; i--) {
			$wrap.appendChild(panel[i]);
		}
	};


/* 页面初始化 =================================== */

	init();
	addPanel(imgArr);

/* 事件绑定 =================================== */

	// dom加载完毕后进行元素排列
	window.onload = function() {
		setPanel();
	}

	// 滚动到特定位置加载元素
	window.onscroll = function() {
		if(checkscrollside()){
			addPanel(imgArr);
			setPanel();
		}
	}

	window.onresize = function() {
		reload();
		setPanel();
	}

})();

