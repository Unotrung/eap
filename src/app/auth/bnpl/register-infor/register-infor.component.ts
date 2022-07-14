import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject, Observable} from "rxjs";
import {AuthenticationService} from "../../../_service/auth/authentication.service";
import {Router} from "@angular/router";
import {PictureService} from "../../../_service/kyc/picture.service";
import {map, startWith} from "rxjs/operators";
import {City, District, Ward} from "../../../_model/vietnamLocation";
import {checkInfo,keyPress} from "../../../_helpers/helper";
import {CustomerInformationService} from "../../../_service/information-bnpl/customer-information.service";
import {LocationAddressService} from "../../../_service/information-bnpl/location-address.service";
import {InputType} from "../../../_model/user";
import {TranslateService} from "@ngx-translate/core";
import {LanguageService} from "../../../_service/language/language.service";

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

    cityFilteredOptions!: Observable<string[]>;
    districtFilteredOptions!: Observable<string[]>;
    wardFilteredOptions!: Observable<string[]>;
    personalTitleFilterOptions!: Observable<string[]>;

    cityFilteredOptionsTemp!: Observable<string[]>;
    districtFilteredOptionsTemp!: Observable<string[]>;
    wardFilteredOptionsTemp!: Observable<string[]>;

    cityOptions : City[] = []
    districtOptions : District[] = []
    wardOptions: Ward[] = []

    cityOptionsTemp : City[] = []
    districtOptionsTemp : District[] = []
    wardOptionsTemp: Ward[] = []

    personalTitleOptions!: string[]
    personalTitleOptionsEn!: string[]
    sexOptions!: string[]
    sexOptionsEn!: string[]
    lang = '';


    vietnamLocationData: any;
    selectedCity$! : BehaviorSubject<City>;
    selectedDistrict$!: BehaviorSubject<District>;
    selectedWard$!: BehaviorSubject<Ward>;
    selectedStreet$!: BehaviorSubject<any>;

    selectedCityTemp$! : BehaviorSubject<City>;
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
    }

    ngOnInit() {
        this.languageService.lang$.subscribe(x=>this.lang = x);
        // if (this.authService.step$.getValue() === 0) {
        //     this.router.navigate(['/infor-bnpl']);
        // }
        this.initFormInfo();
    }

    initFormInfo() {
        this.personalTitleOptions = ["Bố", "Mẹ", "Anh em trai", "Chị em gái", "Con trai", "Con gái",
            "Vợ chồng", "Mối quan hệ khác"]
        this.personalTitleOptionsEn = ["Father", "Mother", "Brother", "Sister", "Son", "Daughter",
            "Spouse", "Other family relationship"]
        this.sexOptions = ["Nam","Nữ"]
        this.sexOptionsEn = ["Male","Female"]

        const citizenFrontData = this.pictureService.citizenFrontData$.getValue()
        const citizenBackData = this.pictureService.citizenBackData$.getValue()
        console.log('front data', citizenFrontData)
        console.log('back data', citizenBackData)
        let name = '', gender = '', birthday = '', issueDay = '', expiryDay = '', citizenId = ''
        if ('name' in citizenFrontData) {
            this.name = name = this.checkInfo(citizenFrontData['name']).value
        }
        if ('gender' in citizenFrontData) {
            gender = (this.checkInfo(citizenFrontData['gender']).value === 'F') ? 'Nữ':
                this.checkInfo(citizenFrontData['gender']).value === 'M' ? 'Nam' : ''
        }
        if ('dob' in citizenFrontData) {
            this.birthday = birthday = this.convertDateString(this.checkInfo(citizenFrontData['dob']).value)
        }
        if ('doi' in citizenBackData) {
            this.issueDay = issueDay = this.convertDateString(this.checkInfo(citizenBackData['doi']).value)
        }
        if ('doe' in citizenFrontData) {
            this.expiryDay = expiryDay = this.convertDateString(this.checkInfo(citizenFrontData['doe']).value)
            console.log("ngày hết hạn", expiryDay)
        }
        if ('idNumber' in citizenFrontData) {
            this.citizenId = citizenId = this.checkInfo(citizenFrontData['idNumber']).value
        }


        //address splitter
        const fullAddress = this.checkInfo(citizenFrontData['permanentAddress']).value
        const addressParts = fullAddress.split(',')
        console.log('address parts',addressParts)
        const addressLength = addressParts.length
        let city = ''
        let district = ''
        let ward = ''
        let wardStreet = ''
        if (addressLength >= 3) {
            city = addressParts[addressLength - 1]
            district = addressParts[addressLength - 2]
            if (addressLength >= 4) {
                ward = addressParts[addressLength-3]
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
            }
            else {
                this.initCity = {
                    success: true,
                    city: initCity.name
                }
            }

            this.selectedCity$ = new BehaviorSubject<City>(initCity)
            Object.entries(this.selectedCity$.getValue().districts).forEach(([key, value]) => {
                // @ts-ignore
                if (district.toLowerCase().indexOf(<District>value.name.toLowerCase()) > -1){
                    initDistrict = value
                    // console.log(initDistrict)
                }
            })

            // @ts-ignore
            if(initDistrict === undefined) {
                initDistrict = this.selectedCity$.getValue().districts[0]
            }
            else {
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
                    if (ward.toLowerCase().indexOf(<Ward>value.name.toLowerCase()) > -1){
                        initWard = value
                        // console.log(initWard)
                    }
                }
                else { // @ts-ignore
                    if (wardStreet.toLowerCase().indexOf(<Ward>value.name.toLowerCase()) > -1){
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
            this.registerForm = new FormGroup({
                name: new FormControl({value: name, disabled: true}),
                sex: new FormControl({value:gender, disabled:gender?true:false}, [Validators.required]),
                phone: new FormControl({value: phone, disabled: true}),
                birthday: new FormControl({value:birthday, disabled: true}),
                citizenId: new FormControl({value: citizenId, disabled: true}),
                issueDate: new FormControl({value: issueDay, disabled: true}),
                expiryDate: new FormControl({value: expiryDay?expiryDay:'', disabled: expiryDay?true:false}),
                city: new FormControl({value: this.initCity.success ? this.initCity.city : '', disabled: false},
                    [Validators.required]),
                district: new FormControl({value: this.initDistrict.success ? this.initDistrict.district : '', disabled: false},
                    [Validators.required]),
                ward: new FormControl({value: this.initWard.success ? this.initWard.ward : '', disabled: false},
                    [Validators.required]),
                street: new FormControl({value: this.initStreet.success ? this.initStreet.street: '', disabled: false},
                    [Validators.required]),
                cityTemp: new FormControl('',[Validators.required]),
                districtTemp: new FormControl('',[Validators.required]),
                wardTemp: new FormControl('',[Validators.required]),
                streetTemp: new FormControl('',[Validators.required]),
                personal_title_ref: new FormControl('', [Validators.required]),
                name_ref: new FormControl('', [Validators.required]),
                phone_ref: new FormControl('', [Validators.required, Validators.pattern(/^(09|03|07|08|05)+([0-9]{8}$)/g),
                    Validators.minLength(10), Validators.maxLength(10)])
            })

            console.log("check ngay",this.registerForm.value.expiryDate)
            this.f['phone_ref'].valueChanges.subscribe(value => {
                if (value.length > 10) {
                    this.f['phone_ref'].setValue(value.slice(0,10))
                }
            })

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
            this.personalTitleFilterOptions = this.f['personal_title_ref'].valueChanges.pipe(
                startWith(''),
                map(value => this._filter(value, 'personal_title_ref'))
            )
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
        if (lastWord === 'xã' || lastWord === 'phường'){
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
        } )
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
        if (zone === 'personal_title_ref') {
            return this.personalTitleOptions.filter(option => option.toLowerCase().includes(filterValue))
        }
        return []
    }

    // keyPress(event: any, type: string) {
    //   const pattern = /[0-9]/;
    //   let inputChar = String.fromCharCode(event.charCode);
    //   if (event.keyCode != 8 && !pattern.test(inputChar)) {
    //     event.preventDefault();
    //   }
    // }

    get f(): {
        [key: string]: AbstractControl;
    } { return this.registerForm.controls; }

    onSelectedCity(city: string){
        this.districtOptions.length = 0;
        this.cityOptions.forEach((value, index) => {
            if (city === value.name){
                this.selectedCity$.next(value);
                this.f['district'].setValue('');
                this.f['ward'].setValue('');
            }
        })

    }

    onSelectedDistrict(district: string) {
        this.wardOptions.length = 0;
        this.districtOptions.forEach((value, index) => {
            if (district === value.name) {
                this.selectedDistrict$.next(value);
                this.f['ward'].setValue('');
            }
        })
    }
    onSelectedWard(ward: string) {
        this.wardOptions.forEach((value, index) => {
            if (ward === value.name) {
                this.selectedWard$.next(value)
            }
        })
    }

    onContinue() {
        this.customerInformationService.customerInfo$.next({
            ... this.customerInformationService.customerInfo$.getValue(),
            name: this.name,
            sex: this.handleValueGender(this.f['sex'].value),
            phone: this.authService.userCurrentSubject$.getValue().phone,
            birthday: new Date(this.birthday),
            citizenId: this.f['citizenId'].value,
            issueDate: new Date(this.issueDay),
            expirationDate: new Date(this.expiryDay),

            city: this.initCity.success ? this.initCity.city : this.f['city'].value,
            district: this.initDistrict.success ? this.initDistrict.district : this.f['district'].value,
            ward: this.initWard.success ? this.initWard.ward : this.f['ward'].value,
            street: this.initStreet.success ? this.initStreet.street : this.f['street'].value,

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

    handleValueGender(gender:string): string{
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
        this.personalTitleOptionsEn.forEach(function (rel,index) {
            if (relationship == rel) {
                relationshipFormat = listRelVi[index]
            }
        })
        return  relationshipFormat;
    }

    onSelectedCityTemp(city: string) {
        this.districtOptionsTemp.length = 0;
        this.cityOptionsTemp.forEach((value, index) => {
            if (city === value.name){
                this.selectedCityTemp$.next(value);
                this.f['districtTemp'].setValue('');
                this.f['wardTemp'].setValue('');
            }
        })
    }

    onSelectedDistrictTemp(district: string) {
        this.wardOptionsTemp.length = 0;
        this.districtOptionsTemp.forEach((value, index) => {
            if (district === value.name) {
                this.selectedDistrictTemp$.next(value);
                this.f['wardTemp'].setValue('');
            }
        })
    }

    onSelectedWardTemp(ward: string) {
        this.wardOptionsTemp.forEach((value, index) => {
            if (ward === value.name) {
                this.selectedWardTemp$.next(value)
            }
        })
    }

    keyPressName(e: any) {
        const pattern = /[^(\d\[\]!@#$%^&*\(\)_+\-={};':"\\|,\.<>\/?)]/;
        let inputChar = String.fromCharCode(e.charCode);
        if (!pattern.test(inputChar)) {
            e.preventDefault();
        }
    }
}
