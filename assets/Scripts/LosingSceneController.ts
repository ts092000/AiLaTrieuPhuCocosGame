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
        let volumeValue = JSON.parse(localStorage.getItem('volumeValueArray'));

        if (volumeValue.length == 0) {
            this.View.Audio.volume = 0.7
        }
        else {
            this.View.Audio.volume = volumeValue[ volumeValue.length - 1];
        }

        let gameHighScore1 = JSON.parse(localStorage.getItem('gameHighScoreArray'));
        if (gameHighScore1 == null) {
            this.View.BestScoreLabel.string = "Bạn trả lời đúng nhiều nhất 0 câu";
            this.View.CurrentScoreLabel.string = "Rất tiếc bạn không trả lời đúng câu nào!";
        }
        
        if (gameHighScore1[gameHighScore1.length - 1].toString() == '0') {
            this.View.CurrentScoreLabel.string = "Rất tiếc bạn không trả lời đúng câu nào!";
        }
        else {
            this.View.CurrentScoreLabel.string = 'Rất tiếc, bạn trả lời được ' +gameHighScore1[gameHighScore1.length - 1].toString() + ' câu!';
        }

        this.View.BestScoreLabel.string = 'Bạn trả lời đúng nhiều nhất ' +(Math.max(...gameHighScore1)).toString() + ' câu!';
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


