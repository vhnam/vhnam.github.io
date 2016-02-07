(function () {

    var ListRow = React.createClass({
        displayName: "ListRow",

        render: function () {
            return React.createElement(
                "li",
                { className: "list-field" },
                React.createElement(
                    "a",
                    { href: this.props.blog.link, className: "title" },
                    this.props.blog.name
                ),
                React.createElement(
                    "div",
                    { className: "time" },
                    React.createElement(
                        "time",
                        { dateTime: this.props.blog.datetime, itemProp: "datePublished" },
                        this.props.blog.time
                    )
                ),
                React.createElement(
                    "p",
                    { className: "description" },
                    this.props.blog.description
                )
            );
        }
    });

    var List = React.createClass({
        displayName: "List",

        render: function () {
            var list = [],
                index = 0,
                maxPosts = 5;

            this.props.blogs.forEach(function (blog) {
                if (index++ < maxPosts) {
                    list.push(React.createElement(ListRow, { blog: blog, key: blog.name }));
                }
            });

            return React.createElement(
                "ul",
                { className: "list" },
                list
            );
        }
    });

    $(document).ready(function () {
        $.getJSON('data/blogs.json', function (data) {
            React.render(React.createElement(List, { blogs: data.blogs }), document.getElementById('blog-list'));
        });

        $.getJSON('data/stories.json', function (data) {
            React.render(React.createElement(List, { blogs: data.stories }), document.getElementById('story-list'));
        });
    });
})();