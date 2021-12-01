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
  getName() {
    return this.name;
  }
  getAddress() {
    return this.ipAddress;
  }
  getSocket() {
    return this.port;
  }
  getPicture() {
    return this.picture;
  }
  updatePicture(path: string) {
    this.picture = path;
  }
}
