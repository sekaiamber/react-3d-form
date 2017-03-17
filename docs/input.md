# Input 输入框

通过鼠标或键盘输入内容，是最基础的表单域的包装。

## 何时使用

* 需要用户输入表单域内容时。

## 引用

```javascript
import { Input } from 'react-3d-form'
```

## API (props)

Progress组件继承箱模型所有API，并拥有额外的如下属性：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 输入框内容| string |  |
| defaultValue | 输入框默认内容 | string |  |
| id | 输入框id | string |  |
| inputStyle | 输入框自定义样式 | css object | {} |
| addonBefore | 带标签的 input，设置前置标签 | string\|ReactNode |  |
| addonAfter | 带标签的 input，设置后置标签 | string\|ReactNode |  |
| prefix | 带有前缀的 input | string\|ReactNode |  |
| suffix | 带有后缀的 input | string\|ReactNode |  |

## 备注

* 对于`inputStyle`只建议设置`color`之类的无关痛痒的样式，并且还是建议通过css样式文件来设置。
* 标签和前后缀表现不同，可以同时使用。
