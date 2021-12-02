import { ipcMain, IpcMainEvent } from 'electron';

export default async function retrieveIoTData(evt: IpcMainEvent)
{
    // const os = require('os');
    // const dgram = require('dgram');

    // const nets = os.networkInterfaces();
    // console.log(nets['Wi-Fi']);
    // var host = nets['Wi-Fi'][1];
    // const port = 8088;
    // const mcast = "232.1.1.1";
    
    // var receiveSocket = dgram.createSocket('udp4');
    
    // receiveSocket.on('listening', function() {
    //     const address = receiveSocket.address();
    //     console.log("Listening on " + address.address + ":" + address.port);
    //     receiveSocket.addMembership(mcast, host.address);
    //     receiveSocket.setBroadcast(true);
    //     receiveSocket.setMulticastTTL(128);
    //     receiveSocket.setMulticastLoopback(true);
    // });
    
    // receiveSocket.on('message', function (message: string, remote: any) {
    //     try{
    //         let obj = JSON.parse(message);
    //         console.log(obj);
    //         evt.reply("handle-iot-data", obj);
    //     }
    //     catch(e)
    //     {
    //         console.log("ERROR")
    //         console.log(message)
    //         console.log(e)
    //         console.log("ERROR")
    //     }
    // });

    // receiveSocket.on('close', function (err: string) {
    //     console.log("Socket closed");
    // });

    // receiveSocket.on('error', function (err: string) {
    //     console.log("[Socket error]" + err);
    // });
    
    // receiveSocket.bind(port);

    var tweets = [
        '{ "Tweet Type" : "Identity_Thing","Thing ID" : "MathiasPi","Space ID" : "RetroScreens","Name" : "","Model" : "","Vendor" : "","Owner" : "Mathias","Description" : "","OS" : "Raspbian" }',
        '{ "Tweet Type" : "Identity_Language","Thing ID" : "MathiasPi","Space ID" : "RetroScreens","Network Name" : "Continuum Guest","Communication Language" : "Sockets","IP" : "192.168.0.217","Port" : "6668" }',
        '{ "Tweet Type" : "Identity_Entity","Thing ID" : "MathiasPi","Space ID" : "RetroScreens","Name" : "","ID" : "MathiasPiBoard","Type" : "","Owner" : "Mathias","Vendor" : "","Description" : "" }',
        '{ "Tweet Type" : "Service","Name" : "Dice","Thing ID" : "MathiasPi","Entity ID" : "MathiasPiBoard","Space ID" : "RetroScreens","Vendor" : "","API" : "Dice:[NULL]:(diceValue,int, NULL)","Type" : "Action","AppCategory" : "Ambiance","Description" : "","Keywords" : "" }',
        '{ "Tweet Type" : "Identity_Thing","Thing ID" : "SeansPi","Space ID" : "RetroScreens","Name" : "Sean\'s Pi","Model" : "","Vendor" : "","Owner" : "Sean","Description" : "","OS" : "Raspbian" }',
        '{ "Tweet Type" : "Identity_Language","Thing ID" : "SeansPi","Space ID" : "RetroScreens","Network Name" : "TP-Link_C50E","Communication Language" : "","IP" : "192.168.0.227","Port" : "6668" }',
        '{ "Tweet Type" : "Identity_Entity","Thing ID" : "SeansPi","Space ID" : "RetroScreens","Name" : "","ID" : "SeansPiBoard","Type" : "","Owner" : "Sean","Vendor" : "","Description" : "" }',
        '{ "Tweet Type" : "Service","Name" : "DistanceSensor","Thing ID" : "SeansPi","Entity ID" : "SeansPiBoard","Space ID" : "RetroScreens","Vendor" : "","API" : "DistanceSensor:[NULL]:(detected,int, NULL)","Type" : "Report","AppCategory" : "Safety","Description" : "","Keywords" : "" }',
        '{ "Tweet Type" : "Service","Name" : "Buzzer", "Thing ID" : "SeansPi","Entity ID" : "SeansPiBoard","Space ID" : "RetroScreens","Vendor" : "","API" : "Buzzer:[motionDetected,int, NULL]:(NULL)","Type" : "Action","AppCategory" : "Ambiance","Description" : "","Keywords" : "" }',
        '{ "Tweet Type" : "Relationship","Thing ID" : "SeansPi","Space ID" : "RetroScreens","Name" : "MotionDetector","Owner" : "Sean","Category" : "Cooperative","Type" : "control","Description" : "","FS name" : "DistanceSensor","SS name" : "Buzzer" }',
        '{ "Tweet Type" : "Identity_Thing","Thing ID" : "HarshsPi","Space ID" : "RetroScreens","Name" : "","Model" : "","Vendor" : "","Owner" : "Harsh","Description" : "","OS" : "Raspbian" }',
        '{ "Tweet Type" : "Identity_Language","Thing ID" : "HarshsPi","Space ID" : "RetroScreens","Network Name" : "Continuum Guest","Communication Language" : "Sockets","IP" : "65.116.108.97","Port" : "6668" }',
        '{ "Tweet Type" : "Identity_Entity","Thing ID" : "HarshsPi","Space ID" : "RetroScreens","Name" : "","ID" : "HarshPiBoard","Type" : "Connected","Owner" : "Harsh","Vendor" : "","Description" : "" }',
        '{ "Tweet Type" : "Service","Name" : "Timer","Thing ID" : "HarshsPi","Entity ID" : "HarshPiBoard","Space ID" : "RetroScreens","Vendor" : "","API" : "Timer:[NULL]:(elapsed,int, NULL)","Type" : "Action","AppCategory" : "Personal Assistance","Description" : "","Keywords" : "" }'
    ];
    for(let i = 0; i < tweets.length; i++)
    {
        var message = tweets[i];
        try{
            let obj = JSON.parse(message);
            //console.log(obj);
            evt.reply("handle-iot-data", obj);
        }
        catch(e)
        {
            console.log("ERROR")
            console.log(message)
            console.log(e)
            console.log("ERROR")
        }
        // receiveSocket.send(tweets[i], port, mcast);
        await sleep(150);
    }
}

function sleep(millis: any) {
    return new Promise(resolve => setTimeout(resolve, millis));
}
