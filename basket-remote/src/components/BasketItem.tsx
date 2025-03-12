import { List, Avatar, Button, InputNumber } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { removeProduct, updateQuantity } from "host/selectedProductSlice";

type BasketItemProps = {
  product: {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
  };
};

const BasketItem = ({ product }: BasketItemProps) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (value: number) => {
    dispatch(updateQuantity({ id: product.id, quantity: value }));
  };

  const handleRemove = () => {
    dispatch(removeProduct(product.id));
  };

  return (
    <List.Item
      actions={[
        <InputNumber min={1} value={product.quantity} onChange={handleQuantityChange} />,
        <Button type="text" icon={<DeleteOutlined />} danger onClick={handleRemove} />,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={product.image} />}
        title={product.title}
        description={`$${product.price.toFixed(2)} x ${product.quantity}`}
      />
    </List.Item>
  );
};

export default BasketItem;
