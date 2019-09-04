AIJS = function() {
    var self = {};

    self.velocities = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    self.getNextMove = function(game) {
        var index = 0;
        var distance = 100000;

        for (var i = 0; i < self.velocities.length; i++) {
            var position = [game.head[0] + self.velocities[i][0], game.head[1] + self.velocities[i][1]];

            if (game.board.isFruit(position)) {
                return self.velocities[i];
            } else if (game.board.isEmpty(position)) {
                var d = Math.sqrt(Math.pow(position[0] - game.board.getFruit()[0], 2) + Math.pow(position[1] - game.board.getFruit()[1], 2));
                if (d < distance) {
                    distance = d;
                    index = i;
                }
            }
        }

        return self.velocities[index];
    };

    return self;
}