import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemitComponent } from './remit.component';

describe('BlockchainInformationComponent', () => {
  let component: RemitComponent;
  let fixture: ComponentFixture<RemitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
