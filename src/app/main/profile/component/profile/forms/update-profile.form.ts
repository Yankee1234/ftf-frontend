import { FormControl, FormGroup, Validators } from '@angular/forms';

export let form = new FormGroup({
  userName: new FormControl('', Validators.required),
});
