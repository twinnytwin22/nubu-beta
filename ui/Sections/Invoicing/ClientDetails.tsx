'use client'
import { useInvoiceContext } from "@/app/context/invoice";

export default function ClientDetails() {
    const { clientName, clientAddress } = useInvoiceContext();

    return (
        <>
            <section className="mt-10">
                <h2 className="text-2xl uppercase font-bold mb-1">{clientName}</h2>
                <p>{clientAddress}</p>
            </section>
        </>
    );
}