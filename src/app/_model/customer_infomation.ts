export interface CustomerInformation {
        name?: string;
        sex?: string;
        phone?: string;
        birthday?: Date;
        citizenId?: number;
        issueDate?: Date;
        expirationDate?: Date;

        city: string;
        district: string;
        ward: string;
        street: string;

        temporaryCity: string;
        temporaryDistrict: string;
        temporaryWard: string;
        temporaryStreet: string;


        personal_title_ref: string;
        name_ref: string;
        phone_ref: string;
        pin?: string;

        nid_front_image: string;
        nid_back_image:string;
        selfie_image: string;
}
