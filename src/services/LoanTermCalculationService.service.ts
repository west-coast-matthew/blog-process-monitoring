import LoanApplication from "@/types/loan-application.type";
import storage from '../storage';
import AuditAgent from "@/monitoring/audit-agent";
import { APPLICATION_STATUS_APPROVED } from "@/constants/core.constants";

/**
 * 
 */
export const calculateLoanTerms = (app:LoanApplication)=>{

    AuditAgent.initGroup('Calculate loan terms');
    
    // Logic would be implemented here
    app.approvalDate = new Date();
    app.applicationStatus = APPLICATION_STATUS_APPROVED;
    app.apr = 4.9;
    app.authAmount = 5000;
    app.authLength = 36; 

    // Basic example of how to log messages within the current group
    AuditAgent.recordMessage(`Calculating loan terms`);
    AuditAgent.recordMessage(`Application status: Approved`);
    AuditAgent.recordMessage(`APR: ${app.apr}`);
    AuditAgent.recordMessage(`Approval Amount ${app.authAmount}`);
    AuditAgent.recordMessage(`Approval length ${app.authLength} months`);

    AuditAgent.endCurrentGroup();
}