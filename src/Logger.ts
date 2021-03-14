export default class Logger {

    constructor(){
    }

    public info(message: string): void {
        //const date: string 
        console.log("[Bot] " + message);
    }

}