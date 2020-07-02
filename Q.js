class Q {
    constructor(u=0,d=0,l=0,r=0) {
      this.up = u;
      this.down = d;
      this.left = l;
      this.right = r;
    }
    max(){
        //console.log(this);
        return Math.max(...Object.values(this));
    }
    getAction(state,environment){
      var i = state.i;
      var j = state.j;
      var actions = [];
      if(j > 0)
      {
          var top  = environment[i+'x'+(j-1)];
          if(!top.isObstacle){
            actions.push(ACTION.UP);
          }
      }
      if(j < rows - 1)
      {
        var bottom = environment[i+'x'+(j+1)];
        if(!bottom.isObstacle){
          
          actions.push(ACTION.DOWN);
        }
      }
      if(i < cols - 1)
      {
         var right = environment[(i+1)+'x'+j];
         if(!right.isObstacle ){
          actions.push(ACTION.RIGHT);
         }
      }
      
      if(i > 0)
      {
        var left = environment[(i-1)+'x'+j];
        if(!left.isObstacle){
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
        var Q = this;
        let max = Q[actions[0]];
        var res = actions[0];
        for (let index = 1; index < actions.length; index++) {
          const action = actions[index];
          if(Q[action] > max){
            max = Q[action];
            res = action;
          }
        }
        return res;
      }
       
    }
  }