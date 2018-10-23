;(function($){

	var base;
	var data;
	var single_hotel_item = {
		image: function(url){
			if (url == null) {
				url = "images/ab.jpg";
			}
			var alt = url.substr(url.lastIndexOf("/") + 1);
			var img = $("<img/>").attr({"src": url, "alt": alt}).width(180).height(130);
			return img;
		},
		name: function(name,id){
			var url = "hotelInfo.html?id=" + id;
			var span = $("<a></a>").text(name).attr("href",url);
			return span;
		},
		address: function(address){
			var span = $("<span></span>").text(address);
			return span;
		},
		city: function(city){
			var span = $("<span></span>").text("[" + city + "]");
			return span;
		},
		avgGrade: function(avgGrade){
			var span;
			if(avgGrade){
				span = $("<span></span>").text(avgGrade.toFixed(1));
			}else{
				span = $();
			}
			return span;
		},
		totalCommnet: function(totalCommnet){
			var span = $("<span></span>");
			if (totalCommnet == 0) {
				span.text("");
			}else {
				span = $("<span></span>").text("共" + totalCommnet + "条点评");
			}
			return span;
		},
		minPrice: function(minPrice){
			var span = $("<span></span>").text(minPrice);
			return span;
		},
		starLevel: function(starLevel){
			var span = $("<span></span>").text(starLevel);
			return span;
		},
		priceIcon: function(){
			var span = $("<span></span>").addClass("glyphicon glyphicon-yen");
			return span;
		},
		word_qi: function(){
			var span = $("<span></span>").text("起");
			return span;
		},
		minPrice_a: function(){
			var a = $("<a></a>");
			return a;
		},
		gradeLevel: function(avgGrade){
			var gradeLevel_str;
			if (avgGrade >= 4.5) {
				gradeLevel_str = "棒极了";
			}else if (avgGrade >= 3.5){
				gradeLevel_str = "挺好哒";
			}else if (avgGrade >= 2) {
				gradeLevel_str = "一般般";
			}else if (avgGrade > 0){
				gradeLevel_str = "有点糟";
			}else{
				gradeLevel_str = "暂无点评";
			}
			var span = $("<span></span>").text(gradeLevel_str);
			return span;
		},
		layout: function(){
			var container = $("<div></div>").addClass("col-md-12").height(170).css("padding-top", "20px").css("padding-bottom", "20px").css("border-bottom", "solid #d5d5d5 0.5px");
			var first_div = $("<div></div>").addClass("col-md-3").attr("name","first_div").width("17%");
			var second_div = $("<div></div>").addClass("col-md-5").attr("name","second_div").width("40%").height("100%").css("border-right", "solid #d5d5d5 0.5px");
			var third_div = $("<div></div>").addClass("col-md-2").attr("name","third_div").height("100%").css("text-align", "center").css("border-right", "solid #d5d5d5 0.5px").hover(function(){$(this).find("span").css("text-decoration", "underline")}, function(){$(this).find("span").css("text-decoration", "none")});
			var forth_div = $("<div></div>").addClass("col-md-2").attr("name","forth_div").css("text-align", "center");
			var name_div = $("<div></div>").addClass("col-md-12").attr("name","name_div");
			var address_div = $("<div></div>").addClass("col-md-12").attr("name","address_div").css("margin-top", "8px");
			var avgGrade_div = $("<div></div>").addClass("col-md-12").attr("name","avgGrade_div");
			var totalComment_div = $("<div></div>").addClass("col-md-12").attr("name","totalComment_div").css("font-size", "12px").css("margin-top", "5px");
			var minPrice_div = $("<div></div>").addClass("col-md-12").attr("name","minPrice_div");

			second_div.append(name_div, address_div);
			third_div.append(avgGrade_div, totalComment_div);
			forth_div.append(minPrice_div);

			container.append(first_div, second_div, third_div, forth_div);

			return container;
		},
		fill: function(hotel_info){
			var container = single_hotel_item.layout();
			container.find("div[name='first_div']").append(single_hotel_item.image(hotel_info.photos));
			container.find("div[name='name_div']").append(single_hotel_item.name(hotel_info.name, hotel_info.id));
			container.find("div[name='address_div']").append(single_hotel_item.city(hotel_info.city.cityName).css("color", "#555").css("font-size", "12px").css("margin-right", "3px"), single_hotel_item.address(hotel_info.address).css("color", "#555").css("font-size", "12px"));
			container.find("div[name='avgGrade_div']").append(single_hotel_item.avgGrade(hotel_info.avgGrade).css("color", "#37e").css("margin-right", "3px"), single_hotel_item.gradeLevel(hotel_info.avgGrade)).css("font-size", "18px");
			container.find("div[name='totalComment_div']").append(single_hotel_item.totalCommnet(hotel_info.totalCommnet));
			container.find("div[name='minPrice_div']").append(single_hotel_item.priceIcon().css("vertical-align","11px").css("font-size", "12px"), single_hotel_item.minPrice_a().append(single_hotel_item.minPrice(hotel_info.minPrice).css("font-size", "30px").css("margin", "0 3px"), single_hotel_item.word_qi().css("vertical-align", "2px").css("font-size", "12px")).css("color", "#F55").hover(function(){$(this).find("span").css("color","#D33")}, function(){$(this).find("span").css("color","#F55")}));
			return container;
		}
	}

var hotel_list = {
	createList: function(list){
		base.empty();
		for (var i = 0; i < list.length; i++) {
			base.append(single_hotel_item.fill(list[i]));
		}
	}

}


$.fn.createhotellist = function(options){
	base = this;
	data = options;
	this.empty();
	hotel_list.createList(options.hotel_list);
}
})(jQuery)