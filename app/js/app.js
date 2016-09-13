var app= angular.module("graphApp",[]);
app.controller("graphController",function($scope){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var nLinhas = 2;
    var nColunas = 5;
    var radius = 50;
    var x = 100;
    var y = 100;
    var distance = 30;
    var nCircles= 10;
    var nNodes= [0,0];
    var nNodesL1=0; //numero de nodes na linha 1
    var nNodesL2=0; //numero de nodes na linha 2
    


    function graph(){
        var matrix= new Array(nCircles);
        for(var linha = 0; linha <nCircles;linha++){
            matrix[linha]=new Array(nCircles-linha);
            for(var coluna=linha;coluna<nCircles;coluna++){
                matrix[linha].push(0);
            }
        }
        for(var linha = 0; linha <matrix.length;linha++){
            console.log(matrix[linha]);
        }
    }
    graph();


    function drawGraph(){
        for(var n = 1, i=1; n<=nCircles;i++){
            for(var l =1;l<=nLinhas && n<=nCircles;l++,n++){
                drawCircles(i,l);
                if(n<(nCircles-1)) {
                    drawHorizontalLine(i,l);
                }
                if(l==1 && n < nCircles){
                   drawVerticalLine(i,l);
                }
            }
        }
    };
    function drawCircles(coluna,linha){
        ctx.beginPath();
        ctx.arc(calculaDistanciaNode(coluna),calculaDistanciaNode(linha),radius,0,2*Math.PI);
        ctx.stroke();
    };
    function drawHorizontalLine(coluna,linha){
        ctx.beginPath();
        ctx.moveTo(x+radius+calculaDistancia(coluna),y+calculaDistancia(linha));
        ctx.lineTo(x+radius+distance+calculaDistancia(coluna),y+calculaDistancia(linha));
        ctx.stroke();
    };

    function drawVerticalLine(coluna,linha){
        ctx.beginPath();
        ctx.moveTo(x+calculaDistancia(coluna),y+radius+calculaDistancia(linha));
        ctx.lineTo(x+calculaDistancia(coluna),y+radius+distance+calculaDistancia(linha));
        ctx.stroke();
    };
    function calculaDistancia(n) {
        return ((2*radius+distance)*(n-1));
    }
    function calculaDistanciaNode(number){
        return x+(2*radius*(number-1))+(distance*(number-1));
    }
    function calculaPosicaoNode(number){
        return x+(2*radius*(number))+(distance*(number));
    }
    $scope.addOnClick=function($event){
        console.log({x:$event.offsetX});
        var xC = $event.offsetX;
        var yC = $event.offsetY;
        for(var linha=0;linha<2;linha++){
            for(var coluna= 0;coluna<nNodes[linha];coluna++){
                var nodeX=calculaPosicaoNode(coluna);
                var nodeY=calculaPosicaoNode(linha);
                console.log({
                    nodeX:nodeX,
                    nodeY:nodeY,
                    x:xC,
                    y:yC
                });
                if((xC>=(nodeX-radius) && xC<=(nodeX+radius))
                    && (yC>=(nodeY-radius) && yC<=(nodeY+radius))){
                    console.log("You have clicked on the node at line "+(linha+1) +" and column "+ (coluna+1));
                }
            }
        }



    };
    $scope.addNode= function(number){
        if(nNodes[number-1]<5){
            nNodes[number-1]++;
            drawCircles(nNodes[number-1],number)
        }
        console.log(number);
    }

    //drawGraph();
});