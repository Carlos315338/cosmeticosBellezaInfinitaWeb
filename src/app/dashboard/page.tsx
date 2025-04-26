"use client";

import { useEffect, useState } from "react";
import CardMetric from "../ui/CardMetric";
import CardResumen from "../ui/CardResumen";
import CurrentTime from "../ui/CurrentTime";
import { finanzaService } from "@/services/finanza/finanzaServices";
import { usuarioService } from "@/services/usuarios/usuarioService";
import { productoService } from "@/services/productos/productoServices";

export default function DashboardPage() {

    const [cantidadClientes, setCantidadClientes] = useState(0);
    const [cantidadEmpleados, setCantidadEmpleados] = useState(0);
    const [cantidadProductos, setCantidadProductos] = useState(0);
    const [cantidadCategorias, setCantidadCategorias] = useState(0);
    const [cantidadProveedores, setCantidadProveedores] = useState(0);
    const [cantidadComprovantes, setCantidadComprovantes] = useState(0);
    const [cantidadDescuentos, setCantidadDescuentos] = useState(0);
    const [cantidadDevoluciones, setCantidadDevoluciones] = useState(0);

    const [cantidadCantidadCompras, setCantidadCompras] = useState(0);
    const [cantidadTotalCompras, setTotalCompras] = useState(0);

    const [cantidadCantidadVentas, setCantidadVentas] = useState(0);
    const [cantidadTotalVentas, setTotalVentas] = useState(0);

    const formateadorCantidad = new Intl.NumberFormat("es-CO", {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        useGrouping: true,
    });

    const formateadorPesos = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 2,
    });


    useEffect(() => {
        obtenerMetricas();
        obtenerResumen();
    }, []);

    const obtenerMetricas = async () => {

        const resObtenerCantidadCliente = await finanzaService.obtenerCantidadClientes();
        setCantidadClientes(resObtenerCantidadCliente);

        const resObtenerCantidadEmpleados = await usuarioService.obtenerCantidadUsuarios();
        setCantidadEmpleados(resObtenerCantidadEmpleados);

        const resObtenerCantidadProductos = await productoService.obtenerCantidadProductos();
        setCantidadProductos(resObtenerCantidadProductos);

        const resObtenerCantidadCategorias = await productoService.obtenerCantidadCategoria();
        setCantidadCategorias(resObtenerCantidadCategorias);

        const resObtenerCantidadProveedores = await productoService.obtenerCantidadProveedores();
        setCantidadProveedores(resObtenerCantidadProveedores);

        const resObtenerCantidadComprovantes = await usuarioService.obtenerCantidadUsuarios();
        setCantidadComprovantes(resObtenerCantidadComprovantes);

        const resObtenerCantidadDescuentos = await usuarioService.obtenerCantidadUsuarios();
        setCantidadDescuentos(resObtenerCantidadDescuentos);

        const resObtenerCantidadDevoluciones = await usuarioService.obtenerCantidadUsuarios();
        setCantidadDevoluciones(resObtenerCantidadDevoluciones);

    };

    const obtenerResumen = async () => {

        const resObtenerCantidadDescuentos = await usuarioService.obtenerCantidadUsuarios();
        setCantidadDescuentos(resObtenerCantidadDescuentos);

        const resObtenerCantidadDevoluciones = await usuarioService.obtenerCantidadUsuarios();
        setCantidadDevoluciones(resObtenerCantidadDevoluciones);

    }

    return (
        <div className="container">
            <div className="row my-2">
                <h1 className="col-8 text-start text-purple">Inicio</h1>
                <CurrentTime />
            </div>
            <div className="row">
                <CardMetric title="Empleados" value={cantidadEmpleados} image="/team.png" />
                <CardMetric title="Productos" value={cantidadProductos} image="/products.png" />
                <CardMetric title="Categorías" value={cantidadCategorias} image="/checklist.png" />
                <CardMetric title="Clientes" value={cantidadClientes} image="/client.png" />
                <CardMetric title="Proveedores" value={cantidadProveedores} image="/control.png" />
                <CardMetric title="Comprobantes" value={cantidadComprovantes} image="/bill.png" />
                <CardMetric title="Descuentos" value={cantidadDescuentos} image="/discount.png" />
                <CardMetric title="Devoluciones" value={cantidadDevoluciones} image="/return.png" />
            </div>

            <div className="row">
                <CardResumen
                    title="Compras"
                    label="Compras:"
                    value={formateadorCantidad.format(cantidadCantidadCompras)}
                    amount={formateadorPesos.format(cantidadTotalCompras)}
                    image="/supply-chain.png"
                    variant="compras"
                />
                <CardResumen
                    title="Ventas"
                    label="Ventas:"
                    value={formateadorCantidad.format(cantidadCantidadVentas)}
                    amount={formateadorPesos.format(cantidadTotalVentas)}
                    image="/cash.png"
                    variant="ventas"
                />
            </div>
        </div>
    );
}
