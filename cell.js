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
    getNextActions(maps){
      var neighbors = [];
      var i = this.i;
      var j = this.j;

      if(i < cols -1 )
      {
          var top  = maps[i+1][j];
          if(!top.isObstacle){
            neighbors.push(top);
          }
          
      }
      if(i > 0)
      {
         var right = maps[i-1][j];
         if(!right.isObstacle){
          neighbors.push(right);
         }
          
      }
      if(j < rows -1)
      {
        var bottom = maps[i][j+1];
        if(!bottom.isObstacle){
         neighbors.push(bottom);
        }
      }
      if(j > 0)
      {
        var left = maps[i][j-1];
        if(!left.isObstacle){
         neighbors.push(left);
        }
      }
      return neighbors;
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