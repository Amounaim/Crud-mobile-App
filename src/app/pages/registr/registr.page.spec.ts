import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistrPage } from './registr.page';

describe('RegistrPage', () => {
  let component: RegistrPage;
  let fixture: ComponentFixture<RegistrPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
