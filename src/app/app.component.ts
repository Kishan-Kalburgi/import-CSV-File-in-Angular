import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular';
  // @ViewChild('fileImportInput') fileImportInput: any;

  public csvRecords: any[] = [];
  @ViewChild('fileImportInput') fileImportInput: any;
  fileChangeListener($event: any): void {
    var files = $event.srcElement.files;
    if (files[0].name.endsWith('.csv')) {
      var input = $event.target;
      var reader = new FileReader();
      reader.readAsText(input.files[0]);
      reader.onload = (data) => {
        let csvData = reader.result;
        let csvRecordsArray = (csvData as string).split(/\r\n|\n/);
        for (let i = 0; i < csvRecordsArray.length; i++) {
          let rowdata = csvRecordsArray[i].match(/(“[^”]*”)|[^,]+/g);
          this.csvRecords.push(rowdata);
        }
      };
      reader.onerror = function () {
        alert(`Unable to read ` + input.files[0]);
      };
    } else {
      alert(`Please import valid .csv file.`);
      this.fileImportInput.nativeElement.value = '';
      this.csvRecords = [];
    }
  }
}
