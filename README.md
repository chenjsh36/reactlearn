##Reference
*  http://www.cocoachina.com/webapp/20150721/12692.html
*  阮一峰的react： http://www.ruanyifeng.com/blog/2015/03/react.html
*  实践： http://facebook.github.io/react/docs/tutorial.html

##React 介绍
---
###简单的UI开发逻辑
web开发中频繁或者复杂的dom操作是性能瓶颈产生的原因，react通过引进虚拟dom的机制，数据变化时候react会重新构建整个虚拟dom树， 并得到与之前dom的区别，然后去更新仅变化的dom数
由于虚拟DOM是内存数据，所以性能是及其高的，而且开发者将不再需要关注整个数据的变化如何更新到一个或多个具体的dom元素，而只需要关心在任意一个数据状态下，整个界面是如何render的

###组件化
react推荐一组件的方式去思考ui构成
而且react并不依赖于js库如jquery，而且对象必须为原生的对象，不过现在的queryselector已经可以方便的查询各种类，因此不依赖于jquery也是可以的！当然一些好的方法的封装也可以参考jquery

###安全的html标签
由于我们把html嵌入在js中，而js中的html实际上也不是真正的标签，而是要通过react去最终转化为真正的html标签，而转化的过程react已经考虑了安全的问题，因此在js中内嵌html标签是安全的，受保护的

###只是一个view层
react并不像express提供一个完整的web服务，它专注于如何高效地处理DOM（理念参考前三个观点），因此从mvc的角度来说它只是一个view层，但实际上react自己并不赞同web的MVC开发流程。

##函数的意义
---
* render: which returns a tree of React components that will eventually render to HTML.
* getInitialState()： executes exactly once during the lifecycle of the component and sets up the initial state of the component.
* componentDidMount ：is a method called automatically by React after a component is rendered for the first time. 

##语法的注意
---
* html元素以小写字符开头，而react的类以大写字母开头

* 数据的传递： Data passed in from a parent component is available as a 'property' on the child component. These 'properties' are accessed through this.props.
          意思是父元素可以向子元素标签添加属性名和值，而子元素就可以通过this.props.<属性明>去获取相应的值

* 使用mark来转化评论为html，但是由于react本身的`保护机制`，格式为html的文本依旧会以文本的形式输出，这个时候就需要走下后门
    
    ```
        rawMarkup: function() { var rawMarkup = marked(this.props.children.toString(), {sanitize: true}); return { __html: rawMarkup }; },
        dangerouslySetInnerHTML = {this.rawMarkup()}
    ```
* 关于组件间数据的交互，父组件通过`设置属性名`让子组件通过this.props来获取相对应的值，而且父组件也可以`将自己的函数`写入供子组件调用，通过这种方式实现组件间的交流
