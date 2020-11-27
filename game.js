class Game {
    constructor() {

    }

    // hide() {
    // this.greeting.hide();
    // this.button.hide();
    // this.input.hide();
    // this.fruits.hide();
    // }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
        if (gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form()
            form.display();
        }
        player1 = createSprite(200, 500);
        player1.addImage("player1", player_img);

        player2 = createSprite(800, 500);
        player2.addImage("player2", player_img);
        players = [player1, player2];
    }

    play() {
        form.hide();

        Player.initDB();
        image(back_img, 0, 0, 1000, 800);
        var x = 100;
        var y = 200;
        var index = 0;
        drawSprites();
        for (var plr in allPlayers) {
            var p = allPlayers[plr]
            index = index + 1;
            x = 500 - p.distance;
            y = 500;

            players[index - 1].x = x;
            players[index - 1].y = y;

            if (index === player.index) {

                fill("black");
                textSize(25);
                text(p.name, x - 25, y + 25);
            }
        }

        if (player.index != null) {
            if (keyIsDown(RIGHT_ARROW)) {
                player.distance -= 10
            } else if (keyIsDown(LEFT_ARROW)) {
                player.distance += 10    
            }
            player.update();
        }
        
        if (frameCount % 20 === 0) {
            fruit = createSprite(random(100, 1000), 0, 100, 100);
            fruit.velocityY = 6;
    
            var rand = Math.round(random(1, 5));
            switch (rand) {
                case 1: fruit.addImage("fruit1", fruit1_img);
                    break;
                case 2: fruit.addImage("fruit1", fruit2_img);
                    break;
                case 3: fruit.addImage("fruit1", fruit3_img);
                    break;
                case 4: fruit.addImage("fruit1", fruit4_img);
                    break;
                case 5: fruit.addImage("fruit1", fruit5_img);
                    break;
            }
            fruitGroup.add(fruit);
        }


        if (player.index != null) {
            player.getInfo()
            console.log("Player " + player.index + " Score - " + player.score)
            for (var i = 0; i<fruitGroup.length; i++) {
                var f = fruitGroup.get(i)
                var currPlayer = players[player.index-1]
                if (currPlayer.isTouching(f)) {
                    fruitGroup.remove(f)
                    player.updateScore(1)
                    player.score = player.getInfo().score
                    f.destroy()
                }
            }

            // fill code here, to destroy the objects.
            // this.fruits.hide()
        }
    }

    end() {
        console.log("Game Ended");
    }
}