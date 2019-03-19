GUI = function () {

    var self = {};

    self.ctx = document.getElementById("canvas-game").getContext("2d"); 

    self.boardWidth = 6;
    self.boardHeight = 6;
    self.tileSize = 32;

    self.board = [[4, 4, 4, 4, 4, 4],
                 [4, 1, 0, 0, 0, 4],
                 [4, 0, 0, 0, 0, 4],
                 [4, 0, 0, 0, 0, 4],
                 [4, 0, 0, 0, 0, 4],
                 [4, 4, 4, 4, 4, 4]];

    self.draw = function () {

        self.ctx.clearRect(0, 0, self.boardWidth*self.tileSize, self.boardHeight*self.tileSize);
        self.ctx.fillStyle = "#9A7A49";
        self.ctx.fillRect(0, 0, self.boardWidth*self.tileSize, self.boardHeight*self.tileSize);

        for (let x=0; x<self.boardWidth; x++) {

           for (let y=0; y<self.boardHeight; y++) {

                if (self.board[x][y] == 0) { 
                    self.ctx.fillStyle = "green";
                    self.ctx.fillRect((self.tileSize*x)+x+1, (self.tileSize*y)+y+1, self.tileSize, self.tileSize);
                    continue; 
                } else if (self.board[x][y] == 1) { 
                    self.ctx.fillStyle = "red";
                    self.ctx.fillRect((self.tileSize*x)+x+1, (self.tileSize*y)+y+1, self.tileSize, self.tileSize);
                    continue; 
                } else if (self.board[x][y] == 2) { 
                    self.ctx.fillStyle = "blue";
                    self.ctx.fillRect((self.tileSize*x)+x+1, (self.tileSize*y)+y+1, self.tileSize, self.tileSize);
                    continue; 
                } else if (self.board[x][y] == 3) { 
                    self.ctx.fillStyle = "purple";
                    self.ctx.fillRect((self.tileSize*x)+x+1, (self.tileSize*y)+y+1, self.tileSize, self.tileSize);
                    continue; 
                } else if (self.board[x][y] == 4) { 
                    self.ctx.fillStyle = "yellow";
                    self.ctx.fillRect((self.tileSize*x)+x+1, (self.tileSize*y)+y+1, self.tileSize, self.tileSize);
                    continue; 
                }
            }
        }

    }

    return self;
}

