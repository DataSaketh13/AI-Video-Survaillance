video = "";
objects = [];


function preload(){
    video = createVideo('video.mp4');
    video.hide();
}

function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    
    document.getElementById("status").innerHTML = 'Detecting Objects'
}

function modelLoaded(){
    console.log('Model loaded');
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }else{
        console.log(results);
        objects = results;

    }
}

function draw(){
    image(video, 0, 0, 480, 380);

    if(status != ""){
        objectDetector.detect(video, gotResult);
        
        for(i = 0 ; i<objects.length ; i++){

            document.getElementById("status").innerHTML = "Objects Detected";
            document.getElementById("number_objects").innerHTML = "Number of Objects: " + objects.length;

            fill('red');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);

            noFill();
            stroke('red');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

