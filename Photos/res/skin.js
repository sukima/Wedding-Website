$(document).ready(function(){
	$('#uparrow,#dnldarrow').each(function(){
		$(this).css('left',$(this).parents('.image').width()/2-40);
	});
	$('#areaprev,#prevarrow').hover(function(){$("#prevarrow").show();},function(){$("#prevarrow").hide();});
	$('#areanext,#nextarrow').hover(function(){$("#nextarrow").show();},function(){$("#nextarrow").hide();});
	$('#areaup,#uparrow').hover(function(){$("#uparrow").show();},function(){$("#uparrow").hide();});
	$('#areadnld,#dnldarrow').hover(function(){$("#dnldarrow").show();},function(){$("#dnldarrow").hide();});

	$('a.showhint, em.showhint, ul.showhint>li>a').each(function(){
		$(this).data('hint',$(this).attr('title'));
		$(this).removeAttr('title');
	}).hover(function(){
		$('#hint').each(function(){$(this).remove();});
		$('body').append('<p id="hint">'+$(this).data('hint')+'</p>');
		var o=$(this).offset();
		var p=$('#hint');
		var l=o.left+($(this).outerWidth()-p.outerWidth())/2;
		var t=o.top-p.outerHeight()-20;
		$('#hint').css({top:(t<0)?0:t,left:(l<0)?0:l}).fadeIn('fast');
		return false;},
		function(){$('#hint').remove(); return false;
	});
	if(/(MSIE|Opera)[\/\s](\d+\.\d+)/.test(navigator.userAgent) && /Win((32)|(64))/.test(navigator.platform)) {
		var b=new Array(7,1,5,1,4,1,2,2,1,2);
		var w;
		if($('#slidewrapper').length>0) w=$('#slidewrapper').width();
		else w=$('#indexwrapper').width();
		var col=$('#slidewrapper>.panel,#indexwrapper>.panel').eq(0).css('background-color');
		$('#indexwrapper>.panel,#slidewrapper>.panel').css({paddingTop:'13px',paddingBottom:'13px'})
			.before('<div id="_trnd" style="position:relative;height:7px;font-size:1px;"></div>')
			.after('<div id="_brnd" style="position:relative;height:7px;font-size:1px;"></div>');
		for(var y=0,i=0;i<b.length;i+=2){
			$('#_trnd').append('<div style="position:absolute;background-color:'+col+';font-size:1px;top:'+y+'px;left:'+b[i]+'px;height:'+b[i+1]+'px;width:'+(w-2*b[i])+'px;"></div>');
			$('#_brnd').append('<div style="position:absolute;background-color:'+col+';font-size:1px;top:'+(5-y)+'px;left:'+b[i]+'px;height:'+b[i+1]+'px;width:'+(w-2*b[i])+'px;"></div>');
			y+=b[i+1];
		}
	}

});