import * as fs from 'fs';
import * as rd from 'readline';

import {LinearBackoff, WebsocketBuilder} from 'websocket-ts';
import {appStore}  from "../src/store/store";

import Service from '../src/classes/service';
import Relationship from '../src/classes/relationship';
import { app } from 'electron';

const connectionIP=''
const connectionPort=''

class callHandler{
    ws;
    constructor(ip:string,portNumber:string){
        this.ws = new WebsocketBuilder('ws://'+ip+':'+portNumber)
        .onOpen((ws, e) => { console.log("Connected to Thing") })
        .onClose((ws, e) => { console.log("Closed") })
        .onError((ws, e) => { console.log("Error") })
        .build();
    }

    evalService(serviceObj:Service,line:string){
        if (!serviceObj.input)
            this.ws.send(serviceObj.getName())
        else{
            var inputs = line.split(' ')
            var payload=''
            inputs.forEach(()=>{
                payload+=''+inputs
            })
            this.ws.send(payload)
        }
        var data='';
        this.ws.onMessage((ws, e) => { 
            console.log('reply from Thing'+e.data) 
            data=JSON.parse(e.data);
        })
        return data;
    }

    evalRelationship(relationshipObj:Relationship,line:string){

        var serviceA=appStore.getters.getServicebyName(relationshipObj.getFirstService())
        var serviceB=appStore.getters.getServicebyName(relationshipObj.getSecondService())

        if (relationshipObj.type in ['control','drive']){
            var outputFromA=this.evalService(serviceA,line)
            this.evalService(serviceB,outputFromA)
        }
        else if (relationshipObj.type in ['contest']){

        }
        else if (relationshipObj.type in[]){

        }
    }
}

function parseApp(inputFilePath:string) {
    try{
        var reader = rd.createInterface(fs.createReadStream(inputFilePath));
        var handler = new callHandler(connectionIP,connectionPort)
        reader.on("line",(l:string)=>{
            l=l.toLowerCase()
            if (l.startsWith('S')){
                var serviceObj=appStore.getters.getServiceByName(l.split(' ')[1])
                handler.evalService(serviceObj,l)
            }
            else if (l.startsWith('R')){
                var relationshipObj=appStore.getters.getRelationshipByName(l.split(' ')[1])
                handler.evalRelationship(relationshipObj,l)
            }
            else if(l.startsWith('if')){
                
            }
            else{
                console.log('app format invalid')
                return false;
            }
            console.log('finishing running app from '+inputFilePath)
            return true;
        })
    }
    catch(Exception){
        console.log("aborting with exception")
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
