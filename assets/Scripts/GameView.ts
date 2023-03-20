import { _decorator, Component, Node, Button, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameView')
export class GameView extends Component {
    @property({type:Button})
    private backMainMenuBtn: Button = null;

    @property({type:Label})
    private questionLabel: Label = null;

    @property({type:Label})
    private answerLabelA: Label = null;

    @property({type:Label})
    private answerLabelB: Label = null;

    @property({type:Label})
    private answerLabelC: Label = null;

    @property({type:Label})
    private answerLabelD: Label = null;

    @property({type:Button})
    private answerBtnA: Button = null;

    @property({type:Button})
    private answerBtnB: Button = null;

    @property({type:Button})
    private answerBtnC: Button = null;

    @property({type:Button})
    private answerBtnD: Button = null;

    @property({type:Label})
    private questionLabelNumber: Label = null;

    @property({type:Label})
    private timeLabel: Label = null;

    @property({type:Label})
    private resultLabel: Label = null;

    public get BackMainMenuBtn() : Button {
        return this.backMainMenuBtn;
    }
    
    public set BackMainMenuBtn(backMainMenuBtn : Button) {
        this.backMainMenuBtn = backMainMenuBtn;
    }

    public get QuestionLabel() : Label {
        return this.questionLabel
    }
    
    
    public set QuestionLabel(questionLabel : Label) {
        this.questionLabel = questionLabel;
    }
    
    public get AnswerLabelA() : Label {
        return this.answerLabelA
    }
    
    public set AnswerLabelA(answerLabelA : Label) {
        this.answerLabelA = answerLabelA;
    }

    public get AnswerLabelB() : Label {
        return this.answerLabelB
    }
    
    
    public set AnswerLabelB(answerLabelB : Label) {
        this.answerLabelB = answerLabelB;
    }

    public get AnswerLabelC() : Label {
        return this.answerLabelC
    }
    
    
    public set AnswerLabelC(answerLabelC : Label) {
        this.answerLabelC = answerLabelC;
    }

    public get AnswerLabelD() : Label {
        return this.answerLabelD
    }
    
    
    public set AnswerLabelD(answerLabelD : Label) {
        this.answerLabelD = answerLabelD;
    }

    public get QuestionLabelNumber() : Label {
        return this.questionLabelNumber
    }
    
    public set QuestionLabelNumber(questionLabelNumber : Label) {
        this.questionLabelNumber = questionLabelNumber;
    }

    public get AnswerBtnA() : Button {
        return this.answerBtnA
    }
    
    public set AnswerBtnA(answerBtnA : Button) {
        this.answerBtnA = answerBtnA;
    }

    public get AnswerBtnB() : Button {
        return this.answerBtnB
    }
    
    public set AnswerBtnB(answerBtnB : Button) {
        this.answerBtnB = answerBtnB;
    }

    public get AnswerBtnC() : Button {
        return this.answerBtnC
    }
    
    public set AnswerBtnC(answerBtnC : Button) {
        this.answerBtnC = answerBtnC;
    }

    public get AnswerBtnD() : Button {
        return this.answerBtnD
    }
    
    public set AnswerBtnD(answerBtnD : Button) {
        this.answerBtnD = answerBtnD;
    }
    
    public get TimeLabel() : Label {
        return this.timeLabel
    }
    
    public set TimeLabel(timeLabel : Label) {
        this.timeLabel = timeLabel;
    }

    public get ResultLabel() : Label {
        return this.resultLabel
    }
    
    public set ResultLabel(resultLabel : Label) {
        this.resultLabel = resultLabel;
    }
}


