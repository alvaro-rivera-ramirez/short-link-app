import { NgModule } from '@angular/core';

import { HeadingSectionComponent } from './components';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  imports: [],
  exports: [HeadingSectionComponent,FooterComponent],
  declarations: [HeadingSectionComponent, FooterComponent],
  providers: [],
})
export class ShareModule { }
