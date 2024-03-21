var PopupCoordly_tid = setInterval( function () {
    if ( document.readyState !== 'complete' ) return;
    clearInterval( PopupCoordly_tid );       
    var __proprofs_version= Math.floor((Math.random() * 9999999) + 1)+ Math.floor(Date.now() / 1000);
    var popupCoordlyBaseUrl = 'raw.githubusercontent.com/willianwcr/coordly-popup/main/popup.js';
    if(document.querySelectorAll('script[src*="' + popupCoordlyBaseUrl + '"]').length == 0){
        var script = document.createElement("script"); 
        script.src="https://" + popupCoordlyBaseUrl + "?v="+ +__proprofs_version;
        script.type="text/javascript";
        script.async =true;
        script.defer =true;
        document.body.appendChild(script);
    }
}, 100 );
