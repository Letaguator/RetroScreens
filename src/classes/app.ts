export default class App {
  name: string;
  flow: string[];
  picture: string;
  src: string;
  saved: boolean;
  state: string;

  constructor(nName: string, src: string, saved: boolean) {
    this.name = nName;
    this.src = src;
    this.flow = this.src.split("\n");
    this.saved = saved;
    this.state = "";
  }
}
