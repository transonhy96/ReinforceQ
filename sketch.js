var cols, rows;
var maps = [];
var current; 
var backtrackStack = [];
var button,greeting,btnSubmit,btnStop,fps,score,fail;
var openSet = [];
var start,end;
var roboto;
var frate,scoreNum,failNum;
var config = {
  mazeSize : 1270,
  w:60,
  offset:910,
  lineStroke:6,
  allowSolve : false,
  moreSolution:false,
  isShowCoordinate:true,
  speed : 20,
  loop : true
}
function preload() {
  roboto = loadFont('assets/RobotoMono-Light.ttf');
}
function setup() {
  createCanvas(config.mazeSize, config.mazeSize);
  textFont(roboto);
  button = createButton('Toggle coordinates');
  button.style('font-family',"RobotoMono-Light");
  button.style('padding', '5px');
  button.style('border-radius', '4px');
  button.position(19, 19);
  button.mousePressed(hideCoordinate);
  input = createInput();
  input.style('padding', '5px');
  input.style('border-radius', '4px');
  input.position(19, 100);
  input.value(config.speed);

  

  greeting = createElement('h4', 'Change speed (Action/second)');
  greeting.style('font-size', '18px');
  greeting.style('font-family',"RobotoMono-Light");
  greeting.style('color', '#fff');
  greeting.position(19, 50);

  fps = createElement('h5', 'Fps');
  fps.style('font-size', '15px');
  fps.style('font-family',"RobotoMono-Light");
  fps.style('color', '#fff');
  fps.position(config.mazeSize-300, 19);


  scoreNum =0;
  score = createElement('h5', 'Score : 0');
  score.style('font-size', '15px');
  score.style('font-family',"RobotoMono-Light");
  score.style('color', '#fff');
  score.position(config.mazeSize-300, 39);

  failNum =0;
  fail = createElement('h5', 'Fail : 0');
  fail.style('font-size', '15px');
  fail.style('font-family',"RobotoMono-Light");
  fail.style('color', '#fff');
  fail.position(config.mazeSize-300, 59);

  btnSubmit = createButton('Submit');
  btnSubmit.style('font-family',"RobotoMono-Light");
  btnSubmit.style('padding', '2px');
  input.style('border-radius', '4px');
  btnSubmit.position(input.x + input.width + 10, 102);
  btnSubmit.mousePressed(changeSpeed);

  btnStop = createButton('Stop');
  btnStop.style('font-family',"RobotoMono-Light");
  btnStop.position(19, 140);
  btnStop.mousePressed(stopLoop);
  frameRate(config.speed);

  textAlign(CENTER);


  cols = rows = mazeData.length;
  for (let x= 0; x < cols; x++) {
    maps[x] = new Array(rows);
  }
  for(let i = 0;i<cols;i++){
    for(let j=0;j<rows;j++){
      var data = mazeData[i][j];
      maps[i][j] = new Cell(i,j,data.visited,data.walls);
    }
  }
  start = maps[0][0];
  end = maps[0][cols-1];
  current = start;
}

function draw() {
    
    background(51);
    frate = frameRate();
    fps.html('Fps : ' + parseInt(frate) + "s");
    score.html('Score : ' + scoreNum);
    fail.html('Fail : ' + failNum);
    for(let i = 0;i<cols;i++){
      for(let j=0;j<rows;j++){
          maps[i][j].show(config.isShowCoordinate);
      }
    }
    
    var nextActions = utils.getNextActions(maps,current);
    if(current==undefined){
      failNum++;
      current = start;
    }
    if(nextActions.length==0){
      failNum++;
      current = start;
    }
    nextActions.forEach(n => {
      n.highLight(color(0,0,255),config.offset);
    });
    var r = floor(random(0, nextActions.length));
    var next = nextActions[r];
    current.highLight(color(0,255,0),config.offset,config.isShowCoordinate,true);
    //console.log(next);
    if(next){
      current = next;
      if(current==start){
        failNum++;
      }
    }
    else{
      next = nextActions[abs(r-1)];
      current = next;
    }
    if(current==end){
      current = start;
      scoreNum++;
    }
}
function hideCoordinate(){
  config.isShowCoordinate = !config.isShowCoordinate;
}
function changeSpeed(){
  frameRate(parseInt(input.value()));
  setFrameRate(parseInt(input.value()));
}
function stopLoop(){
  config.loop = ! config.loop;
  if(config.loop){
    loop();
  }
  else{
    noLoop();
  }
}
