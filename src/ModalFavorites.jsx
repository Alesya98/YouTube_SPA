import { useDispatch, useSelector } from "react-redux";
import { Button, Col, InputNumber, Row, Select, Slider } from "antd";
import { closeModal, modalSelector } from "./redux/modalSlice";
import { useNavigate } from "react-router-dom";
import { addToFavorites, upDataFavorites } from "./redux/favoritesSlice";
import { useState } from "react";



export const ModalFavorites = () => {
  const { modalProps, mode } = useSelector(modalSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    query: modalProps.query || "",
    name: modalProps.name || "",
    sort: modalProps.sort || "relevance",
    sliderValue: modalProps.sliderValue || 12,
  });

  const handleOnFavorite = () => {
    if (mode === "edit") {
      dispatch(upDataFavorites({ ...formData, id: modalProps.id }));
    } else {
      dispatch(addToFavorites({ ...formData }));
    }
    dispatch(closeModal());
    navigate("/favorites");
  };

  const onSliderChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      sliderValue: value,
    }));
  };

  const onSelect = (value) => {
    setFormData((prev) => ({...prev, sort: value}))
  }

  return (
    <>
      <form className="form-modal">
        <h3>{mode === "edit" ? "Редактировать запрос" : "Сохранить запрос"}</h3>
        <div className="modal-input">
          <label htmlFor="request">Запрос</label>
          <input
            value={formData.query}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, query: e.target.value }))
            }
            type="text"
            id="request"
            disabled={mode === "add"}
          />
        </div>

        <div className="modal-input">
          <label htmlFor="name">Название*</label>
          <input
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            type="text"
            required
            id="name"
            placeholder="Укажите название"
          />
        </div>

        <div className="modal-input">
          <label htmlFor="sort">Сортировать по</label>
          <Select
            id="sort"
            value={formData.sort}
            style={{ width: 120, zIndex: "400", position: "relative" }}
            onChange={onSelect}
            options={[
              { value: "date", label: "дате" },
              { value: "rating", label: "рейтингу" },
              { value: "relevance", label: "релевантности" },
              { value: "title", label: "алфавиту" },
              { value: "videoCount", label: "количеству" },
              { value: "viewCount", label: "просмотрам" },
              { value: "", label: "без сортировки", disabled: true },
            ]}
          />
        </div>

        <Row>
          <Col span={12}>
            <Slider
              min={1}
              max={50}
              onChange={onSliderChange}
              value={formData.sliderValue}
            />
          </Col>
          <Col span={4}>
            <InputNumber
              min={1}
              max={50}
              style={{ margin: "0 16px" }}
              value={formData.sliderValue}
              onChange={onSliderChange}
            />
          </Col>
        </Row>

        <div className="modal-btn">
          <Button
            onClick={() => dispatch(closeModal())}
            color="danger"
            variant="outlined"
          >
            Не сохранять
          </Button>
          <Button onClick={handleOnFavorite} color="danger" variant="solid">
            Сохранять
          </Button>
        </div>
      </form>
    </>
  );
};
