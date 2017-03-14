# Box 箱模型

箱模型是整个项目中最基础的组件，之后的组件或多或少将继承或部分继承它的功能和API（props）。

## 何时使用

箱模型一般不直接使用，只有当你需要基于它进行二次开发的时候才用，你可以通过查阅本项目中其他的组件源码来得知它的使用。

## Box Wrapper

正常情况下，你需要去查看Box组件的源码来了解本项目箱模型的一些代码原理，为了更好的抽象出一些东西，我在这里增加了BoxWrapper，这是一个Box组件的高阶组件，他将包装一个逻辑上的箱模型，并将一些特定属性传入他的子组件中。

这种改造使得原本的Box组件也成为一个单独的子组件，并更好的将属性控制权解耦，使得箱模型变成逻辑上的一个概念，他只包含数据，至于样式和功能，需要子组件自己决定。

### 使用BoxWrapper

使用如下代码来引用`BoxWrapper`,
```javascript
import BoxWrapper from 'react-3d-form/lib/utils/boxWrapper'
```

使用ES6语法来构造Box：
```javascript
// es6 syntax
class ComposedComponent extends React.Component {
  // ... code of ComposedComponent
}

export default BoxWrapper(ComposedComponent);
```

使用ES7修饰符来构造Box：
```javascript
// es7 syntax
@BoxWrapper
export default class ComposedComponent extends React.Component {
  // ... code of ComposedComponent
}
```

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