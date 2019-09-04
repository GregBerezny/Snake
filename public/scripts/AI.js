AIJS = function() {
    var self = {};

    self.velocities = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    self.getNextMove = function(game) {
        var index = 0;
        var distance = 100000;
        var rank = [];

        for (var i = 0; i < self.velocities.length; i++) {
            var position = [game.head[0] + self.velocities[i][0], game.head[1] + self.velocities[i][1]];

            if (game.board.isFruit(position)) {
                return self.velocities[i];
            } else if (game.board.isEmpty(position)) {
                var d = Math.sqrt(Math.pow(position[0] - game.board.getFruit()[0], 2) + Math.pow(position[1] - game.board.getFruit()[1], 2));
                
                rank.push([i, d]);
               
            }
        }

        for (var i = 0; i < rank.length; i++) {
            var hasEmpty = false;

            for (var j = 0; j < self.velocities.length; j++) {
                var position = [game.head[0] + self.velocities[j][0] + self.velocities[rank[i][0]][0], game.head[1] + self.velocities[j][1] + self.velocities[rank[i][0]][1]];

                if (game.board.isEmpty(position)) {
                    hasEmpty = true;
                    break;
                }
            }

            if (!hasEmpty) {
                rank[i][1] = 1000000000;
            }
        }

        for (var i = 0; i < rank.length; i++) {
             if (rank[i][1] < distance) {
                distance = rank[i][1];
                index = rank[i][0];
            }
        }

        return self.velocities[index];
    };

    return self;
}