import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddChatPage } from './add-chat';

@NgModule({
  declarations: [
    AddChatPage,
  ],
  imports: [
    IonicPageModule.forChild(AddChatPage),
  ],
})
export class AddChatPageModule {}
