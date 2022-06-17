import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfirmNidResetPincodeComponent } from './confirm-nid-reset-pincode.component';

describe('ConfirmNidResetPincodeComponent', () => {
  let component: ConfirmNidResetPincodeComponent;
  let fixture: ComponentFixture<ConfirmNidResetPincodeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmNidResetPincodeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmNidResetPincodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
