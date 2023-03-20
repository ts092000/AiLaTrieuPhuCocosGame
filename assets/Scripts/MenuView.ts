import { _decorator, Component, Node, Button } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MenuView')
export class MenuView extends Component {
    @property({type:Node})
    private backGroundMenu: Node = null;

    @property({type:Button})
    private playBtn: Button = null;

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
}


