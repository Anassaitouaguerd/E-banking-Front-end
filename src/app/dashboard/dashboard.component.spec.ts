import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { Component } from '@angular/core';

@Component({ selector: 'app-modal-form', template: '' })
class MockModalFormComponent {}

@Component({ selector: 'app-side-bar', template: '' })
class MockSideBarComponent {}

@Component({ selector: 'app-user', template: '' })
class MockUserComponent {}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent], 
      declarations: [MockModalFormComponent, MockSideBarComponent, MockUserComponent], // Add mocks for child components
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should handle changeEvent emitted by modal form', () => {
    spyOn(component, 'handleChange');
    const modalForm = fixture.debugElement.query(By.css('app-modal-form')).componentInstance;
    modalForm.changeEvent.emit({ newData: 'test' });
    expect(component.handleChange).toHaveBeenCalledWith(jasmine.objectContaining({ newData: 'test' }));
  });
});
