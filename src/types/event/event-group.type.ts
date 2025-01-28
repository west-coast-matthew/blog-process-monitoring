import AbstractEvent from "./abstract-event.type";
import { EventMessage } from "./event-message.type";

export default class EventGroup implements AbstractEvent{
    name: string;
    events:Array<AbstractEvent> = [];
    parent?: EventGroup;

    constructor(name:string, parent?:EventGroup){
        this.name = name;
        this.parent = parent;
    }

    isGroup(): boolean {
        return true;
    }
    
    /*
    toXml():string{
        let result:string = `<EventGroup name="${this.name}" events="${this.events.length}">\n`;
        
        const children = this.events.map((evt)=>{
            if( !evt.isGroup ){
                return `<Event>\n${evt.name}\n</Event>\n`;
            }

            return evt.toXml();
        });

        result = result + children;
        result = result + `</EventGroup>\n`;

        return result;
    }*/

    addMessage(msg:string):void{
        const newMsg:EventMessage = new EventMessage(msg, this);
        this.events.push(newMsg);
    }

    addChildGroup(name:string):EventGroup{
        const childGroup = new EventGroup(name, this);
        childGroup.parent = this;
        this.events.push(childGroup);
        return childGroup;
    }
    
    getRoot():EventGroup{
        //const root = this.parent?  this.parent?.getRoot() : this;
        //return root;
        if(this.parent){
            return this.parent;
        }
        return this;
    }

    toString():string{
        return `EventGroup.toString(): ${this.name}, hasParent: ${this.parent}`;
    }
}