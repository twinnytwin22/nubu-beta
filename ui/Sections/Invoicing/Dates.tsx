'use client'

import { useInvoiceContext } from "@/app/context/invoice";

export default function Dates() {
    const { invoiceNumber, invoiceDate, dueDate } = useInvoiceContext();

    return (
        <>
            <article className="mt-10 mb-14 flex items-end justify-end">
                <ul>
                    <li className="p-1 ">
                        <span className="font-bold">Invoice #:</span> {invoiceNumber}
                    </li>
                    <li className="p-1 bg-gray-100">
                        <span className="font-bold">Invoice date:</span> {invoiceDate}
                    </li>
                    <li className="p-1 ">
                        <span className="font-bold">Due date:</span> {dueDate}
                    </li>
                </ul>
            </article>
        </>
    );
}