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

    }

    public onLoad() {
        this.View.PlayBtn.node.on(Button.EventType.CLICK, this.btnClickPlayGame, this);
    }

    update(deltaTime: number) {
        
    }

    private btnClickPlayGame(PlayBtn: Button) {
        director.loadScene("Game");
    }
}


