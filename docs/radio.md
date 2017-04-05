# Radio Group 单选框

单选框组

## 何时使用

* 用于在多个备选项中选中单个状态。
* 和 Select 的区别是，Radio 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多。

## 引用

```javascript
import { RadioGroup } from 'react-3d-form'
const Radio = RadioGroup.Radio;
const RadioButton = RadioGroup.RadioButton;
```

## API (props)

RadioGroup组件继承箱模型所有API，并拥有额外的如下属性：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 单选框组的值 | string |  |
| defaultValue | 单选框组的默认值 | string |  |
| onChange | 当组件当前值变化时会触发onChange事件，入参为当前值 | function (value: number): void | NOOP |

Radio和RadioButton拥有如下属性：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 单选框的值 | string |  |

## 备注

* `RadioGroup`必须配合`Radio`或者`RadioButton`使用：
```javascript
{/* Radio */}
<RadioGroup defaultValue="beijing">
  <Radio value="hangzhou">Hangzhou</Radio>
  <Radio value="beijing">Beijing</Radio>
  <Radio value="shanghai">Shanghai</Radio>
</RadioGroup>
{/* RadioButton */}
<RadioGroup defaultValue="beijing">
  <RadioButton value="hangzhou">Hangzhou</RadioButton>
  <RadioButton value="beijing">Beijing</RadioButton>
  <RadioButton value="shanghai">Shanghai</RadioButton>
</RadioGroup>
```
* 对于`Radio`来说，`width`属性是指每个选项前方的box箱的宽度。
* 对于`RadioButton`来说，`width`属性是无效的。
