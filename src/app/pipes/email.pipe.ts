import { Pipe, PipeTransform } from '@angular/core'
import {DatePipe} from "@angular/common";
@Pipe({
    name: 'emailStyle',
})
export class EmailStylePipe extends DatePipe implements PipeTransform {
    transform(str:string): any {
        // let index1 = str.indexOf('@');
        // let index2 = 0;
        // for (let i = 0; i< str.length; i++){
        //     // @ts-ignore
        //     if (i > index1){
        //         index2 = str.indexOf('.')
        //         break;
        //     }
        // }
        let subString1 = str.substring(0,3);
        let subString2 = str.substring(str.length-3,str.length);
        let resultString = subString1 + '***@***' + subString2;
        return resultString;
    }
}
