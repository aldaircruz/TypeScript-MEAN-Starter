import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AuthenticationService, CoreModule, MockAuthenticationService } from '../core';

import { ShellComponent } from './shell.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material.module';

describe('ShellComponent', () => {
  let component: ShellComponent;
  let fixture: ComponentFixture<ShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
        BrowserAnimationsModule,
        FlexLayoutModule,
        MaterialModule,
        CoreModule
      ],
      providers: [
        { provide: AuthenticationService, useClass: MockAuthenticationService }
      ],
      declarations: [
        HeaderComponent,
        ShellComponent
      ]
  })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
