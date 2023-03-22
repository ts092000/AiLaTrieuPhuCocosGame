import { _decorator, Component, Node, Button, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('WinningSceneView')
export class WinningSceneView extends Component {
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
    
}


