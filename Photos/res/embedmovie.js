function rgb2hex(col) {
	if(col[0]=='#') {
		if(col.length<7) col='#'+col[1]+col[1]+col[2]+col[2]+col[3]+col[3];
		return col;
	}
	function hex(x){ var hx='0123456789abcdef'; return isNaN(x)?'00':(hx[x>>4]+hx[x&0xf]); }
	var rgb=col.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	return (rgb)?('#'+hex(rgb[1])+hex(rgb[2])+hex(rgb[3])):'#ffffff';
}
$(document).ready(function(){
	var mtype=new Array(".avi.mp3", ".qt.mov.mpg.mpeg.mpe.mp4.aiff", ".wmv.wma.asf", ".swf", ".flv", ".divx.xvid" );
	$('.video').each(function(){
		var link=$(this).find('a').eq(0).attr('href');
		if(link==null) return;
		var ext=link.substr(link.lastIndexOf('.')).toLowerCase();
		$(this).empty().append('<div class="player"></div>');
		var div=$(this).children().eq(0);
		var col=rgb2hex($(this).css('background-color'));
		for(var i=0; i<mtype.length; i++)
			if(mtype[i].indexOf(ext)!=-1) break;
		if(i==0)
			i=(navigator.userAgent.indexOf('Macintosh')!=-1)? 1:2;
		switch(i){
			case 1:
				div.addClass('qtplayer').append('<object '+
				($.browser.msie?'classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab#version=6,0,2,0" ':
					('type="video/quicktime" data="'+link+'" '))+
				'width="'+video.width+'" height="'+video.height+'" id="QuickTimePlayer">'+
				'<param name="src" value="'+link+'" />'+
				'<param name="bgcolor" value="'+col+'" />'+
				'<param name="autoplay" value="'+video.auto+'" />'+
				'<param name="scale" value="'+(video.fit?'tofit':'aspect')+'" /></object>');
    			break;
			case 2:
				div.addClass('wmplayer').append('<object '+
				($.browser.msie?'classid="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6" ':('type="application/x-ms-wmp" data="'+link+'" '))+
				'width="'+video.width+'" height="'+video.height+'" id="MediaPlayer">'+
				($.browser.msie?('<param name="URL" value="'+link+'" />'):'')+
				'<param name="src" value="'+link+'" />'+
				'<param name="AutoStart" value="'+video.auto+'" />'+
				'<param name="StretchToFit" value="'+video.fit+'" /><param name="AutoSize" value="true" /></object>');
	    		break;
    		case 3:
			case 4:
				var link=(i==3)?link:(resPath+'/videoplayer.swf?file=../'+relPath+link+'&auto='+video.auto+'&fit='+video.fit);
    			div.addClass('flvplayer').append('<object '+
				($.browser.msie?'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" ':
					('type="application/x-shockwave-flash" data="'+link+'" '))+
				' width="'+video.width+'" height="'+video.height+'" id="videoplayer" align="middle">'+
				'<param name="allowScriptAccess" value="sameDomain" /><param name="allowFullScreen" value="true" />'+
				'<param name="movie" value="'+link+'" /><param name="quality" value="high" />'+
				'<param name="bgcolor" value="'+col+'" /><param name="wmode" value="opaque" /></object>');
				break;
		  default:
				div.addClass('otherplayer').append('<embed src="'+link+'" autostart="'+video.auto+'" width="'+video.width+'" height="'+video.height+'" loop="false"></embed>');
    	}
    });
});
