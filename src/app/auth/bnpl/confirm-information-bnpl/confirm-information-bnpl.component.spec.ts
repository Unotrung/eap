import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfirmInformationBnplComponent } from './confirm-information-bnpl.component';

describe('ConfirmInformationBnplComponent', () => {
  let component: ConfirmInformationBnplComponent;
  let fixture: ComponentFixture<ConfirmInformationBnplComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmInformationBnplComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmInformationBnplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
