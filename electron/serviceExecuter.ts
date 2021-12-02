const Net = require('net')

// {ip, port, thingId, inputs, servicename, lines:string[]}
export default function evalService(evt, evalInfo: any): any {
    var objToSend = {
        TweetType: 'Service',
        ThingID: evalInfo.thingId,
        SpaceID:'RetroScreens',
        ServiceName: evalInfo.servicename,
        ServiceInputs: '()'
    }
    
    var client = new Net.Socket();
    client.connect({ host: evalInfo.ip, port: evalInfo.port }, function(){
        var jsonToSend = "{\"Service Inputs\":\"(" + evalInfo.inputs + ")\",\"Tweet Type\":\"Service\",\"Thing ID\":\"" + evalInfo.thingId + "\",\"Space ID\":\"RetroScreens\",\"Service Name\":\"" + evalInfo.serviceName + "\"}";
        console.log(jsonToSend);
        client.write(jsonToSend);
    });

    let result = null;

    client.on("data", (data: any) => {
        console.log(data)
        const result = JSON.parse(data.toString()).serviceResult;
        evt.reply("retrieve-service-result", { appName: evalInfo.appName, result: result });

        client.end();
    });

    client.on("end", () => {
        console.log("Connection ended")
    });
}

function sleep(millis: any) {
    return new Promise(resolve => setTimeout(resolve, millis));
}