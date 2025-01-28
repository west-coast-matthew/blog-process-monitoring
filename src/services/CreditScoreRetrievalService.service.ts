import AuditAgent from "@/monitoring/audit-agent";
import CreditScoreResult from "@/types/credit-score-report.type";
import LoanApplication from "@/types/loan-application.type";
import { mockApiCall } from "@/utils/mock-utils";


/**
 * Perform remote API calls to various credit bureaus and store 
 * in the loan application. 
 */
export const retrieveCreditScores = (app:LoanApplication)=>{

    try{
        AuditAgent.initGroup('Retrieving credit scores');
        mockApiCall();            
        const scores:CreditScoreResult = {equifaxScore: 700, experianScore: 755};
        app.creditScores = scores;

        AuditAgent.recordMessage(`Credit store (equifax): ${scores.equifaxScore}`);
        AuditAgent.recordMessage(`Credit store (experian): ${scores.experianScore}`);
        
    }
    finally{
        AuditAgent.endCurrentGroup();
    }
    
}