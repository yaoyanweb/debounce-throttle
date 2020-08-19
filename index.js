/*
 * @Author: your name
 * @Date: 2020-08-14 08:06:15
 * @LastEditTime: 2020-08-19 08:13:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /debounce-throttle/index.js
 */
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
 * debounce: 实现函数的防抖（目的是频繁触发中只执行一次）
 * 
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



/**
 * 
 * throttle: 实现函数节流（目的是为了频繁触发中缩减频率）
 *  
 * @param {type} func 需要执行的函数
 * @param {type} wait  自己设定的间隔时间（频率） 
 * return 放回一个可以调用的执行函数
 */
function throttle(func,wait = 500){
    let time = null,
        previous = 0; //记录上一次执行时间点
    return function anonymous(...params){
        // 记录当前执行时间
        let now = new Date(), //当前操作时间
            remaining = wait - (now - previous); // 当前时间 减去上一次记录时间

            if(remaining <= 0){
                // 如果两次间隔时间超过频率，就直接把方法执行
                previous = now;
                func.call(this,...params);
            }else if(!time){
                // 如果两次间隔时间没有超过频率，说明还没有达到触发标准。就设置定时器等待即可
                time = setTimeout(()=>{
                    clearTimeout(time);
                    previous = now;
                    func.call(this,...params);
                },remaining)
            }
    }
}

 dom.onclick = throttle(func);

// dom.onclick = func;


