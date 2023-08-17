'use client'
import React, { useContext } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteModal from "./DeleteModal";
import { useInvoiceContext } from "@/app/context/invoice";

export default function InvoiceForm() {
    const {
        description,
        setDescription,
        quantity,
        setQuantity,
        price,
        setPrice,
        amount,
        list,
        total,
        isEditing,
        showModal,
        setShowModal,
        handleSubmit,
        editRow,
    } = useInvoiceContext();

    return (
        <div className="border p-8 rounded-md mt-20 border-zinc-300 dark:border-zinc-900">
            <ToastContainer position="top-right" theme="colored" />

            <form onSubmit={handleSubmit} className="mt-8">
                <div className="flex flex-col">
                    <label htmlFor="description" className="text-gray-800 dark:text-white font-bold pb-2">
                        Item description
                    </label>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        placeholder="Item description"
                        value={description}
                        onChange={(e: any) => setDescription(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>

                <div className="grid grid-cols-3 gap-10 mt-6">
                    <div className="flex flex-col">
                        <label htmlFor="quantity" className="text-gray-800 dark:text-white font-bold pb-2">
                            Quantity
                        </label>
                        <input
                            type="text"
                            name="quantity"
                            id="quantity"
                            placeholder="Quantity"
                            value={quantity}
                            onChange={(e: any) => setQuantity(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="price" className="text-gray-800 dark:text-white font-bold pb-2">
                            Price
                        </label>
                        <input
                            type="text"
                            name="price"
                            id="price"
                            placeholder="Price"
                            value={price}
                            onChange={(e: any) => setPrice(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>

                    <div className="flex flex-col items">
                        <label htmlFor="amount" className="text-gray-800 dark:text-white font-bold pb-2">
                            Amount
                        </label>
                        <p className="mt-2">{amount}</p>
                    </div>
                </div>
                <button
                    type="submit"
                    className="btn-primary mt-6"
                >
                    {isEditing ? "Finish Editing" : <div className="flex gap-2"><div className="items-center bg-black rounded-md text-white w-6 h-6">+</div>Table Item</div>}
                </button>
            </form>

            {/* Table items */}

            <table width="100%" className="mt-10 mb-10 overflow-auto">
                <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800 p-1">
                        <td className="font-bold text-gray-800 dark:text-white">Description</td>
                        <td className="font-bold text-gray-800 dark:text-white">Quantity</td>
                        <td className="font-bold text-gray-800 dark:text-white">Price</td>
                        <td className="font-bold text-gray-800 dark:text-white">Amount</td>
                    </tr>
                </thead>
                <tbody>
                    {list.map(({ id, description, quantity, price, amount }) => (
                        <tr key={id} className="h-10">
                            <td className="text-gray-800 dark:text-white">{description}</td>
                            <td className="text-gray-800 dark:text-white">{quantity}</td>
                            <td className="text-gray-800 dark:text-white">{price}</td>
                            <td className="amount text-gray-800 dark:text-white">{amount}</td>
                            <td>
                                <button onClick={() => editRow(id)}>
                                    <AiOutlineEdit className="text-green-500 font-bold text-xl" />
                                </button>
                            </td>
                            <td>
                                <button onClick={() => setShowModal(true)}>
                                    <AiOutlineDelete className="text-red-500 font-bold text-xl" />
                                </button>
                                {showModal && <DeleteModal id={id} />}

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <h2 className="flex items-end justify-end text-gray-800 dark:text-white text-4xl font-bold">
                    ${total.toLocaleString()}
                </h2>
            </div>

        </div>
    );
}
