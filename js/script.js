import { Z_ASCII } from "zlib";

window.onload = function(){
    //some variables 
    var r, g, b, gray;
    var character, line = "";

    //sprite stuff
    var sprite = document.getElementById("sprite");
    var W = sprite.width;
    var H = sprite.height;

    //temporary canvas for pixel processing 
    var tcanvas = document.createElement("canvas");
    tcanvas.width = W;
    tcanvas.height = H; //same as the image 
    var tc = tcanvas.getContext("2d");
    //drawing the image on the canvas 
    tc.drawImage(sprite, 0, 0, W, H);

    //accessing pixel data 
    var pixels = tc.getImageData(0, 0, W, H);
    var colordata = pixels.data;
    //every pixel gives 4 integers -> r, g, b, a 
    //so length of colordata array is W*H*4
    var ascii = document.getElementById("ascii");
    for (var i=0; i < colordata.length; i = i+4){
        r = colordata[i];
        g = colordata[i+1];
        b = colordata[i+2];
        //converting the pixel into grayscale 
        gray = r*0.2126 + g*0.7152 + b*0.0722;
        //Overwriting the colordata array with grayscale values 
        colordata[i] = colordata[i+1] = colordata[i+2] = gray;

        //text for ascii art 
        //blackish = dense characters like "W", "@"
        //whitish = light characters like "`", "." 
        if(gray > 250) {
            characer = "";//almost white 
        } else if (gray > 230) {
            character = "`";
        } else if (gray > 200) {
            character = ":";
        } else if (gray > 175) {
            character = "*";
        } else if (gray > 150) {
            character = "+";
        } else if (gray > 125) {
            character = "#";
        } else if (gray > 50) {
            character = "W";
        } else {
            character = "@"; //almost black 
        }

        //newlines and injection into dom 
        if(i != 0 && (i/4)%W == 0) { //if the pointer reaches the end of pixel-line
            ascii.appendChild(document.createTextNode(line));
        }

        line += character;
    }

    //repainting the gray image 
    tc.putImageData(pixels, 0, 0);
    //you can see the grayscale version of the sprite now 
    //injecting the canvas into the DOM 
    sprite.parentNode.insertBefore(tcanvas, sprite);
    //you can see the canvas now with the image 

}

