import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BusOrchestratorService } from '../bus-orchestrator.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('shell');

  constructor(private bus: BusOrchestratorService) {}
  ngOnInit() {
    this.bus.init();
  }
}
