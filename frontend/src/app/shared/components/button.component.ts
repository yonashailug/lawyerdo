import { Component, Input, OnInit } from '@angular/core';
import { buttonVariants } from '../../utils'

@Component({
  selector: 'app-button',
  template: `
    <button
      type="button"
      [ngClass]="[variant]"
      class="button inline-flex items-center justify-center h-8 align-middle
    leading-none whitespace-no-wrap rounded-sm transition-all pl-2
      duration-100 appearance-none cursor-pointer select-none px-3"

      :disabled="disabled"
      [ngStyle]="getButtonStyles()"
      :style="getButtonStyles"
    >

      <div>
        <ng-content></ng-content>
      </div>
    </button>
  `,
  styles: [`
  .primary,
  .success,
  .danger,
  .info,
  .warning {
    color: white;
    font-weight: 500;
    background: var(--bg-variant);
  }

  .secondary {
    background-color: rgb(190 195 199);
    color: white;
  }
  .empty {
    background: white;
    outline: none;
  }

  .big {
    height: 2.5rem !important;
  }

  .small {
    width: 6rem;
  }
`]
})
export class ButtonComponent implements OnInit {

  @Input() variant: string = 'primary'
  constructor() { }

  ngOnInit(): void {
  }

  getButtonStyles() {
    const color = buttonVariants[this.variant as keyof Object];
    return {
      '--bg-variant': color,
      // '--bg-variant-dark': tuneColor.darken(color, 0.1),
      // '--bg-variant-light': tuneColor.lighten(color, 0.15),
      '--primary': buttonVariants.primary
    };
  }
}
