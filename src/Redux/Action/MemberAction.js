import AxiosConfig from '../../WebService/AxiosConfig';

export async function ActiveMemberGetAction() {

    return await AxiosConfig.get('/member/get_members', {

    });
}

export async function ActiveMemberDeleteAction(user) {

    return await AxiosConfig.post('/member/delete_member', user, {

        data: user
    });
}

export async function ActiveMemberStatusAction(user) {

    return await AxiosConfig.post('/member/change_status', user, {

        data: user
    });
}

export async function addMember(params) {
    const formData = new FormData();

    if (params.user_name) formData.append("user_name", params.user_name);
    if (params.address) formData.append("address", params.address);
    if (params.email_id) formData.append("email_id", params.email_id);
    if (params.mobile_no) formData.append("mobile_no", params.mobile_no);
    if (params.joining_date) formData.append("joining_date", params.joining_date);
    if (params.file) formData.append("file", params.file);
    if (params.document_url) formData.append("document_url", params.document_url);
    if (params.id) formData.append("id", params.id || "");

    try {
        const response = await AxiosConfig.post('/member/add_new_member', formData, {
            headers: {
                "Content-type": "multipart/form-data",
            },
            timeout: 100000000,
            onUploadProgress: () => { }
        });
        return response.data;
    } catch (error) {
        console.log("No error", error);
    }
}

export async function GetMemberId(params) {

    return await AxiosConfig.post('/member/get_member_id', params, {
        data: params
    });
}

export async function MemberOverviewAction(users) {

    return await AxiosConfig.post('/member/get_member_overview', users, {

        data: users
    });
}

export async function GetCommentAction(comment) {

    return await AxiosConfig.post('/member/get_comment', comment, {
        data: comment
    });
}

export async function AddCommentAction(users) {

    return await AxiosConfig.post('/member/add_comment', users, {

        data: users
    });
}

export async function GetStatementAction(statement) {

    return await AxiosConfig.post('/member/get_member_statement', statement, {
        data: statement
    });
}
export async function TransactionsAction() {

    return await AxiosConfig.get('', {

    });
}


export async function RecordPaymentAction(params) {

    const formData = new FormData();

    if (params.loan_amount) formData.append("loan_amount", params.loan_amount);
    if (params.due_date) formData.append("due_date", params.due_date);
    if (params.pending_amount) formData.append("pending_amount", params.pending_amount);
    if (params.status) formData.append("status", params.status);
    if (params.id) formData.append("id", params.id);
    if (params.loan_id) formData.append("loan_id", params.loan_id);

    try {
        const response = await AxiosConfig.post('/loan/add_record_payment', formData, {
            headers: {
                "Content-type": "multipart/form-data",
            },
            timeout: 100000000,
            onUploadProgress: () => { }
        });
        return response.data;
    } catch (error) {
        console.log("No error", error);
    }
}