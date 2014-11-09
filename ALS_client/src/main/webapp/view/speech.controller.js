sap.ui.controller("view.speech", {

	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 * @memberOf view.speech
	 */
	onInit: function() {

		var audioContext = new AudioContext();
		var audioInput = null,
		realAudioInput = null,
		inputPoint = null,
		audioRecorder = null;
		var rafID = null;
		var analyserContext = null;
		var canvasWidth, canvasHeight;
		var recIndex = 0;


		this.gotStream = function(stream) {
			inputPoint = audioContext.createGain();

			// Create an AudioNode from the stream.
			realAudioInput = audioContext.createMediaStreamSource(stream);
			audioInput = realAudioInput;
			audioInput.connect(inputPoint);

//			audioInput = convertToMono( input );

			analyserNode = audioContext.createAnalyser();
			analyserNode.fftSize = 2048;
			inputPoint.connect( analyserNode );

			audioRecorder = new Recorder( inputPoint );

			zeroGain = audioContext.createGain();
			zeroGain.gain.value = 0.0;
			inputPoint.connect( zeroGain );
			zeroGain.connect( audioContext.destination );

		}


		this.initAudio = function()
		{
			if (!navigator.getUserMedia)
				navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
			if (!navigator.cancelAnimationFrame)
				navigator.cancelAnimationFrame = navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame;
			if (!navigator.requestAnimationFrame)
				navigator.requestAnimationFrame = navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame;

			navigator.getUserMedia(
					{
						"audio": {
							"mandatory": {
								"googEchoCancellation": "false",
								"googAutoGainControl": "false",
								"googNoiseSuppression": "false",
								"googHighpassFilter": "false"
							},
							"optional": []
						},
					}, this.gotStream, function(e) {
						alert('Error getting audio');
						console.log(e);
					});

		}
		this.initAudio();

//		RECORDER
		var WORKER_PATH = 'js/recorderjs/recorderWorker.js';

		var Recorder = function(source, cfg){
			var config = cfg || {};
			var bufferLen = config.bufferLen || 4096;
			this.context = source.context;
			if(!this.context.createScriptProcessor){
				this.node = this.context.createJavaScriptNode(bufferLen, 2, 2);
			} else {
				this.node = this.context.createScriptProcessor(bufferLen, 2, 2);
			}

			var worker = new Worker(config.workerPath || WORKER_PATH);
			worker.postMessage({
				command: 'init',
				config: {
					sampleRate: this.context.sampleRate
				}
			});
			var recording = false,
			currCallback;

			this.node.onaudioprocess = function(e){
				if (!recording) return;
				worker.postMessage({
					command: 'record',
					buffer: [
					         e.inputBuffer.getChannelData(0),
					         e.inputBuffer.getChannelData(1)
					         ]
				});
			}

			this.configure = function(cfg){
				for (var prop in cfg){
					if (cfg.hasOwnProperty(prop)){
						config[prop] = cfg[prop];
					}
				}
			}

			this.record = function(){
				recording = true;
			}

			this.stop = function(){
				recording = false;
			}

			this.clear = function(){
				worker.postMessage({ command: 'clear' });
			}

			this.getBuffers = function(cb) {
				currCallback = cb || config.callback;
				worker.postMessage({ command: 'getBuffers' });
			}

			this.exportWAV = function(cb, type){
				currCallback = cb || config.callback;
				type = type || config.type || 'audio/wav';
				if (!currCallback) throw new Error('Callback not set');
				worker.postMessage({
					command: 'exportWAV',
					type: type
				});
			}

			this.exportMonoWAV = function(cb, type){
				currCallback = cb || config.callback;
				type = type || config.type || 'audio/wav';
				if (!currCallback) throw new Error('Callback not set');
				worker.postMessage({
					command: 'exportMonoWAV',
					type: type
				});
			}

			worker.onmessage = function(e){
				var blob = e.data;
				currCallback(blob);
			}

			source.connect(this.node);
			this.node.connect(this.context.destination);   // if the script node is not connected to an output the "onaudioprocess" event is not triggered in chrome.
		};


		Recorder.setupDownload = function(blob, filename){
			var url = (window.URL || window.webkitURL).createObjectURL(blob);

/////////////////////////
			//temp in order to check that audio was recorded
			var link = document.getElementById("link_1");
			link.href = url;
			link.download = filename || 'output.wav';
			$( "#link_1" ).attr('download', filename);
/////////////////////////

			Recorder.blob = blob;

		}



		window.Recorder = Recorder;
		/////////////////

		//main.js
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		
		function saveAudio() {
			audioRecorder.exportWAV( doneEncoding );

			// could get mono instead by saying:
			//audioRecorder.exportMonoWAV( doneEncoding );
		}

		function gotBuffers( buffers ) {
			// the ONLY time gotBuffers is called is right after a new recording is completed - 
			// so here's where we should set up the download.
			audioRecorder.exportWAV( doneEncoding );
		}

		
		function doneEncoding( blob ) {
			var filename = new Date().toISOString() + '.wav';
			Recorder.setupDownload( blob, filename);
		}

//This function is called when user presses on the image of microphone
		this.toggleRecording = function(e){
			if (e.hasStyleClass("recording")) {
				// stop recording
				audioRecorder.stop();
				e.removeStyleClass("recording");
				audioRecorder.getBuffers( gotBuffers );
			} else {
				// start recording
				if (!audioRecorder)
					return;
				e.addStyleClass("recording");

				audioRecorder.clear();
				audioRecorder.record();
			}
		}
		
		//Not in use (enables to convert wav to mono)
		function convertToMono( input ) {
			var splitter = audioContext.createChannelSplitter(2);
			var merger = audioContext.createChannelMerger(2);

			input.connect( splitter );
			splitter.connect( merger, 0, 0 );
			splitter.connect( merger, 0, 1 );
			return merger;
		}
		//Not in use
		function toggleMono() {
			if (audioInput != realAudioInput) {
				audioInput.disconnect();
				realAudioInput.disconnect();
				audioInput = realAudioInput;
			} else {
				realAudioInput.disconnect();
				audioInput = convertToMono( realAudioInput );
			}

			audioInput.connect(inputPoint);
		}
	},


	onPress: function(evt) {
		var blob = Recorder.blob;
		var file2 = new FileReader();
		file2.onloadend = function(e){		
			alert("send - before ajax call");
			//TODO: ajax call to server
			$.ajax({
				url: "",
				type: "POST",
				data: file2.result,
				processData: false,
				contentType : "text/plain"
			});
		};
		file2.readAsDataURL(blob);


	}

});