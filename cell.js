class Cell {
    constructor(i,j,_reward,_isObstacle) {
      this.i = i;
      this.j = j;
      this.reward = _reward;
      this.isObstacle = _isObstacle;
      this.visited = false;
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
    explore(environment){
      var i = this.i;
      var j = this.j;
      var actions = [];
      if(i < cols -1 )
      {
          var top  = environment[i+1][j];
          if(!top.isObstacle && top!=start){
            actions.push(ACTION.UP);
          }
      }
      if(i > 0)
      {
         var right = environment[i-1][j];
         if(!right.isObstacle && right!=start){
          actions.push(ACTION.RIGHT);
         }
      }
      if(j < rows -1)
      {
        var bottom = environment[i][j+1];
        if(!bottom.isObstacle && bottom!=start){
          
          actions.push(ACTION.DOWN);
        }
      }
      if(j > 0)
      {
        var left = environment[i][j-1];
        if(!left.isObstacle && left!=start){
          
          actions.push(ACTION.LEFT);
        }
      }
      if(actions.length==0){
        return -1;
      }
      else if(actions.length==1){
        return actions[0];
      }
      else{
        return actions[round(random(0, actions.length))];;
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
  }