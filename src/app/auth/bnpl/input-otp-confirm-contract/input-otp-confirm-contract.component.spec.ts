import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InputOtpConfirmContractComponent } from './input-otp-confirm-contract.component';

describe('InputOtpConfirmContractComponent', () => {
  let component: InputOtpConfirmContractComponent;
  let fixture: ComponentFixture<InputOtpConfirmContractComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InputOtpConfirmContractComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InputOtpConfirmContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
