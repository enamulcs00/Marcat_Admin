
import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function MoreThan(firstControlName: string, secondControlName: string) {
    return (formGroup: FormGroup) => {
        const firstcontrol = formGroup.controls[firstControlName];
        const secondControl = formGroup.controls[secondControlName];

        if (secondControl.errors && !secondControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (firstcontrol.value < secondControl.value) {
            secondControl.setErrors({ moreThan: true });
        } else {
            secondControl.setErrors(null);
        }
    }
}