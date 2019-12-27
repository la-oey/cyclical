var curr = 2197;
var binCurr = 0;
var counter = null;
var chosen = null;
var audio = null;


// TODO, Potentially: pick randomly between human/threePoints instructions.
function pageLoad() {
    document.getElementById('screen').style.display = 'block';
}

function next(currentInstruct) {
    var arrInd = getDict(currentInstruct);
    $(".txt").html(text[arrInd]["toptext"]);
    $("#txtImg").html("<img src='"+text[arrInd]["src"]+"'></img>");
    document.getElementById('right-move').setAttribute('onclick','next("'+text[arrInd]["after"]+'");');
    document.getElementById('left-move').setAttribute('onclick','prev("'+text[arrInd]["before"]+'");');
    var prevInstruct = text[arrInd]["before"];
    
    if(currentInstruct == "root14"){


        // console.log(text[arrInd]["src"])
        // $('#txtImg').html("<canvas width='500px' height='400px' data-processing-sources='"+text[arrInd]["src"]+"'></canvas>")
    } else if(currentInstruct == "root22"){
    	var canvassvg = "<svg id='canvasSVG' width='600' height='300'><g transform='translate(300, 110)'></g></svg>"
    	$('#txtImg').append(canvassvg);
    	var arcGenerator = d3.arc().innerRadius(128).outerRadius(136);

		var arcData = [
			{startAngle: 0.2 * Math.PI, endAngle: 0.8 * Math.PI},
			{startAngle: 1.2 * Math.PI, endAngle: 1.8 * Math.PI}
		];
		d3.select('g').selectAll('path').data(arcData).enter().append('path').attr('d', arcGenerator);

    	// drawRect('#canvasSVG', 'black', 5, 200, 10, 0);
    	// drawRect('#canvasSVG', 'black', 5, 200, 190, 0);
    	// var ball = "<div id='ball'><svg id='ballsvg'></svg></div>";
    	// drawCircle('#ballsvg', 'grey', 10, 50, 50);
    } else if(currentInstruct == "root24"){
        curr = 2197;
        binaryCount();
    } else if(prevInstruct == "root24"){
        clearInterval(counter);
        console.log(binCurr);
        var splitHist = getDict("history3");
        var convergeHist = getDict("history4");
        if(binCurr <= 1111){
            var whereTo = "dock0";
        } else if(binCurr > 1111 & binCurr < 11111111){
            var whereTo = "hammock0";
        } else{
            var whereTo = "family0"
        }
        text[splitHist]["after"] = whereTo;
        text[convergeHist]["before"] = whereTo;
    } else if(currentInstruct == "history6"){
        if(window.confirm("Do you want to continue searching your memory?")){
        	document.getElementById('right-move').setAttribute('onclick','next("togod0");');
        } else{
            document.getElementById('right-move').setAttribute('onclick','next("cycle0");');
            var redirectFuture = getDict("cycle0");
            text[redirectFuture]["before"] = "history6";
        }
    } else if(currentInstruct == "god1"){
    	audio = new Audio('audio/typing.mp3');
    	audio.play(); 
    } else if(currentInstruct == "god2"){
    	audio.pause(); 
    } else if(currentInstruct == "abyss1"){
    	text[getDict("end0")]["before"] = "abyss1";
    } else if(currentInstruct == "end0"){
        w = window.open('files/map.pdf');
        w.print();
    }

    // if(nextNum == Object.keys(instruct).length-1){
    //     //$('#right-move').css('opacity', 0.2);
    //     //document.getElementById('right-move').setAttribute('onclick','');
    //     setTimeout(function(){
    //         $('#continueInstruct').prop('disabled', false);
    //         $('#continueInstruct').css('opacity', 1);
    //     }, 2500);
    // } 
    
}


function prev(currentInstruct) {
    var arrInd = getDict(currentInstruct);
    $(".txt").html(text[arrInd]["toptext"]);
    $("#txtImg").html("<img src='"+text[arrInd]["src"]+"'></img>");
    document.getElementById('right-move').setAttribute('onclick','next("'+text[arrInd]["after"]+'");');
    document.getElementById('left-move').setAttribute('onclick','prev("'+text[arrInd]["before"]+'");');

    if(currentInstruct == "root24"){
        curr = 2197;
        binaryCount();
    } else if(currentInstruct == "god0"){
    	audio.pause(); 
    } else if(currentInstruct == "god1"){
    	audio = new Audio('audio/typing.mp3');
    	audio.play(); 
    }

    // if(prevNum == 0){
    //     $('#left-move').css('opacity', 0.2);
    //     document.getElementById('left-move').setAttribute('onclick','');
    // } 

    // if(prevNum == Object.keys(instruct).length - 2){
    //     $('#continueInstruct').prop('disabled', true);
    //     $('#continueInstruct').css('opacity', 0);
    // } 
    
}

function drawRect(container, color, width, height, locX, locY){
    d3.select(container).append("rect").attr("x",locX).attr("y",locY).attr("width",width).attr("height",height).attr("stroke-width",2).attr("stroke","black").style("fill",color);
}

function drawCircle(container, color, size, locX, locY){
    d3.select(container).append("circle").attr("cx",locX).attr("cy",locY).attr("r",size).attr("stroke-width",2).attr("stroke","black").style("fill",color);
}


function binaryCount(){
    counter = setInterval(counting, 100);
        
    function counting(){
        if(curr == 0){
            clearInterval(counter);
            $('#countdown').html(0);
            ocument.getElementById('right-move').setAttribute('onclick','next("god0");');
        } else{
            curr = curr - 1;
            binCurr = toBinary(curr);
            $('#countdown').html(binCurr);
        }
    }
}

function getDict(id){
    for(var i=0; i<Object.keys(text).length; i++){
        if(text[i]["id"] == id){
            return i;
        }
    }
}


function toBinary(dec){
    return (dec >>> 0).toString(2);
}

function choose(choice){
    if(choice == 0){
        $('#accept').css('opacity','1');
        $('#reject').css('opacity','0.5');
        chosen = "accept";
        document.getElementById('right-move').setAttribute('onclick','next("cycle0");');
        var redirectFuture = getDict("cycle0");
        text[redirectFuture]["before"] = "god11";
    } else{
        $('#reject').css('opacity','1');
        $('#accept').css('opacity','0.5');
        chosen = "reject";
        document.getElementById('right-move').setAttribute('onclick','next("abyss0");');
    }
    $('#right-move').prop('disabled',false);
}

