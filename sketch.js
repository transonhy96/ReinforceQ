var cols, rows,cnv;
var environments = [];
var button,greeting,btnSubmit,btnStop,fps,score,fail,episode,info;
var state; 
var Qtable = {};
var start,end,action;
var roboto;
var frate,scoreNum,failNum,episodeNum,totalReward,numState;

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
  speed : 1,
  loop : true,
  max_step :200,
  totalEpisode:300,
  epsilon:1,
  max_epsilon : 1.0 ,
  min_epsilon : 0.01,
  learningRate:0.7,
  discountRate : 0.99
  
}
function preload() {
  roboto = loadFont('assets/RobotoMono-Light.ttf');
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

  
  for (let x= 0; x < cols; x++) {
    environments[x] = new Array(rows);
    
  }
  for(let i = 0;i<cols;i++){
    for(let j=0;j<rows;j++){
      var data = mazeData[i][j];
      var cell = new Cell(i,j,data.reward,data.isObstacle);
      if(!data.isObstacle){
        numState++;
        var q = new Q(i,j);
        Qtable[i+'x'+j] = q;
      }
      environments[i][j] = cell;
    }
  }
  console.table(Qtable);

  start = environments[1][0];
  end = environments[7][8];
  end.reward = 100;
  state = start;
  state.highLight(color(0,255,0),config.offset,config.isShowCoordinate,true);
}

function draw() {

    episodes --;
    maxStep --;
   
    // if(episodes==0){
    //   noLoop();
    //   // save Qtable
    // }
    if(maxStep==0){
      maxStep = config.max_step;
      failNum++;
      state = start;
      totalReward=0;
    }
    background(51);
    frate = frameRate();
    fps.html('Fps : ' + parseInt(frate) + "s");
    score.html('Score : ' + scoreNum);
    fail.html('Fail : ' + failNum);
    episodeNum = scoreNum+failNum;
    episode.html('Episode : ' + episodeNum);
    for(let i = 0;i<cols;i++){
      for(let j=0;j<rows;j++){
          environments[i][j].show(config.isShowCoordinate);
      }
    }
    info.html(`State : ${numState}  \nAction: 4 (up,down,left,right)`);
    
    let exploration_exploitation_trade_off = random(0, 1);
    // greedy epislon
    if (exploration_exploitation_trade_off > config.epsilon){
      action = Qtable[state.i +'x'+ state.j].getAction();  // Exploit learned values
      console.log("action:" + action);
      //console.log("Action exploit:" + action);
    }
    else{
      action = state.explore(environments); // Randomly pick an action
      if(action==-1){
        reset();
      }
     // console.log("Action explore:" + action);
    }

    console.log(`(${state.i},${state.j})`);
    console.log(action);
    // take action (a) and observe the outcome stats(s') get the reward (r)
    var nextState  = state.takeStep(action,environments);
    //console.log(nextState);
    if(nextState==undefined){
      reset();
    }
    else{
    // update the q_table using Bellman equation
    // using Q(s,a) = Q(s,a) + learningRate * [R(s,a) + gamma * maxQ(s',a') - Q(s,a)]
    let next_max = Qtable[nextState.i +'x'+ nextState.j].max();
    let new_value = (1 - config.learningRate) * Qtable[state.i +'x'+ state.j][action] + config.learningRate * (nextState.reward + config.discountRate * next_max);
    console.log(new_value);
    Qtable[state.i +'x'+ state.j][action] = new_value;

    state = nextState;
   
    state.highLight(color(0,255,0),config.offset,config.isShowCoordinate,true);
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
