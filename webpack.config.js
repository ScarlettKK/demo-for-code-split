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
    // 代码压缩、优化功能在optimization做
    /**
     * 下面功能：提取重复代码
     * 如果多入口文件中都引用了同一份代码，我们不希望这份代码被打包到两个文件中，导致代码重复，体积更大。
     * 我们需要提取多入口的重复代码，只打包生成一个 js 文件，其他文件引用它就好
     */
    /**
     * 名词解析：Chunks 打包进来的资源，一个文件一个Chunk
     *         bundle 打包后输出的资源
     */
    optimization: {
        // 代码分割配置
        splitChunks: {
            chunks: "all", // 对所有模块都进行分割
            // 下面的默认值一般不需要配置，写一个chunks: "all"激活即可
            // 以下是默认值
            // minSize: 20000, // 分割代码最小的大小 20kb
            // minRemainingSize: 0, // 类似于minSize，最后确保提取的文件大小不能为0
            // minChunks: 1, // 至少被引用的次数，满足条件才会代码分割
            // maxAsyncRequests: 30, // 按需加载时并行加载的文件的最大数量，超过会合并文件
            // 请求数量过多，服务器压力大
            // maxInitialRequests: 30, // 入口js文件最大并行请求数量
            // enforceSizeThreshold: 50000, // 超过50kb一定会单独打包（此时会忽略minRemainingSize、maxAsyncRequests、maxInitialRequests）
            // cacheGroups: { // 组，哪些模块要打包到一个组，默认有两个组
            //   defaultVendors: { // 组名
            //     test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
            //     priority: -10, // 权重（越大越高）
            //     reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
            //   },
            //   default: { // 其他没有写的配置会使用上面的默认值
            //     minChunks: 2, // 这里的minChunks更大，至少用两次才会被打包到default中，覆盖掉上面的minChunks配置，只对当前组生效
            //     priority: -20, // 优先级没有上面高
            //     reuseExistingChunk: true,
            //   },
            // },
            // 修改配置
            cacheGroups: {
                // 组，哪些模块要打包到一个组
                // defaultVendors: { // 组名
                //   test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
                //   priority: -10, // 权重（越大越高）
                //   reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
                // },
                default: {
                    // 其他没有写的配置会使用上面的默认值
                    minSize: 0, // 我们定义的文件体积太小了，所以要改打包的最小文件体积
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    }
}
