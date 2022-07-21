import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject, Observable} from "rxjs";
import {AuthenticationService} from "../../../_service/auth/authentication.service";
import {Router} from "@angular/router";
import {PictureService} from "../../../_service/kyc/picture.service";
import {map, startWith} from "rxjs/operators";
import {City, District, Ward} from "../../../_model/vietnamLocation";
import {checkInfo, keyPress} from "../../../_helpers/helper";
import {CustomerInformationService} from "../../../_service/information-bnpl/customer-information.service";
import {LocationAddressService} from "../../../_service/information-bnpl/location-address.service";
import {InputType} from "../../../_model/user";
import {TranslateService} from "@ngx-translate/core";
import {LanguageService} from "../../../_service/language/language.service";
import {Relationship} from "../../../_model/relationship";

@Component({
    selector: 'app-register-infor',
    templateUrl: './register-infor.component.html',
    styleUrls: ['./register-infor.component.scss'],
})
export class RegisterInforComponent implements OnInit {
    linkImgWarn = '../../../../assets/images/Warning.png';
    registerForm!: FormGroup;
    submitted = false;
    isCheckPhoneRef = false;
    rotateNameIcon = '';

    cityFilteredOptions!: Observable<string[]>;
    districtFilteredOptions!: Observable<string[]>;
    wardFilteredOptions!: Observable<string[]>;
    personalTitleFilterOptions!: Observable<string[]>;

    cityFilteredOptionsTemp!: Observable<string[]>;
    districtFilteredOptionsTemp!: Observable<string[]>;
    wardFilteredOptionsTemp!: Observable<string[]>;

    cityOptions: City[] = []
    districtOptions: District[] = []
    wardOptions: Ward[] = []

    cityOptionsTemp: City[] = []
    districtOptionsTemp: District[] = []
    wardOptionsTemp: Ward[] = []

    personalTitleOptions!: Relationship[]
    personalTitleOptionsEn!: string[]
    sexOptions!: string[]
    sexOptionsEn!: string[]
    lang = '';


    vietnamLocationData: any;
    selectedCity$!: BehaviorSubject<City>;
    selectedDistrict$!: BehaviorSubject<District>;
    selectedWard$!: BehaviorSubject<Ward>;
    selectedStreet$!: BehaviorSubject<any>;

    selectedCityTemp$!: BehaviorSubject<City>;
    selectedDistrictTemp$!: BehaviorSubject<District>;
    selectedWardTemp$!: BehaviorSubject<Ward>;

    initCity = {
        city: '',
        success: false
    }
    initDistrict = {
        district: '',
        success: false
    }
    initWard = {
        ward: '',
        prefix: '',
        success: false
    }
    initStreet = {
        street: '',
        success: false
    }
    name = ''
    birthday = ''
    issueDay = ''
    expiryDay = ''
    citizenId = ''

    isShowExpiryDate = true;

    checkInfo = checkInfo
    keyPress = keyPress
    InputType = InputType

    constructor(private locationAddressService: LocationAddressService,
                private customerInformationService: CustomerInformationService,
                private authService: AuthenticationService,
                private router: Router,
                private pictureService: PictureService,
                private translateService: TranslateService,
                private languageService: LanguageService) {
        this.registerForm = new FormGroup({
            name: new FormControl({value: ''}, [Validators.required]),
            sex: new FormControl({value: ''}, [Validators.required]),
            phone: new FormControl({value: ''}, [Validators.required]),
            birthday: new FormControl({value: ''}, [Validators.required,
                Validators.pattern('^(0?[1-9]|[12][0-9]|3[01])[\\/](0?[1-9]|1[012])[\\/]\\d{4}$')]),
            citizenId: new FormControl({value: ''}, [Validators.required]),
            issueDate: new FormControl({value: ''}, [Validators.required,
                Validators.pattern('^(0?[1-9]|[12][0-9]|3[01])[\\/](0?[1-9]|1[012])[\\/]\\d{4}$')]),
            expiryDate: new FormControl({value: ''}, [Validators.required,
                Validators.pattern('^(0?[1-9]|[12][0-9]|3[01])[\\/](0?[1-9]|1[012])[\\/]\\d{4}$')]),
            city: new FormControl('', [Validators.required]),
            district: new FormControl('', [Validators.required]),
            ward: new FormControl('', [Validators.required]),
            street: new FormControl('', [Validators.required]),
            cityTemp: new FormControl('', [Validators.required]),
            districtTemp: new FormControl('', [Validators.required]),
            wardTemp: new FormControl('', [Validators.required]),
            streetTemp: new FormControl('', [Validators.required]),
            personal_title_ref: new FormControl('', [Validators.required]),
            name_ref: new FormControl('', [Validators.required]),
            phone_ref: new FormControl('', [Validators.required, Validators.pattern(/^(09|03|07|08|05)+([0-9]{8}$)/g),
                Validators.minLength(10), Validators.maxLength(10)])
        })
    }

    ngOnInit() {
        setTimeout(()=>{
            this.initFormInfo();
        },0)
        this.languageService.lang$.subscribe(x => this.lang = x);
        if (this.authService.step$.getValue() === 0) {
            this.router.navigate(['/infor-bnpl']);
        }
    }

    async getAllRelationship(): Promise<any> {
        let res = await this.customerInformationService.getAllRelationship().toPromise();
        this.personalTitleOptions = [...res.data];
        console.log("relation", this.personalTitleOptions)
        this.personalTitleOptionsEn = ["Brother", "Father", "Sister", "Daughter", "Son", "Mother",
            "Other family relationship", "Spouse"];
        return res;
    }

    async initFormInfo() {
        await this.getAllRelationship();

        this.sexOptions = ["Nam", "Nữ"]
        this.sexOptionsEn = ["Male", "Female"]

        const citizenFrontData = this.pictureService.citizenFrontData$.getValue()
        const citizenBackData = this.pictureService.citizenBackData$.getValue()
        console.log('front data', citizenFrontData)
        console.log('back data', citizenBackData)
        let name = '', gender = '', birthday = '', issueDay = '', expiryDay = '', citizenId = ''
        if ('name' in citizenFrontData) {
            this.name = name = this.checkInfo(citizenFrontData['name']).value;
            console.log(this.name)
        }
        if ('gender' in citizenFrontData) {
            gender = (this.checkInfo(citizenFrontData['gender']).value === 'F') ? 'Nữ' :
                this.checkInfo(citizenFrontData['gender']).value === 'M' ? 'Nam' : ''
        }
        if ('dob' in citizenFrontData) {
            this.birthday = birthday = this.handleStringDate(this.checkInfo(citizenFrontData['dob']).value)

        }
        if ('doi' in citizenBackData) {
            this.issueDay = issueDay = this.handleStringDate(this.checkInfo(citizenBackData['doi']).value)
        }
        this.isShowExpiryDate = ('doe' in citizenFrontData);
        if (!this.isShowExpiryDate) {
            this.expiryDay = expiryDay = "no"
        } else {
            if (this.checkInfo(citizenFrontData['doe']).value) {
                this.expiryDay = expiryDay = this.handleStringDate(this.checkInfo(citizenFrontData['doe']).value)
            } else  {
                expiryDay = '';
            }
        }
        if ('idNumber' in citizenFrontData) {
            this.citizenId = citizenId = this.checkInfo(citizenFrontData['idNumber']).value
        }


        //address splitter
        const fullAddress = this.checkInfo(citizenFrontData['permanentAddress']).value
        const addressParts = fullAddress.split(',')
        console.log('address parts', addressParts)
        const addressLength = addressParts.length
        let city = ''
        let district = ''
        let ward = ''
        let wardStreet = ''
        if (addressLength >= 3) {
            city = addressParts[addressLength - 1]
            district = addressParts[addressLength - 2]
            if (addressLength >= 4) {
                ward = addressParts[addressLength - 3]
            }
            wardStreet = addressParts[0]
        }

        let initCity: City
        let initDistrict: District
        let initWard: Ward
        let initStreet = ''
        this.locationAddressService.getJSON().subscribe(data => {
            this.vietnamLocationData = data as any[];
            Object.entries(this.vietnamLocationData).forEach(
                ([key, value]) => {
                    // data have extra field with value = 63, so
                    if (value !== 63 && key !== 'default') {
                        this.cityOptions[+key] = <City>value;
                        this.cityOptionsTemp[+key] = <City>value;
                        // @ts-ignore
                        if (city.toLowerCase().indexOf(<City>value.name.toLowerCase()) > -1) {
                            initCity = <City>value
                        }
                    }
                }
            );
            if (initCity === undefined) {
                initCity = this.cityOptions[0]
            } else {
                this.initCity = {
                    success: true,
                    city: initCity.name
                }
            }

            this.selectedCity$ = new BehaviorSubject<City>(initCity)
            Object.entries(this.selectedCity$.getValue().districts).forEach(([key, value]) => {
                // @ts-ignore
                if (district.toLowerCase().indexOf(<District>value.name.toLowerCase()) > -1) {
                    initDistrict = value
                    // console.log(initDistrict)
                }
            })

            // @ts-ignore
            if (initDistrict === undefined) {
                initDistrict = this.selectedCity$.getValue().districts[0]
            } else {
                // this.initDistrict = true
                this.initDistrict = {
                    success: true,
                    district: initDistrict.name
                }
            }
            this.selectedDistrict$ = new BehaviorSubject<District>(initDistrict);

            Object.entries(this.selectedDistrict$.getValue().wards).forEach(([key, value]) => {
                if (ward) {
                    // @ts-ignore
                    if (ward.toLowerCase().indexOf(<Ward>value.name.toLowerCase()) > -1) {
                        initWard = value
                        // console.log(initWard)
                    }
                } else { // @ts-ignore
                    if (wardStreet.toLowerCase().indexOf(<Ward>value.name.toLowerCase()) > -1) {
                        initWard = value
                        // console.log(initWard)
                    }
                }
            })

            if (initWard === undefined) {
                initStreet = this.spitStreetFromStreetWard(wardStreet);
                initWard = this.selectedDistrict$.getValue().wards[0]
            } else {
                this.initWard = {
                    success: true,
                    ward: initWard.name,
                    prefix: initWard.prefix
                }

                if (addressLength >= 4) {
                    initStreet = wardStreet
                } else {
                    initStreet = this.spitStreetFromStreetWard(wardStreet, initWard.name)
                }

                this.initStreet = {
                    success: true,
                    street: initStreet
                }
            }

            // @ts-ignore
            this.selectedWard$ = new BehaviorSubject<Ward>(initWard);

            this.selectedCity$.subscribe(city => {
                // @ts-ignore
                Object.entries(city['districts']).forEach(([subKey, district]) => {
                    this.districtOptions[+subKey] = <District>district;
                })
                // console.log(this.districtOptions)
            })
            this.selectedCityTemp$ = new BehaviorSubject<City>(null);
            this.selectedCityTemp$.subscribe(city => {
                // @ts-ignore
                if (city == null) {
                    this.districtOptionsTemp = [];
                } else {
                    Object.entries(city['districts']).forEach(([subKey, district]) => {
                        this.districtOptionsTemp[+subKey] = <District>district;
                    })
                }
            })

            this.selectedDistrict$.subscribe(district => {
                // @ts-ignore
                Object.entries(district['wards']).forEach(([key, ward]) => {
                    this.wardOptions[+key] = <Ward>ward;
                })
            })

            this.selectedDistrictTemp$ = new BehaviorSubject<District>(null);
            this.selectedDistrictTemp$.subscribe(district => {
                // @ts-ignore
                if (district == null) {
                    this.wardOptionsTemp = [];
                } else {
                    Object.entries(district['wards']).forEach(([key, ward]) => {
                        this.wardOptionsTemp[+key] = <Ward>ward;
                    })
                }
            })


            let phone = this.authService.userCurrentSubject$.getValue().phone;
            this.registerForm.patchValue({
                name: name ? name : '',
                sex: gender ? gender : '',
                phone: phone,
                birthday: birthday ? birthday : '',
                citizenId: citizenId ? citizenId : '',
                issueDate: issueDay ? issueDay : '',
                expiryDate: expiryDay,
                city: this.initCity.success ? this.initCity.city : '',
                district: this.initDistrict.success ? this.initDistrict.district : '',
                ward: this.initWard.success ? this.initWard.ward : '',
                street: this.initStreet.success ? this.initStreet.street: ''
            })
            if (name) {
                this.registerForm.controls.name.disable();
            }
            if (gender) {
                this.registerForm.controls.sex.disable();
            }
            if (phone) {
                this.registerForm.controls.phone.disable();
            }
            if (birthday) {
                this.registerForm.controls.birthday.disable();
            }
            if (citizenId) {
                this.registerForm.controls.citizenId.disable();
            }
            if (issueDay) {
                this.registerForm.controls.issueDate.disable();
            }
            if (expiryDay) {
                this.registerForm.controls.expiryDate.disable();
            }

            this.cityFilteredOptions = this.f['city'].valueChanges.pipe(
                startWith(''),
                map(value => this._filter(value, 'city'))
            )
            this.districtFilteredOptions = this.f['district'].valueChanges.pipe(
                startWith(''),
                map(value => this._filter(value, 'district'))
            )
            this.wardFilteredOptions = this.f['ward'].valueChanges.pipe(
                startWith(''),
                map(value => this._filter(value, 'ward'))
            )
            this.cityFilteredOptionsTemp = this.f['cityTemp'].valueChanges.pipe(
                startWith(''),
                map(value => this._filter(value, 'cityTemp'))
            )
            this.districtFilteredOptionsTemp = this.f['districtTemp'].valueChanges.pipe(
                startWith(''),
                map(value => this._filter(value, 'districtTemp'))
            )
            this.wardFilteredOptionsTemp = this.f['wardTemp'].valueChanges.pipe(
                startWith(''),
                map(value => this._filter(value, 'wardTemp'))
            )
            // this.personalTitleFilterOptions = this.f['personal_title_ref'].valueChanges.pipe(
            //     startWith(''),
            //     map(value => this._filter(value, 'personal_title_ref'))
            // )
        })
    }

    convertDateString(dateString: string): string {
        if (dateString === '') return ''
        const dateParts = dateString.split("-");
        return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
    }

    spitStreetFromStreetWard(streetWard: string, ward?: string): string {
        if (ward) {
            const lastIndex = streetWard.toLowerCase().lastIndexOf(ward.toLowerCase());
            streetWard = streetWard.substring(0, lastIndex)
        }
        let wardStreetParts = streetWard.split(' ')
        const lastWord = wardStreetParts[wardStreetParts.length - 1].toLowerCase()
        if (lastWord === 'xã' || lastWord === 'phường') {
            wardStreetParts.pop()
        }
        if (lastWord === 'trấn') {
            wardStreetParts.pop()
            wardStreetParts.pop()
        }
        wardStreetParts.forEach((word, index) => {
            if (word && !/\d/.test(word)) {
                word = word[0].toUpperCase() + word.substring(1).toLowerCase()
                wardStreetParts[index] = word
            }
        })
        return wardStreetParts.join(' ').trim()
    }

    private _filter(value: string, zone: string): string[] {
        console.log('start filter')
        const filterValue = value.toLowerCase();
        if (zone === 'city') {
            const options = this.cityOptions.map(value => value.name);
            return options.filter(option => option.toLowerCase().includes(filterValue));
        }
        if (zone === 'district') {
            const options = this.districtOptions.map(value => value.name)
            return options.filter(option => option.toLowerCase().includes(filterValue));
        }
        if (zone === 'ward') {
            const options = this.wardOptions.map(value => value.name)
            return options.filter(option => option.toLowerCase().includes(filterValue))
        }
        if (zone === 'cityTemp') {
            const options = this.cityOptionsTemp.map(value => value.name);
            return options.filter(option => option.toLowerCase().includes(filterValue));
        }
        if (zone === 'districtTemp') {
            const options = this.districtOptionsTemp.map(value => value.name)
            return options.filter(option => option.toLowerCase().includes(filterValue));
        }
        if (zone === 'wardTemp') {
            const options = this.wardOptionsTemp.map(value => value.name)
            return options.filter(option => option.toLowerCase().includes(filterValue))
        }
        // if (zone === 'personal_title_ref') {
        //     return this.personalTitleOptions.filter(option => option.Text.toLowerCase().includes(filterValue))
        // }
        return []
    }

    get f(): {
        [key: string]: AbstractControl;
    } {
        return this.registerForm.controls;
    }

    onSelectedCity(city: string) {
        this.districtOptions.length = 0;
        this.cityOptions.forEach((value, index) => {
            if (city === value.name) {
                this.selectedCity$.next(value);
                this.f['district'].setValue('');
                this.f['ward'].setValue('');
            }
        })
        this.rotateNameIcon = '';

    }

    onSelectedDistrict(district: string) {
        this.wardOptions.length = 0;
        this.districtOptions.forEach((value, index) => {
            if (district === value.name) {
                this.selectedDistrict$.next(value);
                this.f['ward'].setValue('');
            }
        })
        this.rotateNameIcon = '';
    }

    onSelectedWard(ward: string) {
        this.wardOptions.forEach((value, index) => {
            if (ward === value.name) {
                this.selectedWard$.next(value)
            }
        })
        this.rotateNameIcon = '';
    }

    onContinue() {
        const birthday = this.convertStringToDate(this.f['birthday'].value);
        const issueDate = this.convertStringToDate(this.f['issueDate'].value);
        const expiryDate = this.convertStringToDate(this.f['expiryDate'].value);


        this.customerInformationService.customerInfo$.next({
            ...this.customerInformationService.customerInfo$.getValue(),
            name: this.name,
            sex: this.handleValueGender(this.f['sex'].value),
            phone: this.authService.userCurrentSubject$.getValue().phone,
            birthday: new Date(birthday),
            citizenId: this.f['citizenId'].value,
            issueDate: new Date(issueDate),
            expirationDate: this.f['expiryDate'].value == "no"? null: new Date(expiryDate),

            city: this.f['city'].value,
            district: this.f['district'].value,
            ward: this.f['ward'].value,
            street: this.f['street'].value,

            temporaryCity: this.f['cityTemp'].value,
            temporaryDistrict: this.f['districtTemp'].value,
            temporaryWard: this.f['wardTemp'].value,
            temporaryStreet: this.f['streetTemp'].value,

            personal_title_ref: this.handleValueRelationship(this.f['personal_title_ref'].value),
            name_ref: this.f['name_ref'].value,
            phone_ref: this.f['phone_ref'].value,
        })

        if (this.f['phone_ref'].value === this.authService.userCurrentSubject$.getValue().phone) {
            this.isCheckPhoneRef = true;
            console.log(this.isCheckPhoneRef);
            return;
        }

        this.router.navigate(['/confirm-infor-bnpl']).then();
    }

    handleValueGender(gender: string): string {
        let genderFormat = '';
        if (gender == 'Male') {
            genderFormat = 'Nam'
        } else if (gender == "Female") {
            genderFormat = "Nữ"
        } else {
            genderFormat = gender;
        }
        return genderFormat
    }

    handleValueRelationship(relationship: string): string {
        let relationshipFormat = relationship;
        let listRelVi = [...this.personalTitleOptions];
        this.personalTitleOptionsEn.forEach(function (rel, index) {
            if (relationship == rel) {
                relationshipFormat = listRelVi[index].Text;
            }
        })
        return relationshipFormat;
    }

    handleStringDate(date: string): string {
        let arrayTemp = date.split("-");
        let newString = arrayTemp[0]+"/"+arrayTemp[1]+"/"+arrayTemp[2];
        return newString
    }

    convertStringToDate(date: string): string {
        let arrayTemp = date.split("/");
        let newString = arrayTemp[2]+"-"+arrayTemp[1]+"-"+arrayTemp[0];
        return newString
    }


    onSelectedCityTemp(city: string) {
        this.districtOptionsTemp.length = 0;
        this.cityOptionsTemp.forEach((value, index) => {
            if (city === value.name) {
                this.selectedCityTemp$.next(value);
                this.f['districtTemp'].setValue('');
                this.f['wardTemp'].setValue('');
            }
        })
        this.rotateNameIcon = '';
    }

    onSelectedDistrictTemp(district: string) {
        this.wardOptionsTemp.length = 0;
        this.districtOptionsTemp.forEach((value, index) => {
            if (district === value.name) {
                this.selectedDistrictTemp$.next(value);
                this.f['wardTemp'].setValue('');
            }
        })
        this.rotateNameIcon = '';
    }

    onSelectedWardTemp(ward: string) {
        this.wardOptionsTemp.forEach((value, index) => {
            if (ward === value.name) {
                this.selectedWardTemp$.next(value)
            }
        })
        this.rotateNameIcon = '';
    }

    keyPressName(e: any) {
        const pattern = /[^(\d\[\]!@#$%^&*\(\)_+\-={};':"\\|,\.<>\/?)]/;
        let inputChar = String.fromCharCode(e.charCode);
        if (!pattern.test(inputChar)) {
            e.preventDefault();
        }
    }

    rotateIcon(nameField: string) {
        this.rotateNameIcon = nameField;
    }

    onSelectedRelation() {
        this.rotateNameIcon = '';
    }
}


// import {Component, OnInit} from '@angular/core';
// import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
// import {BehaviorSubject, Observable} from "rxjs";
// import {AuthenticationService} from "../../../_service/auth/authentication.service";
// import {Router} from "@angular/router";
// import {PictureService} from "../../../_service/kyc/picture.service";
// import {map, startWith} from "rxjs/operators";
// import {City, CityData, District, DistrictData, Ward, WardData} from "../../../_model/vietnamLocation";
// import {checkInfo, keyPress} from "../../../_helpers/helper";
// import {CustomerInformationService} from "../../../_service/information-bnpl/customer-information.service";
// import {LocationAddressService} from "../../../_service/information-bnpl/location-address.service";
// import {InputType} from "../../../_model/user";
// import {TranslateService} from "@ngx-translate/core";
// import {LanguageService} from "../../../_service/language/language.service";
// import {Relationship} from "../../../_model/relationship";
//
// @Component({
//     selector: 'app-register-infor',
//     templateUrl: './register-infor.component.html',
//     styleUrls: ['./register-infor.component.scss'],
// })
// export class RegisterInforComponent implements OnInit {
//     registerForm!: FormGroup;
//     submitted = false;
//     isCheckPhoneRef = false;
//     rotateNameIcon = '';
//
//     cityFilteredOptions!: Observable<CityData[]>;
//     districtFilteredOptions!: Observable<DistrictData[]>;
//     wardFilteredOptions!: Observable<WardData[]>;
//     personalTitleFilterOptions!: Observable<string[]>;
//
//     cityFilteredOptionsTemp!: Observable<string[]>;
//     districtFilteredOptionsTemp!: Observable<string[]>;
//     wardFilteredOptionsTemp!: Observable<string[]>;
//
//     personalTitleOptions!: Relationship[]
//     personalTitleOptionsEn!: string[]
//     sexOptions!: string[]
//     sexOptionsEn!: string[]
//     lang = '';
//
//     name = ''
//     gender = ''
//     birthday = ''
//     issueDay = ''
//     expiryDay = ''
//     citizenId = ''
//
//     city = '';
//     district = '';
//     ward = '';
//     street = '';
//
//     listCities: CityData[];
//     listDistricts: DistrictData[];
//     listWards: WardData[];
//
//     citySelected: CityData;
//     districtSelected: DistrictData;
//     wardSelected: WardData;
//
//     isShowExpiryDate = true;
//
//     checkInfo = checkInfo
//     keyPress = keyPress
//     InputType = InputType
//
//     constructor(private locationAddressService: LocationAddressService,
//                 private customerInformationService: CustomerInformationService,
//                 private authService: AuthenticationService,
//                 private router: Router,
//                 private pictureService: PictureService,
//                 private translateService: TranslateService,
//                 private languageService: LanguageService) {
//         this.registerForm = new FormGroup({
//             name: new FormControl({value: ''}, [Validators.required]),
//             sex: new FormControl({value: ''}, [Validators.required]),
//             phone: new FormControl({value: ''}, [Validators.required]),
//             birthday: new FormControl({value: ''}, [Validators.required,
//                 Validators.pattern('^(0?[1-9]|[12][0-9]|3[01])[\\/](0?[1-9]|1[012])[\\/]\\d{4}$')]),
//             citizenId: new FormControl({value: ''}, [Validators.required]),
//             issueDate: new FormControl({value: ''}, [Validators.required,
//                 Validators.pattern('^(0?[1-9]|[12][0-9]|3[01])[\\/](0?[1-9]|1[012])[\\/]\\d{4}$')]),
//             expiryDate: new FormControl({value: ''}, [Validators.required,
//                 Validators.pattern('^(0?[1-9]|[12][0-9]|3[01])[\\/](0?[1-9]|1[012])[\\/]\\d{4}$')]),
//             city: new FormControl('', [Validators.required]),
//             district: new FormControl('', [Validators.required]),
//             ward: new FormControl('', [Validators.required]),
//             street: new FormControl('', [Validators.required]),
//             cityTemp: new FormControl('', [Validators.required]),
//             districtTemp: new FormControl('', [Validators.required]),
//             wardTemp: new FormControl('', [Validators.required]),
//             streetTemp: new FormControl('', [Validators.required]),
//             personal_title_ref: new FormControl('', [Validators.required]),
//             name_ref: new FormControl('', [Validators.required]),
//             phone_ref: new FormControl('', [Validators.required, Validators.pattern(/^(09|03|07|08|05)+([0-9]{8}$)/g),
//                 Validators.minLength(10), Validators.maxLength(10)])
//         })
//     }
//
//     ngOnInit() {
//         this.handleDataToHyperVerge();
//         this.initFormInfo();
//         this.languageService.lang$.subscribe(x => this.lang = x);
//         // if (this.authService.step$.getValue() === 0) {
//         //     this.router.navigate(['/infor-bnpl']);
//         // }
//     }
//
//     async getAllCities(): Promise<any> {
//         let res = await this.customerInformationService.getAllCities().toPromise();
//         console.log(1)
//         let listCities: CityData[];
//         let citySelected: CityData;
//         listCities = [...res.data];
//         this.listCities = [...listCities];
//         let cityName = this.city;
//         if (cityName != '') {
//             listCities.forEach(function (city, index) {
//                 if (city.UI_Show.toLowerCase().includes(cityName)) {
//                     citySelected = {...city}
//                 }
//             })
//             this.citySelected = {...citySelected};
//             console.log(this.citySelected)
//         } else {
//             this.citySelected = null
//         }
//         return res
//     }
//
//     async getAllDistricts(): Promise<any> {
//         let res = await this.customerInformationService.getAllDistricts({idParent: this.citySelected.Value}).toPromise();
//         console.log(2)
//         let listDistricts: DistrictData[];
//         let districtSelected: DistrictData;
//         let districtName = this.district;
//         listDistricts = [...res.data];
//         this.listDistricts = [...listDistricts];
//         if (districtName!=''){
//             listDistricts.forEach(function (district, index) {
//                 if (district.UI_Show.toLowerCase().includes(districtName)) {
//                     districtSelected = {...district};
//                     return;
//                 }
//             })
//             this.districtSelected = {...districtSelected};
//         } else {
//             this.districtSelected = null;
//         }
//         return res
//     }
//
//     async getAllWards(): Promise<any> {
//         let res = await this.customerInformationService.
//         getAllWards({idParent: this.districtSelected.Value}).toPromise();
//         console.log(3)
//         let listWards: WardData[];
//         listWards = [...res.data];
//         let wardSelected: WardData;
//         let wardName = this.ward;
//         this.listWards = [...listWards];
//         if (wardName!=''){
//             listWards.forEach(function (ward, index) {
//                 if (ward.UI_Show.toLowerCase().includes(wardName)) {
//                     wardSelected = {...ward};
//                     return
//                 }
//             })
//             this.wardSelected = {...wardSelected};
//         } else {
//             this.wardSelected = null;
//         }
//         return res
//     }
//
//     async getAllRelationship(): Promise<any> {
//         let res = await this.customerInformationService.getAllRelationship().toPromise();
//         this.personalTitleOptions = [...res.data];
//         console.log("relation", this.personalTitleOptions)
//         this.personalTitleOptionsEn = ["Brother", "Father", "Sister", "Daughter", "Son", "Mother",
//             "Other family relationship", "Spouse"];
//         return res;
//     }
//
//     handleDataToHyperVerge() {
//         this.sexOptions = ["Nam", "Nữ"]
//         this.sexOptionsEn = ["Male", "Female"]
//         const citizenFrontData = this.pictureService.citizenFrontData$.getValue()
//         const citizenBackData = this.pictureService.citizenBackData$.getValue()
//         console.log('front data', citizenFrontData)
//         console.log('back data', citizenBackData)
//         if ('name' in citizenFrontData) {
//             this.name = this.checkInfo(citizenFrontData['name']).value;
//             console.log(this.name)
//         }
//         if ('gender' in citizenFrontData) {
//             this.gender = (this.checkInfo(citizenFrontData['gender']).value === 'F') ? 'Nữ' :
//                 this.checkInfo(citizenFrontData['gender']).value === 'M' ? 'Nam' : ''
//         }
//         if ('dob' in citizenFrontData) {
//             this.birthday = this.handleStringDate(this.checkInfo(citizenFrontData['dob']).value)
//
//         }
//         if ('doi' in citizenBackData) {
//             this.issueDay = this.handleStringDate(this.checkInfo(citizenBackData['doi']).value)
//         }
//         this.isShowExpiryDate = ('doe' in citizenFrontData);
//         if (!this.isShowExpiryDate) {
//             this.expiryDay = "no"
//         } else {
//             if (this.checkInfo(citizenFrontData['doe']).value) {
//                 this.expiryDay = this.handleStringDate(this.checkInfo(citizenFrontData['doe']).value)
//             } else {
//                 this.expiryDay = '';
//             }
//         }
//         if ('idNumber' in citizenFrontData) {
//             this.citizenId = this.checkInfo(citizenFrontData['idNumber']).value
//         }
//
//
//         //address splitter
//         let cityScan = ''
//         let districtScan = ''
//         let wardScan = ''
//         let streetScan = ''
//         const fullAddress = this.checkInfo(citizenFrontData['permanentAddress']).value
//         if (fullAddress) {
//             const addressParts = fullAddress.split(',')
//             console.log('address parts', addressParts)
//             const addressLength = addressParts.length
//             if (addressLength >= 4) {
//                 cityScan = addressParts[addressLength - 1]
//                 districtScan = addressParts[addressLength - 2]
//                 wardScan = addressParts[addressLength - 3]
//                 streetScan = addressParts[0]
//             } else if (addressLength == 3) {
//                 cityScan = addressParts[addressLength - 1]
//                 districtScan = addressParts[addressLength - 2]
//                 wardScan = addressParts[addressLength - 3]
//                 streetScan = ''
//             }
//         }
//         if (cityScan) {
//             cityScan = cityScan.toLowerCase();
//             if (cityScan.includes('tỉnh')) {
//                 cityScan = cityScan.replace('tỉnh', '').trim();
//             } else if (cityScan.includes('thành phố')) {
//                 cityScan = cityScan.replace('thành phố', '').trim();
//             } else if (cityScan.includes('tp')) {
//                 cityScan = cityScan.replace('tp', '').trim();
//             } else if (cityScan.includes('thủ đô')) {
//                 cityScan = cityScan.replace('thủ đô', '').trim();
//             } else {
//                 cityScan = cityScan.trim();
//             }
//         } else {
//             cityScan = ''
//         }
//
//         if (districtScan) {
//             districtScan = districtScan.toLowerCase();
//             if (districtScan.includes('huyện')) {
//                 districtScan = districtScan.replace('huyện', '').trim();
//             } else if (districtScan.includes('quận')) {
//                 districtScan = districtScan.replace('quận', '').trim();
//             } else if (districtScan.includes('thị xã')) {
//                 districtScan = districtScan.replace('thị xã', '').trim();
//             } else if (districtScan.includes('thành phố')) {
//                 districtScan = districtScan.replace('thành phố', '').trim();
//             } else {
//                 districtScan = districtScan.trim();
//             }
//         } else {
//             districtScan = '';
//         }
//
//         if (wardScan) {
//             wardScan = wardScan.toLowerCase();
//             if (wardScan.includes('xã')) {
//                 wardScan = wardScan.replace('xã', '').trim();
//             } else if (wardScan.includes('phường')) {
//                 wardScan = wardScan.replace('phường', '').trim();
//             } else if (wardScan.includes('thị trấn')) {
//                 wardScan = wardScan.replace('thị trấn', '').trim();
//             } else {
//                 wardScan = wardScan.trim();
//             }
//         } else {
//             wardScan = '';
//         }
//         this.city = cityScan;
//         this.district = districtScan;
//         this.ward = wardScan;
//         this.street = streetScan;
//     }
//
//     async initFormInfo() {
//         await this.getAllCities();
//         await this.getAllDistricts();
//         await this.getAllWards();
//         await this.getAllRelationship();
//
//
//         let phone = this.authService.userCurrentSubject$.getValue().phone;
//         this.registerForm.patchValue({
//             name: this.name ? this.name : '',
//             sex: this.gender ? this.gender : '',
//             phone: phone,
//             birthday: this.birthday ? this.birthday : '',
//             citizenId: this.citizenId ? this.citizenId : '',
//             issueDate: this.issueDay ? this.issueDay : '',
//             expiryDate: this.expiryDay,
//             city: this.citySelected ? this.citySelected : '',
//             district: this.districtSelected ? this.districtSelected : '',
//             ward: this.wardSelected ? this.wardSelected : '',
//             street: this.street ? this.street : ''
//         })
//         if (this.name) {
//             this.registerForm.controls.name.disable();
//         }
//         if (this.gender) {
//             this.registerForm.controls.sex.disable();
//         }
//         if (phone) {
//             this.registerForm.controls.phone.disable();
//         }
//         if (this.birthday) {
//             this.registerForm.controls.birthday.disable();
//         }
//         if (this.citizenId) {
//             this.registerForm.controls.citizenId.disable();
//         }
//         if (this.issueDay) {
//             this.registerForm.controls.issueDate.disable();
//         }
//         if (this.expiryDay) {
//             this.registerForm.controls.expiryDate.disable();
//         }
//
//         this.cityFilteredOptions = this.f['city'].valueChanges.pipe(
//             startWith(''),
//             map(value => this._filter(value, 'city'))
//         )
//         this.districtFilteredOptions = this.f['district'].valueChanges.pipe(
//             startWith(''),
//             map(value => this._filter(value, 'district'))
//         )
//         this.wardFilteredOptions = this.f['ward'].valueChanges.pipe(
//             startWith(''),
//             map(value => this._filter(value, 'ward'))
//         )
//     }
//
//     convertDateString(dateString: string): string {
//         if (dateString === '') return ''
//         const dateParts = dateString.split("-");
//         return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
//     }
//
//
//     get f(): {
//         [key: string]: AbstractControl;
//     } {
//         return this.registerForm.controls;
//     }
//
//     onSelectedCity(city: string) {
//         this.rotateNameIcon = '';
//     }
//
//     onSelectedDistrict(district: string) {
//         this.rotateNameIcon = '';
//     }
//
//     onSelectedWard(ward: string) {
//         this.rotateNameIcon = '';
//     }
//
//     onSelectedCityTemp(city: string) {
//         this.rotateNameIcon = '';
//     }
//
//     onSelectedDistrictTemp(district: string) {
//         this.rotateNameIcon = '';
//     }
//
//     onSelectedWardTemp(ward: string) {
//         this.rotateNameIcon = '';
//     }
//
//     onContinue() {
//         const birthday = this.convertStringToDate(this.f['birthday'].value);
//         const issueDate = this.convertStringToDate(this.f['issueDate'].value);
//         const expiryDate = this.convertStringToDate(this.f['expiryDate'].value);
//
//
//         this.customerInformationService.customerInfo$.next({
//             ...this.customerInformationService.customerInfo$.getValue(),
//             name: this.name,
//             sex: this.handleValueGender(this.f['sex'].value),
//             phone: this.authService.userCurrentSubject$.getValue().phone,
//             birthday: new Date(birthday),
//             citizenId: this.f['citizenId'].value,
//             issueDate: new Date(issueDate),
//             expirationDate: this.f['expiryDate'].value == "no" ? null : new Date(expiryDate),
//
//             city: this.f['city'].value,
//             district: this.f['district'].value,
//             ward: this.f['ward'].value,
//             street: this.f['street'].value,
//
//             temporaryCity: this.f['cityTemp'].value,
//             temporaryDistrict: this.f['districtTemp'].value,
//             temporaryWard: this.f['wardTemp'].value,
//             temporaryStreet: this.f['streetTemp'].value,
//
//             personal_title_ref: this.handleValueRelationship(this.f['personal_title_ref'].value),
//             name_ref: this.f['name_ref'].value,
//             phone_ref: this.f['phone_ref'].value,
//         })
//
//         if (this.f['phone_ref'].value === this.authService.userCurrentSubject$.getValue().phone) {
//             this.isCheckPhoneRef = true;
//             console.log(this.isCheckPhoneRef);
//             return;
//         }
//
//         this.router.navigate(['/confirm-infor-bnpl']).then();
//     }
//
//     handleValueGender(gender: string): string {
//         let genderFormat = '';
//         if (gender == 'Male') {
//             genderFormat = 'Nam'
//         } else if (gender == "Female") {
//             genderFormat = "Nữ"
//         } else {
//             genderFormat = gender;
//         }
//         return genderFormat
//     }
//
//     handleValueRelationship(relationship: string): string {
//         let relationshipFormat = relationship;
//         let listRelVi = [...this.personalTitleOptions];
//         this.personalTitleOptionsEn.forEach(function (rel, index) {
//             if (relationship == rel) {
//                 relationshipFormat = listRelVi[index].Text;
//             }
//         })
//         return relationshipFormat;
//     }
//
//     handleStringDate(date: string): string {
//         let arrayTemp = date.split("-");
//         let newString = arrayTemp[0] + "/" + arrayTemp[1] + "/" + arrayTemp[2];
//         return newString
//     }
//
//     convertStringToDate(date: string): string {
//         let arrayTemp = date.split("/");
//         let newString = arrayTemp[2] + "-" + arrayTemp[1] + "-" + arrayTemp[0];
//         return newString
//     }
//
//     keyPressName(e: any) {
//         const pattern = /[^(\d\[\]!@#$%^&*\(\)_+\-={};':"\\|,\.<>\/?)]/;
//         let inputChar = String.fromCharCode(e.charCode);
//         if (!pattern.test(inputChar)) {
//             e.preventDefault();
//         }
//     }
//
//     rotateIcon(nameField: string) {
//         this.rotateNameIcon = nameField;
//     }
//
//     onSelectedRelation() {
//         this.rotateNameIcon = '';
//     }
//
//     private _filter(value: string, zone: string): any[] {
//         console.log('start filter')
//         const filterValue = value.toLowerCase();
//         if (zone === 'city') {
//             const options = [...this.listCities];
//             return options.filter(option => option.UI_Show.toLowerCase().includes(filterValue));
//         } else if (zone === 'district') {
//             const options = [...this.listDistricts];
//             return options.filter(option => option.UI_Show.toLowerCase().includes(filterValue));
//         }else if (zone === 'ward') {
//             const options = [...this.listWards];
//             return options.filter(option => option.UI_Show.toLowerCase().includes(filterValue));
//         }
//         else {
//             return []
//         }
//     }
//
//     displayFn(city: CityData) {
//         return city.UI_Show
//     }
// }
