GUI = function () {

    var self = {};

    self.ctx = document.getElementById("canvas-game").getContext("2d"); 

    self.boardWidth = 48;
    self.boardHeight = 32;
    self.tileSize = 16;

    self.head = [4, 4];
    self.tail = [];
    self.last = [3, 4];
    self.velocity = [1, 0];

    self.board = [];

    self.start = function() {
        for (var y = 0; y < self.boardHeight; y++) {
            self.board.push([]);
            for (var x = 0; x < self.boardWidth; x++) {
                if (y == 0 || y == self.boardHeight - 1 || x == 0 || x == self.boardWidth -1) {
                    self.board[y][x] = 4;
                } else {
                    self.board[y][x] = 0;
                }
            }
        }

        self.board[self.head[1]][self.head[0]];
        self.generateFruit();
    };

    document.body.onkeydown = function(e) {
        switch(e.keyCode) {
            case 37: case 65: 
                if (self.velocity[0] != 1 || self.tail.length == 0) {
                    self.velocity = [-1, 0]; 
                }
                break;
            case 38: case 87: 
                if (self.velocity[1] != 1 || self.tail.length == 0) {
                    self.velocity = [0, -1]; 
                }
                break;
            case 39: case 68: 
                if (self.velocity[0] != -1 || self.tail.length == 0) {
                    self.velocity = [1, 0]; 
                }
                break;
            case 40: case 83: 
                if (self.velocity[1] != -1 || self.tail.length == 0) {
                    self.velocity = [0, 1]; 
                }
                break;
            case 32: 
                e.preventDefault(); 
                break;
            default: break;
        }
    };

$(function() {			
	//Enable swiping...
	$("body").swipe( {
		//Generic swipe handler for all directions
		swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
			if (direction == "left") {
                if (self.velocity[0] != 1 || self.tail.length == 0) {
                    self.velocity = [-1, 0]; 
                }
			}
			if (direction == "right") {
                if (self.velocity[1] != 1 || self.tail.length == 0) {
                    self.velocity = [0, -1]; 
                }
			}			
			if (direction == "down") {
                if (self.velocity [0] != -1 || self.tail.length == 0) {
                    self.velocity = [1, 0]; 
                }
			}
			if (direction == "up") {
                if (self.velocity[1] != -1 || self.tail.length == 0) {
                    self.velocity = [0, 1]; 
                }
			}
		},
		//Default is 75px, set to 0 for demo so any distance triggers swipe
	   threshold:0
	});
});
/*END Swipe*/


    self.update = function() {

        self.board[self.head[1]][self.head[0]] = 0;

        var x = self.head[0] + self.velocity[0];
        var y = self.head[1] + self.velocity[1];

        if (self.board[y][x] != 4 && self.board[y][x] != 2) {

            self.last = [self.head[0], self.head[1]];

            if (self.tail.length > 0) {
                self.last = [self.tail[self.tail.length-1][0], self.tail[self.tail.length-1][1]];
                self.board[self.last[1]][self.last[0]] = 0;
                for (var i = self.tail.length-1; i > 0; i--) {
                    self.tail[i][0] = self.tail[i-1][0];
                    self.tail[i][1] = self.tail[i-1][1];
                }

                self.tail[0][0] = self.head[0];
                self.tail[0][1] = self.head[1];
                self.board[self.tail[0][1]][self.tail[0][0]] = 2;
            }
            self.head[0] = x;
            self.head[1] = y;

            
        } else {
            window.location.href = '/';
        }

        if (self.board[y][x] == 3) {
            self.tail.push([self.last[0], self.last[1]]);
            self.board[self.last[1]][self.last[0]] = 2;
            self.generateFruit();
            $("#score-number").html(self.tail.length);
        }
       
        self.board[self.head[1]][self.head[0]] = 1;



        self.draw();
    }

    self.draw = function () {

        self.ctx.clearRect(0, 0, self.boardWidth*(self.tileSize+1), self.boardHeight*(self.tileSize+1));
        self.ctx.fillStyle = "#9A7A49";
        self.ctx.fillRect(0, 0, self.boardWidth*(self.tileSize+1), self.boardHeight*(self.tileSize+1));

        for (let y=0; y<self.boardHeight; y++) {

           for (let x=0; x<self.boardWidth; x++) {

                if (self.board[y][x] == 0) { 
                    self.ctx.fillStyle = "green";
                    self.ctx.fillRect((self.tileSize*x)+x+1, (self.tileSize*y)+y+1, self.tileSize, self.tileSize);
                    continue; 
                } else if (self.board[y][x] == 1) { 
                    self.ctx.fillStyle = "red";
                    self.ctx.fillRect((self.tileSize*x)+x+1, (self.tileSize*y)+y+1, self.tileSize, self.tileSize);
                    continue; 
                } else if (self.board[y][x] == 2) { 
                    self.ctx.fillStyle = "blue";
                    self.ctx.fillRect((self.tileSize*x)+x+1, (self.tileSize*y)+y+1, self.tileSize, self.tileSize);
                    continue; 
                } else if (self.board[y][x] == 3) { 
                    self.ctx.fillStyle = "purple";
                    self.ctx.fillRect((self.tileSize*x)+x+1, (self.tileSize*y)+y+1, self.tileSize, self.tileSize);
                    continue; 
                } else if (self.board[y][x] == 4) { 
                    self.ctx.fillStyle = "yellow";
                    self.ctx.fillRect((self.tileSize*x)+x+1, (self.tileSize*y)+y+1, self.tileSize, self.tileSize);
                    continue; 
                }
            }
        }

    }

    self.generateFruit = function() {
        do {
            var x = Math.floor(Math.random() * self.boardWidth);
            var y = Math.floor(Math.random() * self.boardHeight);
        } while(self.board[y][x] != 0);

        self.board[y][x] = 3;
    }

    return self;
}