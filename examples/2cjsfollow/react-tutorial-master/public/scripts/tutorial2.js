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
	render: function() {
		return (
			<div className="commentForm">
				Here is commentForm!
			</div>
		);
	}
});

/*
	不同js文件无法共享临时变量，转化为全局变量
*/
window.CommentList = CommentList
window.CommentForm = CommentForm