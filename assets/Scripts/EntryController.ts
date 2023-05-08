import { _decorator, Component, Node, find, director } from 'cc';
const { ccclass, property } = _decorator;
import { StoredNodeFromScene } from './StoredNodeFromScene';
import GameClient from '@dattenlagiday/oc_gamecenter_sdk_pkg';


@ccclass('EntryController')
export class EntryController extends Component {
    public gameClient;


    public async start() : Promise<void> {
        let parameters = find("GameClient");
        console.log(this.gameClient);
        
        if (parameters === null) {
            console.log('null');
            let parameters = new Node("GameClient");
            if (this.gameClient === undefined) {
                this.gameClient = new GameClient("643fc5fe0a3bf6132391328d", "568a590d-f9d1-4a10-b59d-ea6e0d9e9786");
                await this.gameClient.initAsync()
                .then(() => {})
                .catch((err) => console.log(err));
            }
            let gameClientParams = parameters.addComponent(StoredNodeFromScene);
            gameClientParams.gameClient = this.gameClient;
            director.addPersistRootNode(parameters);
        }
        director.loadScene("Main");
    }

    update(deltaTime: number) {
        
    }
}

