import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArticlesUserComponent } from './list-articles-user.component';

describe('ListArticlesUserComponent', () => {
  let component: ListArticlesUserComponent;
  let fixture: ComponentFixture<ListArticlesUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListArticlesUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListArticlesUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
