//jogo da velha
const tic_tac_toe = {

    // ATTRIBUTES
    board: ['','','','','','','','',''],
    symbols: {
                options: ['O','X'],
                turn_index: 0,
                change(){
                    this.turn_index = ( this.turn_index === 0 ? 1:0 );
                }
            },
    formas_de_vitoria: [
                        [0,1,2],
                        [3,4,5],
                        [6,7,8],
                        [0,3,6],
                        [1,4,7],
                        [2,5,8],
                        [0,4,8],
                        [2,4,6]
                    ],

    // funçao
    init(container) {
        this.container_element = container;
    },

    forma_do_jogo(position) {
        if (this.gameover || this.board[position] !== '') return false;

        const simbolo_usado = this.symbols.options[this.symbols.turn_index];
        this.board[position] = simbolo_usado;
        this.draw();

        const indice_de_vitorias = this.cheque_sequencias_de_vitorias(simbolo_usado);
        if (this.o_jogo_terminou()){
            this.jogo_acabou();
        }
        if (indice_de_vitorias >= 0) {
            this.jogo_acabou();
            this.stilo_sequencia_de_vitoria(this.formas_de_vitoria[indice_de_vitorias]);
        } else {
            this.symbols.change();
        }

        return true;
    },

    stilo_sequencia_de_vitoria(winner_sequence) {
        winner_sequence.forEach((position) => {
          this
            .container_element
            .querySelector(`div:nth-child(${position + 1})`)
            .classList.add('winner');
        });
      },

    cheque_sequencias_de_vitorias(symbol) {

        for ( i in this.formas_de_vitoria ) {
            if (this.board[ this.formas_de_vitoria[i][0] ] == symbol  &&
                this.board[ this.formas_de_vitoria[i][1] ] == symbol &&
                this.board[ this.formas_de_vitoria[i][2] ] == symbol) {
                return i;
            }
        };
        return -1;
    },

    jogo_acabou() {
        this.gameover = true;
    },

    o_jogo_terminou() {
        return !this.board.includes('');
    },

    inicie() {
        this.board.fill('');
        this.draw();
        this.gameover = false;       
    },

    recomece() {
        if (this.o_jogo_terminou() || this.gameover) {
            this.inicie();
        }
    },

    draw() {
        this.container_element.innerHTML = this.board.map((element, index) => `<div onclick="tic_tac_toe.forma_do_jogo('${index}')"> ${element} </div>`).reduce((content, current) => content + current);
    },
};