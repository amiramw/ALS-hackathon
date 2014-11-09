// gyro.js

var x = 0,
	y = 0,
	vx = 0,
	vy = 0,
	ax = 0,
	ay = 0;

var data = {
	"data": [{
		"a": "a",
		"b": "b",
		"c": "c",
	}]
};

var recording = false; // TODO: change to false

var sphere = document.getElementById("sphere");

if (window.DeviceMotionEvent != undefined) {
	window.ondevicemotion = function(e) {
		ax = event.accelerationIncludingGravity.x * 5;
		ay = event.accelerationIncludingGravity.y * 5;
		document.getElementById("accelerationX").innerHTML = e.accelerationIncludingGravity.x;
		document.getElementById("accelerationY").innerHTML = e.accelerationIncludingGravity.y;
		document.getElementById("accelerationZ").innerHTML = e.accelerationIncludingGravity.z;

		var read = {};
		read.accelerationX = e.accelerationIncludingGravity.x;
		read.accelerationY = e.accelerationIncludingGravity.y;
		read.accelerationZ = e.accelerationIncludingGravity.z;

		if (e.rotationRate) {
			document.getElementById("rotationAlpha").innerHTML = e.rotationRate.alpha;
			document.getElementById("rotationBeta").innerHTML = e.rotationRate.beta;
			document.getElementById("rotationGamma").innerHTML = e.rotationRate.gamma;
			read.rotationRateAlpha = e.rotationRate.alpha;
			read.rotationRateBeta = e.rotationRate.beta;
			read.rotationRateGamma = e.rotationRate.gamma;
		}

		if (recording) {
			data.data.push(read);
		}
	}

	setInterval(function() {
		var landscapeOrientation = window.innerWidth / window.innerHeight > 1;
		if (landscapeOrientation) {
			vx = vx + ay;
			vy = vy + ax;
		} else {
			vy = vy - ay;
			vx = vx + ax;
		}
		vx = vx * 0.98;
		vy = vy * 0.98;
		y = parseInt(y + vy / 50);
		x = parseInt(x + vx / 50);

		boundingBoxCheck();

		sphere.style.top = y + "px";
		sphere.style.left = x + "px";
	}, 25);
}


function boundingBoxCheck() {
	if (x < 0) {
		x = 0;
		vx = -vx;
	}
	if (y < 0) {
		y = 0;
		vy = -vy;
	}
	if (x > document.documentElement.clientWidth - 20) {
		x = document.documentElement.clientWidth - 20;
		vx = -vx;
	}
	if (y > document.documentElement.clientHeight - 20) {
		y = document.
		documentElement.clientHeight - 20;
		vy = -vy;
	}

}

function send(data) {
	$.post("http://10.26.181.49:8081", JSON.stringify(data))
		.done(function (res) {
			alert("server: " + res);
		})
		.error(function (e) {
			alert("error: " + e)
		});
}

function startRec () {
	recording = true;
}

function stopRec () {
	recording = false;
}

document.getElementById('send').onclick = function() {
	send(data);
}

document.getElementById('rec').onclick = function() {
	if (recording) {
		recording = false;
		$('#rec').html("Start Recording");
	} else {
		recording = true;
		$('#rec').html("Stop Recording");
	}

}
document.getElementById('send').onclick = function() {
	// send(data);
	alert(JSON.stringify(data))
}