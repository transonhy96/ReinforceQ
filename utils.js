const CellSide = {
    TOP:0,
    RIGHT:1,
    BOTTOM:2,
    LEFT:3
  }; 
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
    getNextActions: function(maps,host){
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
        
    },
    checkDeptNeighbor: function(maps,history,host){
        var neighbors = [];
        var i = host.i;
        var j = host.j;
        if(i < cols -1 )
        {
          var right  = maps[i+1][j];
          if(right && right.walls[CellSide.LEFT] == false && host.walls[CellSide.RIGHT]== false && !history.includes(right)){
            neighbors.push(right);
          }
        }
        if(i > 0)
        {
            var left = maps[i-1][j];
            if(left && left.walls[CellSide.RIGHT] == false && host.walls[CellSide.LEFT]== false && !history.includes(left)){
                neighbors.push(left);
            }
        }
        if(j < rows -1)
        {
          var bottom = maps[i][j+1];
          if(bottom && bottom.walls[CellSide.TOP] == false && host.walls[CellSide.BOTTOM]== false && !history.includes(bottom)){
            neighbors.push(bottom);
          }
        }
        if(j > 0)
        {
          var top = maps[i][j-1];
          if(top && top.walls[CellSide.BOTTOM] == false && host.walls[CellSide.TOP]== false && !history.includes(top)){
            neighbors.push(top);
          }
        }
        if(neighbors.length > 0){
          var r = floor(random(0, neighbors.length));
          return neighbors[r];
        }
        else{
          return undefined;
        }
        
    },
    removeWalls: function(cellA,cellB){
      
      
        var a = cellA.i - cellB.i;
        var b = cellA.j - cellB.j;
        if(a ===1){
          //console.log("LEFT");
          cellA.walls[CellSide.LEFT] = false;
          cellB.walls[CellSide.RIGHT] = false;
        }
        else if(a ===-1){
          //console.log("RIGHT");
          cellA.walls[CellSide.RIGHT] = false;
          cellB.walls[CellSide.LEFT] = false;
        }
        if(b ===1){
          //console.log("TOP");
          cellA.walls[CellSide.TOP] = false;
          cellB.walls[CellSide.BOTTOM] = false;
        }
        else if(b ===-1){
          //console.log("BOTTOM");
          cellA.walls[CellSide.BOTTOM] = false;
          cellB.walls[CellSide.TOP] = false;
        }
        
    }
      
}