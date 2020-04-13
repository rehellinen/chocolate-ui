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
通过自定义指令`v-infinite-scroll="load"`使用

属性选项：
1. infinite-scroll-disabled(Boolean:false) - 是否禁用
2. infinite-scroll-delay(Number:200) - 时延，单位为ms
3. infinite-scroll-distance(Number:0) - 触发加载的距离，单位为px
4. infinite-scroll-immediate(Boolean:true) - 是否立即执行加载方法，以防初始状态下内容无法撑满容器。


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


