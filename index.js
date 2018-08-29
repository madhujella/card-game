var game = {
    startGame: function(){
        if(!globals.gameOver){
            this.init();
            globals.canClick = true;
        }
    },
    stopGame: function(){
        globals.gameOver = true;
        globals.mainScreen.style.display = 'block';
        setTimeout(() => {
            globals.gameScreen.innerHTML = '';
        }, 500);

    },
    changeTurn: function (prevPlayer) {
        // if(prevPlayer === 4){
        //     playerTurn = 1;
        // }else{
        //     playerTurn = prevPlayer++;
        // }
        return globals.playerTurn = prevPlayer === 2 ? 1 : 2;
    },
    init: function(){
        globals.playerTurn = 1;
        globals.gameOver = false;

        var shuffleCards = Cards.shuffle(Cards.cards);

        var splitCards = Cards.splitCards(shuffleCards);

        globals.p1Cards = splitCards.playerOne;
        globals.p2Cards = splitCards.playerTwo;

        var p1CardsHtml = generateCardsDom(globals.p1Cards);
        var p2CardsHtml = generateCardsDom(globals.p2Cards);

        var p1Screen = globals.p1Screen;
        var p2Screen = globals.p2Screen;

        

        p1Screen.innerHTML = p1CardsHtml;
        p2Screen.innerHTML = p2CardsHtml;

        setTimeout(() => {
            var p1Slider = tns({
                container: 'p1Slider',
                items: globals.p1Cards.length,
                slideBy: 'page',
                autoplay: false
            });
            var p2Slider = tns({
                container: 'p2Slider',
                items: globals.p1Cards.length,
                slideBy: 'page',
                autoplay: false
            });
        }, 500);

    },
    changeGameState: function(e){
        var self = this;
        if(e.target.matches('.activePBorn')){
            self.gameStateHelper('born');


        }else if(e.target.matches('.activePDebut')){
            self.gameStateHelper('debut');


        }else if(e.target.matches('.activePAge')){
            self.gameStateHelper('age');


        }else if(e.target.matches('.activePTitles')){
            self.gameStateHelper('titles');


        }else if(e.target.matches('.activePMatches')){
            self.gameStateHelper('matches');


        }else if(e.target.matches('.activePWins')){
            self.gameStateHelper('wins');


        }else if(e.target.matches('.activePLosses')){
            self.gameStateHelper('losses');


        }else if(e.target.matches('.activePHeight')){
            self.gameStateHelper('height');


        }else if(e.target.matches('.activePWeight')){
            self.gameStateHelper('weight');


        }else{

        }
    }, 
    gameStateHelper: function(type){
        if(globals.p1Cards.length > 0 && globals.p2Cards.length > 0){
            var p1currentCard = Cards.currentCard().p1CurrentCard;
            var p2currentCard = Cards.currentCard().p2CurrentCard;
            var wnr = p1currentCard[type] > p2currentCard[type] ? globals.player1 : globals.player2;
            
            if( globals.p1CardHealth > 0 && globals.p2CardHealth > 0 ){
                changeHealth(globals.p1CardHealth, globals.p2CardHealth, wnr);
            }
    
            var tCard = {};
            var updateCards = [];
            if( globals.p1CardHealth < 1 && globals.p2CardHealth > 0){
                tCard = Cards.removeCard(globals.p1Cards, globals.p2Cards, globals.player1);
                updateCards = Cards.tradeCard(globals.p1Cards, globals.p2Cards, tCard, globals.player2);
                globals.p1Cards = updateCards.p1Cards;
                globals.p2Cards = updateCards.p2Cards;
                
            }else if( globals.p1CardHealth > 0 && globals.p2CardHealth < 1){
                tCard = Cards.removeCard(globals.p1Cards, globals.p2Cards, globals.player2);
                updateCards = Cards.tradeCard(globals.p1Cards, globals.p2Cards, tCard, globals.player1);
                globals.p1Cards = updateCards.p1Cards;
                globals.p2Cards = updateCards.p2Cards;
            }
    
            if(globals.p1CardHealth < 1 || globals.p2CardHealth < 1){
                p1currentCard = Cards.currentCard().p1CurrentCard;
                p2currentCard = Cards.currentCard().p2CurrentCard;
                
                var p1currentCardDom = generateCurrentCardDom(p1currentCard);
                var p2currentCardDom = generateCurrentCardDom(p2currentCard);
        
                globals.p1CurrentCardScreen.innerHTML = p1currentCardDom;
                globals.p2CurrentCardScreen.innerHTML = p2currentCardDom;
        
                globals.p1CardHealth = 3;
                globals.p2CardHealth = 3;
            }

            this.changeTurn(globals.playerTurn);

        }else {
            this.stopGame();
        }

        
    }
    
}

var Cards = {
    cards: [
        {id: '01', name: 'name1', born: 'borndate', age: 1, weight:11, height:111, titles: 1, matches: 11, wins: 111, losses: 1, debut: 'debutdate', img: 'something.com/420x420'},
        {id: '02', name: 'name1', born: 'borndate', age: 1, weight:11, height:111, titles: 1, matches: 11, wins: 111, losses: 1, debut: 'debutdate', img: 'something.com/420x420'},
        {id: '03', name: 'name1', born: 'borndate', age: 1, weight:11, height:111, titles: 1, matches: 11, wins: 111, losses: 1, debut: 'debutdate', img: 'something.com/420x420'},
        {id: '04', name: 'name1', born: 'borndate', age: 1, weight:11, height:111, titles: 1, matches: 11, wins: 111, losses: 1, debut: 'debutdate', img: 'something.com/420x420'},
        {id: '05', name: 'name1', born: 'borndate', age: 1, weight:11, height:111, titles: 1, matches: 11, wins: 111, losses: 1, debut: 'debutdate', img: 'something.com/420x420'},
        {id: '06', name: 'name1', born: 'borndate', age: 1, weight:11, height:111, titles: 1, matches: 11, wins: 111, losses: 1, debut: 'debutdate', img: 'something.com/420x420'},
        {id: '07', name: 'name1', born: 'borndate', age: 1, weight:11, height:111, titles: 1, matches: 11, wins: 111, losses: 1, debut: 'debutdate', img: 'something.com/420x420'},
        {id: '08', name: 'name1', born: 'borndate', age: 1, weight:11, height:111, titles: 1, matches: 11, wins: 111, losses: 1, debut: 'debutdate', img: 'something.com/420x420'},
        {id: '09', name: 'name1', born: 'borndate', age: 1, weight:11, height:111, titles: 1, matches: 11, wins: 111, losses: 1, debut: 'debutdate', img: 'something.com/420x420'},
        {id: '10', name: 'name1', born: 'borndate', age: 1, weight:11, height:111, titles: 1, matches: 11, wins: 111, losses: 1, debut: 'debutdate', img: 'something.com/420x420'},
        {id: '11', name: 'name1', born: 'borndate', age: 1, weight:11, height:111, titles: 1, matches: 11, wins: 111, losses: 1, debut: 'debutdate', img: 'something.com/420x420'}
    ],
    shuffle: function(cards){
        var shuffledCards = [];


        return shuffledCards;
    },
    splitCards: function(cards, noOfPlayers){
    
        var playerOne = [];
        var playerTwo = [];
        // var playerThree = [];
        // var playerFour = [];
        var returnPlayersCards = {};
    
        // if(noOfPlayers === 2){
            for (var i = 0; i < cards.length; i++) {
                if(i % 2 === 0){
                    playerTwo.push(cards[i]);
                }else{
                    playerOne.push(cards[i]);
                }
            }
            returnPlayersCards.playerOne = playerOne;
            returnPlayersCards.playerTwo = playerTwo;
            return returnPlayersCards;
        // }else if(noOfPlayers === 3){
        //     for (var i = 0; i < cards.length; i++) {
        //         if(i % 3 === 0){
        //             playerThree.push(cards[i]);
        //         }else if(i % 2 === 0){
        //             playerTwo.push(cards[i]);                
        //         }else {
        //             playerOne.push(cards[i]);                
        //         }
        //     }
        //     returnPlayersCards.playerOne = playerOne;
        //     returnPlayersCards.playerTwo = playerTwo;
        //     returnPlayersCards.playerThree = playerThree;
        //     return returnPlayersCards;
        // }else if (noOfPlayers === 4){
        //     for (var i = 0; i < cards.length; i++) {
        //         if(i % 4 === 0){
        //             playerFour.push(cards[i]);
        //         }else if(i % 3 === 0){
        //             playerThree.push(cards[i]);
        //         }else if(i % 2 === 0){
        //             playerTwo.push(cards[i]);                
        //         }else {
        //             playerOne.push(cards[i]);                
        //         }
        //     }
        //     returnPlayersCards.playerOne = playerOne;
        //     returnPlayersCards.playerTwo = playerTwo;
        //     returnPlayersCards.playerThree = playerThree;
        //     returnPlayersCards.playerFour = playerFour;
        //     return returnPlayersCards;
        // }
        
    },
    getCard: function(n, arr){
        for (var i = 0; i < arr.length; i++) {
            if(arr[i].id === n){
                return arr[i];
            }
        }
        return null;
    },
    removeCard: function(p1Cards, p2Cards, loser){
        var tCard = {};
        if(loser === globals.player1){
            tCard = p1Cards.shift();
        }else if(loser === globals.player2) {
            tCard = p2Cards.shift();
        }
        return tCard;
    },
    tradeCard: function(p1Cards, p2Cards, tCard, gainer){

        if(gainer === globals.player1 && tCard){
            var c = p1Cards.shift();
            p1Cards.push(c, tCard);
        }else if(gainer === globals.player2 && tCard) {
            var c = p2Cards.shift();
            p2Cards.push(c, tCard);
        }
        return { p1Cards: p1Cards, p2Cards: p2Cards };
    },
    currentCard: function(p1Cards, p2Cards){
        return { p1CurrentCard: p1Cards[0], p2CurrentCard: p2Cards[0] };
    }


}

var globals = {
    canClick: false,
    gameOver: false,
    playerTurn: 1,
    player1: 'p1',
    player2: 'p2',
    p1Cards: [],
    p2Cards: [],
    p1CardHealth: 3,
    p2CardHealth: 3,
    gameScreen: document.querySelector('#gameScreen'),
    mainScreen: document.querySelector('#mainScreen'),
    p1Screen: document.querySelector('#p1Screen'),
    p2Screen: document.querySelector('#p2Screen'),
    p1CurrentCardScreen: document.querySelector('#p1CurrentCardScreen'),
    p2CurrentCardScreen: document.querySelector('#p1CurrentCardScreen'),
    p1HealthScreen: document.querySelector('#p1HealthScreen'),
    p2HealthScreen: document.querySelector('#p2HealthScreen'),

}

var changeHealth = function(p1H, p2H, who){
    if((p1H > 0 && p1H <= 3 ) && (p2H > 0 && p2H <= 3 )){
        if(who === globals.player1){
            return { p1H: p1H, p2H: p2H-- };   
        }else if(who === globals.player2){
            return { p1H: p1H--, p2H: p2H };           
        }
    }
}

var generateCardsDom = function(cards){
    var s = '<div class="my-slider">';
    for(var i = 0; i < cards.length; i++){
        s += convertJSONToHTML(cards[i]);
    }
    s += '</div>';
    return s;
}

var generateCurrentCardDom = function(card){
    return convertJSONToHTML(card);
}

var convertJSONToHTML = function(card){
    var s = '';
    s += '' + card.id;
    s += '' + card.name;
    s += '' + card.born;
    s += '' + card.age;
    s += '' + card.weight;
    s += '' + card.height;
    s += '' + card.titles;
    s += '' + card.matches;
    s += '' + card.wins;
    s += '' + card.losses;
    s += '' + card.debut;
    s += '' + card.img;
    return s;
}


var eventHandlers = function(){

    document.addEventListener('load', function(){

        document.querySelector('ul#SelectNoOfPlayers').addEventListener('click', function(e){
            e.preventDefault();
            if(e.target){
                if(e.target.matches('#startGame')){
                    game.startGame();
                    setTimeout(() => {
                        globals.mainScreen.style.display = 'none';
                    }, 500);
                    // splitCards(2);
                }
                // else if (e.target.matches('.threePlayers')){
                //     splitCards(3);
                // }else if(e.target.matches('.fourPlayers')){
                //     splitCards(4);
                // }
            }
        });
        
        document.querySelector('ul#cardAttr').addEventListener('click', function(e){
            e.preventDefault();
            if(e.target && globals.canClick){
                var cardNo = e.target.getAttribute('rel');
                var isCardExists = Cards.getCard(cardNo, cards);
                game.changeGameState(e, isCardExists);
                setTimeout(() => {
                    globals.canClick = true;
                }, 1000);
            }
        })

        
        

    })

}