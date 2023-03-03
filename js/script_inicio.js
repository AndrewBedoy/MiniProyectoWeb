var pos_x = 0, c, ctx, img;

function animacion() {

    ctx.clearRect(0, 0, 1300, 100);
    ctx.drawImage(img, pos_x, 0);
    pos_x += 1;
    setTimeout(animacion, 10);



}

window.onload = function () {
    c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");
    img = new Image();
    img.src = "../img/Gallo copy.png";
    ctx.drawImage(img, pos_x, 0);
    


    animacion();
}
