import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WaitingConfirmSignContractComponent } from './waiting-confirm-sign-contract.component';

describe('WaitingConfirmSignContractComponent', () => {
  let component: WaitingConfirmSignContractComponent;
  let fixture: ComponentFixture<WaitingConfirmSignContractComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingConfirmSignContractComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WaitingConfirmSignContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
