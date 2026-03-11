import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteToFavorites } from "./redux/favoritesSlice";
import { ModalFavorites } from "./ModalFavorites";
import { closeModal, modalSelector, openModalEdit } from "./redux/modalSlice";

export const FavoritesButton = ({ item }) => {
  const dispatch = useDispatch();
  const {isOpen}  = useSelector(modalSelector);

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteToFavorites(item.id));
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    dispatch(openModalEdit(item));
  };

  return (
    <>
      {isOpen && (
        <div className="modal-overlay" onClick={() => dispatch(closeModal())}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <ModalFavorites />
          </div>
        </div>
      )}
      <div className="favorites-btn">
        <Button onClick={handleEdit} color="danger" variant="outlined">
          <EditOutlined style={{ color: "#fa541c" }} />
        </Button>
        <Button onClick={handleDelete} color="danger" variant="outlined">
          <DeleteOutlined style={{ color: "#fa541c" }} />
        </Button>
      </div>
    </>
  );
};
