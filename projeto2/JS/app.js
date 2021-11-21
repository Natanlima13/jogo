var canvas;
var ctx;
var ALTURA;
var LARGURA;
var frames=0;
var Chao={
    y: 550,
    altura:50,
    cor:"#006400",
    desenha: function(){
        ctx.fillStyle=this.cor;
        ctx.fillRect(0, this.y, LARGURA, this.altura);
    }
};
var maxpulo = 3;
var velocidade = 6;
var img;
var estadoAtual;
estado ={
jogar:0,
jogando:1,
perdeu:2
};
var obstaculo ={
    _obs:[],
    cores: ["#363636","#808080","#191970","#00FFFF"],
    tempoinsere: 0,
    insere: function(){
        this._obs.push({
            x: LARGURA,
            largura: 30 + Math.floor(40 * Math.random()),
            altura: 30 + Math.floor(120* Math.random()),
            cor: this.cores[Math.floor(4*Math.random())]

        });
        this.tempoinsere = 30 + Math.floor(21*Math.random());
    },
    atualiza:function(){
        if (this.tempoinsere == 0)
        this.insere();
        else this.tempoinsere--;
        for(var i = 0,tam = this._obs.length; i < tam; i++){
            var obs = this._obs[i];
            obs.x -= velocidade;
            if (bloco.x < obs.x + obs.largura && bloco.x + bloco.largura >= obs.x && bloco.y + bloco.altura >= Chao.y - obs.altura){
                estadoAtual=estado.perdeu;
            }
            else if(obs.x <= -obs.largura){
                this._obs.splice(i,1);
                tam--;
                i--;
            }
        }
    },
    limpa: function(){
        this._obs =[];
    },
    desenha: function (){
        for(var i = 0,tam = this._obs.length; i < tam; i++){
            var obs = this._obs[i];
            ctx.fillStyle = obs.cor;
            ctx.fillRect(obs.x,Chao.y - obs.altura, obs.largura, obs.altura);
        }
    },
};
var bloco ={
    x:50,
    y:0,
    altura:50,
    largura:50,
    cor:"#FF4500",
    gravidade:1.5,
    velocidade:0,
    forcadopulo: 20,
    qntpulo:0,
    

    atualiza: function(){
        this.velocidade += this.gravidade;
            this.y += this.velocidade;
            if(this.y > Chao.y - this.altura && estadoAtual != estado.perdeu){
                this.y = Chao.y -this.altura;
                this.qntpulo=0;
                this.velocidade=0;
            }
    },
    pula: function(){
        if(this.qntpulo<maxpulo){
        this.velocidade= - this.forcadopulo;
        this.qntpulo++;
    }
       

    },
    reset:function(){
        this.velocidade=0;
        this.y = 0;
    },
    desenha: function() {
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
    }
}



function clique(evento){
    if(estadoAtual==estado.jogando)
    bloco.pula();
    else if (estadoAtual==estado.jogar){
        estadoAtual=estado.jogando;
    }
    else if (estadoAtual==estado.perdeu){
        estadoAtual=estado.jogar;
        obstaculo.limpa();
        bloco.reset();
    }
}
function roda(){
    atualiza();
    desenha();
    window.requestAnimationFrame(roda);
}
function atualiza(){
    frames++;
    bloco.atualiza();
   if(estadoAtual==estado.jogando)
    obstaculo.atualiza();
    
   
}
function desenha(){
    ctx.fillStyle="#1E90FF";
    ctx.fillRect(0,0,LARGURA,ALTURA);
    if(estadoAtual== estado.jogar){
        ctx.fillStyle="green";
        ctx.fillRect(LARGURA/2-50,ALTURA/2-50,100,100);
    }
    else if(estadoAtual==estado.perdeu){
        ctx.fillStyle="red";
        ctx.fillRect(LARGURA/2-50,AlTURA/2-190,100,100);
    }
    else if(estadoAtual==estado.jogando)
    obstaculo.desenha();
    
    Chao.desenha();
    
    bloco.desenha();
}
function main(){
    AlTURA =window.innerHeight;
    LARGURA =window.innerWidth;
    if(LARGURA>=500){
        LARGURA=600;
        ALTURA=600;
    }
    canvas = document.createElement("canvas");
    canvas.width=LARGURA;
    canvas.height=ALTURA;
    canvas.style.border="1px solid #000";

    ctx=canvas.getContext("2d");
    document.body.appendChild(canvas);
    document.addEventListener("mousedown", clique);
    estadoAtual=estado.jogar;
    
    roda();
}
main();