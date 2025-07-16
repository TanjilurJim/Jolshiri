export interface ForAll {
    name: string;
    motherName: string;
    dob: string;
    religion: string;
    nationality: string;
    profession: string;
    tin: string;
    personalNumber: string;
    email: string;
    permanentAddress: string;
    presentAddress: string;
    image: string;
    plotId: string;
}

export interface Civilian {
    memberId: string;
    husbandOrFatherName: string;
    nidPassport: string;
}

export interface Officer {
    ahsID: string;
    fatherName: string;
    husbandName: string;
    nid: string;
    passport: string;
    officeAddress: string;
    position: string;
}
