import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChooseProviderRegisterBnplComponent } from './choose-provider-register-bnpl.component';

describe('ChooseProviderRegisterBnplComponent', () => {
  let component: ChooseProviderRegisterBnplComponent;
  let fixture: ComponentFixture<ChooseProviderRegisterBnplComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseProviderRegisterBnplComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChooseProviderRegisterBnplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
