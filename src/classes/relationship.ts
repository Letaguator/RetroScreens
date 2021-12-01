export default class Relationship {
  name: string;
  type: string;
  serv1: string;
  serv2: string;
  picture: string;
  constructor(nName: string, nType: string, nServ1: string, nServ2: string) {
    this.name = nName;
    this.type = nType;
    this.serv1 = nServ1;
    this.serv2 = nServ2;
    this.picture = "";
  }
}
