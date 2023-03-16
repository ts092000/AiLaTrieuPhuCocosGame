import { _decorator, Component, Node, director, Button } from 'cc';
import { GameView } from './GameView';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property({type:GameView})
        View: GameView

    public start() {

    }

    public update(deltaTime: number) {
    }
    
    public onLoad() {
        this.View.PlayBtn.node.on(Button.EventType.CLICK, this.btnClickPlayGame, this);
        this.View.BackMainMenuBtn.node.on(Button.EventType.CLICK, this.btnBackMainMenu, this);
    }

    public onDestroy() {
        this.View.PlayBtn.node.off(Button.EventType.CLICK, this.btnClickPlayGame, this);
        this.View.BackMainMenuBtn.node.off(Button.EventType.CLICK, this.btnBackMainMenu, this);
    }

    private btnClickPlayGame(PlayBtn: Button) {
        this.View.BackGroundMenu.active = false;
        this.View.GamePlayBg.active = true;
    }

    private btnBackMainMenu(BackMainMenuBtn: Button) {
        this.View.BackGroundMenu.active = true;
        this.View.GamePlayBg.active = false;
    }
}


