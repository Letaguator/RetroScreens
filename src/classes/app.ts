export default class App {
  name: string;
  flow: string[];
  picture: string;
  src: string;
  saved: boolean;

  constructor(nName: string, src: string, saved: boolean) {
    this.name = nName;
    this.src = src;
    this.flow = this.src.split("/n");
    this.saved = saved;
  }

  getName() {
    return this.name;
  }
  getFlow() {
    return this.flow;
  }
  getPicture() {
    return this.picture;
  }
  updatePicture(newPath: string) {
    this.picture = newPath;
  }
}
