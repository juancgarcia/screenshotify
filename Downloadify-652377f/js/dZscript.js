/*http://decodebase64.com/#*/
$(document).ready(function(){
    /*
        <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
        <script type="text/javascript" src="js/jquery.plugin.html2canvas.js"></script>
    	<script type="text/javascript" src="js/html2canvas.js"></script>
        
		<script type="text/javascript" src="js/swfobject.js"></script>
		<script type="text/javascript" src="js/downloadify.min.js"></script>
        <script type="text/javascript" src="http://stuartk.com/jszip/jszip.js"></script>
        <script type="text/javascript" src="http://stuartk.com/jszip/jszip-deflate.js"></script>
		<script type="text/javascript" src="js/dZscript.js">*/
    var el = document.createElement('div'),
    dlfyBtn,
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
		onComplete: function(){ alert('Your File Has Been Saved!'); },
		onCancel: function(){ alert('You have cancelled the saving of this file.'); },
		onError: function(){ alert('You must put something in the File Contents or there will be nothing to save!'); },
		swf: 'media/downloadify.swf',
		downloadImage: 'images/download.png',
		width: 100,
		height: 30,
		transparent: true,
		append: false
	});
            
    $(document.body).html2canvas({
        //flashcanvas: "../external/flashcanvas.min.js",
        afterRender: function(canvas){
            window.screenGrab = canvas;
            $('#dlfyWrapper').show();
        },
        logging: true,
        profile: true,
        useCORS: true
    });
    
});