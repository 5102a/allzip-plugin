[![GitHub stars](https://img.shields.io/github/stars/1015355299/allzip-plugin)](https://github.com/1015355299/allzip-plugin/stargazers) [![GitHub issues](https://img.shields.io/github/issues/1015355299/allzip-plugin)](https://github.com/1015355299/allzip-plugin/issues) [![GitHub license](https://img.shields.io/github/license/1015355299/allzip-plugin)](https://github.com/1015355299/allzip-plugin/blob/main/LICENSE)

# allzip-plugin

打包所有文件并生成zip包

基于 [jszip](https://www.npmjs.com/package/jszip) 库进行文件压缩

## 安装

```js
npm i allzip-plugin --save-dev
```

## 使用

在webpack中使用

webpack.config.js

```js
const AllZipPlugin = require('allzip-plugin')

module.exports = {
  // 省略其他配置。。。
  plugins: [new AllZipPlugin({
    filename:'output',  // 输出文件名 output.zip
    fileOptions: {...}, // 压缩文件设置
    generateOptions: {...}, // 生成文件设置
  })],
}
```

## 配置

### filename

设置输出文件名，自动以.zip为后缀

```js
module.exports = {
  // 省略其他配置。。。
  plugins: [new AllZipPlugin({
    filename:'output'  // 输出文件名 output.zip
  })],
}
```

### fileOptions

zip压缩配置

```js
module.exports = {
  // 省略其他配置。。。
  plugins: [new AllZipPlugin({
    fileOptions: {
      base64:true
    }
  })],
}
```

```js
/** Set to `true` if the data is `base64` encoded. For example image data from a `<canvas>` element. Plain text and HTML do not need this option. */
base64?: boolean;
/**
 * Set to `true` if the data should be treated as raw content, `false` if this is a text. If `base64` is used,
 * this defaults to `true`, if the data is not a `string`, this will be set to `true`.
 */
binary?: boolean;
/**
 * The last modification date, defaults to the current date.
 */
date?: Date;
compression?: string;
comment?: string;
/** Set to `true` if (and only if) the input is a "binary string" and has already been prepared with a `0xFF` mask. */
optimizedBinaryString?: boolean;
/** Set to `true` if folders in the file path should be automatically created, otherwise there will only be virtual folders that represent the path to the file. */
createFolders?: boolean;
/** Set to `true` if this is a directory and content should be ignored. */
dir?: boolean;

/** 6 bits number. The DOS permissions of the file, if any. */
dosPermissions?: number | null;
/**
 * 16 bits number. The UNIX permissions of the file, if any.
 * Also accepts a `string` representing the octal value: `"644"`, `"755"`, etc.
 */
unixPermissions?: number | string | null;
```

### generateOptions

zip输出文件配置

```js
module.exports = {
  // 省略其他配置。。。
  plugins: [new AllZipPlugin({
    generateOptions: {
      type: 'nodeBuffer'
    }
  })],
}
```

```js
compression?: Compression;
compressionOptions?: null | {
    level: number;
};
type?: T;
comment?: string;
/**
 * mime-type for the generated file.
 * Useful when you need to generate a file with a different extension, ie: “.ods”.
 * @default 'application/zip'
 */
mimeType?: string;
encodeFileName?(filename: string): string;
/** Stream the files and create file descriptors */
streamFiles?: boolean;
/** DOS (default) or UNIX */
platform?: 'DOS' | 'UNIX';
```