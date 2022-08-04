import { ICreate } from "../interfaces";

export const addUser = (data: ICreate) => {
    const userInfo = data?.userInfo;
    const sourceInfo = data?.source;
        try {
            if (!data?.id) {
                throw "Id is required";   
            }

            if (!userInfo?.firstName) {
                throw "First name is required";   
            }

            if (!userInfo?.lastName) {
                throw "Last name is required";   
            }

            if (!userInfo?.email) {
                throw "Email is required";   
            }

            if (!userInfo?.password) {
                throw "Email is required";   
            }
            

            return Object.freeze({
            id: data.id,
            userInfo: {
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                email: userInfo.email,
                password: userInfo.password,
            },
            source: {
                referer: sourceInfo.referer,
                userAgent: sourceInfo.userAgent,
                contentType: sourceInfo.contentType,
            }
        });

    } catch(e) {
        throw e;
    }
}