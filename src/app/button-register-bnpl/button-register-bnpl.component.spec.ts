import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ButtonRegisterBnplComponent } from './button-register-bnpl.component';

describe('ButtonRegisterBnplComponent', () => {
  let component: ButtonRegisterBnplComponent;
  let fixture: ComponentFixture<ButtonRegisterBnplComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonRegisterBnplComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonRegisterBnplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
