export default class Service {
  name: string;
  thingID: string;
  output: boolean;
  input: boolean;
  picture: string;
  
  constructor(nName: string, nID: string, out: boolean, inp: boolean) {
    this.name = nName;
    this.thingID = nID;
    this.output = out;
    this.input = inp;
    this.picture = "";
  }
}
