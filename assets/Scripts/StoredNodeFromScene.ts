import { _decorator, Component, Node } from 'cc';
import { MenuControll } from './MenuController';
import GameClient from '@dattenlagiday/oc_gamecenter_sdk_pkg';
const { ccclass, property } = _decorator;

@ccclass('StoredNodeFromScene')
export class StoredNodeFromScene extends Component {

    public gameClient;
    public audioMuteBtn;
    public audioUnmuteBtn;
    public async start() : Promise<void> {
        console.log(this.gameClient);
        if (this.gameClient === undefined) {
            this.gameClient = new GameClient("643fc5fe0a3bf6132391328d", "568a590d-f9d1-4a10-b59d-ea6e0d9e9786");
            await this.gameClient.initAsync()
            .then(() => {})
            .catch((err) => console.log(err));
        }
        // this.gameClient = new GameClient("643fc5fe0a3bf6132391328d", "568a590d-f9d1-4a10-b59d-ea6e0d9e9786");
    }

    update(deltaTime: number) {
        
    }
}

