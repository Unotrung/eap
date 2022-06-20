import { Pipe, PipeTransform } from '@angular/core'
import {DatePipe} from "@angular/common";
@Pipe({
    name: 'moneyStyle',
})
export class MoneyStylePipe extends DatePipe implements PipeTransform {
    transform(money:number): any {
        let y = money.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        y = y.slice(0,-4);
        return y;
    }
}
