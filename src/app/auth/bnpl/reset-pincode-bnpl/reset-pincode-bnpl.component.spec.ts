import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResetPincodeBnplComponent } from './reset-pincode-bnpl.component';

describe('ResetPincodeBnplComponent', () => {
  let component: ResetPincodeBnplComponent;
  let fixture: ComponentFixture<ResetPincodeBnplComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPincodeBnplComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPincodeBnplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
