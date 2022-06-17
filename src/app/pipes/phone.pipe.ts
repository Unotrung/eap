import { Pipe, PipeTransform } from '@angular/core'
import {DatePipe} from "@angular/common";
@Pipe({
    name: 'phoneStyle',
})
export class PhoneStylePipe extends DatePipe implements PipeTransform {
    transform(str:string): any {
        let subString1 = str.substring(0,3);
        let subString2 = str.substring(str.length-3,str.length);
        let resultString = subString1 + 'xxxx' + subString2;
        return resultString;
    }
}
