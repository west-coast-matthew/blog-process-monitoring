import AuditAgent from "@/monitoring/audit-agent";
import LoanApplication from "@/types/loan-application.type";


/**
 * 
 */
export const calculateCombinedRiskScore = (app:LoanApplication)=>{
    console.log(`calculating combined risk score...`);
    try{
        AuditAgent.initGroup('Calculating combined risk score');

        const combindRiskScore = 890;
        app.combinedRiskScore = combindRiskScore;
    
        AuditAgent.recordMessage(`Combined risk score: ${combindRiskScore}`);

    }
    finally{
        AuditAgent.endCurrentGroup();
    }

}