import { _decorator, Component, Node, Button, director } from 'cc';
import { MenuView } from './MenuView';
import { MenuModel } from './MenuModel';
const { ccclass, property } = _decorator;

@ccclass('MenuController')
export class MenuControll extends Component {
    @property({type:MenuView})
        View: MenuView

    @property({type:MenuModel})
        Model: MenuModel

    start() {
        this.View.BackGroundMusic.play();
        this.View.AudioControlMuted.node.active = true;
        this.View.AudioControlPlay.node.active = false;
        this.View.PlayBtn.node.on(Button.EventType.CLICK, this.btnClickPlayGame, this);
    }

    public onLoad() {
        // director.addPersistRootNode(this.View.BackGroundMusic.node);
    }
    
    update(deltaTime: number) {
        this.View.AudioControlMuted.node.on(Button.EventType.CLICK, this.btnAudioControlMuted, this);
        this.View.AudioControlPlay.node.on(Button.EventType.CLICK, this.btnAudioControlPlay, this);
    }

    private btnClickPlayGame(PlayBtn: Button) {
        director.loadScene("Game");
    }

    private btnAudioControlMuted(AudioControlBtnMuted: Button) {
        this.View.AudioControlMuted.node.active = false;
        this.View.AudioControlPlay.node.active = true;
        this.View.BackGroundMusic.volume = 0;
    }

    private btnAudioControlPlay(AudioControlBtnPlay: Button) {
        this.View.AudioControlMuted.node.active = true;
        this.View.AudioControlPlay.node.active = false;
        this.View.BackGroundMusic.volume = 0.5;
    }
}


