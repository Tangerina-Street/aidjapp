song = "";
leftWristX = "";
rightWristX = "";
leftWristY = "";
rightWristY = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload()
{
    song = loadSound("music.mp3");
}
function setup()
{
    canvas = createCanvas(500, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);

}
function draw()
{
    image(video,0,0,500,500);

    fill("#e0cc12");
    stroke("#e0cc12");
    
    if (scoreLeftWrist > 0.2)
    {
        circle(leftWristX,leftWristY,20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftWristY);
        leftWristY_divide_100 = remove_decimals/1000;
        volume = leftWristY_divide_1000*2;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
    if (scoreLeftWrist > 0.2)
    {
        circle(rightWristX,rightWristY,20);
        if(rightWristY > 0 && rightWristY <= 100)
        {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }
        if(rightWristY > 100 && rightWristY <= 200)
        {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }
        if(rightWristY > 200 && rightWristY <= 300)
        {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }
        if(rightWristY > 300 && rightWristY <= 400)
        {
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }
        if(rightWristY > 400 && rightWristY <= 500)
        {
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }
}
function play()
{
    song.play(); 
    song.setVolume(1);
    song.rate(1);  
}
function stop()
{
    song.stop();
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("leftWrist = "+leftWristX+"leftWristY = "+leftWristY);
        console.log("rightWrist = "+rightWristX+"rightWristY = "+rightWristY);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist + "scoreRightWrist = " + scoreRightWrist);
    }
}
function modelLoaded()
{
    console.log("poseNet has been initialized!");
}
