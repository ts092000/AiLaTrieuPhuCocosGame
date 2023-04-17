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
    private audioBg: AudioSource = null;

    @property({type:AudioSource})
    private audioCorrectAns: AudioSource = null;

    @property({type:AudioSource})
    private audioIncorrectAns: AudioSource = null;

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

    @property({type:Button})
    private help1Btn: Button = null;

    @property({type:Button})
    private help2Btn: Button = null;

    @property({type:Button})
    private help3Btn: Button = null;

    @property({type:Sprite})
    private help2Container: Sprite = null;

    @property({type:Label})
    private labelAPercent: Label = null;

    @property({type:Label})
    private labelBPercent: Label = null;

    @property({type:Label})
    private labelCPercent: Label = null;

    @property({type:Label})
    private labelDPercent: Label = null;

    @property({type:Sprite})
    private help3Container: Sprite = null;

    @property({type:Label})
    private help3label: Label = null;

    @property({type:Node})
    private help1node: Node = null;

    @property({type:Node})
    private help2node: Node = null;

    @property({type:Node})
    private help3node: Node = null;

    @property({type:Button})
    private help1Yes: Button = null;

    @property({type:Button})
    private help1No: Button = null;

    @property({type:Button})
    private help2Yes: Button = null;

    @property({type:Button})
    private help2No: Button = null;

    @property({type:Button})
    private help3Yes: Button = null;

    @property({type:Button})
    private help3No: Button = null;


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

    public get AudioBg() : AudioSource {
        return this.audioBg;
    }
    
    public set AudioBg(audioBg : AudioSource) {
        this.audioBg = audioBg;
    }

    public get AudioCorrectAns() : AudioSource {
        return this.audioCorrectAns;
    }
    
    public set AudioCorrectAns(audioCorrectAns : AudioSource) {
        this.audioCorrectAns = audioCorrectAns;
    }

    public get AudioIncorrectAns() : AudioSource {
        return this.audioIncorrectAns;
    }
    
    public set AudioIncorrectAns(audioIncorrectAns : AudioSource) {
        this.audioIncorrectAns = audioIncorrectAns;
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

    public set Help1Btn(help1Btn : Button) {
        this.help1Btn = help1Btn;
    }

    public get Help1Btn() : Button {
        return this.help1Btn
    }

    public set Help2Btn(help2Btn : Button) {
        this.help2Btn = help2Btn;
    }

    public get Help2Btn() : Button {
        return this.help2Btn
    }

    public set Help3Btn(help3Btn : Button) {
        this.help3Btn = help3Btn;
    }

    public get Help3Btn() : Button {
        return this.help3Btn
    }

    public set Help2Container(help2Container : Sprite) {
        this.help2Container = help2Container;
    }

    public get Help2Container() : Sprite {
        return this.help2Container
    }

    public set LabelAPercent(labelAPercent : Label) {
        this.labelAPercent = labelAPercent;
    }

    public get LabelAPercent() : Label {
        return this.labelAPercent
    }

    public set LabelBPercent(labelBPercent : Label) {
        this.labelBPercent = labelBPercent;
    }

    public get LabelBPercent() : Label {
        return this.labelBPercent
    }

    public set LabelCPercent(labelCPercent : Label) {
        this.labelCPercent = labelCPercent;
    }

    public get LabelCPercent() : Label {
        return this.labelCPercent
    }

    public set LabelDPercent(labelDPercent : Label) {
        this.labelDPercent = labelDPercent;
    }

    public get LabelDPercent() : Label {
        return this.labelDPercent
    }

    public set Help3Container(help3Container : Sprite) {
        this.help3Container = help3Container;
    }

    public get Help3Container() : Sprite {
        return this.help3Container
    }

    public set Help3label(help3label : Label) {
        this.help3label = help3label;
    }

    public get Help3label() : Label {
        return this.help3label
    }

    public set Help1node(help1node : Node) {
        this.help1node = help1node;
    }

    public get Help1node() : Node {
        return this.help1node
    }

    public set Help2node(help2node : Node) {
        this.help2node = help2node;
    }

    public get Help2node() : Node {
        return this.help2node
    }

    public set Help3node(help3node : Node) {
        this.help3node = help3node;
    }

    public get Help3node() : Node {
        return this.help3node
    }

    public set Help1Yes(help1Yes : Button) {
        this.help1Yes = help1Yes;
    }

    public get Help1Yes() : Button {
        return this.help1Yes
    }

    public set Help1No(help1No : Button) {
        this.help1No = help1No;
    }

    public get Help1No() : Button {
        return this.help1No
    }

    public set Help2Yes(help2Yes : Button) {
        this.help2Yes = help2Yes;
    }

    public get Help2Yes() : Button {
        return this.help2Yes
    }

    public set Help2No(help2No : Button) {
        this.help2No = help2No;
    }

    public get Help2No() : Button {
        return this.help2No
    }

    public set Help3Yes(help3Yes : Button) {
        this.help3Yes = help3Yes;
    }

    public get Help3Yes() : Button {
        return this.help3Yes
    }

    public set Help3No(help3No : Button) {
        this.help3No = help3No;
    }

    public get Help3No() : Button {
        return this.help3No
    }
}


