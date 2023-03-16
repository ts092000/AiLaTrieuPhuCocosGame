import { _decorator, Component, Node, TextAsset, resources, instantiate, director, } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameModel')
export class GameModel extends Component {
    @property({type:TextAsset})
        csvFilelv1: TextAsset = null;

    @property({type:TextAsset})
        csvFilelv2: TextAsset = null;

    @property({type:TextAsset})
        csvFilelv3: TextAsset = null;

    
    start() {
        var text1 = this.csvFilelv1.text;
        console.log(text1);
        var text2 = this.csvFilelv2.text;
        console.log(text2);
        var text2 = this.csvFilelv3.text;
        console.log(text2);
    }

    update(deltaTime: number) {
        
    }
}


