import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LivebroadcastPage } from './livebroadcast';

@NgModule({
  declarations: [
    LivebroadcastPage,
  ],
  imports: [
    IonicPageModule.forChild(LivebroadcastPage),
  ],
})
export class LivebroadcastPageModule {}
