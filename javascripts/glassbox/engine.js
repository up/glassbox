var pagenum = 0;
var progress = 0;

var browser;
var detect = navigator.userAgent.toLowerCase();
if (detect.search(/msie/) >= 0) browser = "Internet Explorer";
else if (detect.search(/opera/) >= 0) browser = "Opera";
else if (detect.search(/gecko/) >= 0) browser = "Gecko";
else if (detect.search(/safari/) >= 0) browser = "Safari";

var imageArray = new Array(
	path_to_glassbox + "skins/white/bottom.png",
	path_to_glassbox + "skins/white/bottomleft.png",
	path_to_glassbox + "skins/white/bottomright.png",
	path_to_glassbox + "skins/white/left.png",
	path_to_glassbox + "skins/white/right.png",
	path_to_glassbox + "skins/white/top.png",
	path_to_glassbox + "skins/white/topleft.png",
	path_to_glassbox + "skins/white/topright.png",
	
	path_to_glassbox + "skins/default/bottom.png",
	path_to_glassbox + "skins/default/bottomleft.png",
	path_to_glassbox + "skins/default/bottomright.png",
	path_to_glassbox + "skins/default/left.png",
	path_to_glassbox + "skins/default/right.png",
	path_to_glassbox + "skins/default/top.png",
	path_to_glassbox + "skins/default/topleft.png",
	path_to_glassbox + "skins/default/topright.png",
	
	path_to_background_images + "bg1.jpg",
	path_to_background_images + "bg2.jpg",
	path_to_background_images + "bg3.jpg",
	path_to_background_images + "bg4.jpg",
	path_to_background_images + "bg5.jpg",
	path_to_background_images + "bg6.jpg",
	path_to_background_images + "bg7.jpg",
	path_to_background_images + "bg8.jpg",
	path_to_background_images + "bg9.jpg"
);
var bgposition_nav = new Array(
	'-660px 0',
	'-1100px -250px',
	'-950px 0px',
	'-570px -820px',
	'0px 0px',
	'-570px -0px',
	'-620px -900px',
	'-1410px -500px',
	'0px 0px'
);

function preloadImages() {
	//if(document.all)$("progressIndicator").style.height = 13;
	mHTML = "";
	rowTrack=0;
	for(i=0;i<imageArray.length;i++) {
		mHTML+='<img onload="incrementProgress();" class="mImg" width=1 height=1 src=' + imageArray[i] + '>'
		rowTrack++;
	}
	$("mContainer").innerHTML = mHTML;
	//$("mContainer").style.display = "none";
}

function centerLayer( el, width, height ){
	if (window.innerHeight) {
        var cWidth = window.innerWidth;
        var cHeight = window.innerHeight;
	} 
	else if ( document.documentElement.clientHeight ) {
        var cWidth = document.documentElement.clientWidth;
        var cHeight = document.documentElement.clientHeight;
    }
    else if ( document.body.clientHeight ) {
        var cWidth = document.body.clientWidth;
        var cHeight = document.body.clientHeight;
    }
    var top = (cHeight-height)/2;
    var left = (cWidth-width)/2;
    $(el).style.top = top + "px";
    $(el).style.left = left + "px";
}

function incrementProgress() {
	progress++;
	var progressbarWidth = (progress/imageArray.length)*100;
	if ( browser == "Gecko" && progressbarWidth >= 79 ) progressbarWidth = 79;
	else if ( browser == "Internet Explorer" && progressbarWidth >= 79 ) progressbarWidth = 79;
	else if ( browser == "Opera" && progressbarWidth >= 42 ) progressbarWidth = 42;
	
	$("progressIndicator").style.width = progressbarWidth + "%";
	if(progress>=imageArray.length) {
		new Effect.Fade('progressBar');
		preloadCallback();
	}
}

var mainObj = new GlassBox();
function setContent( num ) { 	
	//obj.init( id, style.width, style.height, style.overflow [, borderskin [, resize, [, dblclick [, multicontent_pagenum ]]]]);
	mainObj.init( 'main', '790px', 'auto', 'auto', '', false, false, num );
	mainObj.vscreen( '50px', '5px' );
	mainObj.appear(); 
	mainObj.backgroundImage(num);
	pagenum = num;
}

function setNavigation() { 			
	var navObj = new GlassBox();
	navObj.init( 'nav', '150px', '308px', 'hidden', 'white', false, false );
	navObj.apos( '825px', '60px' );
	navObj.noro();
	navObj.zindex( '100' );
	navObj.appear(); 
	navObj.draggable('You can drag the navigation');	
}

function setProgressbar() { 		
	document.body.style.backgroundColor="#E16702";
	var pbObj = new GlassBox();
	pbObj.init( 'progressBar', '240px', '60px', 'hidden', 'default' );
	pbObj.apos( '100px', '60px' );
	pbObj.appear(); 
	centerLayer('progressBar', 240, 60);
	setTimeout("preloadImages()",1500);
}

function cacheContent() {
	var htmlbody = document.getElementsByTagName( "body" )[0];
	var contentCache = document.createElement( "div" );
	contentCache.setAttribute( "id", "contentCache" );
	contentCache.style.display = "none";
	contentCache.innerHTML = htmlbody.innerHTML;
	htmlbody.appendChild( contentCache );			
}

function printVersion() {
	var htmlbody = document.getElementsByTagName( "body" )[0];
	var contentCache = $( "contentCache" );
	htmlbody.innerHTML = contentCache.innerHTML;
	htmlbody.style.backgroundImage = "";	
	htmlbody.style.overflow = "auto";	
	htmlbody.style.margin = "0px";	
	htmlbody.style.padding = "30px";	
	var sd = getScreenDimensions();
	htmlbody.style.width = (parseInt(sd.screenWidth) - 80) + "px";	
	if(document.all) {
		htmlbody.style.width = (parseInt(sd.screenWidth) - 60) + "px";	
		htmlbody.style.height = (parseInt(sd.screenHeight) - 60) + "px";	
	}
	$( "nav" ).style.display = "none";
	print();
}

function activateLink( num ) {
    var navi = $( "nav" );
	listElements = navi.getElementsByTagName( "ul" )[0].getElementsByTagName( "li" );
	for ( i=0;i<listElements.length;i++ ) {
		listElements[i].childNodes[0].style.color = "#bbbbbb";
	}
	listElements[num-1].childNodes[0].style.color = "#FFFFFF";
}

function reflectBGImg( id, pos ) {
	var htmlbody = document.getElementsByTagName( "body" )[0];
	var contentBoxBg = $( id ).childNodes[2].childNodes[1].childNodes[0];
	contentBoxBg.style.backgroundImage = htmlbody.style.backgroundImage;
	contentBoxBg.style.backgroundPosition = pos;
}

function go2page( num ) {
	setContent(num);
	reflectBGImg('nav', bgposition_nav[num-1]);
	activateLink(num);
	var navEl = document.getElementById('nav');
	var navLinks = navEl.getElementsByTagName('a');
	if(navLinks[i] != undefined) {
		var hash = navLinks[i].href.split('#')[1];
		historyManager.add( hash );
	}
}

function preloadCallback() {
	$( "main" ).style.display = "block";
	$( "nav" ).style.display = "block";
	setNavigation();
	setContent(1);
	reflectBGImg( 'nav', '-660px 0' );
	checkHash();
}

function checkHash(){
	if(window.location.hash != '') {
		var navEl = document.getElementById('nav');
		var navLinks = navEl.getElementsByTagName('a');
		for(var i in navLinks) {
			if(navLinks[i].href) {
				if('#' + navLinks[i].href.split('#')[1] == window.location.hash) {
					var thisPage = parseInt(i)+1;
					go2page(thisPage);
				}
			}
		}
	}
}

function addInfo() {
  try {
    req = window.XMLHttpRequest ? new XMLHttpRequest(): new ActiveXObject("Microsoft.XMLHTTP");
  } 
  catch (e) { /* No AJAX Support */ }
  req.onreadystatechange = function () {
    if ((req.readyState == 4) && (req.status == 200)) {
     if( req.responseText != 'Done' ) console.debug( req.responseText );
    }  
  }
  req.open( 'post', 'services/addInfo.php' );
  req.send( null ); 
}

window.onload = function() { 
	removeElement( "noscript-style" );
	var htmlhead = document.getElementsByTagName( "head" )[0];
	var htmlbody = document.getElementsByTagName( "body" )[0];
	htmlbody.style.visibility = "hidden";
	//htmlbody.style.backgroundColor = "#A3B102";
	cacheContent();
	$( "contentCache" ).style.display = "none";	
	$( "main" ).style.display = "none";
	$( "nav" ).style.display = "none";
	htmlbody.style.visibility = "visible";
	
	setProgressbar();
		
    var _gb = new GlassBox();
	var str = "Current version is " + _gb.version + " (" + _gb.last_mod + ") <br/>";
	str    += "<span style='font-size: smaller;color:#666;'>[" + _gb.version_comment + "]</span>";
    $('version').innerHTML = $('version2').innerHTML = str;
    
    historyManager = new utils.historyManager();
    historyManager.addListener(
    	function(page) {
			if(!window.location.hash) {
				go2page(1);
			}
			else {
				var navEl = document.getElementById('nav');
				var navLinks = navEl.getElementsByTagName('a');
				for(var i in navLinks) {
					if(navLinks[i].href) {
						if(navLinks[i].href.split('#')[1] == page) {
							var thisPage = parseInt(i)+1;
							go2page(thisPage);
						}
					}
				}
			}
    	}
    );
}

Event.observe(window, 'load', function() {
	var navEl = document.getElementById('nav');
	var navLinks = navEl.getElementsByTagName('a');
    Event.observe(document, 'keypress', function(e){
        if (!e) var e = window.event;
		if (e.keyCode) var code = e.keyCode;
		else if (e.which) var code = e.which;
		var character = String.fromCharCode(code);
		if ( parseInt(character) >= 1 
			&& parseInt(character) <= 9 ) {
			go2page( parseInt(character) );
        }
        else if ( character == "p" ) {
			//printVersion();
		} 
		else if ( character == "(" || character == "&" ) {
			$( 'main_contentBoxBg' ).focus();
		}
		else if ( character == "'" && pagenum <= 8) {
			var nextHash = navLinks[pagenum].href.split('#')[1];
			var oldLoc = window.location.href;
			var baseLoc = oldLoc.split('#')[0];
			window.location.href = baseLoc + '#' + nextHash;
		} 
		else if ( character == "%" && pagenum >= 2) {
			var prevHash = navLinks[pagenum-2].href.split('#')[1];
			var oldLoc = window.location.href;
			var baseLoc = oldLoc.split('#')[0];
			window.location.href = baseLoc + '#' + prevHash;
		}
    });
});

var utils = function() {};
utils.historyManager = function() {
  var dummy = document.createElement("DIV"); 
  dummy.style.position = "absolute";
  dummy.style.visibility = "hidden";
  document.body.appendChild(dummy);
  var listeners = [];
  var currentHash = window.location.hash;

  var timer = window.setInterval(function() {
    if (window.location.hash != currentHash) {
      currentHash = window.location.hash;
      notifyListeners(currentHash.substring(1));
    }
  }, 100);

  this.add = function(page) {
    dummy.id = page;
    window.location.hash = page;  
    currentHash = "#" + page; 
  }

  function notifyListeners(page) {
    for (var i = 0; i < listeners.length; i++) {
      listeners[i](page);
    }
  }

  this.addListener = function(callBack) {
    listeners.push(callBack);
  }

  this.removeListener = function(callBack) {
    for (var i = 0; i < listeners.length; i++) {
      if (listeners[i] == callBack) {
        listeners = listeners.splice(i, 1);
        return;
      }
    }
  }
}

