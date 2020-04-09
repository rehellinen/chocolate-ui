chocolate-ui
=================
### 封面选择组件  
可通过点击左右箭头或者拖拽选择框来选择需要的封面。

props：
1. images(Array:[]) - 每一项为图片的url
2. defaultActiveIndex(Number:0) - 默认选中的图片index
3. isCircular(Boolean:true) - 为true时，达到最后一张时点击右箭头会回到第一张

event：
1. confirm(data)：data格式为`{ url: 'demo_url' }`


### 无限加载组件
待开发


### Dialog组件  
打开一个对话框。分为三部分：header、body、footer。
1. header为标题
2. body默认为传入的content蚊子，也可通过slot定制
3. footer为确认、取消按钮

props：
1. visible(Boolean:false) - 为true时显示
2. showFooter(Boolean:true) - 是否展示footer
3. width(String:50%) - dialog展示时的宽度
4. title(String:提示) - 标题
5. content(String:提示) - body显示的内容

event：
1. confirm()：用户点击确定按钮时触发
2. cancel()：用户点击取消按钮时触发


