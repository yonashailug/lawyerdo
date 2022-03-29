import { Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
  selector: 'app-icon',
  template: `
    <svg [style]="iconStyles()">
      <use
        xmlns:xlink="http://www.w3.org/1999/xlink"
        [attr.xlink:href]="'#' + name"></use>
    </svg>
  `,
  styles: [``],
})
export class IconComponent {

  @Input() name: string = ''
  @Input() size: number = 16
  @Input() fill: string = 'currentColor'
  constructor() {}

  iconStyles() {
    return {
      width: `${this.size}px`,
      height: `${this.size}px`,
      fill: this.fill,
      // ...(this.fill !== 'currentColor' ? { color: this.fill }: null),
    }
  }
}
