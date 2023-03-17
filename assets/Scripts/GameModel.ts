import { _decorator, Component, Node, TextAsset, resources, instantiate, director, } from 'cc';
const { ccclass, property } = _decorator;
import { Papa } from 'papaparse';

@ccclass('GameModel')
export class GameModel extends Component {
    @property({type:TextAsset})
    private csvFilelv1: TextAsset = null;

    @property({type:TextAsset})
    private csvFilelv2: TextAsset = null;

    @property({type:TextAsset})
    private csvFilelv3: TextAsset = null;

    public get CsvFilelv1() : TextAsset {
        return this.csvFilelv1;
    }
    
    public set CsvFilelv1(csvFilelv1 : TextAsset) {
        this.csvFilelv1 = csvFilelv1;
    }

    public get CsvFilelv2() : TextAsset {
        return this.csvFilelv2;
    }
    
    public set CsvFilelv2(csvFilelv2 : TextAsset) {
        this.csvFilelv2 = csvFilelv2;
    }

    public get CsvFilelv3() : TextAsset {
        return this.csvFilelv3;
    }
    
    public set CsvFilelv3(csvFilelv3 : TextAsset) {
        this.csvFilelv3 = csvFilelv3;
    }

    start() {
        // var text1 = this.csvFilelv2.text;
        // console.log(text1);
        // var text2 = this.csvFilelv2.text;
        // console.log(text2);
        // var text3 = this.csvFilelv3.text;
        // console.log(text3);
    }

    update(deltaTime: number) {
        
    }
}


