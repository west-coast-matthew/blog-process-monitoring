import AuditAgent from "@/monitoring/audit-agent";
import EmploymentRecord from "@/types/employment-record.type";
import { mockApiCall } from "@/utils/mock-utils";


/**
 * 
 */
export const validateEmployer = (employer:EmploymentRecord)=>{
    try{
        AuditAgent.initGroup('Employer validation');
         
        // Emulate an API call to an address service API
        mockApiCall();   
        
        AuditAgent.recordMessage(`Employer validation check failed`);
    }
    finally{
        AuditAgent.endCurrentGroup();
    }
}