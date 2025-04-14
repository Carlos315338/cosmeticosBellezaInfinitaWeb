// app/dashboard/page.tsx
"use client";

import CardMetric from "../ui/CardMetric";
import CardResumen from "../ui/CardResumen";
import CurrentTime from "../ui/CurrentTime";

export default function DashboardPage() {
  return (
      
        <div className="container">
          <div className="row my-2">
            <h1 className="col-8 text-start">Inicio</h1>
            <CurrentTime />
          </div>
          <div className="row">
            <CardMetric title="Empleados" value="5" image="/team.png" />
            <CardMetric title="Productos" value="800" image="/products.png" />
            <CardMetric title="Categorías" value="55" image="/checklist.png" />
            <CardMetric title="Clientes" value="200" image="/client.png" />
            <CardMetric title="Proveedores" value="77" image="/control.png" />
            <CardMetric title="Comprobantes" value="8" image="/bill.png" />
            <CardMetric title="Descuentos" value="63" image="/discount.png" />
            <CardMetric title="Devoluciones" value="1" image="/return.png" />
          </div>

          <div className="row">
            <CardResumen
              title="Compras"
              label="Compras:"
              value="5"
              amount="$200.000"
              image="/supply-chain.png"
              variant="compras"
            />
            <CardResumen
              title="Ventas"
              label="Ventas:"
              value="15"
              amount="$700.000"
              image="/cash.png"
              variant="ventas"
            />
          </div>
        </div>
      
  );
}
