# Slider 滑动输入条

滑动型输入器，展示当前值和可选范围。

## 何时使用

当用户需要在数值区间/自定义区间内进行选择时，可为连续或离散值。

## 引用

```javascript
import { Slider } from 'react-3d-form'
```

## API (props)

Slider组件继承箱模型所有API，并拥有额外的如下属性：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| range | 双滑块模式 | boolean | false |
| min | 最小值 | number | 0 |
| max | 最大值 | number | 100 |
| step | 步长，取值必须大于0，且必须可被`max - min`整除 | number | 1 |
| marks | 刻度标记，key必须为number，每个刻度必须在区间`[min, max]`内，且`mark - min`必须为步长的倍数，每个刻度可以单独设置样式 | object: { number: string\|ReactNode } 或 object: { number: { style: object, label: string\|ReactNode } } | {} |
| dots | 是否只能拖拽到刻度上 | boolean | false |
| value | 设置当前值，当`range`为`false`时类型为`number`，否则为`[number, number]` | number or [number, number] | null |
| defaultValue | 设置初始值，当`range`为`false`时类型为`number`，否则为`[number, number]` | number or [number, number] | null |
| onChange | 当组件当前值变化时会触发onChange事件，入参为当前值 | function (value: number): void | NOOP |
| onAfterChange | 当`onmouseup`时触发，可以理解为一次数值操作的最终确定值 | function (value: number): void | NOOP |
| tipFormatter | 在Tooltip中显示内容的模板 | function(value: number): string\|ReactNode | value => \`${value}\` |

## 备注

* `max - min`必须能整除`step`，且`marks`中所有刻度均在这个区间内，且也为`step`的倍数。

* 若`dots`为`true`时，`defaultValue`或`value`不为`marks`中任何一个刻度，那么将自动将当前值转化为最接近的刻度值。

* 当`value`和`onChange`都设置的情况下，组件处于受控模式，即你需要在`onChange`中去修改`value`值才能使得组件的值状态发生变化。
