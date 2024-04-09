const express = require('express');
const router = express.Router();
// const SuppliesController = require('../controllers/SuppliesController');
const SuppliesController =require("../controller/suppliesController");
router.post('/addSupplies', SuppliesController.createSupplies);
router.get('/Supplies', SuppliesController.getAllSupplies);
router.get('/Supplies/:id', SuppliesController.getSuppliesById);
router.put('/Supplies/:id', SuppliesController.updateSupplies);
router.delete('/Supplies/:id', SuppliesController.deleteSupplies);

module.exports = router;

// import React, { useState, useEffect } from 'react';
// import { Input } from "@windmill/react-ui";
// import DrawerButton from "components/form/DrawerButton";
// import Error from "components/form/Error";
// import InputArea from "components/form/InputArea";
// import LabelArea from "components/form/LabelArea";
// import Title from "components/form/Title";
// import { Scrollbars } from "react-custom-scrollbars-2";
// import { MultiSelect } from "react-multi-select-component";
// import { useForm } from 'react-hook-form';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from "axios";

// const CreateSupplies = (id) => {
//   const [title, setTitle] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [price, setPrice] = useState("");
//   const [products, setProducts] = useState([]);
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const { register, handleSubmit } = useForm();

//   const onSubmit = async (data) => {
//     const Supplies = {
//       title: data.title,
//       quantity: data.quantity,
//       price: data.price,
//       products: selectedProducts,
//     };
//     try {
//       const response = await fetch("http://localhost:5055/api/supplies/addSupplies", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(Supplies),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to create Supplies");
//       }
//       const responseData = await response.json();
//       toast.success("Supplies created:");
//       console.log("Supplies created:", responseData);
//     } catch (error) {
//       toast.error("Error creating Supplies:");
//       console.error("Error creating Supplies:", error);
//     }
//   };

//   useEffect(() => {
//     // Fetch the products data from the API
//     fetch('http://localhost:5055/api/products')
//       .then(response => response.json())
//       .then(data => setProducts(data.products))
//       .catch(error => console.error('Error fetching products:', error));
//   }, []);

//   return (
//     <>
//       <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 ">
//         <Title
//           title={("Add Supplies")}
//         />
//       </div>
//       <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12">
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
//             <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//               <LabelArea label={("Supplier Name")} />
//               <div className="col-span-8 sm:col-span-4">
//                 <Input
//                   {...register(`title`, {
//                     required: "TItle is required!",
//                   })}
//                   className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
//                   name="title"
//                   type="text"
//                   placeholder={("Supplier Name")}
//                   onChange={(event) => setTitle(event.target.value)}
//                 />
//               </div>
//             </div>
//             <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//               <LabelArea label={("Quantity : ")} />
//               <div className="col-span-8 sm:col-span-4">
//                 <Input
//                   name="quantity"
//                   {...register("quantity")}
//                   type="text"
//                   value={quantity}
//                   placeholder={("20ml")}
//                   onChange={(event) => setQuantity(event.target.value)}
//                   className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
//                 />
//               </div>
//             </div>
//             <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//               <LabelArea label="Price : " />
//               <div className="col-span-8 sm:col-span-4">
//                 <Input
//                   name="price"
//                   {...register("price")}
//                   type="number"
//                   value={price}
//                   placeholder="200$"
//                   maxValue={2000}
//                   minValue={1}
//                   label="Price"
//                   onChange={(event) => setPrice(event.target.value)}
//                   className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
//                 />
//               </div>
//             </div>
//             <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//               <LabelArea label={("Products : ")} />
//               <div className="col-span-8 sm:col-span-4">
//                 <MultiSelect
//                   options={products.map((product) => ({
//                     value: product._id,
//                     label: product.title.en,
//                   }))}
//                   value={selectedProducts}
//                   onChange={setSelectedProducts}
//                   labelledBy="Select"
//                   multi
//                 />
//               </div>
//             </div>
//             <DrawerButton title="supplies" />
//           </div>
//         </form>
//       </Scrollbars>
//     </>
//   );
// };
// export default CreateSupplies;

