(function() {
    /* options, customize to your needs */
    var title = 'screenshotify',
    server = 'https://raw.github.com/juancgarcia/screenshotify/master/Downloadify-652377f',
    proxy = '//html2canvas.appspot.com',
    debug = true,
    profile = false,
    scriptFiles = [
        '//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js',
        'js/jquery.plugin.html2canvas',
        'js/html2canvas'
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
                _.statusline.innerHTML = title+': loading \'' + el.src + '\' ' + _.index + ' / ' + _.files.length + '...';
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
                $(el).attr({id: 'dlfyWrapper'})/*.append($('<div></div>', {id: 'downloadify'}))*/;/*$('div#dlfyWrapper div#downloadify')*/
                
                $('#dlfyWrapper').hide();
            
                $(document.body).html2canvas({
                    /*flashcanvas: "../external/flashcanvas.min.js",*/
                    afterRender: function(canvas){
                        //window.screenGrab = canvas;
                        link = document.createElement('a');
                        $('#dlfyWrapper').show().append(
                            $(link).attr({id: 'screenshot', href: canvas.toDataURL() }).text('screenshot')
                        );
                        $('div#dlfyWrapper a#screenshot').bind('click', function(){
                            $('div#dlfyWrapper').delay(2000).fadeOut(2000).delay(2000).remove();
                        });
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
})();