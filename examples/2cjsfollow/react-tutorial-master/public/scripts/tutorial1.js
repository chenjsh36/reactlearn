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
	loadCommentsFromServer: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({data: data})
			}.bind(this),
			error: function(xhr, status, err) {
				console.log(this.props.rul, status, err.toString());
			}.bind(this)
		});
	},
	handleCommentSubmit: function(comment) {
		var comments = this.state.data;
		comment.id = Data.now();
		var newComents = comments.concat([comment]);
		this.setState({data: newComents});
		// TODO: submit to the server and refresh the list
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			type: 'POST',
			data: comment,
			success: function(data) {
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				this.setState({data: comments});
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		})
	},
	// 在组件加载完毕的时候执行该函数
	componentDidMount: function() {
		this.loadCommentsFromServer();
		setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	}, 
	render: function() {
		return (
			<div className="commentBox">
				<h1> Comments</h1>
				<CommentList data={this.state.data}/>
				<CommentForm onCommentSubmit={this.handleCommentSubmit} />
			</div>
		);
	}
});

/*
	初始入口ReactDOM.render()接口
 */
ReactDOM.render(
	<CommentBox url="/api/comments" pollInterval={2000} />,
	document.getElementById('content')
);

