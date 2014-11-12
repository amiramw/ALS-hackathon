sap.ui.controller("view.speechMp3", {
	/*****
	 * Thanks:
	 * The code is based on the following implementations:
	 * 
		https://github.com/welll/record-encode-audio-from-browser
		
		https://github.com/nusofthq/Recordmp3js
		https://github.com/akrennmair/speech-to-server
		https://github.com/remusnegrota/Recorderjs
	 */
	
	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 * @memberOf view.speech
	 */
	onInit: function() {
		  
		  var audioContext = new AudioContext;
		  var audioRecorder;
		  var _realAudioInput;

		  window.AudioContext = window.AudioContext || window.webkitAudioContext;
		  window.URL = window.URL || window.webkitURL;
		  
		  this.startUserMedia = function(stream) {

		    console.log('handlerStartUserMedia');
		    console.log('sampleRate:'+ audioContext.sampleRate);

		    _realAudioInput = audioContext.createMediaStreamSource(stream);

		    audioRecorder = new Recorder(_realAudioInput);
		  }
		  
		  this.startRecording = function() {
		    if(!audioRecorder)
		      return;
		    audioRecorder && audioRecorder.record();
		  }

		  this.stopRecording = function() {
		    if(!audioRecorder)
		      return;
		    audioRecorder && audioRecorder.stop();
		  }

		  //This function is called when user presses on the image of microphone
			this.toggleRecording = function(e){
				if (e.hasStyleClass("recording")) {
					// stop recording
					this.stopRecording();
					e.removeStyleClass("recording");
				} else {
					// start recording
					e.addStyleClass("recording");
					this.startRecording();
				}
			}
	},

	onFinish: function(evt) {
		//Upload to server
		var mp3Data = Recorder.blob;
		var reader = new FileReader();
		reader.onload = function(event){
			var fd = new FormData();
			var mp3Name = encodeURIComponent('audio_recording_' + new Date().toISOString() + '.mp3');
			console.log("mp3name = " + mp3Name);
			fd.append('fname', mp3Name);
			fd.append('data', event.target.result);
			alert("before ajax");
			$.ajax({
				type: 'POST',
				url: alsApp.RELATIVE_SERVER_URL,
				data: {
					data: fd, 
					task: "speech"
				},
				processData: false,
				contentType: false
			}).done(function(msg) {
				console.log("File uploaded: " + msg);
				alsApp.to("completedPage");
			})	.fail(function(e) {
				console.error("Error saving audio data on server" + e);
			});
		};      
		reader.readAsDataURL(mp3Data);
	},
	
    onAfterRendering : function(){

            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
            navigator.cancelAnimationFrame = navigator.cancelAnimationFrame || navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame || navigator.msCancelAnimationFrame;
            navigator.requestAnimationFrame = navigator.requestAnimationFrame || navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame || navigator.msRequestAnimationFrame;

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
                    }
                }, this.startUserMedia, function(e) {
                    alert('Error getting audio');
                    console.log(e);
                });

    }
});