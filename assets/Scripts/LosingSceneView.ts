import { _decorator, Component, Node, Label, Button, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LosingSceneView')
export class LosingSceneView extends Component {
    @property({type:Label})
    private currentScoreLabel: Label = null;

    @property({type:Label})
    private bestScoreLabel: Label = null;

    @property({type:Button})
    private playAgainBtn: Button = null;

    @property({type:AudioSource})
    private audio: AudioSource = null;

    public get PlayAgainBtn() : Button {
        return this.playAgainBtn;
    }
    
    public set PlayAgainBtn(playAgainBtn : Button) {
        this.playAgainBtn = playAgainBtn;
    }

    public get Audio() : AudioSource {
        return this.audio;
    }
    
    public set Audio(audio : AudioSource) {
        this.audio = audio;
    }

    public get CurrentScoreLabel() : Label {
        return this.currentScoreLabel;
    }
    
    public set CurrentScoreLabel(currentScoreLabel : Label) {
        this.currentScoreLabel = currentScoreLabel;
    }

    public get BestScoreLabel() : Label {
        return this.bestScoreLabel;
    }
    
    public set BestScoreLabel(bestScoreLabel : Label) {
        this.bestScoreLabel = bestScoreLabel;
    }

}
