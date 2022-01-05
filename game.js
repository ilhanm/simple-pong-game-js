(function () {
    var CSS = {
        arena: {
            width: 900,
            height: 600,
            background: '#62247B',
            position: 'fixed',
            top: '50%',
            left: '50%',
            zIndex: '999',
            transform: 'translate(-50%, -50%)'
        },
        ball: {
            width: 15,
            height: 15,
            position: 'absolute',
            top: 0,
            left: 350,
            borderRadius: 50,
            background: '#C6A62F'
        },
        line: {
            width: 0,
            height: 600,
            borderLeft: '2px dashed #C6A62F',
            position: 'absolute',
            top: 0,
            left: '50%'
        },
        stick: {
            width: 12,
            height: 85,
            position: 'absolute',
            background: '#C6A62F'
        },
        stick1: {
            left: 0,
            top: 150
        },
        stick2: {
            top: 150,
            right: 0
        }
    };

    var CONSTS = {
        gameSpeed: 20,
        score1: 0,
        score2: 0,
        stick1Speed: 0,
        stick2Speed: 0,
        ballTopSpeed: 0,
        ballLeftSpeed: 0
    };

    function start() {
        draw();
        setEvents();
        roll();
        
        loop();
    }

    function draw() {
        $('<div/>', { id: 'pong-game' }).css(CSS.arena).appendTo('body');
        $('<div/>', { id: 'pong-line' }).css(CSS.line).appendTo('#pong-game');
        $('<div/>', { id: 'pong-ball' }).css(CSS.ball).appendTo('#pong-game');
        $('<div/>', { id: 'stick-1' }).css($.extend(CSS.stick1, CSS.stick)).appendTo('#pong-game');
        $('<div/>', { id: 'stick-2' }).css($.extend(CSS.stick2, CSS.stick)).appendTo('#pong-game');
    }
    function setEvents() {
        $(document).on('keydown', function (e) {
            if (e.keyCode == 87) {
                CONSTS.stick1Speed = -10;
            }
            if (e.keyCode == 83) {
                CONSTS.stick1Speed = 10;
            }

            if (e.keyCode == 38) {
                CONSTS.stick2Speed = -10;
            }
            if (e.keyCode == 40) {
                CONSTS.stick2Speed = 10;
            }


        });

        $(document).on('keyup', function (e) {
            if (e.keyCode == 87) {
                CONSTS.stick1Speed = 0;
            }
            if (e.keyCode == 83) {
                CONSTS.stick1Speed = 0;
            }

            if (e.keyCode == 40) {
                CONSTS.stick2Speed = 0;
            }
            if (e.keyCode == 38) {
                CONSTS.stick2Speed = 0;
            }

        });
    }

    function loop() {
        window.pongLoop = setInterval(function () {
            if ((CONSTS.stick1Speed == -10) || (CONSTS.stick1Speed === 10)) {
                if ((CSS.stick1.top + CONSTS.stick1Speed) < 0) {
                    CSS.stick1.top = 0;
                }
                else if (CSS.stick1.top + CONSTS.stick1Speed > CSS.arena.height - CSS.stick1.height) {
                   // console.log(CSS.stick1.top);
                    CSS.stick1.top = CSS.arena.height - CSS.stick1.height;

                   // console.log(CSS.stick1.top);
                }
                else {
                    CSS.stick1.top += CONSTS.stick1Speed;
                    
                }
                $('#stick-1').css('top', CSS.stick1.top);
            }

            if ((CONSTS.stick2Speed == -10) || (CONSTS.stick2Speed === 10)) {
                if ((CSS.stick2.top + CONSTS.stick2Speed) < 0) {
                    CSS.stick2.top = 0;
                }
                else if (CSS.stick2.top + CONSTS.stick2Speed > CSS.arena.height - CSS.stick2.height) {
                    //console.log(CSS.stick2.top);
                    CSS.stick2.top = CSS.arena.height - CSS.stick2.height;

                    //console.log(CSS.stick2.top);
                }
                else {
                    CSS.stick2.top += CONSTS.stick2Speed;                    
                }
                $('#stick-2').css("top", CSS.stick2.top);
            }




             CSS.ball.top += CONSTS.ballTopSpeed; //hareketlendir
             CSS.ball.left += CONSTS.ballLeftSpeed;
             

            if ( CSS.ball.top <= 0 || CSS.ball.top >= CSS.arena.height - CSS.ball.height) {
                CONSTS.ballTopSpeed = CONSTS.ballTopSpeed * -1; //aşağı-yukarı çarpma durumunda dikeyde ters yönde hareket                 
            }

            $("#pong-ball").css({ "top": CSS.ball.top, "left": CSS.ball.left }); 

            if (CSS.ball.left < CSS.stick.width-CSS.ball.width) 
            {
                if((CSS.ball.top > CSS.stick1.top && CSS.ball.top < (CSS.stick1.top + CSS.stick.height))){  //carpisma gerceklesirse()
                (CONSTS.ballLeftSpeed = CONSTS.ballLeftSpeed * -1)
                console.log("carpisma sol");      
                gameSpeed--;
                 }
                else {
                    CONSTS.score1++;
                    roll();
                }
                
            }

            if (CSS.ball.left >= CSS.arena.width- CSS.stick.width - CSS.ball.width) {
               if((CSS.ball.top > CSS.stick2.top && CSS.ball.top < CSS.stick2.top + CSS.stick.height)){
                (CONSTS.ballLeftSpeed = CONSTS.ballLeftSpeed * -1);
                console.log("çarpışma sağ");
                gameSpeed--;
               }
               else{
                CONSTS.score2++;
                
                roll();                
               }
               
            }
            
            $('#scoreboard').html(`Skor: ${CONSTS.score2} - ${CONSTS.score1}`);

            if(CONSTS.score1>4){
                alert("Sağ taraf kazandı.")
                CONSTS.score1=0;
            }
            if(CONSTS.score2>4){
                alert("Sol taraf kazandı.")
                CONSTS.score2=0;
            }
            

        }, CONSTS.gameSpeed);
    }



    function roll() {
        CSS.ball.top = 300;
        CSS.ball.left = 450;

        var side = -1;

        if (Math.random() < 0.5) {
            side = 1;
        }

        CONSTS.ballTopSpeed = Math.random() * -2 - 3;
        CONSTS.ballLeftSpeed = side * (Math.random() * 2 + 3);
    }

    start();
})();