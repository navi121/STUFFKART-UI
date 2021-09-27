import { Component, OnInit } from '@angular/core';
import { AddItem } from '../shared/user.model';
import { NgForm } from '@angular/forms';
import { DashBoardService } from '../shared/dash-board.service';

@Component({
  selector: 'app-adminupload',
  templateUrl: './adminupload.component.html',
  styleUrls: ['./adminupload.component.css']
})
export class AdminuploadComponent implements OnInit {
  public additem: AddItem;
  public files: File;
  public constructor(private dashBoardService: DashBoardService) { }

  public ngOnInit(): void {
    this.resetForm();
  }

  public imgUpload(event: any) {
    this.files = event.target.files[0];
  }
  
  public resetForm(form?: NgForm) {
    if (form != null)
      form.reset;
  }

  public async OnSubmit(form: NgForm): Promise<void> {
    this.additem=form.value;
    this.dashBoardService.addproduct(form.value)
      .subscribe((response: any) => {
        this.dashBoardService.uploadImages(response, this.files)
          .subscribe(() => {
            this.resetForm(form);
          })
      });
  }
}
