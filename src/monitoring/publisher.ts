import storage from "@/storage";
import EventGroup from "@/types/event/event-group.type";
import LoanApplication from "@/types/loan-application.type";
import fs from 'fs';
import handlebars from 'handlebars';


const getCurrentTransactionId = ():string =>{
    const store = storage.getStore();
    return store?.transactionId; 
}

/**
 * 'Publisher' for reports.  
 * 
 * 
 */
export const publishFileToDirectory = async(transactionId:string, msgGroup:EventGroup)=>{

    const templateFile = `${import.meta.dirname}/../../report-templates/default.template`;

    const templateSrc = fs.readFileSync(templateFile, 'utf8');

    

    const context = {
        transactionId: getCurrentTransactionId(),
        messages: msgGroup
    }

    console.log('context', context);

    var template = handlebars.compile(templateSrc);
    var compiledReport = template(context);
    const reportName:string = `${import.meta.dirname}/../../reports/${transactionId}.html`;

    fs.writeFileSync(reportName, compiledReport);
}