import { _decorator, Component, Node, director, Button, CCInteger, CCString, Animation } from 'cc';
import GameClient from '@dattenlagiday/oc_gamecenter_sdk_pkg';
import { GameModel } from './GameModel';
import { GameView } from './GameView';
import { DEBUG } from 'cc/env';
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

    private static result = [];
    private static result2 = [];
    private static result3 = [];
    private static result4 = [];
    private static i: number = 1;
    private static lv1: number = 0;
    private static lv2: number = 0;
    private static lv3: number = 0;
    private static callbackSchedule: any;
    private gameHighScoreArray: number[] = [0];
    private randonArrayNumb: number[] = [];
    private num1: number = null;
    private num2: number = null;
    private num3: number = null;
    private num4: number = null;
    private volumeValueArray: number[] = [];
    private static range: number = null;
    private static outputCount: number = null;
    public gameClient;
    public matchId: string;
    
    public async start() : Promise<void> {
        if (this.gameClient === undefined) {
            this.gameClient = new GameClient("642d37fddc7fdb5a28069d70", "9f2af4cb-fc85-4c48-a39d-d2acc5960056");
            await this.gameClient.initAsync()
            .then(() => {})
            .catch((err) => console.log(err));
        }
        // if (DEBUG === false) {

        // }

        // Khi bat dau game
        await this.gameClient.match.startMatch()
            .then((data) => {this.matchId = data.matchId;})
            .catch((error) => console.log(error));
        // if (DEBUG === false) {

        // }
        
        let volumeValue = JSON.parse(localStorage.getItem('volumeValueArray'));
        this.View.BtnMute.node.on(Button.EventType.CLICK, this.btnMute, this);
        this.View.BtnUnmute.node.on(Button.EventType.CLICK, this.btnUnmute, this);

        if (volumeValue.length == 0) {
            this.View.AudioBg.volume = 0.7;
            this.View.AudioCorrectAns.volume = 0.7;
            this.View.AudioIncorrectAns.volume = 0.7;
        }
        else {
            this.View.AudioBg.volume = volumeValue[ volumeValue.length - 1];
            this.View.AudioCorrectAns.volume = volumeValue[ volumeValue.length - 1];
            this.View.AudioIncorrectAns.volume = volumeValue[ volumeValue.length - 1];
        }

        if (this.View.AudioBg.volume == 0.7) {
            this.View.BtnMute.node.active = true;
            this.View.BtnUnmute.node.active = false;
        }
        
        if (this.View.AudioBg.volume == 0) {
            this.View.BtnMute.node.active = false;
            this.View.BtnUnmute.node.active = true;
        }

        this.View.AudioBg.play();
        this.questionAndAnswerDisplay();
        this.View.Help2Container.node.active = false;
        
        let gameHighScore1 = localStorage.getItem('gameHighScoreArray');
        
        if (gameHighScore1) {
            this.gameHighScoreArray = JSON.parse(gameHighScore1);
            this.gameHighScoreArray.push(0);
            localStorage.setItem('gameHighScoreArray', JSON.stringify(this.gameHighScoreArray));
        }

        switch(GameController.i){
            case 1:
                this.View.Question1.interactable = false;
                break;
            default:
                break;
        }
        this.generateArray(this.randonArrayNumb);
    }
    
    public update(deltaTime: number) {

    }
    
    public onLoad() {
        this.View.BackMainMenuBtn.node.on(Button.EventType.CLICK, this.btnBackMainMenu, this);
        this.View.GiveUpBtn.node.on(Button.EventType.CLICK, this.GiveUpLosingScene, this);
        GameController.range = 499;
        GameController.outputCount = 5;
        let arr = [];
        for (let i = 1; i <= GameController.range; i++) {
            arr.push(i);
        }
      
        for (let i = 0; i < GameController.outputCount; i++) {
            const random = Math.floor(Math.random() * (GameController.range - i));
            GameController.result.push(arr[random]);
            arr[random] = arr[GameController.outputCount - i];
        }
    }

    private btnBackMainMenu(BackMainMenuBtn: Button) {
        this.startCondition();

        director.preloadScene("Main", function () {
            director.loadScene("Main");
        });
    }

    private async GiveUpLosingScene(GiveUpBtn: Button) {
        let _this = this;

        director.preloadScene("Losing", async function () {
            await _this.gameClient.match
                .completeMatch(_this.matchId, { score: GameController.i })
                .then((data) => {})
                .catch((error) => console.log(error));
            // if (DEBUG === false) {

            // }
            _this.startCondition();
            director.loadScene("Losing");
        });
    }

    private disableHelpBtn() {
        this.View.Help1Btn.node.active = false;
        this.View.Help2Btn.node.active = false;
        this.View.Help3Btn.node.active = false;
    }

    private async LosingScene(GiveUpBtn: Button) {
        this.disableAnswerBtn();
        this.disableHelpBtn();
        this.unschedule(GameController.callbackSchedule);

        
        this.scheduleOnce(function() {
            this.View.AudioIncorrectAns.play();
        }, 0.7)
        let _this = this;
        this.scheduleOnce(function() {
            director.preloadScene("Losing", async function () {
                await _this.gameClient.match
                    .completeMatch(_this.matchId, { score: GameController.i })
                    .then((data) => {})
                    .catch((error) => console.log(error));
                // if (DEBUG === false) {

                // }
                _this.startCondition();
                director.loadScene("Losing");
            });
        }, 2.5)
    }

    private startCondition() {
        GameController.i = 1;
        GameController.lv1 = 0;
        GameController.lv2 = 0;
        GameController.lv3 = 0;
        GameController.result = [];
    }

    private disableAnswerBtn() {
        this.View.AnswerBtnA.interactable = false;
        this.View.AnswerBtnB.interactable = false;
        this.View.AnswerBtnC.interactable = false;
        this.View.AnswerBtnD.interactable = false;
    }

    private generateArray(randonArrayNumb: number[]) {
        this.num1 = Math.floor(Math.random() * 11) + 70; // generate a number between 70 and 80
        const remainingAmount = 100 - this.num1; // calculate the remaining amount
        this.num2 = Math.floor(Math.random() * (remainingAmount + 1)); // generate the first random number
        this.num3 = Math.floor(Math.random() * (remainingAmount - this.num2 + 1)); // generate the second random number
        this.num4 = remainingAmount - this.num2 - this.num3; // calculate the third random number     
        return [this.num2, this.num3, this.num4, this.num1]; // return the array of four numbers
    };

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
        this.View.AnswerBtnA.interactable = true;
        this.View.AnswerBtnB.interactable = true;
        this.View.AnswerBtnC.interactable = true;
        this.View.AnswerBtnD.interactable = true;
        this.View.BackMainMenuBtn.interactable = true;
        this.View.GiveUpBtn.interactable = true;
        let text1 = this.Model.CsvFilelv1.text;
        let text2 = this.Model.CsvFilelv2.text;
        let text3 = this.Model.CsvFilelv3.text;

        this.View.Help1Btn.node.active = true;
        this.View.Help2Btn.node.active = true;
        this.View.Help3Btn.node.active = true;

        const labelAniQuestion = this.View.QuestionLabel.getComponent(Animation);
        const labelAniAnswerA = this.View.AnswerLabelA.getComponent(Animation);
        const labelAniAnswerB = this.View.AnswerLabelB.getComponent(Animation);
        const labelAniAnswerC = this.View.AnswerLabelC.getComponent(Animation);
        const labelAniAnswerD = this.View.AnswerLabelD.getComponent(Animation);

        this.timeNum = 15;
        this.startCountDown();
        labelAniQuestion.playOnLoad = false;

        if (GameController.i <= 5) {
            GameController.result3 = [];
            GameController.result4 = [];
            let range2 = 4;
            let outputCount2 = 4;

            let arr2 = [2, 3, 4, 5];
            for (let i = 1; i <= range2; i++) {
                arr2.push(i);
            }

            GameController.result2 = [];
        
            for (let i = 1; i <= outputCount2; i++) {
                const random2 = Math.floor(Math.random() * (range2 - i));
                GameController.result2.push(arr2[random2]);
                arr2[random2] = arr2[range2 - i];
            }

            this.question = this.csvToArray(text1)[GameController.result[GameController.lv1]][1];
            
            this.ansA = this.csvToArray(text1)[GameController.result[GameController.lv1]][GameController.result2[0]];
            
            this.ansB = this.csvToArray(text1)[GameController.result[GameController.lv1]][GameController.result2[1]];
            
            this.ansC = this.csvToArray(text1)[GameController.result[GameController.lv1]][GameController.result2[2]];
            
            this.ansD = this.csvToArray(text1)[GameController.result[GameController.lv1]][GameController.result2[3]];

            GameController.lv1 += 1;

            this.View.QuestionLabel.string = this.question;
            this.View.AnswerLabelA.string = 'A: ' + this.ansA;
            this.View.AnswerLabelB.string = 'B: ' + this.ansB;
            this.View.AnswerLabelC.string = 'C: ' + this.ansC;
            this.View.AnswerLabelD.string = 'D: ' + this.ansD;

            if (GameController.result2[0] == 2) {
                this.AtrueGroup();
            }
            else if (GameController.result2[1] == 2) {
                this.BtrueGroup();
            }
            else if (GameController.result2[2] == 2) {
                this.CtrueGroup();
            }
            else if (GameController.result2[3] == 2) {
                this.DtrueGroup();
            }
        }
        else if (GameController.i > 5 && GameController.i <= 10) {
            GameController.result2 = [];
            GameController.result4 = [];
            let range3 = 4;
            let outputCount3 = 4;

            let arr3 = [2, 5, 4, 3];
            for (let i = 1; i <= range3; i++) {
                arr3.push(i);
            }

            GameController.result3 = [];
        
            for (let i = 1; i <= outputCount3; i++) {
                const random3 = Math.floor(Math.random() * (range3 - i));
                GameController.result3.push(arr3[random3]);
                arr3[random3] = arr3[range3 - i];
            }

            this.question = this.csvToArray(text2)[GameController.result[GameController.lv2]][1];
    
            this.ansA = this.csvToArray(text2)[GameController.result[GameController.lv2]][GameController.result3[0]];
            
            this.ansB = this.csvToArray(text2)[GameController.result[GameController.lv2]][GameController.result3[1]];
            
            this.ansC = this.csvToArray(text2)[GameController.result[GameController.lv2]][GameController.result3[2]];
            
            this.ansD = this.csvToArray(text2)[GameController.result[GameController.lv2]][GameController.result3[3]];

            GameController.lv2 += 1;

            this.View.QuestionLabel.string = this.question;
            this.View.AnswerLabelA.string = 'A: ' + this.ansA;
            this.View.AnswerLabelB.string = 'B: ' + this.ansB;
            this.View.AnswerLabelC.string = 'C: ' + this.ansC;
            this.View.AnswerLabelD.string = 'D: ' + this.ansD;

            if (GameController.result3[0] == 2) {
                this.AtrueGroup();
            }
            else if (GameController.result3[1] == 2) {
                this.BtrueGroup();
            }
            else if (GameController.result3[2] == 2) {
                this.CtrueGroup();
            }
            else if (GameController.result3[3] == 2) {
                this.DtrueGroup();
            }
        }
        else if (GameController.i > 10 && GameController.i <= 15) {
            GameController.result2 = [];
            GameController.result3 = [];
            let range4 = 4;
            let outputCount4 = 4;

            let arr4 = [5, 4, 3, 2];
            for (let i = 1; i <= range4; i++) {
                arr4.push(i);
            }
            
            GameController.result4 = [];
        
            for (let i = 1; i <= outputCount4; i++) {
                const random4 = Math.floor(Math.random() * (range4 - i));
                GameController.result4.push(arr4[random4]);
                arr4[random4] = arr4[range4 - i];
            }

            this.question = this.csvToArray(text3)[GameController.result[GameController.lv3]][1];
    
            this.ansA = this.csvToArray(text3)[GameController.result[GameController.lv3]][GameController.result4[0]];
            
            this.ansB = this.csvToArray(text3)[GameController.result[GameController.lv3]][GameController.result4[1]];
            
            this.ansC = this.csvToArray(text3)[GameController.result[GameController.lv3]][GameController.result4[2]];
            
            this.ansD = this.csvToArray(text3)[GameController.result[GameController.lv3]][GameController.result4[3]];

            GameController.lv3 += 1;

            this.View.QuestionLabel.string = this.question;
            this.View.AnswerLabelA.string = 'A: ' + this.ansA;
            this.View.AnswerLabelB.string = 'B: ' + this.ansB;
            this.View.AnswerLabelC.string = 'C: ' + this.ansC;
            this.View.AnswerLabelD.string = 'D: ' + this.ansD;

            if (GameController.result4[0] == 2) {
                this.AtrueGroup();
            }
            else if (GameController.result4[1] == 2) {
                this.BtrueGroup();
            }
            else if (GameController.result4[2] == 2) {
                this.CtrueGroup();
            }
            else if (GameController.result4[3] == 2) {
                this.DtrueGroup();
                
            }
        }
        else if (GameController.i > 15) {
            this.View.AnswerBtnA.node.active = false;
            this.View.AnswerBtnB.node.active = false;
            this.View.AnswerBtnC.node.active = false;
            this.View.AnswerBtnD.node.active = false;
            this.View.QuestionLabelNumber.node.active = false;
            this.View.TimeLabel.node.active = false;
            this.View.QuestionLabel.node.active = false;
            let _this = this;
            director.preloadScene("Winning",  async function () {
                await _this.gameClient.match
                    .completeMatch(_this.matchId, { score: GameController.i })
                    .then((data) => {})
                    .catch((error) => console.log(error));
                // if (DEBUG === false) {

                // }
                director.loadScene("Winning");
            });
            GameController.i = 1;
        }
        labelAniQuestion.play("LabelScaleUp");
        labelAniAnswerA.play("LabelScaleUp");
        labelAniAnswerB.play("LabelScaleUp");
        labelAniAnswerC.play("LabelScaleUp");
        labelAniAnswerD.play("LabelScaleUp");
        this.View.QuestionLabelNumber.string = 'Câu hỏi số ' + GameController.i.toString();
        console.log(GameController.i);
    }
    
    private btnClickNextQuestion(AnswerBtnA: Button) {
        GameController.i++;
        this.View.Help1Btn.node.active = false;
        this.View.Help2Btn.node.active = false;
        this.View.Help3Btn.node.active = false;
        this.View.BackMainMenuBtn.interactable = false;
        this.View.GiveUpBtn.interactable = false;
        this.unschedule(GameController.callbackSchedule);
        this.gameHighScoreArray.push(GameController.i - 1);
        localStorage.setItem('gameHighScoreArray', JSON.stringify(this.gameHighScoreArray));
        this.disableAnswerBtn();
        this.scheduleOnce(function() {
            this.View.AudioCorrectAns.play();
        }, 0.7)
        this.scheduleOnce(function() {
            this.questionAndAnswerDisplay();
            switch(GameController.i) {
                case 2:
                    this.View.Question2.interactable = false;
                    break;
                case 3:
                    this.View.Question3.interactable = false;
                    break;
                case 4:
                    this.View.Question4.interactable = false;
                    break;
                case 5:
                    this.View.Question5.interactable = false;
                    break;
                case 6:
                    this.View.Question6.interactable = false;
                    break;
                case 7:
                    this.View.Question7.interactable = false;
                    break;
                case 8:
                    this.View.Question8.interactable = false;
                    break;
                case 9:
                    this.View.Question9.interactable = false;
                    break;
                case 10:
                    this.View.Question10.interactable = false;
                    break;
                case 11:
                    this.View.Question11.interactable = false;
                    break;
                case 12:
                    this.View.Question12.interactable = false;
                    break;
                case 13:
                    this.View.Question13.interactable = false;
                    break;
                case 14:
                    this.View.Question14.interactable = false;
                    break;
                case 15:
                    this.View.Question15.interactable = false;
                    break;
                default:
                    break;
            }
        }, 3)
    }

    private AtrueGroup() {
        this.View.Help1No.node.on(Button.EventType.CLICK, this.btnHelp1No, this);
        this.View.Help2No.node.on(Button.EventType.CLICK, this.btnHelp2No, this);
        this.View.Help3No.node.on(Button.EventType.CLICK, this.btnHelp3No, this);
        this.View.Help1Btn.node.on(Button.EventType.CLICK, this.btnHelp1, this);
        this.View.Help2Btn.node.on(Button.EventType.CLICK, this.btnHelp2, this);
        this.View.Help3Btn.node.on(Button.EventType.CLICK, this.btnHelp3, this);
        this.View.Help2No.node.on(Button.EventType.CLICK, this.btnHelp2No, this);
        this.View.Help3No.node.on(Button.EventType.CLICK, this.btnHelp3No, this);
        this.View.Help1Yes.node.on(Button.EventType.CLICK, this.btnHelp1ATrue, this);
        this.View.Help1Yes.node.off(Button.EventType.CLICK, this.btnHelp1BTrue, this);
        this.View.Help1Yes.node.off(Button.EventType.CLICK, this.btnHelp1CTrue, this);
        this.View.Help1Yes.node.off(Button.EventType.CLICK, this.btnHelp1DTrue, this);
        this.View.Help2Yes.node.on(Button.EventType.CLICK, this.btnHelp2ATrue, this);
        this.View.Help2Yes.node.off(Button.EventType.CLICK, this.btnHelp2BTrue, this);
        this.View.Help2Yes.node.off(Button.EventType.CLICK, this.btnHelp2CTrue, this);
        this.View.Help2Yes.node.off(Button.EventType.CLICK, this.btnHelp2DTrue, this);
        this.View.Help3Yes.node.on(Button.EventType.CLICK, this.btnHelp3ATrue, this);
        this.View.Help3Yes.node.off(Button.EventType.CLICK, this.btnHelp3BTrue, this);
        this.View.Help3Yes.node.off(Button.EventType.CLICK, this.btnHelp3CTrue, this);
        this.View.Help3Yes.node.off(Button.EventType.CLICK, this.btnHelp3DTrue, this);
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

    private BtrueGroup() {
        this.View.Help1No.node.on(Button.EventType.CLICK, this.btnHelp1No, this);
        this.View.Help2No.node.on(Button.EventType.CLICK, this.btnHelp2No, this);
        this.View.Help3No.node.on(Button.EventType.CLICK, this.btnHelp3No, this);
        this.View.Help1Btn.node.on(Button.EventType.CLICK, this.btnHelp1, this);
        this.View.Help2Btn.node.on(Button.EventType.CLICK, this.btnHelp2, this);
        this.View.Help3Btn.node.on(Button.EventType.CLICK, this.btnHelp3, this);
        this.View.Help1Yes.node.on(Button.EventType.CLICK, this.btnHelp1BTrue, this);
        this.View.Help1Yes.node.off(Button.EventType.CLICK, this.btnHelp1ATrue, this);
        this.View.Help1Yes.node.off(Button.EventType.CLICK, this.btnHelp1CTrue, this);
        this.View.Help1Yes.node.off(Button.EventType.CLICK, this.btnHelp1DTrue, this);
        this.View.Help2Yes.node.on(Button.EventType.CLICK, this.btnHelp2BTrue, this);
        this.View.Help2Yes.node.off(Button.EventType.CLICK, this.btnHelp2ATrue, this);
        this.View.Help2Yes.node.off(Button.EventType.CLICK, this.btnHelp2CTrue, this);
        this.View.Help2Yes.node.off(Button.EventType.CLICK, this.btnHelp2DTrue, this);
        this.View.Help3Yes.node.on(Button.EventType.CLICK, this.btnHelp3BTrue, this);
        this.View.Help3Yes.node.off(Button.EventType.CLICK, this.btnHelp3ATrue, this);
        this.View.Help3Yes.node.off(Button.EventType.CLICK, this.btnHelp3CTrue, this);
        this.View.Help3Yes.node.off(Button.EventType.CLICK, this.btnHelp3DTrue, this);
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

    private CtrueGroup() {
        this.View.Help1No.node.on(Button.EventType.CLICK, this.btnHelp1No, this);
        this.View.Help2No.node.on(Button.EventType.CLICK, this.btnHelp2No, this);
        this.View.Help3No.node.on(Button.EventType.CLICK, this.btnHelp3No, this);
        this.View.Help1Btn.node.on(Button.EventType.CLICK, this.btnHelp1, this);
        this.View.Help2Btn.node.on(Button.EventType.CLICK, this.btnHelp2, this);
        this.View.Help3Btn.node.on(Button.EventType.CLICK, this.btnHelp3, this);
        this.View.Help1Yes.node.on(Button.EventType.CLICK, this.btnHelp1CTrue, this);
        this.View.Help1Yes.node.off(Button.EventType.CLICK, this.btnHelp1ATrue, this);
        this.View.Help1Yes.node.off(Button.EventType.CLICK, this.btnHelp1BTrue, this);
        this.View.Help1Yes.node.off(Button.EventType.CLICK, this.btnHelp1DTrue, this);
        this.View.Help2Yes.node.on(Button.EventType.CLICK, this.btnHelp2CTrue, this);
        this.View.Help2Yes.node.off(Button.EventType.CLICK, this.btnHelp2ATrue, this);
        this.View.Help2Yes.node.off(Button.EventType.CLICK, this.btnHelp2BTrue, this);
        this.View.Help3Yes.node.off(Button.EventType.CLICK, this.btnHelp3DTrue, this);
        this.View.Help3Yes.node.on(Button.EventType.CLICK, this.btnHelp3CTrue, this);
        this.View.Help3Yes.node.off(Button.EventType.CLICK, this.btnHelp3ATrue, this);
        this.View.Help3Yes.node.off(Button.EventType.CLICK, this.btnHelp3BTrue, this);
        this.View.Help2Yes.node.off(Button.EventType.CLICK, this.btnHelp2DTrue, this);
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

    private DtrueGroup() {
        this.View.Help1No.node.on(Button.EventType.CLICK, this.btnHelp1No, this);
        this.View.Help2No.node.on(Button.EventType.CLICK, this.btnHelp2No, this);
        this.View.Help3No.node.on(Button.EventType.CLICK, this.btnHelp3No, this);
        this.View.Help1Btn.node.on(Button.EventType.CLICK, this.btnHelp1, this);
        this.View.Help2Btn.node.on(Button.EventType.CLICK, this.btnHelp2, this);
        this.View.Help3Btn.node.on(Button.EventType.CLICK, this.btnHelp3, this);
        this.View.Help1Yes.node.on(Button.EventType.CLICK, this.btnHelp1DTrue, this);
        this.View.Help1Yes.node.off(Button.EventType.CLICK, this.btnHelp1ATrue, this);
        this.View.Help1Yes.node.off(Button.EventType.CLICK, this.btnHelp1BTrue, this);
        this.View.Help1Yes.node.off(Button.EventType.CLICK, this.btnHelp1CTrue, this);
        this.View.Help2Yes.node.on(Button.EventType.CLICK, this.btnHelp2DTrue, this);
        this.View.Help2Yes.node.off(Button.EventType.CLICK, this.btnHelp2ATrue, this);
        this.View.Help2Yes.node.off(Button.EventType.CLICK, this.btnHelp2BTrue, this);
        this.View.Help2Yes.node.off(Button.EventType.CLICK, this.btnHelp2CTrue, this);
        this.View.Help3Yes.node.on(Button.EventType.CLICK, this.btnHelp3DTrue, this);
        this.View.Help3Yes.node.off(Button.EventType.CLICK, this.btnHelp3ATrue, this);
        this.View.Help3Yes.node.off(Button.EventType.CLICK, this.btnHelp3BTrue, this);
        this.View.Help3Yes.node.off(Button.EventType.CLICK, this.btnHelp3CTrue, this);
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
        const aniBtnB = this.View.AnswerBtnB.getComponent(Animation);
        const aniBtnC = this.View.AnswerBtnC.getComponent(Animation);
        const aniBtnD = this.View.AnswerBtnD.getComponent(Animation);

        this.View.BackMainMenuBtn.interactable = false;
        this.View.GiveUpBtn.interactable = false;
        aniBtnA.play("BtnFalse");
        if (GameController.result2[1] == 2 || GameController.result3[1] == 2 || GameController.result4[1] == 2) {
            aniBtnB.play("BtnTrueNotHover");
        }
        else if (GameController.result2[2] == 2 || GameController.result3[2] == 2 || GameController.result4[2] == 2) {
            aniBtnC.play("BtnTrueNotHover");
        }
        else if (GameController.result2[3] == 2 || GameController.result3[3] == 2 || GameController.result4[3] == 2) {
            aniBtnD.play("BtnTrueNotHover");
        }
    }

    private btnBClickFalse(AnswerBtnB: Button) {
        const aniBtnA = this.View.AnswerBtnA.getComponent(Animation);
        const aniBtnB = this.View.AnswerBtnB.getComponent(Animation);
        const aniBtnC = this.View.AnswerBtnC.getComponent(Animation);
        const aniBtnD = this.View.AnswerBtnD.getComponent(Animation);

        this.View.BackMainMenuBtn.interactable = false;
        this.View.GiveUpBtn.interactable = false;
        aniBtnB.play("BtnFalse");
        if (GameController.result2[0]  == 2 || GameController.result3[0] == 2 || GameController.result4[0] == 2) {
            aniBtnA.play("BtnTrueNotHover");
        }
        else if (GameController.result2[2] == 2 || GameController.result3[2] == 2 || GameController.result4[2] == 2) {
            aniBtnC.play("BtnTrueNotHover");
        }
        else if (GameController.result2[3] == 2 || GameController.result3[3] == 2 || GameController.result4[3] == 2) {
            aniBtnD.play("BtnTrueNotHover");
        }
    }

    private btnCClickFalse(AnswerBtnC: Button) {
        const aniBtnA = this.View.AnswerBtnA.getComponent(Animation);
        const aniBtnB = this.View.AnswerBtnB.getComponent(Animation);
        const aniBtnC = this.View.AnswerBtnC.getComponent(Animation);
        const aniBtnD = this.View.AnswerBtnD.getComponent(Animation);

        this.View.BackMainMenuBtn.interactable = false;
        this.View.GiveUpBtn.interactable = false;
        aniBtnC.play("BtnFalse");
        if (GameController.result2[0] == 2 || GameController.result3[0] == 2 || GameController.result4[0] == 2) {
            aniBtnA.play("BtnTrueNotHover");
        }
        else if (GameController.result2[1] == 2 || GameController.result3[1] == 2 || GameController.result4[1] == 2) {
            aniBtnB.play("BtnTrueNotHover");
        }
        else if (GameController.result2[3] == 2 || GameController.result3[3] == 2 || GameController.result4[3] == 2) {
            aniBtnD.play("BtnTrueNotHover");
        }
    }

    private btnDClickFalse(AnswerBtnD: Button) {
        const aniBtnA = this.View.AnswerBtnA.getComponent(Animation);
        const aniBtnB = this.View.AnswerBtnB.getComponent(Animation);
        const aniBtnC = this.View.AnswerBtnC.getComponent(Animation);
        const aniBtnD = this.View.AnswerBtnD.getComponent(Animation);

        this.View.BackMainMenuBtn.interactable = false;
        this.View.GiveUpBtn.interactable = false;
        aniBtnD.play("BtnFalse");
        if (GameController.result2[0] == 2 || GameController.result3[0] == 2 || GameController.result4[0] == 2) {
            aniBtnA.play("BtnTrueNotHover");
        }
        else if (GameController.result2[1] == 2 || GameController.result3[1] == 2 || GameController.result4[1] == 2) {
            aniBtnB.play("BtnTrueNotHover");
        }
        else if (GameController.result2[2] == 2 || GameController.result3[2] == 2 || GameController.result4[2] == 2) {
            aniBtnC.play("BtnTrueNotHover");
        }
    }

    private async startCountDown() {
        this.View.TimeLabel.string = this.timeNum.toString();
        GameController.callbackSchedule = function() {
            this.timeNum--;
            this.View.TimeLabel.string = this.timeNum.toString();
            
            if (this.timeNum == 0) {
                this.timeNum = this.timeNum;
                this.View.ResultLabel.string = "Hết Giờ";
                this.unschedule(GameController.callbackSchedule, 1);
                this.View.AudioIncorrectAns.play();
                if (GameController.result2[0] == 2 || GameController.result3[0] == 2 || GameController.result4[0] == 2) {
    
                    const aniBtnA = this.View.AnswerBtnA.getComponent(Animation);
                    aniBtnA.play("BtnTrueNotHover");
                }
                else if (GameController.result2[1] == 2 || GameController.result3[1] == 2 || GameController.result4[1] == 2) {
    
                    const aniBtnB = this.View.AnswerBtnB.getComponent(Animation);
                    aniBtnB.play("BtnTrueNotHover");
                }
                else if (GameController.result2[2] == 2 || GameController.result3[2] == 2 || GameController.result4[2] == 2) {
    
                    const aniBtnC = this.View.AnswerBtnC.getComponent(Animation);
                    aniBtnC.play("BtnTrueNotHover");
                }
                else if (GameController.result2[3] == 2 || GameController.result3[3] == 2 || GameController.result4[3] == 2) {
    
                    const aniBtnD = this.View.AnswerBtnD.getComponent(Animation);
                    aniBtnD.play("BtnTrueNotHover");
                }
                this.View.BackMainMenuBtn.interactable = false;
                this.View.GiveUpBtn.interactable = false;

                this.disableAnswerBtn();
                this.disableHelpBtn();
                let _this = this;
                this.scheduleOnce(async function() {
                    await _this.gameClient.match
                        .completeMatch(_this.matchId, { score: GameController.i })
                        .then((data) => {})
                        .catch((error) => console.log(error));
                    // if (DEBUG === false) {

                    // }
                    _this.startCondition();
                    director.preloadScene("Losing", function () {
                        director.loadScene("Losing");
                    });
                }, 2);
            }
        }
        this.schedule(GameController.callbackSchedule, 1);
    }

    private btnMute(BtnMute: Button) {
        this.View.BtnMute.node.active = false;
        this.View.BtnUnmute.node.active = true;
        this.View.AudioBg.volume = 0;
        this.View.AudioCorrectAns.volume = 0;
        this.View.AudioIncorrectAns.volume = 0;
        this.volumeValueArray.push(this.View.AudioBg.volume);
        localStorage.setItem('volumeValueArray', JSON.stringify(this.volumeValueArray));
    }

    private btnUnmute(BtnUnmute: Button) {
        this.btnAudioDisplay();
        this.View.AudioBg.volume = 0.7;
        this.View.AudioCorrectAns.volume = 0.7;
        this.View.AudioIncorrectAns.volume = 0.7;
        this.volumeValueArray.push(this.View.AudioBg.volume);
        localStorage.setItem('volumeValueArray', JSON.stringify(this.volumeValueArray));
    }

    private btnAudioDisplay() {
        this.View.BtnMute.node.active = true;
        this.View.BtnUnmute.node.active = false;
    }

    private btnHelp1ATrue(Help1Btn: Button) {
        let randInt = Math.floor(Math.random() * 3) + 1;
        this.View.Help1Btn.interactable = false;
        this.View.Help1node.active = false;
        if (randInt == 1) {
            this.View.AnswerBtnB.interactable = false;
            this.View.AnswerBtnC.interactable = false;
            this.View.AnswerLabelB.string = '';
            this.View.AnswerLabelC.string = '';
        }
        else if (randInt == 2) {
            this.View.AnswerBtnB.interactable = false;
            this.View.AnswerBtnD.interactable = false;
            this.View.AnswerLabelB.string = '';
            this.View.AnswerLabelD.string = '';
        }
        else if (randInt == 3) {
            this.View.AnswerBtnD.interactable = false;
            this.View.AnswerBtnC.interactable = false;
            this.View.AnswerLabelD.string = '';
            this.View.AnswerLabelC.string = '';
        }
    }

    private btnHelp1BTrue(Help1Btn: Button) {
        let randInt = Math.floor(Math.random() * 3) + 1;
        this.View.Help1Btn.interactable = false;
        this.View.Help1node.active = false;
        if (randInt == 1) {
            this.View.AnswerBtnA.interactable = false;
            this.View.AnswerBtnC.interactable = false;
            this.View.AnswerLabelA.string = '';
            this.View.AnswerLabelC.string = '';
        }
        else if (randInt == 2) {
            this.View.AnswerBtnA.interactable = false;
            this.View.AnswerBtnD.interactable = false;
            this.View.AnswerLabelA.string = '';
            this.View.AnswerLabelD.string = '';
        }
        else if (randInt == 3) {
            this.View.AnswerBtnD.interactable = false;
            this.View.AnswerBtnC.interactable = false;
            this.View.AnswerLabelD.string = '';
            this.View.AnswerLabelC.string = '';
        }
    }

    private btnHelp1CTrue(Help1Btn: Button) {
        let randInt = Math.floor(Math.random() * 3) + 1;
        this.View.Help1Btn.interactable = false;
        this.View.Help1node.active = false;
        if (randInt == 1) {
            this.View.AnswerBtnA.interactable = false;
            this.View.AnswerBtnB.interactable = false;
            this.View.AnswerLabelA.string = '';
            this.View.AnswerLabelB.string = '';
        }
        else if (randInt == 2) {
            this.View.AnswerBtnA.interactable = false;
            this.View.AnswerBtnD.interactable = false;
            this.View.AnswerLabelA.string = '';
            this.View.AnswerLabelD.string = '';
        }
        else if (randInt == 3) {
            this.View.AnswerBtnB.interactable = false;
            this.View.AnswerBtnD.interactable = false;
            this.View.AnswerLabelB.string = '';
            this.View.AnswerLabelD.string = '';
        }
    }

    private btnHelp1DTrue(Help1Btn: Button) {
        let randInt = Math.floor(Math.random() * 3) + 1;
        this.View.Help1Btn.interactable = false;
        this.View.Help1node.active = false;
        if (randInt == 1) {
            this.View.AnswerBtnA.interactable = false;
            this.View.AnswerBtnB.interactable = false;
            this.View.AnswerLabelA.string = '';
            this.View.AnswerLabelB.string = '';
        }
        else if (randInt == 2) {
            this.View.AnswerBtnA.interactable = false;
            this.View.AnswerBtnC.interactable = false;
            this.View.AnswerLabelA.string = '';
            this.View.AnswerLabelC.string = '';
        }
        else if (randInt == 3) {
            this.View.AnswerBtnB.interactable = false;
            this.View.AnswerBtnC.interactable = false;
            this.View.AnswerLabelB.string = '';
            this.View.AnswerLabelC.string = '';
        }
    }

    private unactiveHelp2Container() {
        this.View.Help2Container.node.active = true;
        this.View.Help2Btn.interactable = false;
        this.scheduleOnce(function() {
            this.View.Help2Container.node.active = false;
        }, 3)
    }

    private unactiveHelp3Container() {
        this.View.Help3Container.node.active = true;
        
        this.View.Help3Btn.interactable = false;
        this.scheduleOnce(function() {
            this.View.Help3Container.node.active = false;
        }, 3)
    }

    private btnHelp2ATrue(Help2Btn: Button) {
        this.View.Help2node.active = false;
        // this.unschedule(GameController.callbackSchedule);
        this.View.LabelAPercent.string = 'A: ' + this.num1.toString() + '%';
        this.View.LabelBPercent.string = 'B: ' + this.num2.toString() + '%';
        this.View.LabelCPercent.string = 'C: ' + this.num3.toString() + '%';
        this.View.LabelDPercent.string = 'D: ' + this.num4.toString() + '%';
        this.unactiveHelp2Container();
    }

    private btnHelp2BTrue(Help2Btn: Button) {
        this.View.Help2node.active = false;
        // this.unschedule(GameController.callbackSchedule);
        this.View.LabelAPercent.string = 'A: ' + this.num2.toString() + '%';
        this.View.LabelBPercent.string = 'B: ' + this.num1.toString() + '%';
        this.View.LabelCPercent.string = 'C: ' + this.num3.toString() + '%';
        this.View.LabelDPercent.string = 'D: ' + this.num4.toString() + '%';
        this.unactiveHelp2Container();
    }

    private btnHelp2CTrue(Help2Btn: Button) {
        this.View.Help2node.active = false;
        // this.unschedule(GameController.callbackSchedule);
        this.View.LabelAPercent.string = 'A: ' + this.num2.toString() + '%';
        this.View.LabelBPercent.string = 'B: ' + this.num3.toString() + '%';
        this.View.LabelCPercent.string = 'C: ' + this.num1.toString() + '%';
        this.View.LabelDPercent.string = 'D: ' + this.num4.toString() + '%';
        this.unactiveHelp2Container();
    }

    private btnHelp2DTrue(Help2Btn: Button) {
        this.View.Help2node.active = false;
        // this.unschedule(GameController.callbackSchedule);
        this.View.LabelAPercent.string = 'A: ' + this.num2.toString() + '%';
        this.View.LabelBPercent.string = 'B: ' + this.num3.toString() + '%';
        this.View.LabelCPercent.string = 'C: ' + this.num4.toString() + '%';
        this.View.LabelDPercent.string = 'D: ' + this.num1.toString() + '%';
        this.unactiveHelp2Container();
    }

    private btnHelp3ATrue(Help3Btn: Button) {
        this.View.Help3node.active = false;
        this.View.Help3label.string = 'Người thân bạn khuyên bạn chọn phương án A';
        this.unactiveHelp3Container();
    }

    private btnHelp3BTrue(Help3Btn: Button) {
        this.View.Help3node.active = false;
        this.View.Help3label.string = 'Người thân bạn khuyên bạn chọn phương án B';
        this.unactiveHelp3Container();
    }

    private btnHelp3CTrue(Help3Btn: Button) {
        this.View.Help3node.active = false;
        this.View.Help3label.string = 'Người thân bạn khuyên bạn chọn phương án C';
        this.unactiveHelp3Container();
    }

    private btnHelp3DTrue(Help3Btn: Button) {
        this.View.Help3node.active = false;
        this.View.Help3label.string = 'Người thân bạn khuyên bạn chọn phương án D';
        this.unactiveHelp3Container();
    }

    private btnHelp1No(Help1Btn: Button) {
        this.View.Help1node.active = false;
    }

    private btnHelp2No(Help2Btn: Button) {
        this.View.Help2node.active = false;
    }

    private btnHelp3No(Help3Btn: Button) {
        this.View.Help3node.active = false;
    }

    private btnHelp1(Help1Btn: Button) {
        this.View.Help1node.active = true;
    }

    private btnHelp2(Help2Btn: Button) {
        this.View.Help2node.active = true;
    }

    private btnHelp3(Help3Btn: Button) {
        this.View.Help3node.active = true;
    }
}


