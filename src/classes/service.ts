export class Service{
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
