import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PredictionService } from '../../services/prediction.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-diabetes-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './diabetes-form.component.html',
  styleUrl: './diabetes-form.component.scss',
})
export class DiabetesFormComponent implements OnInit {
  healthForm: FormGroup;

  private _fb = inject(FormBuilder);
  private _prediction = inject(PredictionService);
  private _snackBar = inject(MatSnackBar);

  onSubmit = () => {
    if (this.healthForm.invalid) {
      console.log('Invalid');
      return; // Stop if form is invalid
    }

    this._prediction.getPrediction(this.healthForm.value).subscribe((pred) => {
      this._snackBar.open(
        pred === 1
          ? 'You might have diabetes please get checked!'
          : 'Hey, you do not have diabetes. Take Care!',
        'Close',
        {
          duration: 5000,
        }
      );
    });
  };

  ngOnInit(): void {}

  constructor() {
    this.healthForm = this._fb.group({
      age: [null, Validators.required],
      sex: [null, Validators.required],
      highChol: [null, Validators.required],
      cholCheck: [null, Validators.required],
      bmi: [null, Validators.required],
      smoker: [null, Validators.required],
      heartDiseaseOrAttack: [null, Validators.required],
      physActivity: ['', Validators.required],
      fruits: [null, Validators.required],
      veggies: [null, Validators.required],
      hvyAlcoholConsump: [null, Validators.required],
      genHlth: [1, Validators.required],
      mentHlth: [null, Validators.required],
      physHlth: [null, Validators.required],
      diffWalk: [null, Validators.required],
      stroke: [null, Validators.required],
      highBP: [null, Validators.required],
    });
  }
}
