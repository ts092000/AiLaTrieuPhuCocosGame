import { _decorator, Component, Node, Button, Label, AudioSource, AnimationClip, SpriteFrame, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameView')
export class GameView extends Component {
    @property({type:Button})
    private backMainMenuBtn: Button = null;

    @property({type:Button})
    private giveUpBtn: Button = null;

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

    @property({type:AudioSource})
    private audioLv1: AudioSource = null;

    @property({type:AudioSource})
    private audioLv2: AudioSource = null;

    @property({type:AudioSource})
    private audioLv3: AudioSource = null;

    @property({type:Button})
    private btnMute: Button = null;

    @property({type:Button})
    private btnUnmute: Button = null;

    @property({type:Button})
    private question1: Button = null;

    @property({type:Button})
    private question2: Button = null;
    
    @property({type:Button})
    private question3: Button = null;

    @property({type:Button})
    private question4: Button = null;

    @property({type:Button})
    private question5: Button = null;

    @property({type:Button})
    private question6: Button = null;

    @property({type:Button})
    private question7: Button = null;

    @property({type:Button})
    private question8: Button = null;

    @property({type:Button})
    private question9: Button = null;

    @property({type:Button})
    private question10: Button = null;

    @property({type:Button})
    private question11: Button = null;

    @property({type:Button})
    private question12: Button = null;

    @property({type:Button})
    private question13: Button = null;

    @property({type:Button})
    private question14: Button = null;

    @property({type:Button})
    private question15: Button = null;

    public get BackMainMenuBtn() : Button {
        return this.backMainMenuBtn;
    }
    
    public set BackMainMenuBtn(backMainMenuBtn : Button) {
        this.backMainMenuBtn = backMainMenuBtn;
    }

    public get GiveUpBtn() : Button {
        return this.giveUpBtn;
    }
    
    public set GiveUpBtn(giveUpBtn : Button) {
        this.giveUpBtn = giveUpBtn;
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

    public get AudioLv1() : AudioSource {
        return this.audioLv1;
    }
    
    public set AudioLv1(audioLv1 : AudioSource) {
        this.audioLv1 = audioLv1;
    }

    public get AudioLv2() : AudioSource {
        return this.audioLv2;
    }
    
    public set AudioLv2(audioLv2 : AudioSource) {
        this.audioLv2 = audioLv2;
    }

    public get AudioLv3() : AudioSource {
        return this.audioLv3;
    }
    
    public set AudioLv3(audioLv3 : AudioSource) {
        this.audioLv3 = audioLv3;
    }

    public set BtnMute(btnMute : Button) {
        this.btnMute = btnMute;
    }

    public get BtnMute() : Button {
        return this.btnMute
    }
    
    public set BtnUnmute(btnUnmute : Button) {
        this.btnUnmute = btnUnmute;
    }

    public get BtnUnmute() : Button {
        return this.btnUnmute
    }

    public set Question1(question1 : Button) {
        this.question1 = question1;
    }

    public get Question1() : Button {
        return this.question1
    }
    
    public set Question2(question2 : Button) {
        this.question2 = question2;
    }

    public get Question2() : Button {
        return this.question2
    }

    public set Question3(question3 : Button) {
        this.question3 = question3;
    }

    public get Question3() : Button {
        return this.question3
    }

    public set Question4(question4 : Button) {
        this.question4 = question4;
    }

    public get Question4() : Button {
        return this.question4
    }

    public set Question5(question5 : Button) {
        this.question5 = question5;
    }

    public get Question5() : Button {
        return this.question5
    }

    public set Question6(question6 : Button) {
        this.question6 = question6;
    }

    public get Question6() : Button {
        return this.question6
    }

    public set Question7(question7 : Button) {
        this.question7 = question7;
    }

    public get Question7() : Button {
        return this.question7
    }

    public set Question8(question8 : Button) {
        this.question8 = question8;
    }

    public get Question8() : Button {
        return this.question8
    }

    public set Question9(question9 : Button) {
        this.question9 = question9;
    }

    public get Question9() : Button {
        return this.question9
    }

    public set Question10(question10 : Button) {
        this.question10 = question10;
    }

    public get Question10() : Button {
        return this.question10
    }

    public set Question11(question11 : Button) {
        this.question11 = question11;
    }

    public get Question11() : Button {
        return this.question11
    }

    public set Question12(question12 : Button) {
        this.question12 = question12;
    }

    public get Question12() : Button {
        return this.question12
    }

    public set Question13(question13 : Button) {
        this.question13 = question13;
    }

    public get Question13() : Button {
        return this.question13
    }

    public set Question14(question14 : Button) {
        this.question14 = question14;
    }

    public get Question14() : Button {
        return this.question14
    }

    public set Question15(question15 : Button) {
        this.question15 = question15;
    }

    public get Question15() : Button {
        return this.question15
    }

}


