import { _decorator, Component, Node, Button, director } from 'cc';
import { WinningSceneModel } from './WinningSceneModel';
import { WinningSceneView } from './WinningSceneView';
const { ccclass, property } = _decorator;

@ccclass('WinningSceneController')
export class WinningSceneController extends Component {
    @property({type:WinningSceneView})
        View: WinningSceneView

    @property({type:WinningSceneModel})
        Model: WinningSceneModel

    public start() {

    }

    public onLoad() {
        this.View.PlayAgainBtn.node.on(Button.EventType.CLICK, this.btnPlayAgain, this);
        this.View.Audio.play();
    }

    private btnPlayAgain(playAgainBtn: Button) {
        director.preloadScene("Main", function () {
            director.loadScene("Main");
        });
    }
}


