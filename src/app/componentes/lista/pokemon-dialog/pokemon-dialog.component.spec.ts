import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDialogComponent } from './pokemon-dialog.component';

describe('PokemonDialogComponent', () => {
  let component: PokemonDialogComponent;
  let fixture: ComponentFixture<PokemonDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
