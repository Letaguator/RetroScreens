export default class Thing{
    name:string;
    ipAddress:string;
    socket:string
    picture:string;
    constructor(nName:string,nAddress:string,nSocket){
        this.name = nName;
        this.ipAddress = nAddress;
        this.socket = nSocket;
        this.picture = '';
    }
    getName(){
        return this.name;
    }
    getAddress(){
        return this.ipAddress;
    }
    getSocket(){
        return this.socket;
    }
    getPicture(){
        return this.picture;
    }
    updatePicture(path:string){
        this.picture = path;
    }
}
