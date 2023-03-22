import { _decorator, Component, Node, director, Button, CCInteger, CCString, Animation, AnimationState, AnimationClip, SpriteFrame } from 'cc';
import { GameModel } from './GameModel';
import { GameView } from './GameView';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property({type:GameView})
        View: GameView

    @property({type:GameModel})
        Model: GameModel

    @property({type:CCString})
    private question = '';

    @property({type:CCString})
    private ansA = '';

    @property({type:CCString})
    private ansB = '';

    @property({type:CCString})
    private ansC = '';

    @property({type:CCString})
    private ansD = '';

    @property({type:CCInteger})
    private timeNum: number;

    public static i: number = 1;
    public static callbackSchedule: any;
    public gameHighScoreArray: number[] = [0];

    public start() {
        // this.randomUniqueNum(200, 200);
        this.questionAndAnswerDisplay();
        this.startCountDown();
        this.View.BtnMute.node.active = true;
        this.View.BtnUnmute.node.active = false;
        
        let gameHighScore1 = localStorage.getItem('gameHighScoreArray');
        
        if (gameHighScore1) {
            this.gameHighScoreArray = JSON.parse(gameHighScore1);
            this.gameHighScoreArray.push(0);
            localStorage.setItem('gameHighScoreArray', JSON.stringify(this.gameHighScoreArray));
        }
        console.log(this.gameHighScoreArray);
    }
    
    public update(deltaTime: number) {

    }
    
    public onLoad() {
        this.View.BackMainMenuBtn.node.on(Button.EventType.CLICK, this.btnBackMainMenu, this);
        this.View.GiveUpBtn.node.on(Button.EventType.CLICK, this.GiveUpLosingScene, this);
    }

    private btnBackMainMenu(BackMainMenuBtn: Button) {
        GameController.i = 1;

        director.preloadScene("Main", function () {
            director.loadScene("Main");
        });
    }

    private GiveUpLosingScene(GiveUpBtn: Button) {
        GameController.i = 1;
        director.preloadScene("Losing", function () {
            director.loadScene("Losing");
        });
    }

    private LosingScene(GiveUpBtn: Button) {
        // let dataNode = new Node();
        // dataNode.addComponent('DataComponent');
        // dataNode.getComponent('DataComponent').
        GameController.i = 1;
        this.unschedule(GameController.callbackSchedule);
        this.scheduleOnce(function() {
            director.preloadScene("Losing", function () {
                director.loadScene("Losing");
            });
        }, 2.5)
    }

    private csvToArray(text) {
        let p = '', row = [''], ret = [row], i = 0, r = 0, s = !0, l;
        for (l of text) {
            if ('"' === l) {
                if (s && l === p) row[i] += l;
                s = !s;
            } else if (',' === l && s) l = row[++i] = '';
            else if ('\n' === l && s) {
                if ('\r' === p) row[i] = row[i].slice(0, -1);
                row = ret[++r] = [l = '']; i = 0;
            } else row[i] += l;
            p = l;
        }
        return ret;
    };

    private questionAndAnswerDisplay() {
        let range = 500;
        let outputCount = 5;

        let arr = []
        for (let i = 1; i <= range; i++) {
            arr.push(i)
        }
      
        let result = [];
      
        for (let i = 0; i < outputCount; i++) {
            const random = Math.floor(Math.random() * (range - i));
            result.push(arr[random]);
            arr[random] = arr[range - i];
        }

        let lv1 = 0;
        let lv2 = 0;
        let lv3 = 0;

        console.log('result: ', result)
        if (GameController.i <= 5) {
            let text1 = this.Model.CsvFilelv1.text;

            let range2 = 4;
            let outputCount2 = 4;

            let arr2 = [2, 3, 4, 5];
            for (let i = 1; i <= range2; i++) {
                arr2.push(i);
            }
        
            let result2 = [];
        
            for (let i = 1; i <= outputCount2; i++) {
                const random2 = Math.floor(Math.random() * (range2 - i));
                result2.push(arr2[random2]);
                arr2[random2] = arr2[range2 - i];
            }

            let questionLv1 = this.csvToArray(text1)[result[lv1]][1];
    
            let answerALv1 = this.csvToArray(text1)[result[lv1]][result2[0]];
            
            let answerBLv1 = this.csvToArray(text1)[result[lv1]][result2[1]];
            
            let answerCLv1 = this.csvToArray(text1)[result[lv1]][result2[2]];
            
            let answerDLv1 = this.csvToArray(text1)[result[lv1]][result2[3]];

            console.log('result2: ', result2);
    
            this.View.AudioLv1.play();
            this.View.AudioLv2.stop();
            this.View.AudioLv3.stop();
            this.question = questionLv1;
            this.ansA = answerALv1;
            this.ansB = answerBLv1;
            this.ansC = answerCLv1;
            this.ansD = answerDLv1;
            lv1 += 1;

            this.View.BtnMute.node.on(Button.EventType.CLICK, this.btnMuteLv1, this);
            this.View.BtnUnmute.node.on(Button.EventType.CLICK, this.btnUnmuteLv1, this);

            if (result2[0] == 2) {
                console.log('BtnAtrue');
                this.View.AnswerBtnA.node.on(Button.EventType.CLICK, this.btnAClickTrue, this);
                this.View.AnswerBtnB.node.off(Button.EventType.CLICK, this.btnBClickTrue, this);
                this.View.AnswerBtnC.node.off(Button.EventType.CLICK, this.btnCClickTrue, this);
                this.View.AnswerBtnD.node.off(Button.EventType.CLICK, this.btnDClickTrue, this);
                this.View.AnswerBtnA.node.on(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnA.node.off(Button.EventType.CLICK, this.btnAClickFalse, this);
                this.View.AnswerBtnB.node.on(Button.EventType.CLICK, this.btnBClickFalse, this);
                this.View.AnswerBtnC.node.on(Button.EventType.CLICK, this.btnCClickFalse, this);
                this.View.AnswerBtnD.node.on(Button.EventType.CLICK, this.btnDClickFalse, this);
                this.View.AnswerBtnB.node.off(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnC.node.off(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnD.node.off(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnB.node.on(Button.EventType.CLICK, this.LosingScene, this);
                this.View.AnswerBtnC.node.on(Button.EventType.CLICK, this.LosingScene, this);
                this.View.AnswerBtnD.node.on(Button.EventType.CLICK, this.LosingScene, this);
                this.View.AnswerBtnA.node.off(Button.EventType.CLICK, this.LosingScene, this);
            }
            else if (result2[1] == 2) {
                console.log('BtnBtrue');
                this.View.AnswerBtnB.node.on(Button.EventType.CLICK, this.btnBClickTrue, this);
                this.View.AnswerBtnA.node.off(Button.EventType.CLICK, this.btnAClickTrue, this);
                this.View.AnswerBtnC.node.off(Button.EventType.CLICK, this.btnCClickTrue, this);
                this.View.AnswerBtnD.node.off(Button.EventType.CLICK, this.btnDClickTrue, this);
                this.View.AnswerBtnB.node.on(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnB.node.off(Button.EventType.CLICK, this.btnBClickFalse, this);
                this.View.AnswerBtnA.node.on(Button.EventType.CLICK, this.btnAClickFalse, this);
                this.View.AnswerBtnC.node.on(Button.EventType.CLICK, this.btnCClickFalse, this);
                this.View.AnswerBtnD.node.on(Button.EventType.CLICK, this.btnDClickFalse, this);
                this.View.AnswerBtnA.node.off(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnC.node.off(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnD.node.off(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnA.node.on(Button.EventType.CLICK, this.LosingScene, this);
                this.View.AnswerBtnC.node.on(Button.EventType.CLICK, this.LosingScene, this);
                this.View.AnswerBtnD.node.on(Button.EventType.CLICK, this.LosingScene, this);
                this.View.AnswerBtnB.node.off(Button.EventType.CLICK, this.LosingScene, this);
            }
            else if (result2[2] == 2) {
                console.log('BtnCtrue');
                this.View.AnswerBtnC.node.on(Button.EventType.CLICK, this.btnCClickTrue, this);
                this.View.AnswerBtnA.node.off(Button.EventType.CLICK, this.btnAClickTrue, this);
                this.View.AnswerBtnB.node.off(Button.EventType.CLICK, this.btnBClickTrue, this);
                this.View.AnswerBtnD.node.off(Button.EventType.CLICK, this.btnDClickTrue, this);
                this.View.AnswerBtnC.node.on(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnC.node.off(Button.EventType.CLICK, this.btnCClickFalse, this);
                this.View.AnswerBtnA.node.on(Button.EventType.CLICK, this.btnAClickFalse, this);
                this.View.AnswerBtnB.node.on(Button.EventType.CLICK, this.btnBClickFalse, this);
                this.View.AnswerBtnD.node.on(Button.EventType.CLICK, this.btnDClickFalse, this);
                this.View.AnswerBtnA.node.off(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnB.node.off(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnD.node.off(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnA.node.on(Button.EventType.CLICK, this.LosingScene, this);
                this.View.AnswerBtnB.node.on(Button.EventType.CLICK, this.LosingScene, this);
                this.View.AnswerBtnD.node.on(Button.EventType.CLICK, this.LosingScene, this);
                this.View.AnswerBtnC.node.off(Button.EventType.CLICK, this.LosingScene, this);
            }
            else if (result2[3] == 2) {
                console.log('BtnDtrue');
                this.View.AnswerBtnD.node.on(Button.EventType.CLICK, this.btnDClickTrue, this);
                this.View.AnswerBtnA.node.off(Button.EventType.CLICK, this.btnAClickTrue, this);
                this.View.AnswerBtnB.node.off(Button.EventType.CLICK, this.btnBClickTrue, this);
                this.View.AnswerBtnC.node.off(Button.EventType.CLICK, this.btnCClickTrue, this);
                this.View.AnswerBtnD.node.on(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnD.node.off(Button.EventType.CLICK, this.btnDClickFalse, this);
                this.View.AnswerBtnA.node.on(Button.EventType.CLICK, this.btnAClickFalse, this);
                this.View.AnswerBtnB.node.on(Button.EventType.CLICK, this.btnBClickFalse, this);
                this.View.AnswerBtnC.node.on(Button.EventType.CLICK, this.btnCClickFalse, this);
                this.View.AnswerBtnA.node.off(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnB.node.off(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnC.node.off(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnA.node.on(Button.EventType.CLICK, this.LosingScene, this);
                this.View.AnswerBtnB.node.on(Button.EventType.CLICK, this.LosingScene, this);
                this.View.AnswerBtnC.node.on(Button.EventType.CLICK, this.LosingScene, this);
                this.View.AnswerBtnD.node.off(Button.EventType.CLICK, this.LosingScene, this);
            }
            
        }
        else if (GameController.i > 5 && GameController.i <= 10) {
            let text2 = this.Model.CsvFilelv2.text;

            let range3 = 4;
            let outputCount3 = 4;

            let arr3 = [2, 5, 4, 3];
            for (let i = 1; i <= range3; i++) {
                arr3.push(i);
            }
        
            let result3 = [];
        
            for (let i = 1; i <= outputCount3; i++) {
                const random3 = Math.floor(Math.random() * (range3 - i));
                result3.push(arr3[random3]);
                arr3[random3] = arr3[range3 - i];
            }

            let questionLv2 = this.csvToArray(text2)[result[lv2]][1];
    
            let answerALv2 = this.csvToArray(text2)[result[lv2]][result3[0]];
            
            let answerBLv2 = this.csvToArray(text2)[result[lv2]][result3[1]];
            
            let answerCLv2 = this.csvToArray(text2)[result[lv2]][result3[2]];
            
            let answerDLv2 = this.csvToArray(text2)[result[lv2]][result3[3]];

            console.log('result3: ', result3);

            this.View.AudioLv2.play();
            this.View.AudioLv1.stop();
            this.View.AudioLv3.stop();
            this.question = questionLv2;
            this.ansA = answerALv2;
            this.ansB = answerBLv2;
            this.ansC = answerCLv2;
            this.ansD = answerDLv2;
            lv2 += 1;

            this.View.BtnMute.node.on(Button.EventType.CLICK, this.btnMuteLv2, this);
            this.View.BtnUnmute.node.on(Button.EventType.CLICK, this.btnUnmuteLv2, this);

            if (result3[0] == 2) {
                console.log('BtnAtrue');
                this.View.AnswerBtnA.node.on(Button.EventType.CLICK, this.btnAClickTrue, this);
                this.View.AnswerBtnB.node.off(Button.EventType.CLICK, this.btnBClickTrue, this);
                this.View.AnswerBtnC.node.off(Button.EventType.CLICK, this.btnCClickTrue, this);
                this.View.AnswerBtnD.node.off(Button.EventType.CLICK, this.btnDClickTrue, this);
                this.View.AnswerBtnA.node.on(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnA.node.off(Button.EventType.CLICK, this.btnAClickFalse, this);
                this.View.AnswerBtnB.node.on(Button.EventType.CLICK, this.btnBClickFalse, this);
                this.View.AnswerBtnC.node.on(Button.EventType.CLICK, this.btnCClickFalse, this);
                this.View.AnswerBtnD.node.on(Button.EventType.CLICK, this.btnDClickFalse, this);
                this.View.AnswerBtnB.node.off(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnC.node.off(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnD.node.off(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnB.node.on(Button.EventType.CLICK, this.LosingScene, this);
                this.View.AnswerBtnC.node.on(Button.EventType.CLICK, this.LosingScene, this);
                this.View.AnswerBtnD.node.on(Button.EventType.CLICK, this.LosingScene, this);
                this.View.AnswerBtnA.node.off(Button.EventType.CLICK, this.LosingScene, this);
            }
            else if (result3[1] == 2) {
                console.log('BtnBtrue');
                this.View.AnswerBtnB.node.on(Button.EventType.CLICK, this.btnBClickTrue, this);
                this.View.AnswerBtnA.node.off(Button.EventType.CLICK, this.btnAClickTrue, this);
                this.View.AnswerBtnC.node.off(Button.EventType.CLICK, this.btnCClickTrue, this);
                this.View.AnswerBtnD.node.off(Button.EventType.CLICK, this.btnDClickTrue, this);
                this.View.AnswerBtnB.node.on(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnB.node.off(Button.EventType.CLICK, this.btnBClickFalse, this);
                this.View.AnswerBtnA.node.on(Button.EventType.CLICK, this.btnAClickFalse, this);
                this.View.AnswerBtnC.node.on(Button.EventType.CLICK, this.btnCClickFalse, this);
                this.View.AnswerBtnD.node.on(Button.EventType.CLICK, this.btnDClickFalse, this);
                this.View.AnswerBtnA.node.off(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnC.node.off(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnD.node.off(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnA.node.on(Button.EventType.CLICK, this.LosingScene, this);
                this.View.AnswerBtnC.node.on(Button.EventType.CLICK, this.LosingScene, this);
                this.View.AnswerBtnD.node.on(Button.EventType.CLICK, this.LosingScene, this);
                this.View.AnswerBtnB.node.off(Button.EventType.CLICK, this.LosingScene, this);
            }
            else if (result3[2] == 2) {
                console.log('BtnCtrue');
                this.View.AnswerBtnC.node.on(Button.EventType.CLICK, this.btnCClickTrue, this);
                this.View.AnswerBtnA.node.off(Button.EventType.CLICK, this.btnAClickTrue, this);
                this.View.AnswerBtnB.node.off(Button.EventType.CLICK, this.btnBClickTrue, this);
                this.View.AnswerBtnD.node.off(Button.EventType.CLICK, this.btnDClickTrue, this);
                this.View.AnswerBtnC.node.on(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnC.node.off(Button.EventType.CLICK, this.btnCClickFalse, this);
                this.View.AnswerBtnA.node.on(Button.EventType.CLICK, this.btnAClickFalse, this);
                this.View.AnswerBtnB.node.on(Button.EventType.CLICK, this.btnBClickFalse, this);
                this.View.AnswerBtnD.node.on(Button.EventType.CLICK, this.btnDClickFalse, this);
                this.View.AnswerBtnA.node.off(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnB.node.off(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnD.node.off(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnA.node.on(Button.EventType.CLICK, this.LosingScene, this);
                this.View.AnswerBtnB.node.on(Button.EventType.CLICK, this.LosingScene, this);
                this.View.AnswerBtnD.node.on(Button.EventType.CLICK, this.LosingScene, this);
                this.View.AnswerBtnC.node.off(Button.EventType.CLICK, this.LosingScene, this);
            }
            else if (result3[3] == 2) {
                console.log('BtnDtrue');
                this.View.AnswerBtnD.node.on(Button.EventType.CLICK, this.btnDClickTrue, this);
                this.View.AnswerBtnA.node.off(Button.EventType.CLICK, this.btnAClickTrue, this);
                this.View.AnswerBtnB.node.off(Button.EventType.CLICK, this.btnBClickTrue, this);
                this.View.AnswerBtnC.node.off(Button.EventType.CLICK, this.btnCClickTrue, this);
                this.View.AnswerBtnD.node.on(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnD.node.off(Button.EventType.CLICK, this.btnDClickFalse, this);
                this.View.AnswerBtnA.node.on(Button.EventType.CLICK, this.btnAClickFalse, this);
                this.View.AnswerBtnB.node.on(Button.EventType.CLICK, this.btnBClickFalse, this);
                this.View.AnswerBtnC.node.on(Button.EventType.CLICK, this.btnCClickFalse, this);
                this.View.AnswerBtnA.node.off(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnB.node.off(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnC.node.off(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnA.node.on(Button.EventType.CLICK, this.LosingScene, this);
                this.View.AnswerBtnB.node.on(Button.EventType.CLICK, this.LosingScene, this);
                this.View.AnswerBtnC.node.on(Button.EventType.CLICK, this.LosingScene, this);
                this.View.AnswerBtnD.node.off(Button.EventType.CLICK, this.LosingScene, this);
            }

        }
        else if (GameController.i > 10 && GameController.i <= 15) {
            let range4 = 4;
            let outputCount4 = 4;

            let arr4 = [5, 4, 3, 2];
            for (let i = 1; i <= range4; i++) {
                arr4.push(i);
            }
        
            let result4 = [];
        
            for (let i = 1; i <= outputCount4; i++) {
                const random4 = Math.floor(Math.random() * (range4 - i));
                result4.push(arr4[random4]);
                arr4[random4] = arr4[range4 - i];
            }

            let text3 = this.Model.CsvFilelv3.text;
            let questionLv3 = this.csvToArray(text3)[result[lv3]][1];
    
            let answerALv3 = this.csvToArray(text3)[result[lv3]][result4[0]];
            
            let answerBLv3 = this.csvToArray(text3)[result[lv3]][result4[1]];
            
            let answerCLv3 = this.csvToArray(text3)[result[lv3]][result4[2]];
            
            let answerDLv3 = this.csvToArray(text3)[result[lv3]][result4[3]];

            console.log('result4: ', result4);
            this.View.AudioLv3.play();
            this.View.AudioLv1.stop();
            this.View.AudioLv2.stop();
            this.question = questionLv3;
            this.ansA = answerALv3;
            this.ansB = answerBLv3;
            this.ansC = answerCLv3;
            this.ansD = answerDLv3;
            lv3 += 1;

            this.View.BtnMute.node.on(Button.EventType.CLICK, this.btnMuteLv3, this);
            this.View.BtnUnmute.node.on(Button.EventType.CLICK, this.btnUnmuteLv3, this);

            if (result4[0] == 2) {
                console.log('BtnAtrue');
                this.View.AnswerBtnA.node.on(Button.EventType.CLICK, this.btnAClickTrue, this);
                this.View.AnswerBtnB.node.off(Button.EventType.CLICK, this.btnBClickTrue, this);
                this.View.AnswerBtnC.node.off(Button.EventType.CLICK, this.btnCClickTrue, this);
                this.View.AnswerBtnD.node.off(Button.EventType.CLICK, this.btnDClickTrue, this);
                this.View.AnswerBtnA.node.on(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnA.node.off(Button.EventType.CLICK, this.btnAClickFalse, this);
                this.View.AnswerBtnB.node.on(Button.EventType.CLICK, this.btnBClickFalse, this);
                this.View.AnswerBtnC.node.on(Button.EventType.CLICK, this.btnCClickFalse, this);
                this.View.AnswerBtnD.node.on(Button.EventType.CLICK, this.btnDClickFalse, this);
                this.View.AnswerBtnB.node.off(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnC.node.off(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnD.node.off(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnB.node.on(Button.EventType.CLICK, this.LosingScene, this);
                this.View.AnswerBtnC.node.on(Button.EventType.CLICK, this.LosingScene, this);
                this.View.AnswerBtnD.node.on(Button.EventType.CLICK, this.LosingScene, this);
                this.View.AnswerBtnA.node.off(Button.EventType.CLICK, this.LosingScene, this);
            }
            else if (result4[1] == 2) {
                console.log('BtnBtrue');
                this.View.AnswerBtnB.node.on(Button.EventType.CLICK, this.btnBClickTrue, this);
                this.View.AnswerBtnA.node.off(Button.EventType.CLICK, this.btnAClickTrue, this);
                this.View.AnswerBtnC.node.off(Button.EventType.CLICK, this.btnCClickTrue, this);
                this.View.AnswerBtnD.node.off(Button.EventType.CLICK, this.btnDClickTrue, this);
                this.View.AnswerBtnB.node.on(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnB.node.off(Button.EventType.CLICK, this.btnBClickFalse, this);
                this.View.AnswerBtnA.node.on(Button.EventType.CLICK, this.btnAClickFalse, this);
                this.View.AnswerBtnC.node.on(Button.EventType.CLICK, this.btnCClickFalse, this);
                this.View.AnswerBtnD.node.on(Button.EventType.CLICK, this.btnDClickFalse, this);
                this.View.AnswerBtnA.node.off(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnC.node.off(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnD.node.off(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnA.node.on(Button.EventType.CLICK, this.LosingScene, this);
                this.View.AnswerBtnC.node.on(Button.EventType.CLICK, this.LosingScene, this);
                this.View.AnswerBtnD.node.on(Button.EventType.CLICK, this.LosingScene, this);
                this.View.AnswerBtnB.node.off(Button.EventType.CLICK, this.LosingScene, this);
            }
            else if (result4[2] == 2) {
                console.log('BtnCtrue');
                this.View.AnswerBtnC.node.on(Button.EventType.CLICK, this.btnCClickTrue, this);
                this.View.AnswerBtnA.node.off(Button.EventType.CLICK, this.btnAClickTrue, this);
                this.View.AnswerBtnB.node.off(Button.EventType.CLICK, this.btnBClickTrue, this);
                this.View.AnswerBtnD.node.off(Button.EventType.CLICK, this.btnDClickTrue, this);
                this.View.AnswerBtnC.node.on(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnC.node.off(Button.EventType.CLICK, this.btnCClickFalse, this);
                this.View.AnswerBtnA.node.on(Button.EventType.CLICK, this.btnAClickFalse, this);
                this.View.AnswerBtnB.node.on(Button.EventType.CLICK, this.btnBClickFalse, this);
                this.View.AnswerBtnD.node.on(Button.EventType.CLICK, this.btnDClickFalse, this);
                this.View.AnswerBtnA.node.off(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnB.node.off(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnD.node.off(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnA.node.on(Button.EventType.CLICK, this.LosingScene, this);
                this.View.AnswerBtnB.node.on(Button.EventType.CLICK, this.LosingScene, this);
                this.View.AnswerBtnD.node.on(Button.EventType.CLICK, this.LosingScene, this);
                this.View.AnswerBtnC.node.off(Button.EventType.CLICK, this.LosingScene, this);
            }
            else if (result4[3] == 2) {
                console.log('BtnDtrue');
                this.View.AnswerBtnD.node.on(Button.EventType.CLICK, this.btnDClickTrue, this);
                this.View.AnswerBtnA.node.off(Button.EventType.CLICK, this.btnAClickTrue, this);
                this.View.AnswerBtnB.node.off(Button.EventType.CLICK, this.btnBClickTrue, this);
                this.View.AnswerBtnC.node.off(Button.EventType.CLICK, this.btnCClickTrue, this);
                this.View.AnswerBtnD.node.on(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnD.node.off(Button.EventType.CLICK, this.btnDClickFalse, this);
                this.View.AnswerBtnA.node.on(Button.EventType.CLICK, this.btnAClickFalse, this);
                this.View.AnswerBtnB.node.on(Button.EventType.CLICK, this.btnBClickFalse, this);
                this.View.AnswerBtnC.node.on(Button.EventType.CLICK, this.btnCClickFalse, this);
                this.View.AnswerBtnA.node.off(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnB.node.off(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnC.node.off(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                this.View.AnswerBtnA.node.on(Button.EventType.CLICK, this.LosingScene, this);
                this.View.AnswerBtnB.node.on(Button.EventType.CLICK, this.LosingScene, this);
                this.View.AnswerBtnC.node.on(Button.EventType.CLICK, this.LosingScene, this);
                this.View.AnswerBtnD.node.off(Button.EventType.CLICK, this.LosingScene, this);
            }
        }
        else if (GameController.i > 15) {
            director.preloadScene("Winning", function () {
                director.loadScene("Winning");
            });
            GameController.i = 1;
        }
        
        this.View.QuestionLabel.string = this.question;
        this.View.AnswerLabelA.string = this.ansA;
        this.View.AnswerLabelB.string = this.ansB;
        this.View.AnswerLabelC.string = this.ansC;
        this.View.AnswerLabelD.string = this.ansD;
        this.View.QuestionLabelNumber.string = 'Câu hỏi số ' + GameController.i.toString();
        console.log(this.gameHighScoreArray);
    }
    
    private btnClickNextQuestion(AnswerBtnA: Button) {
        this.unschedule(GameController.callbackSchedule);
        console.log(GameController.i);
        GameController.i++;
        this.gameHighScoreArray.push(GameController.i - 1);
        localStorage.setItem('gameHighScoreArray', JSON.stringify(this.gameHighScoreArray));
        this.scheduleOnce(function() {
            this.questionAndAnswerDisplay();
            this.timeNum = 15;
            this.startCountDown();
            console.log(GameController.i);
        }, 3)
        // this.schedule(GameController.callbackSchedule);
    }

    private btnAClickTrue(AnswerBtnA: Button) {
        const aniBtnA = this.View.AnswerBtnA.getComponent(Animation);
        aniBtnA.play("BtnTrue");
    }

    private btnBClickTrue(AnswerBtnB: Button) {
        const aniBtnB = this.View.AnswerBtnB.getComponent(Animation);
        aniBtnB.play("BtnTrue");
    }

    private btnCClickTrue(AnswerBtnC: Button) {
        const aniBtnC = this.View.AnswerBtnC.getComponent(Animation);
        aniBtnC.play("BtnTrue");
    }

    private btnDClickTrue(AnswerBtnD: Button) {
        const aniBtnD = this.View.AnswerBtnD.getComponent(Animation);
        aniBtnD.play("BtnTrue");
    }

    private btnAClickFalse(AnswerBtnA: Button) {
        const aniBtnA = this.View.AnswerBtnA.getComponent(Animation);
        aniBtnA.play("BtnFalse");
    }

    private btnBClickFalse(AnswerBtnB: Button) {
        const aniBtnB = this.View.AnswerBtnB.getComponent(Animation);
        aniBtnB.play("BtnFalse");
    }

    private btnCClickFalse(AnswerBtnC: Button) {
        const aniBtnC = this.View.AnswerBtnC.getComponent(Animation);
        aniBtnC.play("BtnFalse");
    }

    private btnDClickFalse(AnswerBtnD: Button) {
        const aniBtnD = this.View.AnswerBtnD.getComponent(Animation);
        aniBtnD.play("BtnFalse");
    }

    private startCountDown() {
        this.View.TimeLabel.string = this.timeNum.toString();
        
        GameController.callbackSchedule = function() {
            this.timeNum--;
            this.View.TimeLabel.string = this.timeNum.toString();
            
            if (this.timeNum == 0) {
                this.timeNum = this.timeNum;
                this.View.ResultLabel.string = "Hết Giờ";
                this.unschedule(GameController.callbackSchedule, 1);
                this.View.questionLabel.node.active = false;
                this.View.AnswerBtnA.node.active = false;
                this.View.AnswerBtnB.node.active = false;
                this.View.AnswerBtnC.node.active = false;
                this.View.AnswerBtnD.node.active = false;
                this.scheduleOnce(function() {
                    director.preloadScene("Losing", function () {
                        console.log('Next scene preloaded');
                        director.loadScene("Losing");
                    });
                }, 2);
                GameController.i = 1;
            }
        }
        this.schedule(GameController.callbackSchedule, 1);
        
    }

    private btnMuteLv1(BtnMute: Button) {
        this.View.BtnMute.node.active = false;
        this.View.BtnUnmute.node.active = true;
        this.View.AudioLv1.volume = 0;
    }

    private btnUnmuteLv1(BtnUnmute: Button) {
        this.View.BtnMute.node.active = true;
        this.View.BtnUnmute.node.active = false;
        this.View.AudioLv1.volume = 0.5;
    }

    private btnMuteLv2(BtnMute: Button) {
        this.View.BtnMute.node.active = false;
        this.View.BtnUnmute.node.active = true;
        this.View.AudioLv2.volume = 0;
    }

    private btnUnmuteLv2(BtnUnmute: Button) {
        this.View.BtnMute.node.active = true;
        this.View.BtnUnmute.node.active = false;
        this.View.AudioLv2.volume = 0.5;
    }

    private btnMuteLv3(BtnMute: Button) {
        this.View.BtnMute.node.active = false;
        this.View.BtnUnmute.node.active = true;
        this.View.AudioLv3.volume = 0;
    }

    private btnUnmuteLv3(BtnUnmute: Button) {
        this.View.BtnMute.node.active = true;
        this.View.BtnUnmute.node.active = false;
        this.View.AudioLv3.volume = 0.5;
    }

}


