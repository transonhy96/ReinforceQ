class Q {
    constructor(i,j) {
      this.up = 0;
      this.down = 0;
      this.left = 0;
      this.right = 0;
    }
    max(){
        console.log(this);
        return Math.max(...Object.values(this));
    }
    getAction(){
       return Object.keys(this)[max()];
    }
  }