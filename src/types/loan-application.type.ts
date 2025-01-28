import { LoanApplicant } from "./loan-applicant.type";
import {APPLICATION_STATUS_DEFAULT} from '../constants/core.constants';
import Address from "./address.type";
import EmploymentRecord from "./employment-record.type";
import CreditScoreResult from "./credit-score-report.type";

export default interface LoanApplication{
    
    transactionId:string;
    applicant:LoanApplicant;
    applicationDate: Date;
    offerExpirationDate: Date;
    requestedAmount: number;
    requestedLength: number;
    authAmount: number;
    authLength: number;
    apr: number;
    ssn: string;
    approvalDate: Date;
    applicationStatus: string;
    address:Address;
    currentEmployer:EmploymentRecord;
    creditScores:CreditScoreResult;
    combinedRiskScore:number;

}