import { Pipe, PipeTransform } from '@angular/core'
import {DatePipe} from "@angular/common";
@Pipe({
    name: 'dateStyle',
})
export class DateStylePipe extends DatePipe implements PipeTransform {
    transform(content): any {
        let newDate = '';
        for (let i = 0; i<content.length; i++){
            if (i<=9){
                newDate= newDate+ content[i];
            } else {
                break;
            }
        }
        newDate = newDate.replace('-','/');
        return super.transform(newDate, 'dd/MM/yyyy')
    }
}
