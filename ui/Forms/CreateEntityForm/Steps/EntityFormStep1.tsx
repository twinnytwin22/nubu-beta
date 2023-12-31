'use client'
import React from 'react'
import useEntityFormStore from '../store';


    export const renderStep1 = () => {
        const {
            entityName, 
            setEntityName, 
            addressLine1, 
            setAddressLine1, 
            addressLine2, 
            setAddressLine2,
            city, 
            setCity, 
            state,
            setState,
            postalCode, 
            setPostalCode,
            description, 
            setDescription,
            handleChangeStep,
            handleFormSubmit
        } = useEntityFormStore()
        
        return (
            <div className="bg-white dark:bg-black  h-fit w-full max-w-3xl mx-auto rounded-md border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="p-8 mx-auto w-full">
                    <h2 className="mb-4 text-xl font-bold text-zinc-900 dark:text-white">Tell us about your business.</h2>
                    <form onSubmit={handleFormSubmit}>
                        <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                            <div className="sm:col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white">Entity Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-zinc-600 focus:border-zinc-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-zinc-500 dark:focus:border-zinc-500"
                                    value={entityName}
                                    onChange={(e) => setEntityName(e.target.value)}
                                    placeholder="Type entity name"
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="addressLine1" className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white">Address Line 1</label>
                                <input
                                    type="text"
                                    name="addressLine1"
                                    id="addressLine1"
                                    className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-zinc-600 focus:border-zinc-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-zinc-500 dark:focus:border-zinc-500"
                                    value={addressLine1}
                                    onChange={(e) => setAddressLine1(e.target.value)}
                                    placeholder="Address line 1"
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="addressLine2" className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white">Address Line 2</label>
                                <input
                                    type="text"
                                    name="addressLine2"
                                    id="addressLine2"
                                    className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-zinc-600 focus:border-zinc-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-zinc-500 dark:focus:border-zinc-500"
                                    value={addressLine2}
                                    onChange={(e) => setAddressLine2(e.target.value)}
                                    placeholder="Address line 2"
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="city" className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-zinc-600 focus:border-zinc-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-zinc-500 dark:focus:border-zinc-500"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder="City"
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="state" className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    id="state"
                                    className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-zinc-600 focus:border-zinc-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-zinc-500 dark:focus:border-zinc-500"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    placeholder="State"
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="postalCode" className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white">Postal Code</label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    id="postalCode"
                                    className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-zinc-600 focus:border-zinc-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-zinc-500 dark:focus:border-zinc-500"
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    placeholder="Postal code"
                                    required
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white">Description</label>
                                <textarea
                                    value={description}
                                    id="description"
                                    rows={8}
                                    className="block p-2.5 w-full text-sm text-zinc-900 bg-zinc-50 rounded-lg border border-zinc-300 focus:ring-zinc-500 focus:border-zinc-500 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-zinc-500 dark:focus:border-zinc-500"
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Write a entity description here..."
                                />
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                type="button"
                                onClick={() => handleChangeStep(2)}
                                className="text-white duration-300 ease-in-out bg-teal-800 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:focus:ring-zinc-800"
                            >
                                Next
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };