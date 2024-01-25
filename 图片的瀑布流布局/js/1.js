var div = document.querySelector("#container") //获取dom元素
var imgWidth = 220

function creatImg() {
    //创建img元素
    for (var i = 1; i <= 66; i++) {
        var src = `../img/${i}.jpg`//循环拿到照片
        var img = document.createElement('img')//创建img元素
        img.src = src;//设置图片的src地址
        img.style.width = imgWidth; //设置图宽度
        //在div里面添加图片
        div.appendChild(img)
        //排列每一张图片
        img.onload = setPositions; //排列
    }
}
    //获取最大最小值
function getMin(arr) {
    var min = Math.min(...arr)
    return min
}
function getMax(arr) {
    var max = Math.max(...arr)
    return max
}
//排列！！！重点在这
function setPositions() {
    var containerWidth = div.clientWidth; //获取容器宽度
    var columns = Math.floor(containerWidth / imgWidth) //列数 容器宽度除照片的宽度，然后向下取整，得到最多装下多少列图片，剩下的部分作为间隙宽度
    var spaceNumber = columns + 1 //间隙数量=列数+1
    var leftSpac = containerWidth - columns * imgWidth //间隙总宽度等于容器宽度-（列数*照片宽度）
    var space = leftSpac / spaceNumber //每个间隙的空间=总宽度/间隙数
    //创建数组保留每一列的高度
    var arr = new Array(columns)
    arr.fill(0)//给数组填充0

    for (var i = 0; i < div.children.length; i++) {
        var img = div.children[i];  
        var min = getMin(arr)  //获取最小的那个一个
        img.style.top = min + "px";  //开始排列，每张图片都排列到高度最小的那个一列，就是要改变当前列的高度
        var index = arr.indexOf(min)           // 首先找到这个最小数对应的列数
        //新高度   新的高度 = 图片的高度 + 间隙的高度
        arr[index] += img.height + space;
        //整个top完成，还需要确定间隙的值
        //间隙值和列数有关，index+1保证设置的是距离左边的值以index为0解释
        //第一列*平均间隙宽度+0（第一列在数组种为0）*照片宽度
        //以第二列为例 2*平均宽度+1*照片宽度 第二列的位置在第一列距离左边的间隙+照片长度+第二列距离第一列的间隙
        var left = (index + 1) * space + index * imgWidth;
        img.style.left = left + "px";
    }
// 因为图片是绝对定位，脱离了标准流，所以无法撑开盒子的高度，所以利用最高的一列撑开盒子
    var max=getMax(arr)
    div.style.height=max+"px";
}
//函数防抖
var timeId=null;//计时器id
function change(){
    window.onresize=function(){
        //该函数会在窗口大小改变时重新对图片进行排列
    //至此简单的瀑布流已经完成接下来进行防抖
        if(timeId){//如果计时器存在则清除掉重新记录新的
            clearTimeout(timeId)
        }
        timeId=setTimeout(setPositions,50)
    }
}
function main() {
    //加入图片初始化操作
    creatImg()
    //绑定事件
    change()
}
main();