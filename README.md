##Reference
*  http://www.cocoachina.com/webapp/20150721/12692.html
*  阮一峰的react： http://www.ruanyifeng.com/blog/2015/03/react.html
*  一个react-server实例： https://github.com/petehunt/react-server-rendering-example
*  简单的实践： http://facebook.github.io/react/docs/tutorial.html
*  组件构建过程的思路：  http://facebook.github.io/react/docs/thinking-in-react.html

##React 介绍
---
###简单的UI开发逻辑
web开发中频繁或者复杂的dom操作是性能瓶颈产生的原因，react通过引进虚拟dom的机制，数据变化时候react会重新构建整个虚拟dom树， 并得到与之前dom的区别，然后去更新仅变化的dom数
由于虚拟DOM是内存数据，所以性能是及其高的，而且开发者将不再需要关注整个数据的变化如何更新到一个或多个具体的dom元素，而只需要关心在任意一个数据状态下，整个界面是如何render的

###组件化
react推荐一组件的方式去思考ui构成
而且react并不依赖于js库如jquery，而且对象必须为原生的对象，不过现在的queryselector已经可以方便的查询各种类，因此不依赖于jquery也是可以的！当然一些好的方法的封装也可以参考jquery

	####关于组件的构建
	从[thinking-in-react](http://facebook.github.io/react/docs/thinking-in-react.html)中学习到构建组件可以分为几个步骤，分别是
	* 解耦，将组件解耦到每一部分都只完成一件事情为止，组件间的关系不一定为父子，也有可能为兄弟
	* 构建静态版本，只使用模拟数据来渲染UI，没有交互性，这一步骤需要打代码但是思考的比较少
			构建的时候使用props进行数据的传递，但是
				> `don't use state at all` to build this static version
				> state is reserved only for interactivity, that is, data changes over time
			构建的顺序可以是自顶向下也可以是自底向上，对于小的组件可以自顶向下，对于大的组件可以自底向上
	* 构建交互性版本，interactivity需要思考但是代码量少
			构建交互性版本需要考虑好状态的数量，确定好状态后才能开始构建交互性逻辑

	####React关于组件的定义： 只是[拥有不同状态的机器](http://facebook.github.io/react/docs/interactivity-and-dynamic-uis.html#components-are-just-state-machines)

	####组件构建时注意点
	* 不应该过多的使用state，尽量保持组件只使用props来渲染数据，即stateless化，这样有利于逻辑的清晰。普遍的做法是让一个stateful的组件包含一堆stateless组件，这样逻辑由单一组件来处理，然后去渲染子组件的内容和样式
	* 构建状态组件的时候，让组件的状态数量尽可能的少，并将这些状态存储在this.state中，然后在render()函数中基于这个状态去计算其他需要的信息。	
		考虑数据是否作为组件的状态时可以根据以下的问题：
		* 它是否可以从父元素获取到，如果可以，则可能不是
		* 它是否会随着时间而改变，如果不是，则可能不是
		* 它是否可以有其他状态或者属性计算获得，如果可以，则不是
	* 属性名应该直接写在组件标签上，而不应该写在在html标签上[实例](http://facebook.github.io/react/docs/multiple-components.html#dynamic-children)

	####组件间的关系
	组件的关系在react中的定义是owner-ownee,而不是DOM的father-children的，具体看[这里](http://facebook.github.io/react/docs/multiple-components.html#ownership)

	####组件的可重用性
		* prototype
		* crosscutting concerns
			lifecycle methods

	####可控制的组件
		* 对于表单来说，input的text、checkbox、radio、textarea和option等标签都有多个状态，因此需要控制每个状态的转化

###安全的html标签
由于我们把html嵌入在js中，而js中的html实际上也不是真正的标签，而是要通过react去最终转化为真正的html标签，而转化的过程react已经考虑了安全的问题，因此在js中内嵌html标签是安全的，受保护的

###只是一个view层
react并不像express提供一个完整的web服务，它专注于如何高效地处理DOM（理念参考前三个观点），因此从mvc的角度来说它只是一个view层，但实际上react自己并不赞同web的MVC开发流程。


##函数的意义
---
* render: which returns a tree of React components that will eventually render to HTML.
* getInitialState()： executes exactly once during the lifecycle of the component and sets up the initial state of the component.
* componentDidMount ：is a method called automatically by React after a component is rendered for the first time. 
* getDefaultProps： The result of getDefaultProps() will be cached and used to ensure that this.props.value will have a value if it was not specified by the parent component. This allows you to safely just use your props without having to write repetitive and fragile code to handle that yourself.

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
