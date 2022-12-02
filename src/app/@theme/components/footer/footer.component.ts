import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Personalizado por Andres Prieto <br/>
      Created with ♥ by <b><a href="https://akveo.page.link/8V2f" target="_blank">Akveo</a></b> 2019
    </span>
    <div class="socials">
      MisionTIC 2022 - UNAL
    </div>
  `,
})
export class FooterComponent {
}
