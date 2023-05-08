import { _decorator, Component, Node, Button, director, find, Game } from 'cc';
import GameClient from '@dattenlagiday/oc_gamecenter_sdk_pkg';
import { MenuView } from './MenuView';
import { MenuModel } from './MenuModel';
import { StoredNodeFromScene } from './StoredNodeFromScene';
const { ccclass, property } = _decorator;

@ccclass('MenuController')
export class MenuControll extends Component {
    @property({type:MenuView})
        View: MenuView

    @property({type:MenuModel})
        Model: MenuModel

    private volumeValueArray: number[] = [];
    public gameClient;
    
    public async start() : Promise<void> {
        let parameters = find("GameClient");
        console.log(this.gameClient);
        
        if (parameters === null) {
            console.log('null');
            let parameters = new Node("GameClient");
            let gameClientParams = parameters.addComponent(StoredNodeFromScene);
            gameClientParams.gameClient = this.gameClient;
            director.addPersistRootNode(parameters);
        }
        // let gameIdStored = localStorage.getItem('gameId');
        // let apikey = localStorage.getItem('apikey');

        // localStorage.setItem('gameIdStored', JSON.stringify(gameIdStored));
        // localStorage.setItem('apikey', JSON.stringify(apikey));

        // let PersistNode = new Node('PersistNode');
        // PersistNode.setPosition(0,0,0);
        // this.View.BackGroundMenu.addChild(PersistNode);
        // let nodeToMove = this.View.BackGroundMenu.getChildByName('PersistNode');
        
        this.View.BackGroundMusic.play();
        this.View.AudioControlMuted.node.active = true;
        this.View.AudioControlPlay.node.active = false;

        let volumeValue = localStorage.getItem('volumeValueArray');
        localStorage.setItem('volumeValueArray', JSON.stringify(this.volumeValueArray));
        
        if (volumeValue) {
            this.volumeValueArray = JSON.parse(volumeValue);
            localStorage.setItem('volumeValueArray', JSON.stringify(this.volumeValueArray));
        }
        if (this.volumeValueArray.length == 0) {
            this.View.BackGroundMusic.volume = 0.7;
            this.volumeValueArray.push(this.View.BackGroundMusic.volume);
        }
        else {
            this.View.BackGroundMusic.volume = this.volumeValueArray[this.volumeValueArray.length - 1];
        }

        if (this.View.BackGroundMusic.volume == 0.7) {
            this.View.AudioControlMuted.node.active = true;
            this.View.AudioControlPlay.node.active = false;
        }
        
        if (this.View.BackGroundMusic.volume == 0) {
            this.View.AudioControlMuted.node.active = false;
            this.View.AudioControlPlay.node.active = true;
        }
        
    }
    
    public onLoad() {
        this.View.PlayBtn.node.on(Button.EventType.CLICK, this.btnClickPlayGame, this);
        // director.addPersistRootNode(this.View.BackGroundMusic.node);
    }
    
    public async update(deltaTime: number) {
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
        this.volumeValueArray.push(this.View.BackGroundMusic.volume);
        localStorage.setItem('volumeValueArray', JSON.stringify(this.volumeValueArray));
    }

    private btnAudioControlPlay(AudioControlBtnPlay: Button) {
        this.View.AudioControlMuted.node.active = true;
        this.View.AudioControlPlay.node.active = false;
        this.View.BackGroundMusic.volume = 0.7;
        this.volumeValueArray.push(this.View.BackGroundMusic.volume);
        localStorage.setItem('volumeValueArray', JSON.stringify(this.volumeValueArray));
    }
}


