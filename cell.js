class Cell {
    constructor(i,j,_reward,_isObstacle) {
      this.i = i;
      this.j = j;
      this.reward = _reward;
      this.isObstacle = _isObstacle;
      this.visited = false;
      this.trails = [];
      this.previousAction ="";
    }
    highLight(color,isShowCoordinate=true, isCurrent=false){
  
      var x = this.i * config.w + config.offset/2;
      var y = this.j * config.w + config.offset/2;
      fill(color);
      noStroke();
      if(!isCurrent){
        rect(x,y,config.w-2,config.w -2);
      }
      else{
        circle(x+config.w/2, y+config.w/2, config.w/2);
      }
      if(isShowCoordinate){
        textSize(16);
        fill(0);
        text(`${this.i}:${this.j}`, x + (config.w/2) , y + (config.w/2)+6);
      }
  
    }
    explore(previousAction,environment){
      var i = this.i;
      var j = this.j;
      var actions = [];
      if(j > 0)
      {
          var top  = environment[i+'x'+(j-1)];
          if(!top.isObstacle && previousAction !=ACTION.DOWN){
            actions.push(ACTION.UP);
          }
      }
      if(j < rows - 1)
      {
        var bottom = environment[i+'x'+(j+1)];
        if(!bottom.isObstacle && previousAction !=ACTION.UP){
          
          actions.push(ACTION.DOWN);
        }
      }
      if(i < cols - 1)
      {
         var right = environment[(i+1)+'x'+j];
         if(!right.isObstacle && previousAction !=ACTION.LEFT){
          actions.push(ACTION.RIGHT);
         }
      }
      
      if(i > 0)
      {
        var left = environment[(i-1)+'x'+j];
        if(!left.isObstacle && previousAction !=ACTION.RIGHT){
          actions.push(ACTION.LEFT);
        }
      }
      
      //console.log(actions);
      if(actions.length==0){
        return -1;
      }
      else if(actions.length==1){
        return actions[0];
      }
      else{
        var r = round(random(0, actions.length - 1));
        //console.log(r);
        return actions[r];
      }
     
    }
    show(isShowCoordinate){
      var xCor = this.i * config.w + config.offset/2;
      var yCor = this.j * config.w + config.offset/2;
      noStroke();
      if(isShowCoordinate){
        textSize(16);
        fill(255);
        text(`${this.i}:${this.j}`, xCor + (config.w/2) , yCor + (config.w/2)+6);
      }
      if(this.isObstacle){
        fill(255,0,255,100);
      }
      else{
        fill(255,255,255,0);
        
      }
      rect(xCor, yCor, config.w-1, config.w-1);
      
    }
    addTrail(state){
      this.trails = state.trails;
      if(this.trails.length == 1){
        this.trails.pop();
      }
      this.trails.push(state);
    }
    takeStep(action,environment){
      var i = this.i;
      var j = this.j;
     
      var newState = undefined;
      if(action == ACTION.UP)
      {
          var top  = environment[(i)+'x'+(j-1)];
          if(!top.isObstacle){
            newState= top;
          }
      }
      if(action == ACTION.RIGHT)
      {
        var right = environment[(i+1)+'x'+j];
        if(!right.isObstacle){
          newState= right;
        }
      }
      if(action == ACTION.DOWN)
      {
        var bottom = environment[(i)+'x'+(j+1)];
        if(!bottom.isObstacle){
          newState= bottom;
        }
      }
      if(action == ACTION.LEFT)
      {
        var left = environment[(i-1)+'x'+(j)];
        if(!left.isObstacle){
          newState= left;
        }
      }
      return newState;
      
  }
  }