/**
 * 打包代码时会将所有 js 文件打包到一个文件中，体积太大了。
 * 我们如果只要渲染首页，就应该只加载首页的 js 文件，其他文件不应该加载。
 * 所以我们需要将打包生成的文件进行代码分割，生成多个 js 文件，渲染哪个页面就只加载某个 js 文件，这样加载的资源就少，速度就更快。
 * 
 * 代码分割（Code Split）主要做了两件事：
 * 分割文件：将打包生成的文件进行分割，生成多个 js 文件。
 * 按需加载：需要哪个文件就加载哪个文件。
 */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    // 单入口，只有一个入口文件
    // entry: './src/main.js',

    // 多入口：对象形式
    entry: {
        main: "./src/main.js",
        app: "./src/app.js",
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        // [name]是webpack命名规则，使用chunk的name作为输出的文件名，也就是以文件名命名
        // 什么是chunk？打包的资源就是chunk，输出出去叫bundle。
        // chunk的name是啥呢？ 比如： entry中xxx: "./src/xxx.js", name就是xxx。注意是前面的xxx，和文件名无关。
        // 为什么需要这样命名呢？如果还是之前写法main.js，那么打包生成两个js文件都会叫做main.js会发生覆盖。(实际上会直接报错的)
        filename: "[name].js",
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
        }),
    ],
    mode: "production",
};
