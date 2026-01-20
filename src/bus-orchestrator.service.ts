import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { onTopic, publish } from '@shared/mf-bus';
import {
  NotificationItem,
  PaymentStatusChanged,
  RouteRequestPayload,
  Topics,
  UiToastPayload,
} from '@shared/mf-events';

@Injectable({ providedIn: 'root' })
export class BusOrchestratorService {
  constructor(private router: Router) {}

  init() {
    onTopic<RouteRequestPayload>(Topics.RouteRequest).subscribe(({ payload }) => {
      this.router.navigateByUrl(payload.path);
    });

    onTopic<UiToastPayload>(Topics.UiToast).subscribe(({ payload, meta }) => {
      // Aquí conectas tu Design System (snackbar/toast)
      console.log(`[TOAST from ${meta.source}]`, payload.kind, payload.message);
    });

    onTopic<PaymentStatusChanged>(Topics.PaymentsStatusChanged).subscribe(({ payload, meta }) => {
      console.log('Listening to PaymentsStatusChanged in Shell:', payload);
      const item: NotificationItem = {
        id: meta.correlationId ?? crypto.randomUUID(),
        kind:
          payload.status === 'PROCESSING'
            ? 'info'
            : payload.status === 'SUCCESS'
            ? 'success'
            : 'error',
        title:
          payload.status === 'PROCESSING'
            ? 'Procesando tu pago'
            : payload.status === 'SUCCESS'
            ? 'Pago confirmado'
            : 'Pago rechazado',
        message: `Se está procesando su pago por ${payload.payment_amount} ${
          payload.currency
        }. Estado: ${
          payload.status === 'PROCESSING'
            ? 'En proceso'
            : payload.status === 'SUCCESS'
            ? 'Aprobado'
            : 'Fallido'
        }.`,
        imageKey: 'payment',
        createdAt: Date.now(),
        data: { payment_id: payload.payment_id },
      };

      // this.notificationsStore.add(item); // <- clave (persistencia)
      console.log('Publishing shell-payment to notification queue...');
      publish(Topics.NotificationsEnqueue, item, {
        source: 'shell',
        version: '1.0.0',
        correlationId: item.id,
      });
    });
  }
}
