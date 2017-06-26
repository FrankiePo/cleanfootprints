import { FormGroup, ValidatorFn } from '@angular/forms';

export function equalValidator(firstKey: string, secondKey: string): ValidatorFn {
  return (group: FormGroup): { [key: string]: any } => {
    const first = group.get(firstKey).value;
    const second = group.get(secondKey).value;
    return first === second ? null : { equalValidator: {firstKey, secondKey} };
  }
}
