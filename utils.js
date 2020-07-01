
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
    
    
}