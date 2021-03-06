let draw = function(id) {
    //grain is basically level of detail. higher = finer.
    var grain = 5;
    var blockout = Math.random();
    var canvas = document.getElementById(id);
    var w = 20;
    var h = 20;
    canvas.width  = w;
    canvas.height = h;
    var colorArray = [];

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0,0,w,h);
        ctx.fillStyle = "transparent";
        ctx.fillRect(0,0,w,h);
        
        function randomRGB(minVal,maxVal){
            var min = Math.ceil(minVal);
            var max = Math.floor(maxVal);
            for(var i=0; i<3; i++)  {
                colorArray.push(Math.floor(Math.random() * (max - min)) + min);
            }
        }
        
        function pokeOut() {
            randomRGB(0,255);
            var posX = 0;
            var posY = 0;
            var startFillRed = colorArray[0];
            var startFillGreen = colorArray[1];
            var startFillBlue = colorArray[2];
            var colorRange = 5;
            ctx.fillStyle = "rgb(" + startFillRed + "," + startFillGreen + "," + startFillBlue + ")";
        
            for(var y=0; y<grain; y++){
                for(var x=0; x<grain; x++){
                if(blockout < .4){
                    ctx.fillRect(posX,posY,w/grain,h/grain);
                    ctx.fillRect(w-posX-w/grain,posY,w/grain,h/grain);
                    posX += w/grain;
                }else{
                    startFillRed -= colorRange;
                    startFillGreen += colorRange;
                    startFillBlue += colorRange;
                    ctx.fillStyle = "rgb(" + startFillRed + "," + startFillGreen + "," + startFillBlue + ")";
                    posX += w/grain;
                }
                blockout = Math.random();
                }
                posY += h/grain;
                posX = 0;
            }
        }
            pokeOut();
    }
}

exports.draw = draw;

/*
draw();

document.body.onkeyup = function(e){
  if(e.keyCode == 32){
    draw(); 
  }
}

var interval = window.setInterval(draw, 600);
*/

//HTML EXAMPLE
/*
<div id='container'>
  <canvas id='canvas' height='200px' width='200px'></canvas>
</div>
*/