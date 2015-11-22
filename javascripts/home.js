(function() {

var ListRow = React.createClass({
    render: function() {
        return (
            <li className="list-field">
                <a href={this.props.blog.link} className="title">{this.props.blog.name}</a>
                <div className="time">
                    <time dateTime={this.props.blog.datetime} itemProp="datePublished">{this.props.blog.time}</time>
                </div>
                <p className="description">{this.props.blog.description}</p>
            </li>
        );
    }
});

var List = React.createClass({
    render: function() {
        var list = [],
            index = 0,
            maxPosts = 10;

        this.props.blogs.forEach(function(blog) {
            if (++index < maxPosts) {
                list.push(
                    <ListRow blog={blog} key={blog.name} />
                );
            }
        });

        return (
            <ul className="list">
                {list}
            </ul>
        );
    }
});

$(document).ready(function() {
    $.getJSON('data/blogs.json', function(data) {
        React.render(
            <List blogs={data.blogs} />
        , document.getElementById('blog-list'));
    })
});

})();