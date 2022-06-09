/* amiando Export: Resizing of iframe height and check if the iframe is wider than the parent element */

/**
 * in order to get this work, you need:
 * an iframe on the same page where this script is loaded with the following attributes:
 * - id="_amiandoIFrameXXXX", id starting with "_amiandoIFrame"
 * - src="XXXX&resizeIFrame=trueXXXX", src containing the string "resizeIFrame=true"
 * - if you want to include an iframe twice, please change the id of the second iframe after "_amiandoIFrame"
 */

// create event handler (for IE < 9 = attachEvent and onload)
var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent",
	messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message",
	onloadEvent = eventMethod == "attachEvent" ? "onload" : "DOMContentLoaded";

//Check if the iframe is wider than the parent element
function _amiandoCheckIframeWidth() {

	_amiandoIFramesOnPage = document.getElementsByTagName("iframe");

	for (var i = 0; i < _amiandoIFramesOnPage.length; i++) {
	
		var _amiandoIFramesId = _amiandoIFramesOnPage[i].id,
			_amiandoIFramesSrc = _amiandoIFramesOnPage[i].src;
		if (_amiandoIFramesId.indexOf("_amiandoIFrame") == 0 && _amiandoIFramesSrc.indexOf("changeIframeWidth=false") == -1) {

			//get IframeWidth
			var amiandoIframe = document.getElementById(_amiandoIFramesId),
				iframeStyle = amiandoIframe.currentStyle || window.getComputedStyle(amiandoIframe),
				iframeMargin =  parseInt(iframeStyle.marginLeft) + parseInt(iframeStyle.marginRight),
				iframeBorder = parseInt(iframeStyle.borderLeftWidth) + parseInt(iframeStyle.borderRightWidth),
				iframeMarginChk = isNaN(iframeMargin) ? 0 : iframeMargin,
				iframeBorderChk = isNaN(iframeBorder) ? 0 : iframeBorder,
				iframeWidth = parseInt(amiandoIframe.offsetWidth), // width + padding
				iframeTotalWidth = iframeWidth + iframeMarginChk + iframeBorderChk;

			//get ParentNodeWidth
			var iframeParent = amiandoIframe.parentNode,
				parentStyle = iframeParent.currentStyle || window.getComputedStyle(iframeParent),
				parentPadding = parseInt(parentStyle.paddingLeft) + parseInt(parentStyle.paddingRight),
				parentPaddingChk = isNaN(parentPadding) ? 0 : parentPadding,
				parentOffsetWidth = parseInt(amiandoIframe.parentNode.offsetWidth), // width + padding
				parentWidth = parentOffsetWidth - parentPaddingChk;

			//compare iframe width with parentNode width
			if (iframeTotalWidth > parentWidth) {
				amiandoIframe.style.padding = "0";
				amiandoIframe.style.margin = "0";
				amiandoIframe.style.borderWidth = "0";
				amiandoIframe.style.width = "100%";
			}
		}
	}
}

window[eventMethod](onloadEvent, _amiandoCheckIframeWidth, false);


//Resizing of iframe height
function _amiandoResizeIframe(e) {

	if(typeof e.data === 'string') {
		_amiandoIFramesOnPage = document.getElementsByTagName("iframe");

		for (var i = 0; i < _amiandoIFramesOnPage.length; i++) {
			var _amiandoIFramesId = _amiandoIFramesOnPage[i].id,
				_amiandoIFramesSrc = _amiandoIFramesOnPage[i].src;

			if (_amiandoIFramesId.indexOf("_amiandoIFrame") != -1) {
				var _amiandoGetIFrame = document.getElementById(_amiandoIFramesId),
					_amiandoGetWindow = (_amiandoGetIFrame.contentWindow || _amiandoGetIFrame.contentDocument);

				//check if event src equals iframe src
				if (e.source == _amiandoGetWindow) {
					//split iframe and origin url
					var _amiandoIFrameSrcArray = _amiandoIFramesSrc.split("/"),
						_amiandoIFrameSubDomain = _amiandoIFrameSrcArray[0] + "//" + _amiandoIFrameSrcArray[2],
						_amiandoOriginArray = e.origin.split(".");

					//check url for localhost or live (and reassemble live url)
					var _amiandoOrigin = e.origin == "https://localhost:3001" ? e.origin : _amiandoOriginArray.slice(1).join("."),
						_amiandoIFrame = _amiandoIFrameSubDomain == "https://localhost:3001" ? _amiandoIFrameSubDomain : _amiandoIFrameSrcArray[2].split(".").slice(1).join(".");

					//check target origin
					if (_amiandoOrigin == _amiandoIFrame || _amiandoOrigin == "amiando.com" || _amiandoOrigin == "xing-events.com") {

						var _amiandoDataArray = e.data.split(",");

						_amiandoGetIFrame.style.height = _amiandoDataArray[0] + "px";

						if (_amiandoDataArray[1] == "true") {
							if(document.getElementById('_amiando_TSPreviewModal') == null) {
								_amiandoIframeScroll(_amiandoGetIFrame, _amiandoIframePosition(_amiandoGetIFrame));
							} else {
								$('#_amiando_TSPreviewModal').scrollTop(0);
							}
						}
					}
				}
			}
		}
	}
}

window[eventMethod](messageEvent, _amiandoResizeIframe, false);

function _amiandoIframeScroll(elem, pos) {
	var scrollTop = typeof window.pageYOffset != 'undefined' ? window.pageYOffset: document.documentElement.scrollTop? document.documentElement.scrollTop: document.body.scrollTop? document.body.scrollTop:0,
		iframeCurPosition = pos - scrollTop,
		docInnerHeight = window.innerHeight || document.body.clientHeight;

	if(iframeCurPosition - 100 < 0 && iframeCurPosition < docInnerHeight) {
		window.scrollTo(elem.offsetLeft, pos - 100);
	}
}

function _amiandoIframePosition(node) {
	var posTop = 0,
		posTopScroll = 0;
	if (node.offsetParent) {
		do {
			posTop += node.offsetTop;
			posTopScroll += node.offsetParent ? node.offsetParent.scrollTop : 0;
		} while (node = node.offsetParent);

		return posTop;
	}
}

var _checkGaTimes = 0;
function _checkGA() {
	if (typeof ga !== 'function') {
		if (_checkGaTimes < 3) {
			_checkGaTimes++;
			setTimeout(_checkGA, 1000);
		}
	} else {
		try {
			var postMessageString = "amiandoEXClient;";
			trackers = ga.getAll();
			for (var i = 0; i < trackers.length; i++) {
				postMessageString += trackers[i].get('trackingId') + "=" + trackers[i].get('clientId') + "|";
			}
			var _amiandoIFramesOnPage = document.getElementsByTagName("iframe");
			for (var i = 0; i < _amiandoIFramesOnPage.length; i++) {
				if (_amiandoIFramesOnPage[i].id.indexOf("_amiandoIFrame") == 0) {
					var _amiandoFrame = _amiandoIFramesOnPage[i].contentWindow;
					_amiandoFrame.postMessage(postMessageString, '*');
				}
			}
		} catch(e) {}
	}
}

function _registerOnLoad() {
	var _amiandoIFramesOnPage = document.getElementsByTagName("iframe");
	for (var i = 0; i < _amiandoIFramesOnPage.length; i++) {
		if (_amiandoIFramesOnPage[i].id.indexOf("_amiandoIFrame") == 0) {
			_amiandoIFramesOnPage[i].onload = _checkGA;
		}
	}
}
window[eventMethod](onloadEvent, _registerOnLoad, false);
