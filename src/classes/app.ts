export default class App{
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
