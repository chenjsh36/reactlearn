/*
	CommentBox
		CommentList
				Comment
		CommentForm
 */
/*
	评论组件
 */
var CommentBox = React.createClass({
	getInitialState: function() {
		return {data: []};
	}, 
	componentDidMount: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({data: data});
			}.bind(this),
			error//code here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		})
	}, 
	render: function() {
		return (
			<div className="commentBox">
				<h1> Comments</h1>
				<CommentList data={this.state.data}/>
				<CommentForm/>
			</div>
		);
	}
});

/*
	初始入口ReactDOM.render()接口
 */
ReactDOM.render(
	<CommentBox url="/api/comments" />,
	document.getElementById('content')
);

