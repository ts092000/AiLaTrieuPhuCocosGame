import { _decorator, Component, Node, director, Button, CCInteger, CCString } from 'cc';
import { GameModel } from './GameModel';
import { GameView } from './GameView';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property({type:GameView})
        View: GameView

    @property({type:GameModel})
        Model: GameModel

    @property({type:CCInteger, range:[1, 999, 1]})
    private idQuestionLv1: number = 1;

    @property({type:CCInteger, range:[1, 799, 1]})
    private idQuestionLv2: number = 1;

    @property({type:CCInteger, range:[1, 599, 1]})
    private idQuestionLv3: number = 1;

    @property({type:CCString})
    private questionLv1 = '';

    @property({type:CCString})
    private ansALv1 = '';

    @property({type:CCString})
    private ansBLv1 = '';

    @property({type:CCString})
    private ansCLv1 = '';

    @property({type:CCString})
    private ansDLv1 = '';

    @property({type:CCString})
    private correctAnsLv1 = 'A ';

    static questionArray: string[] = [];

    public start() {
        this.questionAndAnswerDisplay();
    }

    public update(deltaTime: number) {
    }
    
    public onLoad() {
        this.View.PlayBtn.node.on(Button.EventType.CLICK, this.btnClickPlayGame, this);
        this.View.BackMainMenuBtn.node.on(Button.EventType.CLICK, this.btnBackMainMenu, this);
    }

    public onDestroy() {
        this.View.PlayBtn.node.off(Button.EventType.CLICK, this.btnClickPlayGame, this);
        this.View.BackMainMenuBtn.node.off(Button.EventType.CLICK, this.btnBackMainMenu, this);
    }

    private btnClickPlayGame(PlayBtn: Button) {
        this.View.BackGroundMenu.active = false;
        this.View.GamePlayBg.active = true;
    }

    private btnBackMainMenu(BackMainMenuBtn: Button) {
        this.View.BackGroundMenu.active = true;
        this.View.GamePlayBg.active = false;
    }

    private questionAndAnswerDisplay() {
        
        var text1 = this.Model.CsvFilelv1.text;
        let idcloumn = text1.split('\n').map((row:string): string[] => {
            return row.split(',');
        });
        
        let idRow = text1.split('\n').map((row:string) => {
            return row.split(',')[0].replace('\r', '');
        });
        
        let questionRow = text1.split('\n').map((row:string) => {
            return row.split(',')[1].replace('\r', '');
        });
        
        let answerA = text1.split('\n').map((row:string) => {
            return row.split(',')[2].replace('\r', '');
        });
        
        let answerB = text1.split('\n').map((row:string) => {
            return row.split(',')[3].replace('\r', '');
        });
        
        let answerC = text1.split('\n').map((row:string) => {
            return row.split(',')[4].replace('\r', '');
        });
        
        let answerD = text1.split('\n').map((row:string) => {
            return row.split(',')[5].replace('', '');
        });
        
        // console.log(idRow);
        // console.log(idcloumn);
        for (var i = 1; i < 20; i++) {
            // console.log(idcloumn[i]);
            console.log(idRow[i]);
            console.log(questionRow[i]);
            console.log(answerA[i]);
            console.log(answerB[i]);
            console.log(answerC[i]);
            console.log(answerD[i]);
            // console.log(idRow[i]);
            // for (var j = 1; j < i; j++)
            // GameModel.lv1QuestionArray.push(idcloumn[i][j]);
            // console.log(GameModel.lv1QuestionArray);
        }
        this.questionLv1 = questionRow[1];
        this.ansALv1 = answerA[1];
        this.ansBLv1 = answerB[1];
        this.ansCLv1 = answerC[1];
        this.ansDLv1 = answerD[1];

        this.View.QuestionLabel.string = this.questionLv1;
        this.View.AnswerLabelA.string = this.ansALv1;
        this.View.AnswerLabelB.string = this.ansBLv1;
        this.View.AnswerLabelC.string = this.ansCLv1;
        this.View.AnswerLabelD.string = this.ansDLv1;
    }
}


