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
    const [loadingClientes, setLoadingClientes] = useState(true);
    const [loadingEmpleados, setLoadingEmpleados] = useState(true);
    const [loadingProductos, setLoadingProductos] = useState(true);
    const [loadingCategorias, setLoadingCategorias] = useState(true);
    const [loadingProveedores, setLoadingProveedores] = useState(true);
    const [loadingComprobantes, setLoadingComprobantes] = useState(true);
    const [loadingDescuentos, setLoadingDescuentos] = useState(true);
    const [loadingDevoluciones, setLoadingDevoluciones] = useState(true);

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
        try {
            const res = await finanzaService.obtenerCantidadClientes();
            setCantidadClientes(res);
        } catch (e) {
            console.error("Error clientes:", e);
        } finally {
            setLoadingClientes(false);
        }

        try {
            const res = await usuarioService.obtenerCantidadUsuarios();
            setCantidadEmpleados(res);
        } catch (e) {
            console.error("Error empleados:", e);
        } finally {
            setLoadingEmpleados(false);
        }

        try {
            const res = await productoService.obtenerCantidadProductos();
            setCantidadProductos(res);
        } catch (e) {
            console.error("Error productos:", e);
        } finally {
            setLoadingProductos(false);
        }

        try {
            const res = await productoService.obtenerCantidadCategoria();
            setCantidadCategorias(res);
        } catch (e) {
            console.error("Error categorías:", e);
        } finally {
            setLoadingCategorias(false);
        }

        try {
            const res = await productoService.obtenerCantidadProveedores();
            setCantidadProveedores(res);
        } catch (e) {
            console.error("Error proveedores:", e);
        } finally {
            setLoadingProveedores(false);
        }

        try {
            const res = await usuarioService.obtenerCantidadUsuarios();
            setCantidadComprovantes(res);
        } catch (e) {
            console.error("Error comprobantes:", e);
        } finally {
            setLoadingComprobantes(false);
        }

        try {
            const res = await usuarioService.obtenerCantidadUsuarios();
            setCantidadDescuentos(res);
        } catch (e) {
            console.error("Error descuentos:", e);
        } finally {
            setLoadingDescuentos(false);
        }

        try {
            const res = await usuarioService.obtenerCantidadUsuarios();
            setCantidadDevoluciones(res);
        } catch (e) {
            console.error("Error devoluciones:", e);
        } finally {
            setLoadingDevoluciones(false);
        }
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
                <CardMetric title="Empleados" value={cantidadEmpleados} image="/team.png" loading={loadingEmpleados} />
                <CardMetric title="Productos" value={cantidadProductos} image="/products.png" loading={loadingProductos} />
                <CardMetric title="Categorías" value={cantidadCategorias} image="/checklist.png" loading={loadingCategorias} />
                <CardMetric title="Clientes" value={cantidadClientes} image="/client.png" loading={loadingClientes} />
                <CardMetric title="Proveedores" value={cantidadProveedores} image="/control.png" loading={loadingProveedores} />
                <CardMetric title="Comprobantes" value={cantidadComprovantes} image="/bill.png" loading={loadingComprobantes} />
                <CardMetric title="Descuentos" value={cantidadDescuentos} image="/discount.png" loading={loadingDescuentos} />
                <CardMetric title="Devoluciones" value={cantidadDevoluciones} image="/return.png" loading={loadingDevoluciones} />
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
