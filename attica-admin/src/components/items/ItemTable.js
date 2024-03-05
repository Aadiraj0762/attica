import {
    Avatar,
    Badge,
    TableBody,
    TableCell,
    TableRow,
  } from "@windmill/react-ui";
  import MainDrawer from "components/drawer/MainDrawer";
  import ItemDrawer from "components/drawer/ItemDrawer";
  import CheckBox from "components/form/CheckBox";
  import DeleteModal from "components/modal/DeleteModal";
  import EditDeleteButton from "components/table/EditDeleteButton";
  import ShowHideButton from "components/table/ShowHideButton";
  import Tooltip from "components/tooltip/Tooltip";
  import useToggleDrawer from "hooks/useToggleDrawer";
  import { t } from "i18next";
  import { FiZoomIn } from "react-icons/fi";
  import { Link } from "react-router-dom";
  import { showingTranslateValue } from "utils/translate";
  
  //internal import
  
  const itemTable = ({ item, isCheck, setIsCheck, currency, lang }) => {
    const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  
  
    const handleClick = (e) => {
      const { id, checked } = e.target;
      console.log("id", id, checked);
  
      setIsCheck([...isCheck, id]);
      if (!checked) {
        setIsCheck(isCheck.filter((item) => item !== id));
      }
    };
  
    return (
      <>
        {isCheck?.length < 1 && <DeleteModal id={serviceId} title={title} />}
  
        {isCheck?.length < 2 && (
          <MainDrawer>
            <ItemDrawer currency={currency} id={serviceId} />
          </MainDrawer>
        )}
  
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
      </>
    );
  };
  
  export default itemTable;
  // 

  