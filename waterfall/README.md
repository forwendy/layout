# 瀑布流布局 - Waterfall

## 参考资料

[瀑布流之实例进阶 - villainhr - segmentfault](https://segmentfault.com/a/1190000004385117#articleHeader0)

[瀑布流布局 - Amy - imooc](https://www.imooc.com/learn/101)

感谢以上大大的经验分享~ ^_^

## 实现原理

### 元素排列 
- 元素宽度相同，高度不同
- 第二排开始，从最短一列开始排元素

### 元素加载
- 初始化加载
- 当滚动到最长一列的最后一个元素显示一半的位置时，继续加载一次元素

### 响应式 - 响应浏览器的宽度
- 存储已加载元素
- 绑定浏览器缩放事件进行元素重排

### colums版
- 根据浏览器宽度计算并初始化列数
- 加载元素
- 排列元素（存储每一列的高度，将元素放置在最短高度的列元素的最后）

## 总结问题

### 浏览器 hack 
[BROWSERHACKS](http://browserhacks.com/)

    var $ = function() {
    	return document.querySelectorAll.apply(document, arguments);
    };

###浏览器兼容性
    document.documentElement.scrollTop||document.body.scrollTop

### querySelectorAll 与 getElementBy* 

### clientWidth 与 offsetWidth

