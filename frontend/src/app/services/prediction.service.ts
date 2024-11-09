import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, from, map, Observable, switchMap } from 'rxjs';

type PredictionResponse = {
  data: number;
};
type PredictionPayload = {
  age: number;
  sex: number;
  highChol: number;
  cholCheck: number;
  bmi: number;
  smoker: number;
  heartDiseaseOrAttack: number;
  physActivity: number;
  fruits: number;
  veggies: number;
  hvyAlcoholConsump: number;
  genHlth: number;
  mentHlth: number;
  physHlth: number;
  diffWalk: number;
  stroke: number;
  highBP: number;
};

@Injectable({
  providedIn: 'root',
})
export class PredictionService {
  private _http = inject(HttpClient);

  constructor() {}

  private capitalizeKeys(payload: PredictionPayload): any {
    const result: any = {};
    Object.keys(payload).forEach((key) => {
      result[key.toUpperCase()] = payload[key as keyof PredictionPayload];
    });
    return result;
  }

  getPrediction = (payload: PredictionPayload): Observable<number> => {
    const apiUrl = 'http://localhost:5000/pred';

    return from([payload]).pipe(
      map((payload) => this.capitalizeKeys(payload)),
      switchMap((payload) =>
        this._http.post<PredictionResponse>(apiUrl, payload)
      ),
      map((response) => response.data),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  };
}
