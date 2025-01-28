import { AsyncLocalStorage } from "async_hooks";
import { beginTransactionSequence, endCurrentEventGroup, endEventGroup, endTransactionSequence, startEventGroup } from "./agent";
import { API_CALL_FAILED, APPLICATION_ADDRESS_VALIDATION_FAILED, APPLICATION_STATUS_VALIDATION_FAILED } from "./constants/core.constants";
import AuditAgent from "./monitoring/audit-agent";
import { validateAddress } from "./services/AddressValidationService.service";
import { validateApplicant } from "./services/ApplicantValidationService.service";
import { calculateCombinedRiskScore } from "./services/CombinedRiskScoreService.service";
import { retrieveCreditScores } from "./services/CreditScoreRetrievalService.service";
import { performCriminalBackgroundCheck } from "./services/CriminalHistoryLookupService.service";
import { validateEmployer } from "./services/EmployerValidationService.service";
import LoanApplication from "./types/loan-application.type";
import { calculateLoanTerms } from "./services/LoanTermCalculationService.service";
import { getMockApplication } from "./utils/mock-utils";

import storage from './storage';

/**
 * Main routine
 * 
 *  Attempt to process a loan application. This is an example of a complex business process, 
 * where a lot of conditional logic is applied, which drives a requirement to perform detailed 
 * logging.
 * 
 * @param app 
 * @returns 
 */
export const processLoanApplication = (app:LoanApplication):LoanApplication =>{
    console.log(`attempting to process new application.`);

    const transactionId:string = AuditAgent.initTransaction();
    storage.run({ transactionId: transactionId }, () => {
        processLoanApplicationInternal(app);
    });

    return app;
}

const processLoanApplicationInternal = (app:LoanApplication)=>{
    
    try{
        
        // Ensure applicant information is valid.
        try{
            validateApplicant(app.applicant);
        }
        catch(e){
            app.applicationStatus = APPLICATION_STATUS_VALIDATION_FAILED;
            console.warn(e);
            return app;
        }

        // Address must meet minimum requirements
        try{
            validateAddress(app.address);
        }
        catch(e){
            app.applicationStatus = APPLICATION_ADDRESS_VALIDATION_FAILED;
            return app;
        }
        
        // Does the employer exist, a know business enity, etc.
        try{
            validateEmployer(app.currentEmployer);
        }
        catch(e){
            app.applicationStatus = API_CALL_FAILED;
            return app;
        }
        
        // Perform call to get credit scores from major burues
        try{
            retrieveCreditScores(app);
        }
        catch(e){
            app.applicationStatus = API_CALL_FAILED;
            return app;
        }

        // 
        try{
            performCriminalBackgroundCheck(app);
        }
        catch(e){
            app.applicationStatus = API_CALL_FAILED;
            return app;
        }

        calculateCombinedRiskScore(app);
        
        calculateLoanTerms(app);

    }
    catch(e){
        console.warn(e);
    }
    finally{
        AuditAgent.endTransaction();
        return app;
    }
}

const newApplication:LoanApplication = getMockApplication();
newApplication.applicant.firstName = 'Mickey';
newApplication.applicant.lastName = 'Mouse';
newApplication.applicant.dob = new Date(`2000-01-01`);
newApplication.address.street = '1234 main street';
newApplication.address.city = 'anahiem';
newApplication.address.state = 'ca';
newApplication.address.postalCode = '90210';

const appFinalState:LoanApplication = processLoanApplication(newApplication);

//console.log('App final status', appFinalState);
