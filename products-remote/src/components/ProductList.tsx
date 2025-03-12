import { useProductsQuery } from "@/queries/useProductsQuery";
import ProductCard from "@/components/ProductCard";
import { Spin, Alert, Row, Col } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "host/store";

const ProductList: React.FC = () => {
  const { data: products, error, isLoading } = useProductsQuery();
  const selectedProduct = useSelector(
    (state: RootState) => state.selectedProduct
  );

  if (isLoading)
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Spin size="large" />
      </div>
    );

  if (error)
    return (
      <Alert
        message="Failed to load products"
        type="error"
        style={{ margin: "20px" }}
      />
    );

  return (
    <>
      <Row gutter={[16, 16]} justify="center">
        {products?.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ProductList;
