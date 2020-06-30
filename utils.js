
const utils = {
    heuristic: function(neighbor,end){
        return abs(neighbor.i -  end.i) +  abs(neighbor.j, end.j);
    },
    removeFromArr: function(arr, el){
        for (let index = arr.length - 1; index >= 0; index--) {
           if(arr[index]==el){
               arr.splice(index,1);
           }
        }
    },
    getNextState: function(state,action,environment){
        var i = state.i;
        var j = state.j;
       
        var newState = undefined;
        if(action == ACTION.UP)
        {
            var top  = environment[i+1][j];
            if(!top.isObstacle){
              newState= top;
            }
        }
        if(action == ACTION.RIGHT)
        {
          var right = environment[i-1][j];
          if(!right.isObstacle){
            newState= right;
          }
        }
        if(action == ACTION.DOWN)
        {
          var bottom = environment[i][j+1];
          if(!bottom.isObstacle){
            newState= bottom;
          }
        }
        if(action == ACTION.LEFT)
        {
          var left = environment[i][j-1];
          if(!left.isObstacle){
            newState= left;
          }
        }
        return newState;
        
    }
      
}