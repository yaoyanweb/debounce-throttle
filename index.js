/* 
    函数的防抖和 节流
    防抖：在用户频繁触发的时候，我们只识别一次（识别第一次或者识别最后一次）【我们可以设置频繁的间隔时间】
    节流：


*/


let dom = document.querySelector('button');


/* 
    防止频繁点击触发，设置标识进行判断
    这是最初级的防抖
*/
/* let isClick = false;
dom.onclick = function(){
    if(isClick) return;
    setTimeout(()=>{
        isClick = true;
        console.log('ok');

    },1000)
} */


/* 
    第一次点击 没有立即执行 需要等待间隔时间 看看这个间隔时间内 有没有触发第二次，
    如果有第二次，说明是频繁触发，就不去执行我们的事件（然后就去观察第三次和 第四次 依此循环）。如果没有触发第二次，就说明不是
    频繁触发，就去执行我们的事件。
*/
function func(e){
    console.log(e);
}

/* 
    简易实现方式
*/
/* let timer = null,
    wait = 1000;
dom.onclick = function(){
    clearTimeout(timer);
    timer = setTimeout(()=>{
        func();
    },wait)
}    */


/**
 * @param {type} func 需要执行的函数
 * @param {type} wait  检测防抖的间隔频率 
 * @param {type} immediate 是否立即执行，（如果为true是控制第一次触发的时候执行，
 * 默认为false是以第一次执行 ）
 * return 放回一个可以调用的执行函数
 */
function debounce(func,wait = 500,immediate = false){
    let timer = null;
    return function anonymous(...params){
        // 判断第一次执行 还是 最后一次执行
        let now = immediate && !timer;
        clearTimeout(timer);
        timer = setTimeout(()=>{
            timer = null;
            // 执行函数：注意保持this和参数的完整
            !now&&func.call(this,...params);
        },wait);

        now?func.call(this,...params):null;
    }
}
dom.onclick = debounce(func)