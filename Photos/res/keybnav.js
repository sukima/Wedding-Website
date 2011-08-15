$(document).ready(function(){
	$(document).keydown(function(e){
		if(typeof _jaWidgetFocus!='undefined'&&_jaWidgetFocus) return true;
		var k=e?e.keyCode:window.event.keyCode;
		var l;
  	switch(k) {
  		case 38:l=$('#upbtn>a'); if(!l.length) l=$('#indexbtn>a'); if(l.length>0) window.location=l.attr('href'); break;
			case 39: l=$('#nextbtn>a'); if(l.length>0) window.location=l.attr('href'); break;
			case 37:l=$('#prevbtn>a'); if(l.length>0) window.location=l.attr('href'); break;
			default: return true;
		}
		return false;
	});
});