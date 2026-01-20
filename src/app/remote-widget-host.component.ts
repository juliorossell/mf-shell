import { ChangeDetectorRef, Component, Input, Type } from '@angular/core';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { loadRemoteModule } from '@angular-architects/native-federation';

@Component({
  selector: 'app-remote-widget-host',
  imports: [NgComponentOutlet, CommonModule],
  templateUrl: './remote-widget-host.component.html',
  styleUrls: ['./remote-widget-host.component.scss'],
})
export class RemoteWidgetHostComponent {
  @Input() remoteName!: string;
  @Input() exposedModule!: string;
  @Input() exportName!: string;

  cmp?: Type<unknown>;

  constructor(private cd: ChangeDetectorRef) {}

  async ngOnInit() {
    try {
      console.log(`Loading remote module: ${this.remoteName}/${this.exposedModule}`);
      const m = await loadRemoteModule(this.remoteName, this.exposedModule);
      console.log('Remote module loaded:', m);
      this.cmp = m[this.exportName] as Type<unknown>;
      console.log('Component found:', this.cmp);
      this.cd.detectChanges();
    } catch (error) {
      console.error(`Failed to load remote module ${this.remoteName}:`, error);
    }
  }
}
