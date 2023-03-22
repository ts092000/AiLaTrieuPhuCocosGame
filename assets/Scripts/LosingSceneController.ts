import { _decorator, Component, Node, Button, director } from 'cc';
import { LosingSceneView } from './LosingSceneView';
import { LosingSceneModel } from './LosingSceneModel';
const { ccclass, property } = _decorator;

@ccclass('LosingSceneController')
export class LosingSceneController extends Component {
    @property({type:LosingSceneView})
        View: LosingSceneView

    @property({type:LosingSceneModel})
        Model: LosingSceneModel

    public start() {

    }

    public update(deltaTime: number) {
        
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


