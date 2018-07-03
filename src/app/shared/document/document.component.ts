import {Component, Input, EventEmitter} from "@angular/core";
import {AppService} from "../../app.service";
import {Output} from "@angular/core";
/**
 * Created by perezom on 24/01/2018.
 */

@Component({
  selector: 'document',
  templateUrl:'./document.component.html',
  styleUrls:['./document.component.css']
})
export class DocumentComponent {

  @Input()
  public dataFlag: boolean;
  @Input()
  public document: any;

  public moreLikeThisDocs: Array<any>;
  public moreLikeThisFlag: boolean = false;

  @Output()
  public documentEmmit : EventEmitter<any> = new EventEmitter();


  constructor(private service: AppService){};



  searchRelatedDocuments() {
    this.moreLikeThisFlag = !this.moreLikeThisFlag;
    if(!this.moreLikeThisDocs){
      this.service.getMoreLikeThisData(this.document, this.dataFlag).subscribe(res => {
        this.moreLikeThisDocs = res.response.docs;
        console.log(this.moreLikeThisDocs);
      });
    } else{
      console.log(this.moreLikeThisDocs);
    }

  }

  emitRelevantDocument(doc: any){
    this.documentEmmit.emit(doc);
  }


}
