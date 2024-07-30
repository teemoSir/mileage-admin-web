# Ellipsis 文本自动省略号

文本过长自动处理省略号，支持按照文本长度和最大行数两种方式截取。



引用方式：

```javascript
import Ellipsis from '@/components/Ellipsis'

export default {
    components: {
        Ellipsis
    }
}
```

## API


参数 | 说明 | 类型 | 默认值
----|------|-----|------
tooltip | 移动到文本展示完整内容的提示 | boolean | -
length | 在按照长度截取下的文本最大字符数，超过则截取省略 | number | -
