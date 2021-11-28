function service(serviceName:string, input:string = ""){
    var value:string = "";
    ///build json service request and send to pi
    ///process result
    return value;
}

function control(serv1:string,serv2:string,input:string = ""){
    var value:string = "";
    var result:number = 0;
    ///build first service json here and send to pi
    ///store result in result
    if(result > 0){
        //build second service json and send to pi
        //store result in result
        value = result.toString();
    }
    else{
        value = "";
    }
    return value;

}

function drive(serv1:string, serv2:string,input:string = ""){
    var value:string = "";
    var result:number = 0;
    //build first service json here and send to pi
    //store result in result

    //build second service json here with input result
    //store result in value
    return value;
}

function support(serv1:string,serv2:string,input:string = ""){
    var value:string[] = ["",""];
    ///build first service json here, store result in value[0]
    //wait for return on first json, build second json, store result in value[1]
    return value;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max)+1;
  }

function contest(serv1:string, serv2:string, input:string = ""){
    var value:string = "";
    var serviceSelector = getRandomInt(2);
    if(serviceSelector = 1){
        //build first service json, store result in value
    }
    else{
        //build second service json, store result in value
    }

}
