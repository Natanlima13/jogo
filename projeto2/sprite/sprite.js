function sprite(x,y,largura,altura){
this.x=x;
this.y=y;
this.largura=largura;
this.altra=altura;

this.desenha=function(xcanvas,ycanvas){
    ctx.drawImage(img,this.x,this.y,this.largura,this.altura,xcanvas,ycanvas,this.largura,this.altura);
}
}