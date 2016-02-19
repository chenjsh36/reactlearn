/*
	CommentBox
		CommentList
				Comment
		CommentForm
 */
/*
	评论列表
 */
var CommentList = React.createClass({
	render: function() {
		var commentNodes = this.props.data.map(function(comment){
			return (
				<Comment author={comment.author} key={comment.id}>
					{comment.text}
				</Comment>
				);
		});
		return (
			<div className="commentList">
				{commentNodes}
			</div>
		);
	}
});

/*
	评论表单
 */
var CommentForm = React.createClass({
	getInitialState: function() {
		return {author: '', text: ''};
	},
	handleAuthorChange: function(e) {
		this.setState({author: e.target.value});
	},
	handleTextChange: function(e) {
		this.setState({text: e.target.value});
	},
	handleSubmit: function(e) {
		e.preventDefault();
		var text = this.state.text.trim();
		var author = this.state.author.trim();
		if ( !text || !author) {
			return;
		}
		// TODO: send request to the server
		this.props.onCommentSubmit({author: author, text: text});
		this.setState({author: '', text: ''});
	},
	render: function() {
		return (
			<form className="commentForm" onSubmit={this.handleSubmit}>
				<input type="text" 					
					placeholder="Your name" 
					value={this.state.author}					
					onChange={this.handleAuthorChange}
				/>
				<input 
					type="text" 					
					placeholder="Say something..." 					
					value={this.state.text}					
					onChange={this.handleTextChange} 
				/>
				<input type="submit" value="Post" />
			</form>
		);
	}
});

/*
	不同js文件无法共享临时变量，转化为全局变量
*/
window.CommentList = CommentList
window.CommentForm = CommentForm