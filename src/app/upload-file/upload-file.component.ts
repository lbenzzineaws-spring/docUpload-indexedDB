import { Component} from '@angular/core';
import { IdbService } from '../idb.service';
import { ObjectFile } from '../model/ObjectFile';


@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent  {

  constructor(private idbService: IdbService){}

  files: any = [];
  myFile: ObjectFile;
  // tslint:disable-next-line:no-inferrable-types
  text: string = '';
  // tslint:disable-next-line:prefer-const
  // tslint:disable-next-line:align


  // tslint:disable-next-line:typedef
  // tslint:disable-next-line:semicolon
  // tslint:disable-next-line:typedef
  uploadFile(event) {
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element.name);
      this.myFile = new ObjectFile();
      this.myFile.name = element.name;
      this.myFile.size = element.size;
      this.myFile.content = this.readFile(element);
      console.log('the content of the file is : ' + this.myFile.content)  ;
      this.idbService.addItems('Files', this.myFile);

    }
  }
  // tslint:disable-next-line:typedef
  deleteAttachment(index) {
    this.files.splice(index, 1);
    console.log('the index is : ' + index);
    this.myFile = new ObjectFile();
    // this.myFile.name = this.files[index].name;
    console.log('the namew of the traget file is : ' + this.files[index].name);
    this.myFile = this.idbService.getItem('Files',  this.myFile.name);
    this.idbService.deleteItems('Files', this.myFile);
  }

  // tslint:disable-next-line:typedef
  readFile(file: File) {
    // tslint:disable-next-line:prefer-const
      let reader = new FileReader();
      reader.onload = () => {
      this.text = reader.result.toString();
      };
      reader.readAsText(file);
      return this.text;
}
}
