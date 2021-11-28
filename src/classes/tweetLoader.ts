import {Thing} from "./thing"
import { Service } from "./service";
import { Relationship } from "./relationship";
import { appStore } from "../store/store";

const {networkInterfaces} = require('os');
const nets = networkInterfaces();
var HOST = networkInterfaces['etho0'][0]['address'];
var MCAST = "232.1.1.1"
var PORT = 8088;

var dgram = require('dgram');

var receive = dgram.createSocket('udp4');

receive.on('listening', function(){
    var caddress = receive.address();
    receive.setBroadcast(true);
    receive.setMulticastTTL(128);
    receive.addMembership();
});

receive.on('message', function (message, remote){
    let obj = JSON.parse(message);
    if(obj["Tweet Type"] == "Identity_Language"){
        let newThing = new Thing(obj["Thing ID"],obj["IP"],obj["Port"]);
        appStore.commit('addThing',newThing);
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
        let newService = new Service(obj["Name"],obj["Thing ID"],out,inp);
        appStore.commit('addService',newService);
    }
    else if(obj["Tweet Type"] == "Relationship"){
        let nRelationship = new Relationship(obj["Name"],obj["Type"],obj["FS Name"],obj["SS Name"]);
        appStore.commit('addRelationship', nRelationship);
    }
});
