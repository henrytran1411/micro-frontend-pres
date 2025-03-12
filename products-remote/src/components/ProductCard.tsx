import { Card, Button, Badge, Typography } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addProduct } from "host/selectedProductSlice";
const { Title, Text } = Typography;

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  discount?: boolean;
  oldPrice?: number;
};

const ProductCard = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();

  const handleSelectProduct = () => {
    dispatch(addProduct(product));
  };

  return (
    <Badge.Ribbon
      text="Discount"
      color="blue"
      style={{ display: product.discount ? "block" : "none" }}
    >
      <Card
        hoverable
        style={{ borderRadius: 8, maxHeight: 400 }}
        cover={
          <div
            style={{
              height: 150,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 8,
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{ maxHeight: "100%", maxWidth: "100%" }}
            />
          </div>
        }
      >
        <Title
          level={5}
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {product.title}
        </Title>

        <Text
          type="secondary"
          style={{
            display: "inline-block",
            width: '100%',
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {product.description}
        </Text>

        <div
          style={{
            marginTop: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text strong style={{ fontSize: 16, color: "#1677ff" }}>
            ${product.price.toFixed(2)}
          </Text>
          {product.oldPrice && (
            <Text delete type="secondary" style={{ marginLeft: 8 }}>
              ${product.oldPrice.toFixed(2)}
            </Text>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 10,
            gap: 8,
          }}
        >
          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            style={{ flexGrow: 1 }}
            size="large"
            onClick={handleSelectProduct}
          >
            Add to cart
          </Button>
          <Button
            icon={<HeartOutlined />}
            size="large"
            style={{ color: "#8c8c8c" }}
          />
        </div>
      </Card>
    </Badge.Ribbon>
  );
};

export default ProductCard;
