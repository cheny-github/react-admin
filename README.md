# TOP组件编写

---

###### 退出

引入Modal中的confirm

```js
import { Modal} from 'antd';
const {confirm} =Modal
```













## 出现的bug以及解决。

![1567763373750](assets/1567763373750.png)

经验：要在render中渲染的数据最好都从对象中解构出来使用，而不是通过对象的引用去获取数据。





使用axios上传FormData的时候直接传FormData对象就行了，不要再包一层对象。

![1567770694278](assets/1567770694278.png)




