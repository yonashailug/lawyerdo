import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class InputBinderService {
  constructor() {}

  setInputData(data: any, form: any) {
    form.get(data.name)?.patchValue(data.value);
    console.log(form.value, data.name, data.value);
  }
}
