Game = function() {

    var self = {};

    self.ctx = document.getElementById("canvas-game").getContext("2d"); 

    self.board = Board();

    self.auto = false;
    self.ai = null;

    self.head = [4, 4];
    self.tail = [];
    self.last = [3, 4];

    self.velocity = [1, 0];
    self.nextVelocity = [1, 0];

    self.start = function() {
        self.board.initilize();
        self.board.setHead(self.head);
        self.generateFruit();
    };

    self.setAuto = function() {
        self.auto = true;
        self.ai = AIJS();
    };

    document.body.onkeydown = function(e) {

        if (self.auto) { return; }

        switch(e.keyCode) {
            case 37: case 65: 
                self.nextVelocity = [-1, 0];
                break;
            case 38: case 87: 
                self.nextVelocity = [0, -1]; 
                break;
            case 39: case 68: 
                self.nextVelocity = [1, 0]; 
                break;
            case 40: case 83: 
                self.nextVelocity = [0, 1]; 
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

            if (self.auto) { return; }

			if (direction == "left") {
                self.nextVelocity = [-1, 0]; 
                return;
			}
			if (direction == "right") {
                self.nextVelocity = [1, 0]; 
                return;
			}			
			if (direction == "down") {
                self.nextVelocity = [0, 1]; 
                return;
			}
			if (direction == "up") {
                self.nextVelocity = [0, -1]; 
                return;
			}
		},
		//Default is 75px, set to 0 for demo so any distance triggers swipe
	   threshold:0
	});
});
/*END Swipe*/


    self.update = function() {

        if (self.auto) {
            self.nextVelocity = self.ai.getNextMove(self);
        }

        if (self.nextVelocity[0] == -1 && (self.velocity[0] != 1 || self.tail.length == 0)) {
            self.velocity = [-1, 0]; 
        }
        if (self.nextVelocity[1] == -1 && (self.velocity[1] != 1 || self.tail.length == 0)) {
            self.velocity = [0, -1]; 
        }
        if (self.nextVelocity[0] == 1 && (self.velocity[0] != -1 || self.tail.length == 0)) {
            self.velocity = [1, 0]; 
        }
        if (self.nextVelocity[1] == 1 && (self.velocity[1] != -1 || self.tail.length == 0)) {
            self.velocity = [0, 1]; 
        }

        self.board.setEmpty(self.head);

        var x = self.head[0] + self.velocity[0];
        var y = self.head[1] + self.velocity[1];

        if (!self.board.isWall([x, y]) && !self.board.isTail([x, y])) {

            self.last = [self.head[0], self.head[1]];

            if (self.tail.length > 0) {
                self.last = [self.tail[self.tail.length-1][0], self.tail[self.tail.length-1][1]];
                self.board.setEmpty(self.last);
                for (var i = self.tail.length-1; i > 0; i--) {
                    self.tail[i][0] = self.tail[i-1][0];
                    self.tail[i][1] = self.tail[i-1][1];
                }

                self.tail[0][0] = self.head[0];
                self.tail[0][1] = self.head[1];
                self.board.setTail(self.tail[0]);
            }
            self.head[0] = x;
            self.head[1] = y;

            
        } else {
            window.location.href = '/';
        }

        if (self.board.isFruit([x, y])) {
            self.tail.push([self.last[0], self.last[1]]);
            self.board.setTail(self.last);
            self.generateFruit();
            $("#score-number").html(self.tail.length);
        }
       
        self.board.setHead(self.head);



        self.draw();
    }

    self.draw = function () {

        self.ctx.clearRect(0, 0, self.board.width*(self.board.tileSize+1), self.board.height*(self.board.tileSize+1));
        self.ctx.fillStyle = "#9A7A49";
        self.ctx.fillRect(0, 0, self.board.width*(self.board.tileSize+1), self.board.height*(self.board.tileSize+1));

        for (let y=0; y<self.board.height; y++) {

           for (let x=0; x<self.board.width; x++) {

                if (self.board.isEmpty([x, y])) { 
                    self.ctx.fillStyle = "green";
                } else if (self.board.isHead([x, y])) { 
                    self.ctx.fillStyle = "red";
                } else if (self.board.isTail([x, y])) { 
                    self.ctx.fillStyle = "blue";
                } else if (self.board.isFruit([x, y])) { 
                    self.ctx.fillStyle = "purple";
                } else if (self.board.isWall([x, y])) { 
                    self.ctx.fillStyle = "yellow";
                }

                self.ctx.fillRect((self.board.tileSize*x)+x+1, (self.board.tileSize*y)+y+1, self.board.tileSize, self.board.tileSize);
            }
        }

    }

    self.generateFruit = function() {
        var x;
        var y;
        do {
            x = Math.floor(Math.random() * self.board.width);
            y = Math.floor(Math.random() * self.board.height);
        } while(!self.board.isEmpty([x, y]));

        self.board.setFruit([x, y]);
    }

    return self;
}