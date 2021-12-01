export default class Thing {
  name: string;
  ipAddress: string;
  port: string;
  picture: string;
  
  constructor(nName: string, nAddress: string, nPort: string) {
    this.name = nName;
    this.ipAddress = nAddress;
    this.port = nPort;
    this.picture = "";
  }
}
