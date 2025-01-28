import AuditAgent from "@/monitoring/audit-agent";
import LoanApplication from "@/types/loan-application.type";
import { mockApiCall } from "@/utils/mock-utils";

/**
 * 
 */
export const performCriminalBackgroundCheck = (app:LoanApplication)=>{
    try{
        console.log(`performing criminal background check`);
        AuditAgent.initGroup('Criminal background check');
        mockApiCall();      
        
        AuditAgent.recordMessage(`Background check successfully (no prior record)`);
    }
    finally{
        AuditAgent.endCurrentGroup();
    }
}