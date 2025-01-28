import AuditAgent from "@/monitoring/audit-agent";
import { LoanApplicant } from "@/types/loan-applicant.type";
import { assertAttributePresent } from "@/utils/string-utils";

import _ from 'lodash';

/**
 * Ensure basic information is present.
 */
export const validateApplicant = (applicant:LoanApplicant)=>{
    
    function isAdult(birthDate:Date) {
        const today = new Date();
        const eighteenYearsAgo = new Date();
        eighteenYearsAgo.setFullYear(today.getFullYear() - 18);
      
        return birthDate <= eighteenYearsAgo;
    }
     
    try{
        AuditAgent.initGroup('Applicant validation');
        
        assertAttributePresent('First Name',applicant.firstName);
        assertAttributePresent('Last Name',applicant.lastName);
        if(!isAdult(applicant.dob)){
            throw new Error('Applicant must be at least 18 years of age.');
        }

        AuditAgent.recordMessage(`Applicant information passes basic check.`);
        AuditAgent.recordMessage(`-Basic required attributes`);
        AuditAgent.recordMessage(`-Min age requirement`);
        
    }
    finally{
        AuditAgent.endCurrentGroup();
    }
            
}