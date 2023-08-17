'use client'
import React, { useContext } from "react";
import { useInvoiceContext } from "@/app/context/invoice";

export default function SummaryTable() {
    const { list, total } = useInvoiceContext();

    return (
        <div className="border p-8 rounded-md mt-20 border-zinc-300 dark:border-zinc-900">
            <table width="100%" className="mb-10">
                <thead>
                    <tr className="bg-gray-100 p-1 text-base">
                        <td className="font-bold">Description</td>
                        <td className="font-bold">Quantity</td>
                        <td className="font-bold">Price</td>
                        <td className="font-bold">Amount</td>
                    </tr>
                </thead>
                {list.map(({ id, description, quantity, price, amount }) => (
                    <div key={id}>
                        <tbody>
                            <tr className="h-10">
                                <td>{description}</td>
                                <td>{quantity}</td>
                                <td>{price}</td>
                                <td>{amount}</td>
                            </tr>
                        </tbody>
                    </div>
                ))}
            </table>

            <div>
                <h2 className="flex items-end justify-end text-gray-800 text-4xl font-bold">
                    ${total.toLocaleString()}
                </h2>
            </div>
        </div>
    );
}