import LoanApplication from "@/types/loan-application.type"

function delay(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function mockDelay() {
    const delay = Math.floor(Math.random() * (3500 - 500 + 1)) + 500;
    return new Promise(resolve => setTimeout(resolve, delay));
}

export const getMockApplication = ():LoanApplication=>{
    const app:LoanApplication = {
        applicant: {
            firstName: '', lastName: '', dob: new Date('1970/5/1')
        },
        address: {
            street: '',
            city: '',
            state: '',
            postalCode: ''
        },
        transactionId: "",
        applicationDate: new Date('2025/1/1'),
        offerExpirationDate: new Date('2025/1/31'),
        requestedAmount: 0,
        requestedLength: 0,
        authAmount: 0,
        authLength: 0,
        apr: 0,
        ssn: "",
        approvalDate: "",
        applicationStatus: "",
        currentEmployer: {
            employerName: "",
            startDate: new Date('2020/1/1')
        },
        creditScores: {
            experianScore: 600,
            equifaxScore: 500
        }
    };

    return app;
}

/**
 * Simulate an API call to either an internal or external API. We bascially 
 * just mock a random delay to emulate a response time from the call.
 */
export const mockApiCall = async ()=>{
    await mockDelay();
    return {};
}