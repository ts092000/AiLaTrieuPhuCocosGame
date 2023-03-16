import { _decorator, Component, Node, Button, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameView')
export class GameView extends Component {
    @property({type:Node})
    private backGroundMenu: Node = null;

    @property({type:Button})
    private playBtn: Button = null;

    @property({type:Node})
    private gamePlayBg: Node = null;

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

    @property({type:Label})
    private questionLabelNumber: Label = null;

    public get BackGroundMenu() : Node {
        return this.backGroundMenu;
    }
    
    public set BackGroundMenu(backGroundMenu : Node) {
        this.backGroundMenu = backGroundMenu;
    }
    
    public get PlayBtn() : Button {
        return this.playBtn;
    }
    
    public set PlayBtn(playBtn : Button) {
        this.playBtn = playBtn;
    }
    
    public get GamePlayBg() : Node {
        return this.gamePlayBg;
    }
    
    public set GamePlayBg(gamePlayBg : Node) {
        this.gamePlayBg = gamePlayBg;
    }

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
    
}


