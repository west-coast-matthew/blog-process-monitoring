import AbstractEvent from "./abstract-event.type";
import { EventGroup } from "./event-group.type";

export class EventMessage implements AbstractEvent{
    parent?: EventGroup;
    name:string;

    constructor( name:string, parent?:EventGroup){
        this.parent = parent;
        this.name = name;
    }

    isGroup(): boolean {
        return false;
    }

    isRoot():boolean{
        return this.parent == null;
    }

    /*
    toXml():string{
        let result:string = `<Event>\n`;
        result = result + this.name;
        result = result + `</Event>\n`;

        return result;
    }*/
}