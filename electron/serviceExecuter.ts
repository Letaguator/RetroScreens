
const Net = require('net')

// {ip, port, thingId, inputs, servicename, lines:string[]}
export default function evalService(evalInfo: any): any {
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
        var response = 'Hello World'; //change to actual response
    });

    let result = null;

    client.on("data", (data: any) => {
        result = JSON.parse(data.toString()).serviceResult;
        client.end();
    });

    client.on("end", () => {
        console.log("Connection ended")
    });

    while(result === null)
    {
        sleep(25);
    }

    return result;
}

function sleep(millis: any) {
    return new Promise(resolve => setTimeout(resolve, millis));
}