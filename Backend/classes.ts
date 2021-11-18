class Thing{
    name:string;
    ipAddress:string;
    picture:string;
    constructor(nName:string,nAddress:string){
        this.name = nName;
        this.ipAddress = nAddress;
        this.picture = '';
    }
    getName(){
        return this.name;
    }
    getAddress(){
        return this.ipAddress;
    }
    getPicture(){
        return this.picture;
    }
    updatePicture(path:string){
        this.picture = path;
    }
}

class Service{
    name:string;
    thingID:string;
    output:boolean;
    input:boolean;
    picture:string;
    constructor(nName:string, nID:string, out:boolean,inp:boolean){
        this.name = nName;
        this.thingID = nID;
        this.output = out;
        this.input = inp;
        this.picture = ''
    }
    getName(){
        return this.name;
    }
    getThing(){
        return this.thingID;
    }
    getType(){
        if (this.output == true){
            return 'output';
        }
        else{
            return 'input';
        }
    }
    getPicture(){
        return this.picture;
    }
    updatePicture(newPath:string){
        this.picture = newPath; 
    }
}

class Relationship{
    name:string;
    type:string;
    serv1:string;
    serv2:string;
    picture:string;
    constructor(nName:string, nType: string, nServ1:string, nServ2:string){
        this.name = nName;
        this.type = nType;
        this.serv1 = nServ1;
        this.serv2 = nServ2;
        this.picture = '';
    }
    getName(){
        return this.name;
    }
    getType(){
        return this.type;
    }
    getFirstService(){
        return this.serv1;
    }
    getSecondService(){
        return this.serv2;
    }
    getPicture(){
        return this.picture;
    }
    updatePicture(newPath:string){
        this.picture = newPath; 
    }
}

class App{
    name:string;
    flow:string[];
    picture:string;
    constructor(nName:string, nFlow:string[]){
        this.name = nName;
        this.flow = nFlow;
    }
    getName(){
        return this.name;
    }
    getFlow(){
        return this.flow;
    }
    getPicture(){
        return this.picture;
    }
    updatePicture(newPath:string){
        this.picture = newPath; 
    }
}
