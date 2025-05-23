import AxiosConfig from '../../WebService/AxiosConfig';

export async function AddLoan(user) {
    return await AxiosConfig.post('/loan/add_member_loan', user);
}


export async function GetLoan(datum) {

    return await AxiosConfig.get("/loan/all_member_loans", {
        data: datum,
    });
}

export async function AddWitness(datumWitness) {
    return await AxiosConfig.post("/add/add_widness", datumWitness);
}

export async function AddApproval(dataApprove) {
    return await AxiosConfig.post("/loan/approve_loan", dataApprove);
}

export async function RejectLoan(reject) {
    return await AxiosConfig.post("/loan/recject_loan", reject);
}
