import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { DragDropDirective } from './drag-drop.directive';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { IdbService } from './idb.service';
import { APP_INITIALIZER } from '@angular/core';



@NgModule({
  declarations: [
    AppComponent,
    DragDropDirective,
    UploadFileComponent
  ],
  imports: [
    BrowserModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {provide: APP_INITIALIZER,
      useFactory: (idb: IdbService) => () => idb.connectToIDB(),
      deps: [IdbService],
      multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
