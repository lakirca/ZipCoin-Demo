import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'zkoin-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(
    private renderer: Renderer2,
    
  ){
    this.addJsToElement("../../../assets/js/customjquery.js");
  }
  
  
  ngOnInit(){
  }
  
  
  addJsToElement(src: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    this.renderer.appendChild(document.body, script);
    return script;
  }
}
