import { useForm } from 'react-hook-form';
import React, { useState, useEffect, useRef } from 'react';
import { Input } from "@windmill/react-ui";
import DrawerButton from "components/form/DrawerButton";
import Error from "components/form/Error";
import InputArea from "components/form/InputArea";
import InputValue from "components/form/InputValue";
import LabelArea from "components/form/LabelArea";
import SwitchToggle from "components/form/SwitchToggle";
import SwitchToggleFour from "components/form/SwitchToggleFour";
import Title from "components/form/Title";
import Uploader from "components/image-uploader/Uploader";
import useCouponSubmit from "hooks/useCouponSubmit";
import { t } from "i18next";
import { Scrollbars } from "react-custom-scrollbars-2";
import { MultiSelect } from "react-multi-select-component";
import ParentCategory from "components/category/ParentCategory";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import axios from "axios";
import TestMap from "components/map/TestMap";
const CreatePurchase = (id,coordinates) => {
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [formData, setFormData] = useState({});
  const { register, handleSubmit } = useForm();
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [pincode, setPincode] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'products') {
      const selectedOptions = Array.from(e.target.selectedOptions);
      const selectedProductsData = selectedOptions.map((option) => {
        const product = products.find((prod) => prod._id === option.value);
        return { value: option.value, label: product ? product.title.en : '' };
      });
      setSelectedProducts(selectedProductsData);
    } else if (name === 'state') {
      setState(value);
    } else if (name === 'pincode') {
      setPincode(value);
    } else if (name === 'city') {
      setCity(value);
    }
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    axios.get('http://localhost:5055/api/products')
      .then(response => {
        setProducts(response.data.products);
      })
      .catch(error => {
        toast.error('Error fetching products:', error);
        console.error('Error fetching products:', error);
      });
  }, []);
  const onSubmit = async (data) => {
    const { title, addressLine, area, status, gst, latitude, longitude } = data;
    const purchase = {
      SellerName: title,
      addressLine,
      area,
      city,
      state,
      pincode,
      products: selectedProducts,
      status,
      gst,
      latitude,
      longitude
    };
    try {
      const response = await axios.post('http://localhost:5055/api/Seller/add', purchase);

      if (response.status === 200) {
        toast.success('Seller created');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        console.log('Purchase created:', response.data);
      }
    } catch (error) {
      toast.error('Error creating Seller');
      console.error('Error creating purchase:', error);
    }
  };

  // useEffect(() => {
  //   const H = window.H;
  //   platform.current = new H.service.Platform({
  //     apikey: 'Jl6ENjAFQcXesu1RImYS-JlVRaYNzhu3Beyu-zY6aPE',
  //   });

  //   map.current = new H.Map(
  //     mapRef.current,
  //     platform.current.createDefaultLayers().vector.normal.map,
  //     {
  //       center: currentPosition,
  //       zoom: 5,
  //       pixelRatio: window.devicePixelRatio || 1
  //     }
  //   );

  //   const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map.current));
  //   const ui = H.ui.UI.createDefault(map.current, platform.current.createDefaultLayers());

  //   marker.current = new H.map.Marker(currentPosition, {
  //     volatility: true,
  //     draggable: true
  //   });
  //   map.current.addObject(marker.current);

  //   map.current.addEventListener('drag', (e) => {
  //     const newPosition = map.current.screenToGeo(e.currentPointer.viewportX, e.currentPointer.viewportY);
  //     marker.current.setGeometry(newPosition);
  //     setCurrentPosition({ lat: newPosition.lat, lng: newPosition.lng });
  //   });

  //   map.current.addEventListener('dragstart', () => {
  //     behavior.disable();
  //   });

  //   map.current.addEventListener('dragend', () => {
  //     behavior.enable();
  //   });

  //   return () => {
  //     mapRef.current = null;
  //     platform.current.dispose();
  //   };
  // }, []);
  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 ">
        <Title
          title={("Add Seller")}
        />
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Seller Name : ")} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  {...register('title',
                    { required: 'Seller Name is required!' })}
                  name="title"
                  type="text"
                  placeholder="Seller Name"
                  onChange={handleChange}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Address Line : ")} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  name="addressLine"
                  {...register('addressLine')}
                  type="text"
                  placeholder="Address Line"
                  onChange={handleChange}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Area : ")} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  name="area"
                  {...register('area')}
                  type="text"
                  placeholder="Area"
                  onChange={handleChange}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("City : ")} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  name="city"
                  {...register('city')}
                  type="text"
                  placeholder="City"
                  onChange={handleChange}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("State : ")} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  name="state"
                  value={state}
                  {...register('state')}
                  type="text"
                  placeholder="State"
                  onChange={handleChange}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Pincode : ")} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  name="pincode"
                  value={pincode}
                  {...register('pincode')}
                  type="text"
                  placeholder="Pin Code"
                  onChange={handleChange}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Products: ")} />
              <div className="col-span-8 sm:col-span-4">
                <MultiSelect
                  options={products.map(product => ({
                    value: product._id,
                    label: product.title.en
                  }))}
                  value={selectedProducts}
                  onChange={setSelectedProducts}
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Status : ")} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  name="status"
                  {...register('status')}
                  type="text"
                  placeholder="Status"
                  onChange={handleChange}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("GST : ")} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  name="gst"
                  {...register('gst')}
                  type="text"
                  placeholder="GST"
                  onChange={handleChange}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Map View : ")} />
              <div className="col-span-8 sm:col-span-4">
                <TestMap />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={("Latitude : ")} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  readOnly
                  // value={coordinates.lat}
                  value={coordinates.lat !== '' ? parseFloat(coordinates.lat).toFixed(7) : ''}
                  type="text"
                  placeholder="Latitude"
                  name='latitude'
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={("Longitude : ")} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  readOnly
                  value={coordinates.lng !== '' ? parseFloat(coordinates.lng).toFixed(7) : ''}
                  type="text"
                  name='longitude'
                  placeholder="Longitude"
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />
              </div>
            </div>
          </div>
          <DrawerButton title="Seller" />
        </form>
      </Scrollbars>
    </>
  );
};
export default CreatePurchase;
