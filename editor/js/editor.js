(function($) {

'use strict';

$.fn.editable = function(options) {
    var _self = this;
    var self = $(this);
    var editableMenu;
    var tmp_list;
    var flag_index;

    initialize();

    function initialize() {
        self.attr('contenteditable', 'true');
        self.addClass('editable');
        editableMenu = 'menu-' + self.attr('id');
        self.keydown(triggerEnter);
        self.on('input change keypress', triggerKeypress);
        $('body').on('mouseover', '#' + editableMenu + ' li', triggerHover);
        $('body').on('keydown', triggerKeydown);
        $('html').on('click', triggerClick);
        insertList();
    }

    /**
     * EVENT LISTENERS
     *
     */

    function triggerEnter(e) {
        if (13 === e.keyCode) { // Enter
            if ($('body').find('#' + editableMenu).is(':visible')) {
                triggerClick(e);
            } else {
                document.execCommand('insertHTML', false, '<br><br>');
            }

            return false;
        }
    }

    function triggerKeypress(e) {
        if (options.at === e.key) {
            setCaretPosition();
            var nextElement = $('body').find('#' + editableMenu + ' li:first');
            $('body').find('#' + editableMenu + ' li.current').removeClass('current');
            nextElement.addClass('current');
            flag_index = self.html().lastIndexOf('&nbsp;');
            flag_index = (flag_index > -1) ? flag_index : 0;
        } else {
            if ($('body').find('#' + editableMenu).is(':visible')) {
                tmp_list = options.data.slice();
                var content = self.html();
                var index = content.lastIndexOf(options.at);
                var keyword = content.slice(index + 1);
                keyword = keyword.toLowerCase();

                if (keyword.includes('<br>')) {
                    keyword = keyword.slice(0, keyword.length - 4);
                }

                tmp_list = $.grep(tmp_list, function(value, index) {
                    console.log(value.name.toLowerCase().includes(keyword));
                    return (value.name.toLowerCase().includes(keyword));
                });

                console.log(tmp_list);

                if (tmp_list.length) {
                    $('body').find('#' + editableMenu).replaceWith(render(tmp_list));
                    setCaretPosition();
                } else {
                    // $('body').find('#' + editableMenu).hide();
                }
            }
        }
    }

    function triggerHover() {
        $('body').find('#' + editableMenu + ' li.current').removeClass('current');
        $('body').find('#' + editableMenu + ' li:hover').addClass('current');
    }

    function triggerKeydown(e) {
        if (40 == e.keyCode) { // Arrow DOWN
            if ($('body').find('#' + editableMenu).is(':visible')) {
                var nextElement = $('body').find('#' + editableMenu + ' .current').next();

                if (!nextElement.length) {
                    nextElement = $('body').find('#' + editableMenu + ' li:first');
                }

                $('body').find('#' + editableMenu + ' li.current').removeClass('current');
                nextElement.addClass('current');

                nextElement = nextElement[0];
                var offset = nextElement.offsetTop + nextElement.offsetHeight + (nextElement.nextSibling ? nextElement.nextSibling.offsetHeight : 0);
                $('body').find('#' + editableMenu + ' ul').scrollTop(Math.max(0, offset - $('body').find('#' + editableMenu + ' ul').height()));
                return false;
            }
        } else if (38 == e.keyCode) { // Arrow UP
            if ($('body').find('#' + editableMenu).is(':visible')) {
                var prevElement = $('body').find('#' + editableMenu + ' .current').prev();

                if (!prevElement.length) {
                    prevElement = $('body').find('#' + editableMenu + ' li:last');
                }

                $('body').find('#' + editableMenu + ' li.current').removeClass('current');
                prevElement.addClass('current');

                prevElement = prevElement[0];
                var offset = prevElement.offsetTop + prevElement.offsetHeight + (prevElement.nextSibling ? prevElement.nextSibling.offsetHeight : 0);
                $('body').find('#' + editableMenu + ' ul').scrollTop(Math.max(0, offset - $('body').find('#' + editableMenu + ' ul').height()));
                return false;
            }
        } else if (8 === e.keyCode) {
            var content = self.html().slice(flag_index, self.html().length);
            if (content.search(options.at) < 0) {
                $('body').find('#' + editableMenu).hide();
            }
        }
    }

    function triggerClick(e) {
        var parents = $(e.target).parents();
        var list = parents.find('#' + editableMenu + ' ul.editable-menu-list li');
        var currentItem = parents.find('li.current');

        if (currentItem &&  $('body').find('#' + editableMenu).is(':visible')) {
            var index = $(list).index(currentItem[0]);
            var value = parseTemplate(options.insertTpl, tmp_list[index]);

            insertIntoEditable(value);
            placeCaretAtEnd(self.get(0));
        }

        $('body').find('#' + editableMenu).hide();
    }

    /**
     * HELPERS
     *
     */

    function getCaretPosition() {
        var x = 0;
        var y = 0;
        var sel = window.getSelection();
        if(sel.rangeCount) {
            var range = sel.getRangeAt(0).cloneRange();
            if(range.getClientRects()) {
            range.collapse(true);
            var rect = range.getClientRects()[0];
            if(rect) {
                y = rect.top;
                x = rect.left;
            }
            }
        }
        return {
            x: x,
            y: y + 20
        };
    }

    function placeCaretAtEnd(el) {
        el.focus();
        if (typeof window.getSelection != "undefined"
                && typeof document.createRange != "undefined") {
            var range = document.createRange();
            range.selectNodeContents(el);
            range.collapse(false);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (typeof document.body.createTextRange != "undefined") {
            var textRange = document.body.createTextRange();
            textRange.moveToElementText(el);
            textRange.collapse(false);
            textRange.select();
        }
    }

    function parseTemplate(template, data) {
        var pattern = /\{[\sa-z0-9_]+\}/igm;
        var result = '';
        var index = 0;
        var var_;
        var match

        while (match = pattern.exec(template)) {
            var_ = match[0].substring(1, match[0].length - 1).trim();
            result += template.substring(index, match.index);
            eval('result += data.' + var_);
            index = pattern.lastIndex;
        }

        result += template.substring(index, template.length);
        return result;
    }

    function insertIntoEditable(value) {
        var content = self.html();
        content = content.slice(0, content.lastIndexOf(options.at));
        content = content.concat(value);
        self.html(content);
    }

    function insertList() {
        var html = render((tmp_list) ? tmp_list : options.data);
        $('body').append(html);
    }

    function render(data) {
        if (data && options.displayTpl) {
            var html = '<div id="' + editableMenu + '" class="editable-menu">';
            html += '<div class="editable-menu-header">';
            html += options.headerTpl;
            html += '</div>'; // close Header

            html += '<ul class="editable-menu-list">';

            $.each(data, function(index, value) {
                html += parseTemplate(options.displayTpl, value);
            });

            html += '</div>'; // close Editable Menu List

            html += '</div>'; // close Editable Menu
        } else {
            html = '';
        }

        return html;
    }

    function setCaretPosition() {
        var position = getCaretPosition();
        $('body').find('#' + editableMenu).css({'display' : 'block', 'top' : position.y + 'px', 'left' : position.x + 'px'});
    }
};

})(jQuery);