// import Thing from "./classes/thing"
// import Service from "./classes/service";
// import Relationship from "./classes/relationship";
import { ipcMain, IpcMainEvent } from 'electron';
// import { appStore } from "./store/store";

export default async function retrieveIoTData(evt: IpcMainEvent)
{
    const os = require('os');
    const dgram = require('dgram');

    const nets = os.networkInterfaces();
    console.log(nets['Wi-Fi']);
    var host = nets['Wi-Fi'][1];
    const port = 8088;
    const mcast = "232.1.1.1";
    
    var receiveSocket = dgram.createSocket('udp4');
    
    receiveSocket.on('listening', function() {
        const address = receiveSocket.address();
        console.log("Listening on " + address.address + ":" + address.port);
        receiveSocket.addMembership(mcast, host.address);
        receiveSocket.setBroadcast(true);
        receiveSocket.setMulticastTTL(128);
        receiveSocket.setMulticastLoopback(true);
    });
    
    receiveSocket.on('message', function (message: string, remote: any) {
        let obj = JSON.parse(message);
        console.log(obj);
        evt.reply("handle-iot-data", obj);
        if(obj["Tweet Type"] == "Identity_Language"){
            // let newThing = new Thing(obj["Thing ID"],obj["IP"],obj["Port"]);
            // appStore.commit('addThing',newThing);
            //add to thing store
        }
        else if(obj["Tweet Type"] == "Service"){
            let inp = false;
            let out = false;
            let brackIndex = obj["API"].indexOf("[");
            if(brackIndex + 1 == 'N' && brackIndex + 2 == 'U'){
                inp = false;
            }
            else{
                inp = true;
            }
            let parIndex = obj["API"].indexOf("(");
            if(parIndex + 1 =='N' && parIndex + 2 == 'U'){
                out = false;
            }
            else{
                out = true;
            }
            // let newService = new Service(obj["Name"],obj["Thing ID"],out,inp);
            // appStore.commit('addService',newService);
        }
        else if(obj["Tweet Type"] == "Relationship"){
            // let nRelationship = new Relationship(obj["Name"],obj["Type"],obj["FS Name"],obj["SS Name"]);
            // appStore.commit('addRelationship', nRelationship);
        }
    });

    receiveSocket.on('close', function (err: string) {
        console.log("Socket closed");
    });

    receiveSocket.on('error', function (err: string) {
        console.log("[Socket error]" + err);
    });
    
    receiveSocket.bind(port);

    while(true)
    {
        // receiveSocket.send("", port, mcast);
        await sleep(250);
    }
}

function sleep(millis: any) {
    return new Promise(resolve => setTimeout(resolve, millis));
}