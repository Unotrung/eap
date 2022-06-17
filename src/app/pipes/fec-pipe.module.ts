import { NgModule } from '@angular/core'
import { SafeStylePipe } from './safe.pipe'
import {DateStylePipe} from "./date.pipe";
import {EmailStylePipe} from "./email.pipe";
import {PhoneStylePipe} from "./phone.pipe";
const PIPES = [
    SafeStylePipe,
    DateStylePipe,
    EmailStylePipe,
    PhoneStylePipe
]
@NgModule({
    declarations: [...PIPES],
    imports: [],
    providers: [],
    exports: [...PIPES],
})
export class FecPipesModule {}
