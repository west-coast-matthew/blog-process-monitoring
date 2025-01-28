/**
 * AuditAgent
 * 
 * Interface between existing source code and auditing framework. In a real world 
 * scenario, this would broadcast messages on a messaging bus where another process 
 * would then consume the message and be responsible for correlating the events.
 * 
 * For the purposes of this demo, we simply track things locally.
 * 
 * 
 */

import { EVT_GROUP_TRANSACTION_START } from "../constants/monitoring.constants";
import EventGroup from '../types/event/event-group.type';
import { v4 as uuidv4 } from 'uuid';
import { AsyncLocalStorage } from 'async_hooks';
import storage from "@/storage";
import { publishFileToDirectory } from "./publisher";

const events = new Map<string, EventGroup>();

export default abstract class AuditAgent{

    /**
     * Called at the beggining of a transaction. Creates a unique 
     * id for the transaction, and binds it to the request context 
     * for convenient access.
     * 
     * @returns 
     */
    static initTransaction():string{
        //console.log('creating a new transaction');
        
        const transactionId:string = uuidv4();

        //const store = storage.getStore();
        //store?.transactionId = transactionId;

        const newGroup = new EventGroup(EVT_GROUP_TRANSACTION_START);
        events.set(transactionId, newGroup)
        
        return transactionId;
    }

    static initGroup(name:string):void{
        const newGroup = events.get(this.getCurrentTransactionId())?.addChildGroup(name);
        
        if(newGroup){
            events.set(this.getCurrentTransactionId(), newGroup);
        }
    }

    static endCurrentGroup():void{
        //console.log('ending current group....');
        // set reference to current group to paren
        const curGroup = events.get(this.getCurrentTransactionId());
        if(curGroup && curGroup.parent){
            //console.log(curGroup.toString());
            events.set(this.getCurrentTransactionId(), curGroup.parent);
        }
    }

    static recordMessage(msg:string){
        const curGroup = events.get(this.getCurrentTransactionId());
        //console.log(`>>>recordMessage '${curGroup?.name}':'${msg}'`);
        if(curGroup){
            curGroup.addMessage(msg);
        }
    }

    static getCurrentTransactionId():string{
        const store = storage.getStore();
        return store?.transactionId; 
    }

    /**
     * Always called at the end of a transaction, notifies the monitor that the transaction 
     * has completed (either succesfully or via a system exception).
     * 
     * @param transactionId 
     */
    static endTransaction(){
        //console.log('ending a transaction');
        
        const evtGroup = events.get(this.getCurrentTransactionId()); 
        //console.log(evtGroup?.getRoot().toXml());

        //const reportXml = `<TransactionReport>${evtGroup?.getRoot().toXml()}</TransactionReport>`;

        publishFileToDirectory(this.getCurrentTransactionId(), evtGroup?.getRoot());
    }

}