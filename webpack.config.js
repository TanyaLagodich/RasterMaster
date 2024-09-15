import path from "path";
import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

function buildDevServer() {
    return {
        port: 4000,
        hot: true,
        historyApiFallback: true,
    };
}

function buildLoaders(isDev) {
    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff2|woff)$/i,
        loader: "file-loader",
        options: {
            name() {
                return isDev ? "[path][name].[ext]" : "[contenthash].[ext]";
            },
        },
    };

    const svgLoader = {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack"],
    };

    const cssLoader = {
        test: /\.s[a|c]ss$/,
        use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            {
                loader: "css-loader",
                options: {
                    modules: {
                        auto: /\.module.scss$/,
                        localIdentName: isDev
                            ? "[path][name]__[local]--[hash:base64:5]"
                            : "[hash:base64:8]",
                    },
                },
            },
            "sass-loader",
        ],
    };

    const typescriptLoader = {
        test: /\.tsx?$/,
        use: "ts-loader",
        include: [
            path.resolve(
                path.dirname(new URL(import.meta.url).pathname),
                "src"
            ),
        ],
        exclude: [/node_modules/],
    };

    return [fileLoader, svgLoader, cssLoader, typescriptLoader];
}

function buildPlugins({ isDev, paths }) {
    const plugins = [
        new HtmlWebpackPlugin({
            template: paths.html,
        }),
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:8].css",
            chunkFilename: "css/[name].[contenthash:8].css",
        }),
    ];

    if (isDev) {
        plugins.push(new ReactRefreshWebpackPlugin({ overlay: false }));
    }

    return plugins;
}

export default function (env) {
    const mode = env.mode || "development";
    const isDev = mode === "development";

    const paths = {
        entry: path.resolve(
            path.dirname(new URL(import.meta.url).pathname),
            "src",
            "index.tsx"
        ),
        src: path.resolve(
            path.dirname(new URL(import.meta.url).pathname),
            "src"
        ),
        dist: path.resolve(
            path.dirname(new URL(import.meta.url).pathname),
            "dist"
        ),
        html: path.resolve(
            path.dirname(new URL(import.meta.url).pathname),
            "public",
            "index.html"
        ),
    };

    return {
        mode,
        entry: paths.entry,
        devtool: isDev && "inline-source-map",
        devServer: isDev ? buildDevServer() : undefined,
        module: {
            rules: buildLoaders(isDev),
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js", ".svg"],
            modules: ["node_modules", paths.src],
            alias: {
                "@": paths.src,
            },
            mainFiles: ["index"],
        },
        output: {
            filename: "[name].[contenthash].js",
            path: paths.dist,
            clean: true,
        },
        optimization: {
            minimizer: [
                new TerserPlugin({
                    extractComments: false,
                }),
            ],
        },
        plugins: buildPlugins({ isDev, paths }),
    };
}
