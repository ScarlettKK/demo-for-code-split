// 注意要在下面动态导入的话，这里不能重复导入，否则打包效果与动态导入效果会失效
// import { sum } from "./sum";


// console.log(sum(1, 2, 3, 4));
console.log("hello app");


// 动态导入：比如给btn绑定事件，用户真正点击的时候才加载对应的函数，没点击不加载
document.getElementById("btn").onclick = function () {
    // import 动态导入 --> 实现按需加载
    // 将动态导入的文件拆分成单独模块（单独分割），在需要的时候再单独加载
    // 即使只被引用了一次，也会代码分割
    import("./sum.js").then(({ sum }) => {
        alert(sum(1, 2, 3, 4, 5));
    });
};