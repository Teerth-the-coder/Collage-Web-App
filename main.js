var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function start() {
    document.getElementById("textbox").innerHTML = "";
    recognition.start();
}

recognition.onresult = function (event) {
    console.log(event);
    content = event.results[0][0].transcript;
    document.getElementById("textbox").innerHTML = content;

    if (content.toLowerCase() == "take selfie") {
        speak();
        Webcam.attach(camera);
    }
}

function takeSelfie(num) {
    Webcam.snap(
        function (data) {
            document.getElementById("img" + num).innerHTML = "<img width = 200 height = 300 src=" + data + " >";
        }
    )
}

function speak() {
    for (let i = 1; i < 4; i++) {
        speakData = "Taking Your Selfie In" + 5*i + "Seconds";
        synth = window.speechSynthesis;
        utterthis = new SpeechSynthesisUtterance(speakData);
        synth.speak(utterthis);

        setTimeout(
            function () {
                takeSelfie(i);
            }, 5000 * i
        )
    }

}


Webcam.set({
    width: 360,
    height: 250,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

