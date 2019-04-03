Board = function() {
    
    var self = {};

    self.board = [];

    self.width = 48;
    self.height = 32;
    self.tileSize = 16;

    self.initilize = function() {
        for (var y = 0; y < self.height; y++) {
            self.board.push([]);
            for (var x = 0; x < self.width; x++) {
                if (y == 0 || y == self.height - 1 || x == 0 || x == self.width -1) {
                    self.board[y][x] = 4;
                } else {
                    self.board[y][x] = 0;
                }
            }
        }
    };

    self.setEmpty = function(pos) {
        self.board[pos[1]][pos[0]] = 0;
    };

    self.setHead = function(pos) {
        self.board[pos[1]][pos[0]] = 1;
    };

    self.setTail = function(pos) {
        self.board[pos[1]][pos[0]] = 2;
    };

    self.setFruit = function(pos) {
        self.board[pos[1]][pos[0]] = 3;
    };

    self.isEmpty = function(pos) {
        return self.board[pos[1]][pos[0]] == 0;
    };

    self.isHead = function(pos) {
        return self.board[pos[1]][pos[0]] == 1;
    };

    self.isTail = function(pos) {
        return self.board[pos[1]][pos[0]] == 2;
    };

    self.isFruit = function(pos) {
        return self.board[pos[1]][pos[0]] == 3;
    };

    self.isWall = function(pos) {
        return self.board[pos[1]][pos[0]] == 4;
    };

    return self;
}