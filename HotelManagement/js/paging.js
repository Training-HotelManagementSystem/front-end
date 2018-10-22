(function($){
    var options;
    var base;
    var pagination = {
        // 上一页项
        previous_item: function(flag){
            var previous_item;
            if (flag) {
                var previous_item_span = $("<span></span>").attr("aria-hidden", "true").text("«");
                var previous_item_a = $("<a></a>").attr("aria-label", "Previous").append(previous_item_span);
                var previous_item_li = $("<li></li>").append(previous_item_a);
                previous_item = previous_item_li;
                this.bind_event(previous_item, "onclick");
            }else{
                previous_item = $();
            }
            return previous_item;
        },
        // 下一页项
        next_item: function(flag){
            var next_item;
            if (flag) {
                var next_item_span = $("<span></span>").attr("aria-hidden", "true").text("»");
                var next_item_a = $("<a></a>").attr("aria-label", "Next").append(next_item_span);
                var next_item_li = $("<li></li>").append(next_item_a);
                next_item = next_item_li;
                this.bind_event(next_item, "onclick");
            }else{
                next_item = $();
            }
            return next_item;
        },
        // 首页项
        first_page: function(flag){
            var first_page;
            if (flag) {
                var first_page_a = $("<a></a>").text("1");
                var first_page_li = $("<li></li>").append(first_page_a);
                first_page = first_page_li;
                this.bind_event(first_page, "onclick");
            }else{
                first_page = $();
            }
            return first_page;
        },
        // 末页项
        final_page: function(flag,totalPage){
            var final_page;
            if (flag) {
                var final_page_a = $("<a></a>").text(totalPage);
                var final_page_li = $("<li></li>").append(final_page_a);
                final_page = final_page_li;
                this.bind_event(final_page, "onclick");
            }else{
                final_page = $();
            }
            return final_page;
        },
        // 前省略号项
        front_ellipsis: function(flag){
            var front_ellipsis;
            if (flag) {
                var front_ellipsis_a = $("<a></a>").text("...");
                var front_ellipsis_li = $("<li></li>").append(front_ellipsis_a);
                front_ellipsis = front_ellipsis_li;
            }else{
                front_ellipsis = $();
            }
            return front_ellipsis;
        },
        // 后省略号项
        back_ellipsis: function(flag){
            var back_ellipsis;
            if (flag) {
                var back_ellipsis_a = $("<a></a>").text("...");
                var back_ellipsis_li = $("<li></li>").append(back_ellipsis_a);
                back_ellipsis = back_ellipsis_li;
            }else{
                back_ellipsis = $();
            }
            return back_ellipsis;
        },
        // 单页项
        ordinary_page: function(number){
            var ordinary_page;
            var ordinary_page_a = $("<a></a>").text(number);
            var ordinary_page_li = $("<li></li>").append(ordinary_page_a);
            ordinary_page = ordinary_page_li;
            this.bind_event(ordinary_page, "onclick");
            return ordinary_page;
        },
        // 当前页
        current_page: function(number){
            var current_page;
            current_page = this.ordinary_page(number).addClass("active").unbind();
            return current_page;
        },
        // 整合
        combine: function(){
            var range_page = 6;
            var min_page = options.current_page - range_page / 2;
            var max_page = options.current_page + range_page / 2;
            var previous_item = true;
            var next_item = true;
            var first_page = true;
            var final_page = true;
            var front_ellipsis = true;
            var back_ellipsis = true;

            var visible_page = $("<ul></ul>").addClass("pagination");

            if (options.current_page == 1) {
                previous_item = false;
            }

            if (options.current_page == options.total_page) {
                next_item = false;
            }

            if (options.total_page - 1 <= range_page) {
                min_page = 1;
                max_page = options.total_page;
                first_page = false;
                final_page =false;
                front_ellipsis = false;
                back_ellipsis = false;
            }else{
                if (options.current_page - range_page / 2 <= 1) {
                    min_page = 1;
                    max_page = min_page + range_page;
                    first_page = false;
                    front_ellipsis = false;
                }
                if (options.current_page + range_page / 2 >= options.total_page) {
                    max_page = options.total_page;
                    min_page = max_page - range_page;
                    final_page = false;
                    back_ellipsis = false;
                }
                if (options.current_page - range_page / 2 <= 2) {
                    front_ellipsis = false;
                }
                if (options.current_page + range_page / 2 >= options.total_page - 1) {
                    back_ellipsis = false;
                }
                
            }

            visible_page.append(this.previous_item(previous_item), this.first_page(first_page), this.front_ellipsis(front_ellipsis));

            for (var index = min_page; index <= max_page; index++) {
               if (index == options.current_page) {
                visible_page.append(this.current_page(index));
            }else{
                visible_page.append(this.ordinary_page(index, options.function_name));
            }

        }
        
        visible_page.append(this.back_ellipsis(back_ellipsis), this.final_page(final_page, options.total_page), this.next_item(next_item));

        return visible_page;
    },
        // 绑定函数
        // bind_fun: function(jquery_object, function_name){
        //     jquery_object.attr("onclick", function_name + "($(this).text())");
        // },
        // 绑定事件
        bind_event: function(jquery_object, event_name){
            var current_page = options.current_page;
            if ($.trim(event_name).toLowerCase() == "onclick") {
                if(jquery_object.find("a").attr("aria-label") == "Previous"){
                    current_page = current_page - 1;
                }else if(jquery_object.find("a").attr("aria-label") == "Next"){
                    current_page = current_page + 1 ;
                }else{
                    current_page = parseInt(jquery_object.find("a").text());
                }
                jquery_object.click(function(){
                    pagination.onclick(current_page);
                })
            }
        },
        // 点击事件
        onclick: function(pageNum){
            options.current_page = pageNum;
            base.empty();
            base.append(this.combine());
            options.onclick(options.current_page);
        },
        // 填充html
        fill: function(element, data){
            base = element;
            options = data;
            base.append(this.combine());
        }


    }

    $.fn.createpagination = function(data){
        pagination.fill(this, data);
    }
})(jQuery);