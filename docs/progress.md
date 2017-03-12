# Progress 进度条

展示操作的当前进度。

## 何时使用

* 当一个操作需要耗时十分久且需要打断程序逻辑或当前页面时，为用户展示操作的当前进度。

* 当需要展示一个操作或数据的完成度或占比时使用。

## 引用

```javascript
import { Progress } from 'react-3d-form'
```

## API (props)

Progress组件继承箱模型所有API，并拥有额外的如下属性：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前值 | number | 0 |
| min | 最小值 | number | 0 |
| max | 最大值 | number | 100 |
| format | 显示内容的模板 | function(value: number): string\|ReactNode | value => \`${value}%\`
