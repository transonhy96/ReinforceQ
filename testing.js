var cols, rows,cnv;
var environments = {};
var button,greeting,btnSubmit,btnStop,fps,score,fail,episode,info;
var state,previousAction; 
var Qtable = {};
var start,end,action;
var roboto;
var frate,scoreNum,failNum,episodeNum,totalReward,numState;
var trainedData;
var maxStep;
var episodes;
const ACTION = {
  UP:"up",
  DOWN:"down",
  LEFT:"left",
  RIGHT:"right"
}; 
var config = {
  environmentSize : 1270,
  w:60,
  offset:730,
  lineStroke:6,
  allowSolve : false,
  moreSolution:false,
  isShowCoordinate:true,
  speed : 60,
  loop : true,
  desireStep :15,
  max_step :100,
  totalEpisode:300,
  epsilon:1,
  max_epsilon : 1.0 ,
  min_epsilon : 0.01,
  learningRate:0.7,
  discountRate : 0.99,
  decayRate :0.01   
  
}
function preload() {
  roboto = loadFont('assets/RobotoMono-Light.ttf');
  trainedData = loadJSON("Qtable.json");
  if(!config.loop){
    noLoop();
  }
}
function setup() {

  cnv = createCanvas(config.environmentSize, config.environmentSize);
  textFont(roboto);
  setUpComponent();
  frameRate(config.speed);
  textAlign(CENTER);

  
  totalReward = 0;
  numState= 0;
  cols = rows = mazeData.length;
  maxStep = config.max_step;
  episodes = config.totalEpisode;

  epsilon = config.epsilon;
  decay_rate = config.decayRate;
  
  for(let i = 0;i<cols;i++){
    for(let j=0;j<rows;j++){
      var data = mazeData[i][j];
      var cell = new Cell(i,j,data.reward,data.isObstacle);
      if(!data.isObstacle){
        numState++;
        var Qarr = trainedData[i+'x'+j];
        console.log(Qarr);
        var up = Qarr[ACTION.UP];
        var down = Qarr[ACTION.DOWN];
        var left = Qarr[ACTION.LEFT];
        var right = Qarr[ACTION.RIGHT];
        var q = new Q(up,down,left,right);
        Qtable[i+'x'+j] = q;
      }
      environments[i+'x'+j] = cell;
    }
  }
  console.table(Qtable);
  previousAction = "";
  start = environments['1x0'];
  end = environments['7x8'];
  start.reward =-100;
  start.highLight(color(0,255,0),config.offset,config.isShowCoordinate,true);
  end.reward = 100;
  state = start;
  
  
}

function draw() {
    
    episodes --;
    maxStep --;
    
    // if(episodes==0){
    //   noLoop();
    //   // save Qtable
    // }
    
    background(51);
    frate = frameRate();
    fps.html('Fps : ' + parseInt(frate) + "s");
    score.html('Score : ' + scoreNum);
    fail.html('Fail : ' + failNum);
    episodeNum = scoreNum+failNum;
    episode.html('Episode : ' + episodeNum);
    for(let i = 0;i<cols;i++){
      for(let j=0;j<rows;j++){
          environments[i+'x'+j].show(config.isShowCoordinate);
      }
    }
    info.html(`State : ${numState}  \nAction: 4 (up,down,left,right)`);
    action = Qtable[state.i +'x'+ state.j].getAction(state,environments); 
      
      var nextState  = state.takeStep(action,environments);
      state = nextState;
      //previousAction = action;
      //console.log(previousAction);
      state.highLight(color(0,255,0),config.offset,config.isShowCoordinate,true);
      if(state == end){
        scoreNum++;
        state = start;
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
function setUpComponent(){
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
  fps.position(config.environmentSize-300, 19);


  info = createElement('pre', 'State');
  info.style('font-size', '15px');
  info.style('font-family',"RobotoMono-Light");
  info.style('color', '#fff');
  info.position(config.environmentSize-820, 19);



  episodeNum =0;
  episode = createElement('h5', 'Episode : 0');
  episode.style('font-size', '15px');
  episode.style('font-family',"RobotoMono-Light");
  episode.style('color', '#fff');
  episode.position(config.environmentSize-300, 39);

  scoreNum =0;
  score = createElement('h5', 'Score : 0');
  score.style('font-size', '15px');
  score.style('font-family',"RobotoMono-Light");
  score.style('color', '#fff');
  score.position(config.environmentSize-300, 59);

  failNum =0;
  fail = createElement('h5', 'Fail : 0');
  fail.style('font-size', '15px');
  fail.style('font-family',"RobotoMono-Light");
  fail.style('color', '#fff');
  fail.position(config.environmentSize-300, 79);

  

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
}
function reset(){
    failNum++;
    state = start;
    totalReward = 0;
}
