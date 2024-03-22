var PopupCoordly_tid = setInterval( function () {
    if ( document.readyState !== 'complete' ) return;
    clearInterval( PopupCoordly_tid );       
    var __proprofs_version= Math.floor((Math.random() * 9999999) + 1)+ Math.floor(Date.now() / 1000);
    var popupCoordlyBaseUrl = 'willianwcr.github.io/coordly-popup/popup.js';
    if(document.querySelectorAll('script[src*="' + popupCoordlyBaseUrl + '"]').length == 0){
        var script = document.createElement("script"); 
        script.src="https://" + popupCoordlyBaseUrl + "?v="+ +__proprofs_version;
        script.type="text/javascript";
        script.async =true;
        script.defer =true;
        script.addEventListener('load', function() {
            window.dataLayer.push({
                event: 'popupJsLoaded'
            });
        });
        document.body.appendChild(script);
    }
}, 100 );
