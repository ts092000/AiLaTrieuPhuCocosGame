import { _decorator, Component, Node, Button, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MenuView')
export class MenuView extends Component {
    @property({type:Node})
    private backGroundMenu: Node = null;

    @property({type:Button})
    private playBtn: Button = null;

    @property({type:AudioSource})
    private backGroundMusic: AudioSource = null;

    @property({type:Button})
    private audioControlMuted: Button = null;

    @property({type:Button})
    private audioControlPlay: Button = null;

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

    public get BackGroundMusic() : AudioSource {
        return this.backGroundMusic;
    }
    
    public set BackGroundMusic(backGroundMusic : AudioSource) {
        this.backGroundMusic = backGroundMusic;
    }

    public get AudioControlMuted() : Button {
        return this.audioControlMuted;
    }
    
    public set AudioControlMuted(audioControlMuted : Button) {
        this.audioControlMuted = audioControlMuted;
    }

    public get AudioControlPlay() : Button {
        return this.audioControlPlay;
    }
    
    public set AudioControlPlay(audioControlPlay : Button) {
        this.audioControlPlay = audioControlPlay;
    }
}


