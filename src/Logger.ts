export default class Logger {

    constructor(){
    }

    public info(message: string): void {
        console.log("[Bot] " + message);
    }

}