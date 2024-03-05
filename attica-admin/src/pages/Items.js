import React, { useState, useEffect, useContext } from 'react';
import {
  // Table,
  // TableHeader,
  // TableCell,
  // TableFooter,
  // TableContainer,
  Select,
  // Input,
  // Button,
  // Card,
  // CardBody,
  // Pagination,
} from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import { FiPlus } from "react-icons/fi";

import useAsync from "hooks/useAsync";
import useToggleDrawer from "hooks/useToggleDrawer";
import UploadManyTwo from "components/common/UploadManyTwo";
import NotFound from "components/table/NotFound";
import ItemServices from "services/ItemServices";
import PageTitle from "components/Typography/PageTitle";
import { SidebarContext } from "context/SidebarContext";
// import ItemTable from "components/Item/ItemTable";
import ItemTable from "components/items/ItemTable";
import SelectCategory from "components/form/SelectCategory";
import MainDrawer from "components/drawer/MainDrawer";
import ItemDrawer from "components/drawer/ItemDrawer";
import CheckBox from "components/form/CheckBox";
import { Button, Card, TableBody, CardBody, Input, Pagination, Table, TableRow, TableCell, TableContainer, TableFooter, TableHeader } from '@windmill/react-ui';

import useItemFilter from "hooks/useItemFilter";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import DeleteModal from "components/modal/DeleteModal";
import BulkActionDrawer from "components/drawer/BulkActionDrawer";
import TableLoading from "components/preloader/TableLoading";
import SettingServices from "services/SettingServices";

const Items = () => {
  const { title, allId, serviceId, handleDeleteMany, handleUpdateMany } =
    useToggleDrawer();

  const { t } = useTranslation();
  const {
    toggleDrawer,
    lang,
    currentPage,
    handleChangePage,
    searchText,
    category,
    setCategory,
    searchRef,
    handleSubmitForAll,
    sortedField,
    setSortedField,
    limitData,
  } = useContext(SidebarContext);
  const [dataa, setData] = useState([]);

  const { data, loading } = useAsync(() =>
    ItemServices.getAllItems({
      page: currentPage,
      limit: limitData,
      category: category,
      title: searchText,
      price: sortedField,
    })
  );
  useEffect(() => {
    // Fetch the data from the API
    fetch('http://localhost:5055/api/Items?page=1&limit=20&category=&title=&price=') // Update the API endpoint to the correct URL
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting);
  const currency = globalSetting?.default_currency || "$";
  // console.log("Item page", data);

  // react hooks
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
const[item,Setite]=useState([]);
  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(data?.Items.map((li) => li._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  console.log('Itemss',Items)
  const {
    serviceData,
    filename,
    isDisabled,
    handleSelectFile,
    handleUploadMultiple,
    handleRemoveSelectFile,
  } = useItemFilter(data?.Items);

  return (
    <>
      <PageTitle>{t("Production")}</PageTitle>
      <DeleteModal ids={allId} setIsCheck={setIsCheck} title={title} />
      <BulkActionDrawer ids={allId} title="Items" />
      <MainDrawer>
        <ItemDrawer id={serviceId} />
        
      </MainDrawer>
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody className="">
          <form
            onSubmit={handleSubmitForAll}
            className="py-3 md:pb-0 grid gap-4 lg:gap-6 xl:gap-6  xl:flex"
          >
            {/* <div className="flex justify-start xl:w-1/2  md:w-full">
              <UploadManyTwo
                title="Items"
                filename={filename}
                isDisabled={isDisabled}
                totalDoc={data?.totalDoc}
                handleSelectFile={handleSelectFile}
                handleUploadMultiple={handleUploadMultiple}
                handleRemoveSelectFile={handleRemoveSelectFile}
              />
            </div> */}
            <div className="lg:flex  md:flex xl:justify-end xl:w-1/2  md:w-full md:justify-start flex-grow-0">
              <div className="w-full md:w-40 lg:w-40 xl:w-40 mr-3 mb-3 lg:mb-0">
                <Button
                  disabled={isCheck.length < 1}
                  onClick={() => handleUpdateMany(isCheck)}
                  className="w-full rounded-md h-12 btn-gray text-gray-600 sm:mb-3"
                >
                  <span className="mr-2">
                    <FiEdit />
                  </span>
                  {t("BulkAction")}
                </Button>
              </div>

              <div className="w-full md:w-32 lg:w-32 xl:w-32 mr-3 mb-3 lg:mb-0">
                <Button
                 id="styleButton"
                  disabled={isCheck?.length < 1}
                  onClick={() => handleDeleteMany(isCheck, data.Items)}
                  className="w-full rounded-md h-12 bg-red-300 disabled "
                >
                  <span className="mr-2">
                    <FiTrash2 />
                  </span>

                  {t("Delete")}
                </Button>
              </div>
              <div className="w-full md:w-48 lg:w-48 xl:w-48">
                <Button
                id="styleButton"
                  onClick={toggleDrawer}
                  className="w-full rounded-md h-12"
                >
                  <span className="mr-2">
                    <FiPlus />
                  </span>
                  {t("AddItem")}
                </Button>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4">
        <CardBody>
          <form
            onSubmit={handleSubmitForAll}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
          >
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Input
                ref={searchRef}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                type="search"
                name="search"
                placeholder="Search Item"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-5 mr-1"
              ></button>
            </div>
{/* 
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <SelectCategory setCategory={setCategory} lang={lang} />
            </div> */}

            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Select
                onChange={(e) => setSortedField(e.target.value)}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
              >
                <option value="All" defaultValue hidden>
                  {t("Price")}
                </option>
                <option value="low">{t("LowtoHigh")}</option>
                <option value="high">{t("HightoLow")}</option>
                <option value="published">{t("Published")}</option>
                <option value="unPublished">{t("Unpublished")}</option>
                <option value="status-selling">{t("StatusSelling")}</option>
                <option value="status-out-of-stock">{t("StatusStock")}</option>
                <option value="date-added-asc">{t("DateAddedAsc")}</option>
                <option value="date-added-desc">{t("DateAddedDesc")}</option>
                <option value="date-updated-asc">{t("DateUpdatedAsc")}</option>
                <option value="date-updated-desc">
                  {t("DateUpdatedDesc")}
                </option>
              </Select>
            </div>
          </form>
        </CardBody>
      </Card>
{/* 
      {loading ? (
        <TableLoading row={12} col={7} width={160} height={20} />
      ) : serviceData?.length !== 0 ? ( */}
        <TableContainer className="mb-8 rounded-b-lg">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>
                <CheckBox
                  type="checkbox"
                  name="selectAll"
                  id="selectAll"
                  isChecked={isCheckAll}
                  handleClick={handleSelectAll}
                />
              </TableCell>
              <TableCell>{("SR")}</TableCell>
              <TableCell>{t("Item Name")}</TableCell>
              {/* <TableCell>{t("CategoryTbl")}</TableCell> */}
              <TableCell>{t("Description")}</TableCell>
              <TableCell>{("Units")}</TableCell>
              <TableCell>{t("PriceTbl")}</TableCell>
              {/* <TableCell>{t("StockTbl")}</TableCell> */}
              <TableCell className="text-center">
                {t("Status")}
              </TableCell>
              <TableCell className="text-center">{t("Variants")}</TableCell>
              <TableCell className="text-right">{t("ActionsTbl")}</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
          {item?.map((item, i) => (
            <TableRow key={i + 1}>
              <TableCell>
                <CheckBox
                  type="checkbox"
                  name={item?.title?.en}
                  id={Ite._id}
                  handleClick={handleClick}
                  isChecked={isCheck?.includes(item._id)}
                />
              </TableCell>
              
              <TableCell>
                <div className="flex item-center">
                  {item?.image[0] ? (
                    <Avatar
                      className="hidden p-1 mr-2 md:block bg-gray-50 shadow-none"
                      src={item?.image[0]}
                      alt="item"
                    />
                  ) : (
                    <Avatar
                      src={`https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png`}
                      alt="item"
                    />
                  )}
                  <div>
                    <h2 className="text-sm font-medium">
                      {showingTranslateValue(item?.title, lang)?.substring(
                        0,
                        28
                      )}
                    </h2>
                  </div>
                </div>
              </TableCell>
  
              <TableCell>
                <span className="text-sm">
                  {showingTranslateValue(item?.category?.name, lang)}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-sm">
                  {showingTranslateValue(item?.description,lang)}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-sm font-semibold">
                  {currency}
                  {Number(item?.prices?.originalPrice).toFixed(2)}
                </span>
              </TableCell>
  
              <TableCell>
                <span className="text-sm font-semibold">
                  {currency}
                  {Number(item?.prices?.price).toFixed(2)}
                </span>
              </TableCell>
  
              <TableCell>
                <span className="text-sm">{item.stock}</span>
              </TableCell>
  
              <TableCell>
                <Link
                  to={`/item/${item._id}`}
                  className="flex justify-center text-gray-400 hover:text-green-600"
                >
                  <Tooltip
                    id="view"
                    Icon={FiZoomIn}
                    title={t("DetailsTbl")}
                    bgColor="#10B981"
                  />
                </Link>
              </TableCell>
              <TableCell className="text-center">
                <ShowHideButton id={item._id} status={item.status} />
                {/* {item.status} */}
              </TableCell>
              <TableCell>
                <EditDeleteButton
                  id={item._id}
                  item={item}
                  isCheck={isCheck}
                  handleUpdate={handleUpdate}
                  handleModalOpen={handleModalOpen}
                  title={showingTranslateValue(item?.title, lang)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
          <ItemTable
            lang={lang}
            isCheck={isCheck}
            Items={data?.Items}
            setIsCheck={setIsCheck}
            currency={currency}
          />
        </Table>
        <TableFooter>
          <Pagination
            totalResults={data?.totalDoc}
            resultsPerPage={limitData}
            onChange={handleChangePage}
            label="Item Page Navigation"
          />
        </TableFooter>
      </TableContainer>
      {/* ) : (
        <NotFound title="Item" />
      )} */}
    </>
  );
};

export default Items;
