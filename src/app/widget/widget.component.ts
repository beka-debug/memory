import { Component, input, output, model } from "@angular/core";

@Component({
  selector: "app-widget",
  standalone: true,
  template: `
    <div class="widget-header">
      <div class="widget-title">{{ title() }}</div>
      <div class="widget-sub-title">{{ description() }}</div>
      <button class="action" (click)="closed.emit()">close</button>
    </div>
    <div class="widget-content">
      <ng-content>
        <p class="no-content">No content...</p>
      </ng-content>
    </div>
  `,
})
export class WidgetComponent {
  title = input("__Widget__");
  description = input("__Widget description__");
  collapsed = model(false)

  closed = output<void>();
}
