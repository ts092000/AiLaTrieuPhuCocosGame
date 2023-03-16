import { _decorator, Component, Node, Button } from 'cc';
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
}


