# Box 箱模型

箱模型是整个项目中最基础的组件，之后的组件或多或少将继承或部分继承它的功能和API（props）。

## 何时使用

箱模型一般不直接使用，只有当你需要基于它进行二次开发的时候才用，你可以通过查阅本项目中其他的组件源码来得知它的使用。

## 引用

```javascript
import Box, { defaultProps } from 'react-3d-form/lib/utils/box'
```

## API (props)

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| width | 箱模型的宽度 | number or css string | '1em' |
| height | 箱模型的高度 | number or css string | '1em' |
| thickness | 箱模型的厚度 | number or css string | '1em' |
| rotate | 箱模型的旋转 | object | { x: 60, y: 0, z: 0 } |

## 备注

* 箱模型的`width`、`height`、`thickness`可以为数字或css字符串，数字将转化为`px`单位，css字符串则直接使用，例如`1em`、`10px`等。

* 箱模型的`rotate`属性是一个`object`值，它有`x`、`y`、`z`三个属性，这些属性可以使用数字或者css字符串，数字将转化为`deg`单位。