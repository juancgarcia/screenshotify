(function() {
    /* options, customize to your needs */
    var title = 'screenshotify',
    server = '//c9.io/juancgarcia/html2canvas/workspace/Downloadify-652377f' /*'//html2canvas.hertzen.com/js'*/,
    proxy = '//html2canvas.appspot.com',
    debug = true,
    profile = false,
    scriptFiles = [
        '//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js',
        'js/jquery.plugin.html2canvas',
        'js/html2canvas',        
		'js/swfobject',
		'js/downloadify.min',
        'http://stuartk.com/jszip/jszip',
        'http://stuartk.com/jszip/jszip-deflate'/*,
		'js/dZscript'*/
    ];
    
    var loader = {
        index: 0,
        head: document.getElementsByTagName('head')[0],
        statusline: document.createElement('div'),
        files: scriptFiles/*(debug ? debugFiles : relFiles)*/,
        onload: function () {
            var _ = this;
            if (_.index < _.files.length) {
                var el = document.createElement('script');
                el.type = 'text/javascript';
                el.onload = function() {
                    _.onload();
                };
                el.onerror = function() {
                    _.statusline.style.color = 'red';
                    _.statusline.innerHTML = _.statusline.innerHTML + ' failed';
                    _.statusline.onclick = function() {
                        _.statusline.parentNode.removeChild(_.statusline);
                    };
                };
                if (_.files[_.index].substr(0, 2) === '//') {
                    el.src = _.files[_.index];
                }
                else {
                    el.src = server + '/' + _.files[_.index] + '.js';
                }
                _.head.appendChild(el);
                ++_.index;
                _.statusline.innerHTML = title+': loading "' + el.src + '" ' + _.index + ' / ' + _.files.length + '...';
            }
            else {
                _.statusline.parentNode.removeChild(_.statusline);
                delete _.statusline;
                
                /*create hidden main div*/
                var el = document.createElement('div');
                el.style.position = 'fixed';
                el.style.height = '32px';
                el.style.width = '220px';
                el.style.marginLeft = '-110px';
                el.style.top = '0';
                el.style.left = '50%';
                el.style.padding = '5px 10px';
                el.style.zIndex = 1001;
                el.style.fontSize = '12px';
                el.style.color = '#222';
                el.style.backgroundColor = '#f99';
                document.body.appendChild(el);
                $(el).append('<div></div>', {id: 'downloadify'});
                
                /*
                el.innerHTML = message;
                */
                var downloadSuccess = function() {
                    jQuery(el).fadeOut('slow', function() {
                        jQuery(this).remove();
                    });
                };
                
                var dlfyBtn,
                getData = function(){                
                    var zip = new JSZip();
                    
                    var imageData, baseSixFourData;
                    if(window.screenGrab){
                        imageData = window.screenGrab.toDataURL("image/png");
                        baseSixFourData = imageData.substr(imageData.search(',')+1);
                        
                        zip.file('screenshot.png', baseSixFourData, {base64: true});
                    }
                    
                	return zip.generate(); /*return document.getElementById('data').value;*/
            	};
                
                $('#dlfyWrapper').hide();
    
                dlfyBtn = Downloadify.create('downloadify',{
                	filename: function(){
            			return 'download.zip';
            		},
                    dataType: 'base64',
            		data: getData,
            		onComplete: downloadSuccess,
            		onCancel: function(){ ; },
            		onError: function(){ ; },
            		swf: server+'/'+'media/downloadify.swf',
            		downloadImage: server+'/'+'images/download.png',
            		width: 100,
            		height: 30,
            		transparent: true,
            		append: false
            	});
            
                $(document.body).html2canvas({
                    /*flashcanvas: "../external/flashcanvas.min.js",*/
                    afterRender: function(canvas){
                        window.screenGrab = canvas;
                        $('#dlfyWrapper').show();
                    },
                    logging: true,
                    profile: true,
                    useCORS: true
                });
                
                /*add downloadify button to hidden div*/
                /*take canvas snapshot; onRender, unhide downloadify button*/
                /*downloadify.onSuccess = remove/delete main div*/
                $(document.documentElement).html2canvas({
                    logging: debug,
                    profile: profile,
                    proxy: proxy
                });
            }
        }
    }, statusline = loader.statusline;
    statusline.style.position = 'fixed';
    statusline.style.bottom = '0px';
    statusline.style.right = '20px';
    statusline.style.backgroundColor = 'white';
    statusline.style.border = '1px solid black';
    statusline.style.borderBottomWidth = '0px';
    statusline.style.padding = '2px 5px';
    statusline.style.zIndex = 9999999;
    document.body.appendChild(statusline);
    loader.onload();
}());