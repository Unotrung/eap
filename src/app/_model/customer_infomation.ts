export interface CustomerInformation {
        name?: string;
        sex?: string;
        phone?: string;
        birthday?: Date;
        citizenId?: number;
        issueDate?: Date;
        expiryDate?: Date;

        city: string;
        district: string;
        ward: string;
        street: string;

        cityTemp: string;
        districtTemp: string;
        wardTemp: string;
        streetTemp: string;


        personal_title_ref: string;
        name_ref: string;
        phone_ref: string;
        pin?: string;

}
