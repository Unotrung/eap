import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GetOtpForgotPinBnplComponent } from './get-otp-forgot-pin-bnpl.component';

describe('GetOtpForgotPinBnplComponent', () => {
  let component: GetOtpForgotPinBnplComponent;
  let fixture: ComponentFixture<GetOtpForgotPinBnplComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GetOtpForgotPinBnplComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GetOtpForgotPinBnplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
