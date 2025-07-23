import { Component, ComponentRef, TemplateRef, ViewContainerRef, viewChild, inputBinding, signal, twoWayBinding } from "@angular/core";
import { WidgetComponent } from "./widget/widget.component";
import { WeatherContentComponent } from "./widget/weather-content.component";
import { NgIf } from "@angular/common";



@Component({
  selector: "app-root",
  standalone: true,
  template: `
    <img class="logo" src="./logo.svg" alt="Decoded Frontend" />
    <h1 class="page-title">Dynamic Components</h1> 
    <label for="collapse">Collapse</label>
<input
  type="checkbox"
  id="collapse"
  [checked]="compactMode()"
  (change)="toggleCompactMode($event)"
/>
<ng-template #content>
  <ng-container *ngIf="!compactMode()">
    <app-weather-content />
  </ng-container>
</ng-template>

    <main id="content">
      <ng-container #container></ng-container>
      <section class="toolbar">
        <button (click)="createComponent()" class="create">Create Component</button>
        <button (click)="destroyComponent()" class="destroy">Destroy Component</button>
      </section>
    </main>
  `,
  imports: [WeatherContentComponent, NgIf]
})
export class AppComponent {
  vcr = viewChild('container', { read: ViewContainerRef });
  compactMode = signal(false);
  content = viewChild<TemplateRef<unknown>>('content')
  #componentRef?: ComponentRef<WidgetComponent>;
  // createComponent() {
  //   this.vcr()?.clear()
  //   const contenView = this.vcr()?.createEmbeddedView(this.content()!)
  //   this.#componentRef = this.vcr()?.createComponent(WidgetComponent,{
  //     projectableNodes: [contenView?.rootNodes!],
  //   })
  //   this.#componentRef?.setInput('title', 'Weather')
  //   this.#componentRef?.setInput('description', 'current weather in tbilisi')
  //   this.#componentRef?.instance.closed.subscribe(() => {
  //     this.#componentRef?.destroy();
  //   })
  // }
  createComponent() {
    this.vcr()?.clear()
    const contenView = this.vcr()?.createEmbeddedView(this.content()!)
    this.#componentRef = this.vcr()?.createComponent(WidgetComponent, {
      projectableNodes: [contenView?.rootNodes!],
      bindings: [
        inputBinding('title', () => 'my title'),
        inputBinding('description', () => 'my desc'),
        twoWayBinding('collapsed', this.compactMode)
      ]
    })
    this.#componentRef?.instance.closed.subscribe(() => {
      this.#componentRef?.destroy();
    })
  }
  destroyComponent() {
    this.vcr()?.clear()
  }

  protected toggleCompactMode(e: Event) {
    this.compactMode.update(value => !value);
  }
}
