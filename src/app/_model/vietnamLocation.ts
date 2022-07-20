export interface City {
    id: string;
    code: string;
    name: string;
    districts: District[];
}

export interface District {
    id: string;
    name: string;
    code: string;
    wards: any[];
    streets: any[];
    projects: any[];
}

export interface Ward {
    id: string;
    name: string;
    prefix: string;
}

export interface Street {
    id: string;
    name: string;
    prefix: string;
}

export interface CityData {
    _id: string;
    Value: string;
    UI_Show: string;
    Same: string;
}

export interface DistrictData {
    _id: string;
    Value: string;
    UI_Show: string;
    Parent_Value: string;
}

export interface WardData {
    _id: string;
    Value: string;
    UI_Show: string;
    Parent_Value: string;
}
