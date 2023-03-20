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

    public start() {
        // this.randomUniqueNum(200, 200);
        this.questionAndAnswerDisplay();
        this.startCountDown();
        this.View.BtnMute.node.active = true;
        this.View.BtnUnmute.node.active = false;
    }
    
    public update(deltaTime: number) {

    }
    
    public onLoad() {
        this.View.BackMainMenuBtn.node.on(Button.EventType.CLICK, this.btnBackMainMenu, this);
    }

    private btnBackMainMenu(BackMainMenuBtn: Button) {
        GameController.i = 1;

        director.preloadScene("Main", function () {
            director.loadScene("Main");
        });
    }

    private questionAndAnswerDisplay() {
        let text1 = this.Model.CsvFilelv1.text;
        let text2 = this.Model.CsvFilelv2.text;
        let text3 = this.Model.CsvFilelv3.text;

        // this.View.BackGroundMenu.active = false;
        // this.View.GamePlayBg.active = true;

        // var questionArr1 = text1.split('\n').map((row1:string): string[] => {
        //     return row1.split(',');
        // });

        // var questionArr2 = text2.split('\n').map((row2:string): string[] => {
        //     return row2.split(',');
        // });

        // var questionArr3 = text3.split('\n').map((row3:string): string[] => {
        //     return row3.split(',');
        // });
        
        // let questionArrFilter = questionArr.filter(function(questionArr) {
        //     return questionArr.length <= 6;
        // });
        
        let range2 = 5;
        let outputCount2 = 5;

        let arr2 = [];
        for (let i = 2; i <= range2; i++) {
            arr2.push(i);
        }
      
        let result2 = [];
      
        for (let i = 2; i <= outputCount2; i++) {
            const random2 = Math.floor(Math.random() * (range2 - i));
            result2.push(arr2[random2]);
            arr2[random2] = arr2[range2 - i];
        }
        console.log('result2: ', result2);

        let range3 = 5;
        let outputCount3 = 5;

        let arr3 = [];
        for (let i = 2; i <= range3; i++) {
            arr3.push(i);
        }
      
        let result3 = [];
      
        for (let i = 2; i <= outputCount3; i++) {
            const random3 = Math.floor(Math.random() * (range3 - i));
            result3.push(arr3[random3]);
            arr3[random3] = arr3[range3 - i];
        }
        console.log('result3: ', result3);

        let range4 = 5;
        let outputCount4 = 5;

        let arr4 = [];
        for (let i = 2; i <= range4; i++) {
            arr4.push(i);
        }
      
        let result4 = [];
      
        for (let i = 2; i <= outputCount4; i++) {
            const random4 = Math.floor(Math.random() * (range4 - i));
            result4.push(arr4[random4]);
            arr4[random4] = arr4[range4 - i];
        }
        console.log('result4: ', result4);

        let questionLv1 = text1.split('\n').map((row1:string) => {
            return row1.split(',')[1];
        });

        let answerALv1 = text1.split('\n').map((row1:string) => {
            return row1.split(',')[result2[0]];
        });
        
        let answerBLv1 = text1.split('\n').map((row1:string) => {
            return row1.split(',')[result2[1]];
        });
        
        let answerCLv1 = text1.split('\n').map((row1:string) => {
            return row1.split(',')[result2[2]];
        });
        
        let answerDLv1 = text1.split('\n').map((row1:string) => {
            return row1.split(',')[result2[3]];
        });

        let questionLv2 = text2.split('\n').map((row2:string) => {
            return row2.split(',')[1];
        });

        let answerALv2 = text2.split('\n').map((row2:string) => {
            return row2.split(',')[result3[0]];
        });
        
        let answerBLv2 = text2.split('\n').map((row2:string) => {
            return row2.split(',')[result3[1]];
        });
        
        let answerCLv2 = text2.split('\n').map((row2:string) => {
            return row2.split(',')[result3[2]];
        });
        
        let answerDLv2 = text2.split('\n').map((row2:string) => {
            return row2.split(',')[result3[3]];
        });

        let questionLv3 = text3.split('\n').map((row3:string) => {
            return row3.split(',')[1];
        });

        let answerALv3 = text3.split('\n').map((row3:string) => {
            return row3.split(',')[result4[0]];
        });
        
        let answerBLv3 = text3.split('\n').map((row3:string) => {
            return row3.split(',')[result4[1]];
        });
        
        let answerCLv3 = text3.split('\n').map((row3:string) => {
            return row3.split(',')[result4[2]];
        });
        
        let answerDLv3 = text3.split('\n').map((row3:string) => {
            return row3.split(',')[result4[3]];
        });

        // let questionLv1 = questionArrFilter.map((row:string) => {
        //     return questionArrFilter.split(',')[1].replace('\r', '');
        // });

        // console.log(questionArr1);
        // console.log(questionArr2);
        // console.log(questionArr3);
        // for (let i = 1; i <= 5; i++) {
            // console.log(idcloumn[i]);
            // console.log(questionArrFilter[i]);
            // console.log(questionArr1[i]);
            // console.log(answerALv1[i]);
            // console.log(answerBLv1[i]);
            // console.log(answerCLv1[i]);
            // console.log(answerDLv1[i]);
        // }
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
            this.View.AudioLv1.play();
            this.View.AudioLv2.stop();
            this.View.AudioLv3.stop();
            this.question = questionLv1[result[lv1]];
            this.ansA = answerALv1[result[lv1]];
            this.ansB = answerBLv1[result[lv1]];
            this.ansC = answerCLv1[result[lv1]];
            this.ansD = answerDLv1[result[lv1]];
            lv1 += 1;

            this.View.BtnMute.node.on(Button.EventType.CLICK, this.btnMuteLv1, this);
            this.View.BtnUnmute.node.on(Button.EventType.CLICK, this.btnUnmuteLv1, this);

            if (result2[0] == 2) {
                console.log('BtnAlv1 true');
                this.View.AnswerBtnA.node.on(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                // this.View.AnswerBtnA.node.on(Button.EventType.CLICK, this.btnBackMainMenu, this);
                // this.View.AnswerBtnC.node.on(Button.EventType.CLICK, this.btnBackMainMenu, this);
                // this.View.AnswerBtnD.node.on(Button.EventType.CLICK, this.btnBackMainMenu, this)
                
            }
            else if (result2[1] == 2) {
                console.log('BtnBlv1 true');
                this.View.AnswerBtnB.node.on(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                // this.View.AnswerBtnA.node.on(Button.EventType.CLICK, this.btnBackMainMenu, this);
                // this.View.AnswerBtnC.node.on(Button.EventType.CLICK, this.btnBackMainMenu, this);
                // this.View.AnswerBtnD.node.on(Button.EventType.CLICK, this.btnBackMainMenu, this);
            }
            else if (result2[2] == 2) {
                console.log('BtnClv1 true');
                this.View.AnswerBtnC.node.on(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                // this.View.AnswerBtnA.node.on(Button.EventType.CLICK, this.btnBackMainMenu, this);
                // this.View.AnswerBtnB.node.on(Button.EventType.CLICK, this.btnBackMainMenu, this);
                // this.View.AnswerBtnD.node.on(Button.EventType.CLICK, this.btnBackMainMenu, this);
            }
            else if (result2[3] == 2) {
                console.log('BtnDlv1 true');
                this.View.AnswerBtnD.node.on(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                // this.View.AnswerBtnA.node.on(Button.EventType.CLICK, this.btnBackMainMenu, this);
                // this.View.AnswerBtnB.node.on(Button.EventType.CLICK, this.btnBackMainMenu, this);
                // this.View.AnswerBtnC.node.on(Button.EventType.CLICK, this.btnBackMainMenu, this);
            }
        }
        else if (GameController.i > 5 && GameController.i <= 10) {
            this.View.AudioLv2.play();
            this.View.AudioLv1.stop();
            this.View.AudioLv3.stop();
            this.question = questionLv2[result[lv2]];
            this.ansA = answerALv2[result[lv2]];
            this.ansB = answerBLv2[result[lv2]];
            this.ansC = answerCLv2[result[lv2]];
            this.ansD = answerDLv2[result[lv2]];
            lv2 += 1;

            this.View.BtnMute.node.on(Button.EventType.CLICK, this.btnMuteLv2, this);
            this.View.BtnUnmute.node.on(Button.EventType.CLICK, this.btnUnmuteLv2, this);

            if (result3[0] == 2) {
                console.log('BtnAlv2 true');
                this.View.AnswerBtnA.node.on(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                // this.View.AnswerBtnB.node.on(Button.EventType.CLICK, this.btnBackMainMenu, this);
                // this.View.AnswerBtnC.node.on(Button.EventType.CLICK, this.btnBackMainMenu, this);
                // this.View.AnswerBtnD.node.on(Button.EventType.CLICK, this.btnBackMainMenu, this);
            }
            else if (result3[1] == 2) {
                console.log('BtnBlv2 true');
                this.View.AnswerBtnB.node.on(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                // this.View.AnswerBtnA.node.on(Button.EventType.CLICK, this.btnBackMainMenu, this);
                // this.View.AnswerBtnC.node.on(Button.EventType.CLICK, this.btnBackMainMenu, this);
                // this.View.AnswerBtnD.node.on(Button.EventType.CLICK, this.btnBackMainMenu, this);
            }
            else if (result3[2] == 2) {
                console.log('BtnClv2 true');
                this.View.AnswerBtnC.node.on(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                // this.View.AnswerBtnA.node.on(Button.EventType.CLICK, this.btnBackMainMenu, this);
                // this.View.AnswerBtnB.node.on(Button.EventType.CLICK, this.btnBackMainMenu, this);
                // this.View.AnswerBtnD.node.on(Button.EventType.CLICK, this.btnBackMainMenu, this);
            }
            else if (result3[3] == 2) {
                console.log('BtnDlv2 true');
                this.View.AnswerBtnD.node.on(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                // this.View.AnswerBtnA.node.on(Button.EventType.CLICK, this.btnBackMainMenu, this);
                // this.View.AnswerBtnB.node.on(Button.EventType.CLICK, this.btnBackMainMenu, this);
                // this.View.AnswerBtnC.node.on(Button.EventType.CLICK, this.btnBackMainMenu, this);
            }
        }
        else if (GameController.i > 10 && GameController.i <= 15) {
            this.View.AudioLv3.play();
            this.View.AudioLv1.stop();
            this.View.AudioLv2.stop();
            this.question = questionLv3[result[lv3]];
            this.ansA = answerALv3[result[lv3]];
            this.ansB = answerBLv3[result[lv3]];
            this.ansC = answerCLv3[result[lv3]];
            this.ansD = answerDLv3[result[lv3]];
            lv3 += 1;

            this.View.BtnMute.node.on(Button.EventType.CLICK, this.btnMuteLv3, this);
            this.View.BtnUnmute.node.on(Button.EventType.CLICK, this.btnUnmuteLv3, this);

            if (result4[0] == 2) {
                console.log('BtnAlv3 true');
                this.View.AnswerBtnA.node.on(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                // this.View.AnswerBtnB.node.on(Button.EventType.CLICK, this.btnBackMainMenu, this);
                // this.View.AnswerBtnC.node.on(Button.EventType.CLICK, this.btnBackMainMenu, this);
                // this.View.AnswerBtnD.node.on(Button.EventType.CLICK, this.btnBackMainMenu, this);
            }
            else if (result4[1] == 2) {
                console.log('BtnBlv3 true');
                this.View.AnswerBtnB.node.on(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                // this.View.AnswerBtnA.node.on(Button.EventType.CLICK, this.btnBackMainMenu, this);
                // this.View.AnswerBtnC.node.on(Button.EventType.CLICK, this.btnBackMainMenu, this);
                // this.View.AnswerBtnD.node.on(Button.EventType.CLICK, this.btnBackMainMenu, this);
            }
            else if (result4[2] == 2) {
                console.log('BtnClv3 true');
                this.View.AnswerBtnC.node.on(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                // this.View.AnswerBtnA.node.on(Button.EventType.CLICK, this.btnBackMainMenu, this);
                // this.View.AnswerBtnB.node.on(Button.EventType.CLICK, this.btnBackMainMenu, this);
                // this.View.AnswerBtnD.node.on(Button.EventType.CLICK, this.btnBackMainMenu, this);
            }
            else if (result4[3] == 2) {
                console.log('BtnDlv3 true');
                this.View.AnswerBtnD.node.on(Button.EventType.CLICK, this.btnClickNextQuestion, this);
                // this.View.AnswerBtnA.node.on(Button.EventType.CLICK, this.btnBackMainMenu, this);
                // this.View.AnswerBtnB.node.on(Button.EventType.CLICK, this.btnBackMainMenu, this);
                // this.View.AnswerBtnC.node.on(Button.EventType.CLICK, this.btnBackMainMenu, this);
            }
        }
        else if (GameController.i > 15) {
            director.preloadScene("Main", function () {
                director.loadScene("Main");
            });
            GameController.i = 1;
        }
        
        this.View.QuestionLabel.string = this.question;
        this.View.AnswerLabelA.string = this.ansA;
        this.View.AnswerLabelB.string = this.ansB;
        this.View.AnswerLabelC.string = this.ansC;
        this.View.AnswerLabelD.string = this.ansD;
        this.View.QuestionLabelNumber.string = 'Câu hỏi số ' + GameController.i.toString();
    }

    private btnClickNextQuestion(AnswerBtnA: Button) {
        this.unschedule(GameController.callbackSchedule);
        console.log(GameController.callbackSchedule);
        GameController.i++;
        this.questionAndAnswerDisplay();
        this.timeNum = 10;
        this.startCountDown();
        // this.schedule(GameController.callbackSchedule);
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
                    director.preloadScene("Main", function () {
                        console.log('Next scene preloaded');
                        director.loadScene("Main");
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


