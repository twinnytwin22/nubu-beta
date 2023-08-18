'use client'
import React, { createContext, useEffect, useRef, useState, useContext } from "react";
import { toast } from "react-toastify";
import collect from "collect.js";

interface InvoiceContextProps {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    address: string;
    setAddress: React.Dispatch<React.SetStateAction<string>>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    phone: string;
    setPhone: React.Dispatch<React.SetStateAction<string>>;
    bankName: string;
    setBankName: React.Dispatch<React.SetStateAction<string>>;
    bankAccount: string;
    setBankAccount: React.Dispatch<React.SetStateAction<string>>;
    website: string;
    setWebsite: React.Dispatch<React.SetStateAction<string>>;
    clientName: string;
    setClientName: React.Dispatch<React.SetStateAction<string>>;
    clientAddress: string;
    setClientAddress: React.Dispatch<React.SetStateAction<string>>;
    invoiceNumber: string;
    setInvoiceNumber: React.Dispatch<React.SetStateAction<string>>;
    invoiceDate: string;
    setInvoiceDate: React.Dispatch<React.SetStateAction<string>>;
    dueDate: string;
    setDueDate: React.Dispatch<React.SetStateAction<string>>;
    notes: string;
    setNotes: React.Dispatch<React.SetStateAction<string>>;
    description: string;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    quantity: number;
    setQuantity: React.Dispatch<React.SetStateAction<number>>;
    price: number;
    setPrice: React.Dispatch<React.SetStateAction<number>>;
    amount: number;
    setAmount: React.Dispatch<React.SetStateAction<number>>;
    list: any[];
    setList: React.Dispatch<React.SetStateAction<any[]>>;
    total: any;
    setTotal: React.Dispatch<React.SetStateAction<any>>;
    width: number;
    componentRef: React.MutableRefObject<any>;
   // handlePrint: () => void;
    isEditing: boolean;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    handleSubmit: (e: React.FormEvent) => void;
    editRow: (id: string) => void;
    deleteRow: (id: string) => void;
    showLogoutModal: boolean;
    setShowLogoutModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const InvoiceContext = createContext<InvoiceContextProps>({} as InvoiceContextProps);
export const useInvoiceContext = () => useContext(InvoiceContext);


export default function InvoiceContextProvider({ children }) {
    const [name, setName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [bankName, setBankName] = useState<string>('');
    const [bankAccount, setBankAccount] = useState<string>('');
    const [website, setWebsite] = useState<string>('');
    const [clientName, setClientName] = useState<string>('');
    const [clientAddress, setClientAddress] = useState<string>('');
    const [invoiceNumber, setInvoiceNumber] = useState<string>('');
    const [invoiceDate, setInvoiceDate] = useState<string>('');
    const [dueDate, setDueDate] = useState<string>('');
    const [notes, setNotes] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [amount, setAmount] = useState<number>(0);
    const [list, setList] = useState<any[]>([]);
    const [total, setTotal] = useState<any>(0);
    const [width] = useState<number>(641);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);

    const componentRef = useRef<any>();

    const handlePrint = () => {
        window.print();
    };

    useEffect(() => {
        if (window.innerWidth < width) {
            console.log("Place your phone in landscape mode for the best experience");
        }
    }, [width]);

    // Submit form function
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!description || !quantity || !price) {
            toast.error("Please fill in all inputs");
        } else {
            const newItems = {
                description,
                quantity,
                price,
                amount,
            };
            setDescription("");
            setQuantity(0);
            setPrice(0);
            setAmount(0);
            setList([...list, newItems]);
            setIsEditing(false);
            console.log(list);
        }
    };

    // Calculate items amount function
    useEffect(() => {
        const calculateAmount = () => {
            setAmount(quantity * price);
        };

        calculateAmount();
    }, [amount, price, quantity, setAmount]);

    const calculateTotal = () => {
        const allItems = list.map((item) => item.price);

        setTotal(collect(allItems.map(Number)).sum());
    };


    useEffect(() => {
        calculateTotal();
    }, [list]);

    // Edit function
    const editRow = (id: string) => {
        const editingRow = list.find((row) => row.id === id);
        setList(list.filter((row) => row.id !== id));
        setIsEditing(true);
        setDescription(editingRow.description);
        setQuantity(editingRow.quantity);
        setPrice(editingRow.price);
    };

    // Delete function
    const deleteRow = (id: string) => {
        setList(list.filter((row) => row.id !== id));
        // CalcSum();
        setShowModal(false);
    };

    const context = {
        name,
        setName,
        address,
        setAddress,
        email,
        setEmail,
        phone,
        setPhone,
        bankName,
        setBankName,
        bankAccount,
        setBankAccount,
        website,
        setWebsite,
        clientName,
        setClientName,
        clientAddress,
        setClientAddress,
        invoiceNumber,
        setInvoiceNumber,
        invoiceDate,
        setInvoiceDate,
        dueDate,
        setDueDate,
        notes,
        setNotes,
        description,
        setDescription,
        quantity,
        setQuantity,
        price,
        setPrice,
        amount,
        setAmount,
        list,
        setList,
        total,
        setTotal,
        width,
        componentRef,
      //  handlePrint,
        isEditing,
        setIsEditing,
        showModal,
        setShowModal,
        handleSubmit,
        editRow,
        deleteRow,
        showLogoutModal,
        setShowLogoutModal,
    };

    return <InvoiceContext.Provider value={context}>{children}</InvoiceContext.Provider>;
}
