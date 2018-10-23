;(function($){
	var bg_color_list = ["#90774e", "#71738c", "#fac007", "#c76453", "#58afd8", "#ef9b39", "#92a25d"];

// var test = dateT.substr(0, 10);

var single_comment = {
	// 布局
	layout: function() {
		var container = $("<div></div>").addClass("col-md-12");
		var left_div = $("<div></div>").attr("name", "left_div").addClass("col-md-2");
		var right_div = $("<div></div>").attr("name", "right_div").addClass("col-md-10");
		var left_first_div = $("<div></div>").attr("name", "left_first_div").addClass("col-md-12");
		var left_second_div = $("<div></div>").attr("name", "left_second_div").addClass("col-md-12");
		var left_third_div = $("<div></div>").attr("name", "left_third_div").addClass("col-md-12");
		var left_forth_div = $("<div></div>").attr("name", "left_forth_div").addClass("col-md-12");
		var right_first_div = $("<div></div>").attr("name", "right_first_div").addClass("col-md-12");
		var right_second_div = $("<div></div>").attr("name", "right_second_div").addClass("col-md-12");
		var right_third_div = $("<div></div>").attr("name", "right_third_div").addClass("col-md-12");
		var right_forth_div = $("<div></div>").attr("name", "right_forth_div").addClass("col-md-12");
		var right_first_left_div = $("<div></div>").attr("name", "right_first_left_div").addClass("col-md-3");
		var right_first_mid_div = $("<div></div>").attr("name", "right_first_mid_div").addClass("col-md-7");
		var right_first_right_div = $("<div></div>").attr("name", "right_first_right_div").addClass("col-md-2");

		right_first_div.append(right_first_left_div, right_first_mid_div, right_first_right_div);
		left_div.append(left_first_div, left_second_div, left_third_div, left_forth_div);
		right_div.append(right_first_div, right_second_div, right_third_div, right_forth_div);

		container.append(left_div, right_div);
		return container;
	},
	// 头像
	profile_pic: function(user_name){
		var first_word = user_name.charAt(0);
		var span = $("<span></span>").attr("name","profile-pic");
		span.text(first_word);
		span.css("background-color",bg_color_list[Math.floor(Math.random()*7)]);
		return span;
	},
	// 用户名
	user_name: function(user_name){
		var span = $("<span></span>").attr("name","user-name");
		span.text(user_name);
		return span;
	},
	role: function(role){
		var span = $("<span></span>");
		span.text(role);
		return span;
	},
	state: function(state){
		var span = $("<span></span>");
		span.text(state);
		return span;
	},
	// 评分星级
	star: function(grade){
		var span = $("<span></span>");
		var percent = grade / 5 * 100 + "%";
		span.append($("<span></span>").width(percent));
		return span;
	},
	// 评分
	grade: function(grade){
		var b = $("<b></b>").attr("name","grade");
		b.text(grade.toFixed(1));
		return b;
	},
	// 房间类型
	room_category: function(room_category){
		var span = $("<span></span>").attr("name","room_category");
		span.text(room_category);
		return span;
	},
	// 日期
	date: function(dateT){
		var date = dateT.substr(0, 10);
		var span = $("<span></span>").attr("name","date");
		span.text(date);
		return span;
	},
	// 评论内容
	feeling: function(feeling){
		var p = $("<p></p>").attr("name","feeling");
		p.text(feeling);
		return p;
	},
	// 酒店回复
	reply: function(reply){
		var span;
		if(reply){
			span = $("<span></span>").attr("name","reply");
			span.text("酒店回复：" + reply);
		}else{
			span = $();
		}
		return span;
	},
	// 优质评论图标
	essence_icon: function(isEssence){
		var i;
		if(isEssence){
			i = $("<i></i>");
		}else{
			i = $();
		}
		return i;
	},
	// 图片
	photos: function(url){
		var div;
		if (url) {
			var url_list = url.split("#");
			div = $("<div></div>");
			for (var i = 0; i < url_list.length; i++) {
				div.append($("<div></div>").attr("name","photos").css("background-image","url("+url_list[i]+")"));
			}
		}else{
			div = $();
		}
		return div;
	},
	// 填充
	fill: function(info){
		var container = this.layout();
		container.find("div[name=left_first_div]").append(this.profile_pic(info.userDto.username));
		container.find("div[name=left_second_div]").append(this.user_name(info.userDto.username));
		container.find("div[name=left_third_div]").append(this.role(info.userDto.role));
		container.find("div[name=left_forth_div]").append(this.state(info.userDto.state));
		container.find("div[name=right_first_left_div]").append(this.star(info.grade),this.grade(info.grade));
		container.find("div[name=right_first_mid_div]").append(this.room_category(info.roomCategory.name));
		container.find("div[name=right_first_right_div]").append(this.date(info.publishdate));
		container.find("div[name=right_second_div]").append(this.feeling(info.feeling).append(single_comment.essence_icon(info.isEssence)));
		container.find("div[name=right_third_div]").append(this.photos(info.photos));
		container.find("div[name=right_forth_div]").append(this.reply(info.reply));
		return container;
	}
};

$.fn.createcommentlist = function(options){
	$(this).empty();
	for(var i = 0; i < options.length; i++){
		this.append(single_comment.fill(options[i]));
	}
}
})(jQuery)