import AuditAgent from "@/monitoring/audit-agent";
import Address from "../types/address.type";
import { assertAttributePresent } from "@/utils/string-utils";
import { mockApiCall } from "@/utils/mock-utils";

/**
 * 
 */
export const validateAddress = (address:Address)=>{
    try{
        AuditAgent.initGroup('Address validation');
     
        // Basic string checks
        assertAttributePresent('Street',address.street);
        assertAttributePresent('City',address.city);
        assertAttributePresent('State',address.state);
        assertAttributePresent('Postal Code',address.postalCode);

        // Emulate an API call to an address service API
        mockApiCall();

        AuditAgent.recordMessage(`Applicant address for ${address.street},${address.city} is considered valid.`);
        
    }
    finally{
        AuditAgent.endCurrentGroup();
    }
}