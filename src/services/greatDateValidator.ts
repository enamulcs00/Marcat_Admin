import { FormGroup } from '@angular/forms';
import * as moment from 'moment';

// custom validator to check that two fields match
export function GreaterDateMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {

        const startDateFinal = moment(controlName).format('YYYY-MM-DD');
        const endDateFinal = moment(matchingControlName).format('YYYY-MM-DD');
        //   var startFullDate = new Date(startyear + startMonth + startDate)
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (startDateFinal >= endDateFinal) {
            matchingControl.setErrors({ dateGreater: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}