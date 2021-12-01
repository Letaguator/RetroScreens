
// import { Websocket } from 'websocket-ts';
// import {WebsocketBuilder} from 'websocket-ts';
// import {appStore}  from "../src/store/store";

// import Service from './classes/service';
// import Relationship from './classes/relationship';

const WebSocket = require('ws');

const connectionIP='192.168.0.227'
const connectionPort='6668'

class callHandler{
    ip:string;
    portNumber:string;
    constructor(ip:string,portNumber:string){
        this.ip=ip;
        this.portNumber=portNumber;
    }

    // evalService(serviceObj:Service,line:string){
    //     if (!serviceObj.input)
    //     {
    //         var objToSend = {
    //             TweetType: 'Service',
    //             ThingID: 'SeansPi',
    //             SpaceID:'RetroScreens',
    //             ServiceName: serviceObj.getName(),
    //             ServiceInputs: ''
    //         }
    //         this.ws.send(JSON.stringify(objToSend))
    //     }
    //     else{
    //         var inputs = line.split(' ')
    //         var payload=''
    //         inputs.forEach(()=>{
    //             payload+=''+inputs
    //         })
    //         this.ws.send(payload)
    //     }
    //     var data='';
    //     // this.ws.onMessage((ws, e) => { 
    //     //     console.log('reply from Thing'+e.data) 
    //     //     data=JSON.parse(e.data);
    //     // })
    //     return data;
    // }

    evalService(line:string){
        var words=line.split(' ')
        var objToSend = {
            TweetType: 'Service',
            ThingID: 'SeansPi',
            SpaceID:'RetroScreens',
            ServiceName: words[1],
            ServiceInputs: '()'
        }
        // if (words.length>2)
        // {
        //     objToSend.ServiceInputs=words.join(",").replace(words[0],'')
        // }
        console.log(JSON.stringify(objToSend))
        // var ws = new WebSocket('ws://'+this.ip+':'+this.portNumber)
        // var data=''
        // ws.onopen = function() {
        //     ws.send(JSON.stringify(objToSend))
        //   };
        //ws.send(JSON.stringify(objToSend))

        const Net = require('net')
        const client = new Net.Socket();

        client.connect({port:this.portNumber,host:this.ip}, function(){
            client.write("{\"Service Inputs\":\"()\",\"Tweet Type\":\"Service\",\"Thing ID\":\"SeansPi\",\"Space ID\":\"RetroScreens\",\"Service Name\":\"DistanceSensor\"}");
        });
        return true;
    }
}

    // evalRelationship(relationshipObj:Relationship,line:string){

    //     var serviceA=appStore.getters.getServicebyName(relationshipObj.getFirstService())
    //     var serviceB=appStore.getters.getServicebyName(relationshipObj.getSecondService())

    //     if (relationshipObj.type in ['drive']){
    //         var outputFromA=this.evalService(serviceA,line)
    //         this.evalService(serviceB,outputFromA)
    //     }
    //     else if (relationshipObj.type in ['contest']){

    //     }
    //     else if (relationshipObj.type in[]){

    //     }
    // }

    // evalRelationship(relationshipObj:Relationship,line:string){

    //     var serviceA=appStore.getters.getServicebyName(relationshipObj.getFirstService())
    //     var serviceB=appStore.getters.getServicebyName(relationshipObj.getSecondService())

    //     if (relationshipObj.type in ['drive']){
    //         var outputFromA=this.evalService(serviceA,line)
    //         this.evalService(serviceB,outputFromA)
    //     }
    //     else if (relationshipObj.type in ['contest']){

    //     }
    //     else if (relationshipObj.type in[]){

    //     }
    // }



// export function executeApp(inputFilePath:string) {
//     try{
//         var reader = rd.createInterface(fs.createReadStream(inputFilePath));
//         var handler = new callHandler(connectionIP,connectionPort)
//         reader.on("line",(l:string)=>{
//             l=l.toLowerCase()
//             if (l.startsWith('S')){
//                 var serviceObj=appStore.getters.getServiceByName(l.split(' ')[1])
//                 handler.evalService(serviceObj,l)
//             }
//             else if (l.startsWith('R')){
//                 var relationshipObj=appStore.getters.getRelationshipByName(l.split(' ')[1])
//                 handler.evalRelationship(relationshipObj,l)
//             }
//             // else if(l.startsWith('if')){
                
//             // }
//             else{
//                 console.log('app format invalid')
//                 return false;
//             }
//             console.log('finishing running app from '+inputFilePath)
//             return true;
//         })
//     }
//     catch(Exception){
//         console.log("aborting with exception")
//     }
// }

export default function executeTheApp(lines:string[]) {
    try{
        console.log("app started")
        //var reader = rd.createInterface(fs.createReadStream(inputFilePath));
        var handler = new callHandler(connectionIP,connectionPort)
        lines.forEach((l)=>{
            console.log(l)
            if (l.startsWith('S')){
                handler.evalService(l)
            }
            // else if (l.startsWith('R')){
            //     handler.evalRelationship(l)
            // }
            // else if(l.startsWith('if')){
            // }
            else{
                console.log('app format invalid')
                return false;
            }

        })    
        console.log('finishing running app from')
        return true;
    }
    catch(e){
        console.log("aborting with exception")
        console.log(e)
    }
}

// var reader = rd.createInterface(fs.createReadStream(inputFile));
// reader.on("line",(l:string) => {
//             var tokens = l.split(" ");
//             switch(tokens[0]){
//                 case("S"):
//                 case("s"):
//                 if (tokens.length > 2){
//                     //call service maker with value of tokens[2]
//                 }
//                 else{
//                     //call service maker with no value
//                 }
//                 case("R"):
//                 case("r"):
//                 //determine the relationship type by looking up token[1] in the relationship map
//                 if(tokens.length > 2){
//                     //call appropriate relationship function with value of token[2]
//                 }
//                 else{
//                     //call appropriate realtionship function with no value
//                 }
//                 case("IF"):
//                 case("If"):
//                 case("if"):
//                 if(tokens[1] == "S"||tokens[1] == 's'){
//                     if(tokens[2] != 'S' && tokens[2] != 's' && tokens[2] != 'R' && tokens[2] != 'r'){
//                         //call service defined in token[1] with input defined in tokens[2]
//                         //if service returns value greater than 0, then execute next relationship
//                         if(true/*service1.result > 0*/){
//                             if(tokens[3] == "S" || tokens[3] == 's'){
//                                 if(tokens.length > 4){
//                                     //call token[3] service with value token[4]
//                                 }
//                                 else{
//                                     //call token[3]
//                                 }
//                             }
//                             else{
//                                 if(tokens.length > 4){
//                                     //call token[3] relationship with value token[4]
//                                 }
//                                 else{
//                                     //call token[3] relationship
//                                 }
//                             }
//                         }
//                     }
//                     else{
//                         //call service defined in token[1] without input
//                         //if service returns value greater than 0, then execute next relationship
//                         if(true/*service1.result > 0*/){
//                             if(tokens[2] == "S" || tokens[2] == 's'){
//                                 if(tokens.length > 3){
//                                     //call token[3] service with value token[4]
//                                 }
//                                 else{
//                                     //call token[3]
//                                 }
//                             }
//                             else{
//                                 if(tokens.length > 3){
//                                     //call token[3] relationship with value token[4]
//                                 }
//                                 else{
//                                     //call token[3] relationship
//                                 }
//                             }
//                         }  
//                     }
//                 }
//                 else{
//                     if(tokens[2] != 'S' && tokens[2] != 's' && tokens[2] != 'R' && tokens[2] != 'r'){
//                         //find what relationship token[1] entails and call appropriate realtionship driver
//                         //if relationship returns value greater than 0, then execute next relationship
//                         if(true/*service1.result > 0*/){
//                             if(tokens[3] == "S" || tokens[3] == 's'){
//                                 if(tokens.length > 4){
//                                     //call token[3] service with value token[4]
//                                 }
//                                 else{
//                                     //call token[3]
//                                 }
//                             }
//                             else{
//                                 if(tokens.length > 4){
//                                     //call token[3] relationship with value token[4]
//                                 }
//                                 else{
//                                     //call token[3] relationship
//                                 }
//                             }
//                         }
//                     }
//                     else{
//                         //call service defined in token[1] without input
//                         //if service returns value greater than 0, then execute next relationship
//                         if(true/*service1.result > 0*/){
//                             if(tokens[2] == "S" || tokens[2] == 's'){
//                                 if(tokens.length > 3){
//                                     //call token[3] service with value token[4]
//                                 }
//                                 else{
//                                     //call token[3]
//                                 }
//                             }
//                             else{
//                                 if(tokens.length > 3){
//                                     //call token[3] relationship with value token[4]
//                                 }
//                                 else{
//                                     //call token[3] relationship
//                                 }
//                             }
//                         }  
//                     }
