import { NgModule } from '@angular/core';

import { MatInputModule, MatFormFieldModule } from '@angular/material';

@NgModule({
  imports: [MatFormFieldModule, MatInputModule],
  exports: [MatFormFieldModule, MatInputModule],
  providers: [],
})
export class MaterialModule {}
